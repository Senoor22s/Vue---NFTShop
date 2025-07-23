<template>
  <section>
    <base-card>
      <h2>Page not found</h2>
      <base-button>
        <router-link to="/nft-list">Return</router-link>
      </base-button>
    </base-card>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

a {
  text-decoration: none;
  color: var(--link-primary);
  transition: color 0.17s;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
}

h2 {
  color: var(--h2-primary);
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
  font-weight: 700;
}

a:hover {
  color: #1565c0;
}
</style>
