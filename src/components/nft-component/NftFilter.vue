<template>
  <base-card class="digital-text">
    <h2>Find Your NFT</h2>
    <span class="filter-option" v-for="cat in categories" :key="cat.id">
      <input 
        type="checkbox" 
        :id="cat.id" 
        v-model="pendingFilters[cat.id]" 
      />
      <label :for="cat.id">{{ cat.label }}</label>
    </span>
    <div class="filter-price-range ">
      <label>
        Min Price
        <input
          type="number"
          v-model.number="pendingFilters.minPrice"
          min="0"
          placeholder="Min"
        />
      </label>
      <label>
        Max Price
        <input
          type="number"
          v-model.number="pendingFilters.maxPrice"
          min="0"
          placeholder="Max"
        />
      </label>
    </div>
    <base-button class="apply-btn" @click="applyFilters">Submit</base-button>
  </base-card>
</template>

<script>
export default {
  emits: ['change-filter'],
  props: {
    value: {
      type: Object,
      default: () => ({
        gaming: true,
        pfp: true,
        art: true,
        collectibles: true,
        utility: true,
        minPrice: null,
        maxPrice: null,
      }),
    },
  },
  data() {
    return {
      pendingFilters: { ...this.value },
      categories: [
        { id: 'utility', label: 'Utility' },
        { id: 'collectibles', label: 'Collectibles' },
        { id: 'art', label: 'Art' },
        { id: 'pfp', label: 'PFP' },
        { id: 'gaming', label: 'Gaming' },
      ],
    };
  },
  watch: {
    value(newVal) {
      this.pendingFilters = { ...newVal };
    },
  },
  methods: {
    applyFilters() {
      if (this.pendingFilters.minPrice !== null && this.pendingFilters.minPrice < 0)
        this.pendingFilters.minPrice = 0;
      if (
        this.pendingFilters.maxPrice !== null &&
        this.pendingFilters.minPrice !== null &&
        this.pendingFilters.maxPrice < this.pendingFilters.minPrice
      )
        this.pendingFilters.maxPrice = this.pendingFilters.minPrice;
      this.$emit('change-filter', { ...this.pendingFilters });
    },
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

.digital-text {
  font-family: 'Orbitron', monospace, sans-serif;
}

h2 {
  color: var(--primary-text);
  font-size: 1.1rem;
  line-height: 1.5;
  word-break: break-word;
  letter-spacing: 0.07rem;
  margin-bottom: 1rem;
}

label {
  color: var(--primary-label);
  font-size: 0.8rem;
  line-height: 1.5;
  word-break: break-word;
  letter-spacing: 0.07rem;
}

.filter-option {
  margin-right: 1rem;
  display: inline-flex;
  align-items: center;
  margin-bottom: 0.6rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
  cursor: pointer;
}

.filter-option label {
  margin-left: 0.25rem;
  user-select: none;
}

.filter-option input[type="checkbox"]:checked + label {
  font-weight: bold;
  color: var(--filter-label-checked);
  text-shadow: var(--filter-label-shadow);
}

.filter-price-range {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

.filter-price-range label {
  display: flex;
  flex-direction: column;
  color: var(--primary-label);
  font-size: 0.85rem;
  flex: 1 1 150px;
  min-width: 140px;
}

.filter-price-range input[type="number"] {
  margin-top: 0.3rem;
  border-radius: 8px;
  border: 1px solid var(--form-input-border);
  padding: 0.45rem 0.7rem;
  background: var(--form-input-bg);
  color: var(--form-input-color);
  font-size: 1rem;
  box-shadow: 0 1px 8px #eaf5ff18;
  transition: border 0.2s, box-shadow 0.2s, background 0.2s;
  font-family: inherit;
  min-width: 100%;
  box-sizing: border-box;
}

.filter-price-range input[type="number"]:focus {
  background: var(--form-input-focus-bg);
  border-color: var(--form-input-focus-border);
  box-shadow: 0 2px 10px var(--form-input-focus-shadow);
  outline: none;
}

.apply-btn {
  margin-top: 1.5rem;
  padding: 0.55em 1.3em;
  border-radius: 6px;
  cursor: pointer;
  background: var(--primary-btn, #333);
  color: #fff;
  font-size: 1rem;
  border: none;
  transition: background 0.2s;
  font-family: inherit;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 480px) {
  .filter-price-range {
    flex-direction: column;
  }

  .filter-option {
    margin-right: 0;
  }

  .apply-btn {
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
