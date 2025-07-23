<template>
  <div class="silver-app-bg">
    <the-header></the-header>
    <router-view v-slot="slotProps">
      <transition name="route" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
    <button class="theme-toggle" @click="toggleTheme">
      <img v-if="isDarkMode" src="./assets/logo-light.svg" class="theme-toggle__img" alt="light-theme"/>
      <img v-else src="./assets/logo-dark.svg" class="theme-toggle__img" alt="dark-theme"/>
    </button>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: { TheHeader },
  data() {
    return {
      isDarkMode: false,
    };
  },
  created() {
    this.$store.dispatch('auth/autoLogin');
    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      const theme = this.isDarkMode ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

* {
  box-sizing: border-box;
}

html, body, #app {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  background: var(--bg);
  color: var(--text);
}

.silver-app-bg {
  min-height: 100vh;
  min-width: 100vw;
  background: var(--silver-bg-gradient);
  display: flex;
  flex-direction: column;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--button-bg);
  color: var(--button-text);
  border: 2px solid black;
  border-radius: 25%;
  padding: 0.45rem 1.1rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 2px 8px rgba(0,0,0,0.09);
  transition: border 0.22s, background 0.22s, color 0.15s;
}

.theme-toggle:hover {
  background-color: var(--button-bg-hover, #d2d2d2);
  border-color: var(--button-text);
}

</style>
