<template>
  <section class="nft-register-container">
    <base-card class="nft-register-card">
      <h2>Register NFT Now!</h2>
      <nft-form @save="saveData" />
    </base-card>
    <base-dialog :show="isSubmitting" title="Registering NFT..." :fixed="true">
      <base-spinner />
      <h2>Please wait while we register your NFT...</h2>
    </base-dialog>
  </section>
</template>

<script>
import NftForm from '../../components/nft-component/NftForm.vue';

export default {
  components: {
    NftForm,
  },
  data() {
    return {
      isSubmitting: false,
    };
  },
  methods: {
    async saveData(data) {
      this.isSubmitting = true;
      try {
        await this.$store.dispatch('nft/registerNFT', data);
        await this.$store.dispatch('nft/setNFT', { forceRefresh: true });
        this.$router.replace('/nft-list');
      } catch (err) {
        console.error('Error saving NFT:', err);
        this.isSubmitting = false;
      }
    },
  },
};
</script>

<style scoped>
.nft-register-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  background: var(--form-bg);
}

.nft-register-card {
  width: 100%;
  max-width: 500px;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--form-shadow);
  backdrop-filter: blur(8px) saturate(150%);
}

h2 {
  font-family: 'Orbitron', monospace, sans-serif;
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--nft-register-title);
  margin-bottom: 0.8em;
}

@media (max-width: 480px) {
  .nft-register-card {
    padding: 1rem;
  }
  h2 {
    font-size: 1.2rem;
  }
}
</style>
