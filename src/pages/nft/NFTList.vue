<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <nft-filter :value="activeFilters" @change-filter="setFilters"></nft-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadNFT(true)">Refresh</base-button>
          <base-button link to="/auth" v-if="!isLoggedIn">Login to Register NFT</base-button>
          <base-button v-if="isLoggedIn && !isLoading" link to="/register">Register NFT</base-button>
          <div v-if="isLoggedIn">
            <base-button @click="logout">Logout</base-button>
          </div>
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasNFT">
          <nft-item
            v-for="nft in filteredNFT"
            :key="nft.id"
            :id="nft.id"
            :image="nft.image"
            :name="nft.name"
            :price="nft.price"
            :areas="nft.areas"
          ></nft-item>
        </ul>
        <h3 v-else>No NFTs found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import NftItem from '../../components/nft-component/NftItem.vue';
import NftFilter from '../../components/nft-component/NftFilter.vue';

export default {
  components: {
    NftItem,
    NftFilter,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        gaming: true,
        pfp: true,
        art: true,
        collectibles: true,
        utility: true,
        minPrice: null,
        maxPrice: null,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
    filteredNFT() {
      const nftList = this.$store.getters['nft/nft'];
      return nftList.filter((nft) => {
        let matchCategory = false;
        for (const cat of ['gaming', 'pfp', 'art', 'collectibles', 'utility']) {
          if (this.activeFilters[cat] && (nft.areas || []).includes(cat)) {
            matchCategory = true;
            break;
          }
        }
        if (!matchCategory) return false;
        const price = Number(nft.price);
        if (
          this.activeFilters.minPrice !== null &&
          price < this.activeFilters.minPrice
        )
          return false;
        if (
          this.activeFilters.maxPrice !== null &&
          price > this.activeFilters.maxPrice
        )
          return false;
        return true;
      });
    },
    hasNFT() {
      return !this.isLoading && this.$store.getters['nft/hasNFT'];
    },
  },
  created() {
    this.loadNFT();
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = { ...this.activeFilters, ...updatedFilters };
    },
    async loadNFT(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('nft/setNFT', { forceRefresh: refresh });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    logout() {
      this.$store.dispatch('auth/logout');
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.controls {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

@media (max-width: 900px) {
  ul {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  ul {
    grid-template-columns: 1fr;
  }
  .controls {
    flex-direction: column;
    gap: 0.8rem;
  }
  .controls base-button {
    width: 100%;
  }
}

</style>
