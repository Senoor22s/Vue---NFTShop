export default {
  async registerNFT(context, payload) {
    const userId = context.rootGetters['auth/userId'];

    const formDataUpload = new FormData();
    formDataUpload.append('fileId', 'unique()');
    formDataUpload.append('file', payload.image);

    let imageId = null;
    try {
      const uploadResponse = await fetch('https://cloud.appwrite.io/v1/storage/buckets/6880b2720033d759d253/files', {
        method: 'POST',
        headers: {
          'X-Appwrite-Project': '68809a0300162782b84f',
          'X-Appwrite-Session': context.rootGetters['auth/token']
        },
        body: formDataUpload,
        credentials: 'include'
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploadResult.message || 'Image upload failed');
      }

      imageId = uploadResult.$id;
    } catch (uploadErr) {
      console.error('Image upload error:', uploadErr);
      throw uploadErr;
    }

    const nftData = {
      name: payload.name,
      price: payload.price,
      description: payload.description,
      image: imageId,
      areas: payload.areas
    };

    try {
      const response = await fetch('https://cloud.appwrite.io/v1/databases/68809a15001bb8e8a300/collections/68809a28002c1823ddf0/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Appwrite-Project': '68809a0300162782b84f',
          'X-Appwrite-Session': context.rootGetters['auth/token']
        },
        body: JSON.stringify({
          documentId: 'unique()',
          data: nftData
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || 'Failed to register NFT');
        throw error;
      }

      context.commit('registerNFT', {
        ...nftData,
        id: userId
      });
    } catch (error) {
      console.error('Document create error:', error);
      throw error;
    }
  },

  async setNFT(context, payload = {}) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      return;
    }
    try {
      const response = await fetch('https://cloud.appwrite.io/v1/databases/68809a15001bb8e8a300/collections/68809a28002c1823ddf0/documents', {
        method: 'GET',
        headers: {
          'X-Appwrite-Project': '68809a0300162782b84f'
        }
      });
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.message || 'Failed to fetch NFTs');
        throw error;
      }

      const nft = context.getters.nft;
      nft.splice(0, nft.length, ...data.documents.map((doc) => ({
        id: doc.$id,
        name: doc.name,
        price: doc.price,
        description: doc.description,
        image: `https://cloud.appwrite.io/v1/storage/buckets/6880b2720033d759d253/files/${doc.image}/view?project=68809a0300162782b84f`,
        areas: doc.areas
      })).reverse());

      context.commit('setNFT', nft);
      context.commit('setFetchTimestamp');
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
};
