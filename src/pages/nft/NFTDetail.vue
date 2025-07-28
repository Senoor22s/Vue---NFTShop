<template>
  <div v-if="isLoading">
    <base-card>
      <base-spinner></base-spinner>
    </base-card>
  </div>
  <div v-else-if="selectedNFT">
    <section>
      <base-card>
        <img
          :src="NFTImageLink"
          alt="Image of {{ name }}"
          class="nft-image"
          loading="lazy"
        />
        <h2>{{ name }}</h2>
        <h3>${{ price }}</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        />
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>

<script>
import store from '../../store/store.js';

export default {
  props: ['id'],
  data() {
    return {
      selectedNFT: null,
      isLoading: true,
    };
  },
  computed: {
    name() {
      return this.selectedNFT?.name || '';
    },
    areas() {
      return this.selectedNFT?.areas || [];
    },
    price() {
      return this.selectedNFT?.price || 0;
    },
    description() {
      return this.selectedNFT?.description || '';
    },
    NFTImageLink() {
      const img = this.selectedNFT?.image || '';
      if (!img) return '';
      if (
        img.startsWith('blob:') ||
        img.startsWith('data:') ||
        img.startsWith('http://') ||
        img.startsWith('https://')
      ) {
        return img;
      }
      return `/image/${img}`;
    },
  },
  mounted() {
    this.loadNFT();
  },
  methods: {
    async loadNFT(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('nft/setNFT', { forceRefresh: refresh });
        const nft = this.$store.getters['nft/nft'].find(n => n.id === this.id);
        if (nft) {
          this.selectedNFT = nft;
        } else {
          this.$router.replace('/not-found');
        }
      } catch (err) {
        this.$router.replace('/not-found');
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&display=swap');

.nft-image {
  width: 100%;
  max-width: 320px;
  height: auto;
  display: block;
  margin: 0 auto 1rem auto;
  border-radius: 12px;
  border: 1.5px solid var(--nft-image-border);
  box-shadow: var(--nft-image-shadow);
  object-fit: cover;
}

h2 {
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
  font-weight: 900;
  font-size: 1.3rem;
  color: var(--title-color);
  line-height: 1.18;
  letter-spacing: 0.5px;
  margin-bottom: 0.5em;
  text-shadow: var(--title-shadow);
}

h3 {
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
  font-weight: 700;
  font-size: 1.21rem;
  color: var(--price-color);
  margin-top: 0;
  margin-bottom: 0.5em;
  letter-spacing: 0.3px;
}

p {
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
  font-size: 1.03rem;
  color: var(--desc-color);
  text-align: justify;
  line-height: 1.7;
}

@media (max-width: 900px) {
  .nft-image {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  h2 {
    font-size: 1.1rem;
  }
  h3 {
    font-size: 1rem;
  }
  p {
    font-size: 0.9rem;
  }
}

</style>
