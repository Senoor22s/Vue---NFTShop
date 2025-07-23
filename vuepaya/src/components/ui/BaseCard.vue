<template>
  <div class="blue-silver-card">
    <slot></slot>
  </div>
</template>

<style scoped>
.blue-silver-card {
  border-radius: 18px;
  box-shadow: var(--card-shadow);
  background: var(--card-bg);
  padding: 1.4rem 1.3rem;
  margin: 2rem auto;
  max-width: 40rem;
  border: 1.2px solid var(--card-border);
  backdrop-filter: blur(8px) saturate(125%);
  transition: box-shadow 0.25s, border-color 0.22s, background 0.23s;
}

.blue-silver-card:hover {
  box-shadow: var(--card-shadow-hover);
  border-color: var(--card-border-hover);
  background: var(--card-bg-hover);
}
</style>
