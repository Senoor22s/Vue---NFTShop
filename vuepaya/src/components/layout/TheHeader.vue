<template>
  <header class="blue-silver-header digital-text">
    <nav>
      <h1>
        <router-link to="/">NFT Shop</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/nft-list">NFT List</router-link>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">Logout</base-button>
        </li>
        <li v-else>
          <router-link to="/auth">Login or Signup</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
    },
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

.digital-text {
  font-family: 'Orbitron', monospace, sans-serif;
}

.blue-silver-header {
  width: 100%;
  height: 5.3rem;
  background: var(--header-bg);
  box-shadow: var(--header-shadow);
  backdrop-filter: blur(20px) saturate(170%);
  border-bottom: 2.7px solid var(--header-border);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 24px 24px;
  z-index: 50;
  position: sticky;
  top: 0;
  overflow: hidden;
  box-sizing: border-box;
  transition: background 0.35s;
}
.blue-silver-header:before {
  content: "";
  position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  pointer-events: none;
  background: var(--header-gradient-before);
  z-index: 0;
}
header nav {
  width: 94%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  position: relative;
}
h1 {
  margin: 0;
  z-index: 2;
}
h1 a {
  color: var(--header-link);
  font-weight: 900;
  font-size: 1.5rem;
  letter-spacing: 1.5px;
  padding: 0.85rem 2.4rem;
  border-radius: 18px;
  background: var(--header-link-bg);
  transition: background 0.32s, box-shadow 0.28s, color 0.23s, border-color 0.25s;
  position: relative;
  z-index: 2;
  font-family: inherit;
}
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  background: var(--header-link-bg-active);
  color: var(--header-link-hover);
  box-shadow: var(--header-link-shadow);
  border-color: var(--header-link-border);
}
h1 a.router-link-active {
  background: var(--header-link-bg-current);
  color: var(--header-link-active);
  box-shadow: var(--header-link-current-shadow);
  border-color: var(--header-link-border-active);
  font-weight: 700;
  filter: brightness(1.08);
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}
li {
  margin: 0 0.7rem;
}
header a {
  text-decoration: none;
  font-weight: 500;
  font-size: 1.12rem;
  color: var(--header-list-link);
  display: inline-block;
  padding: 0.67rem 1.38rem;
  border-radius: 13px;
  border: 1.5px solid transparent;
  backdrop-filter: blur(2px);
  background: transparent;
  transition: 
    color 0.21s,
    border-color 0.21s,
    background 0.19s,
    box-shadow 0.28s;
  position: relative;
  z-index: 2;
  font-family: inherit;
}
header a:hover,
header a:focus-visible {
  color: var(--header-link-focus);
  background: var(--header-list-link-bg-hover);
  border: 1.5px solid var(--header-link-border-hover);
  box-shadow: var(--header-list-link-shadow-hover);
  outline: none;
}
header a.router-link-active,
header a:active {
  color: var(--header-link-active);
  background: var(--header-link-bg-current);
  border: 1.7px solid var(--header-link-border-active);
  box-shadow: var(--header-link-current-shadow);
  font-weight: 700;
  filter: brightness(1.08);
}
@media (max-width: 600px) {
  .blue-silver-header {
    height: 4rem;
    border-radius: 0 0 11px 11px;
  }
  h1 a {
    font-size: 1.08rem;
    padding: 0.48rem 1.09rem;
    border-radius: 9px;
  }
  header a {
    font-size: 0.97rem;
    padding: 0.42rem 0.9rem;
    border-radius: 7px;
  }
}
</style>
