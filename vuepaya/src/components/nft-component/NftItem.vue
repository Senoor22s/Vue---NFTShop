<template>
  <li class="digital-text">
    <img :src="NFTImageLink" class="nft-image" loading="lazy" />
    <h3>{{ name }}</h3>
    <h4>${{ price }}</h4>
    <div class="badge-container">
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      />
    </div>
    <div class="spacer"></div>
    <div class="actions">
      <base-button
        link
        :to="NFTDetailsLink"
        :aria-label="`View details of NFT named ${name}`"
      >
        View Details
      </base-button>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'name', 'image', 'price', 'areas'],
  computed: {
    NFTDetailsLink() {
      return this.$route.path + '/' + this.id;
    },
    NFTImageLink() {
      if (!this.image) return '';
      if (
        this.image.startsWith('blob:') ||
        this.image.startsWith('data:') ||
        this.image.startsWith('http://') ||
        this.image.startsWith('https://')
      ) {
        return this.image;
      }
      return `/image/${this.image}`;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

.digital-text {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  max-width: 320px;
  width: 100%;
  height: 460px;
  margin: 1rem auto;
  border-radius: 14px;
  padding: 1.2rem;
  background: var(--nft-card-bg);
  border: 1.5px solid var(--nft-card-border);
  box-shadow: var(--nft-card-shadow);
  font-family: 'Vazirmatn', 'Roboto', 'Segoe UI', Tahoma, Geneva, sans-serif;
  transition: box-shadow 0.18s, border 0.17s, background 0.19s;
  box-sizing: border-box;
}

.digital-text:hover,
.digital-text:focus-within {
  box-shadow: var(--nft-card-shadow-hover);
  border-color: var(--nft-card-border-hover);
  background: var(--nft-card-bg-hover);
}

.digital-text h3,
.digital-text h4 {
  font-family: 'Orbitron', monospace, 'Vazirmatn', 'Roboto', sans-serif;
}

.nft-image {
  width: 100%;
  height: 140px;
  object-fit: cover;
  display: block;
  border-radius: 12px;
  border: 1.5px solid var(--nft-image-border);
  box-shadow: var(--nft-image-shadow);
  background-color: #f2f2f2;
}

h3 {
  font-size: 1.42rem;
  margin: 0.5rem 0 0.18rem 0;
  font-weight: 700;
  color: var(--nft-title);
  letter-spacing: 0.01em;
  text-shadow: var(--nft-title-shadow);
}

h4 {
  margin: 0.18rem 0 0.5rem 0;
  font-size: 1.02rem;
  color: var(--nft-price);
  font-weight: 500;
  letter-spacing: 0.01em;
}

.badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin: 0.4rem 0;
}

/* spacer to push button to bottom */
.spacer {
  flex-grow: 1;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.7rem;
  margin-top: 1rem;
}

/* ریسپانسیو */
@media (max-width: 768px) {
  .digital-text {
    max-width: 90%;
    height: 440px;
  }
  .nft-image {
    height: 160px;
  }
}

@media (max-width: 480px) {
  .digital-text {
    max-width: 100%;
    padding: 1rem;
    height: 420px;
  }
  .nft-image {
    height: 150px;
  }
  h3 {
    font-size: 1.1rem;
  }
  h4 {
    font-size: 0.9rem;
  }
}
</style>
