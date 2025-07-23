<template>
  <teleport to="body">
    <div v-if="show" @click="tryClose" class="silver-dialog-backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show" class="silver-dialog">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button @click="tryClose">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ['close'],
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

.silver-dialog-backdrop {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: var(--dialog-backdrop);
  backdrop-filter: blur(3.7px);
  z-index: 10;
  font-family: 'Orbitron', monospace, sans-serif;
}

.silver-dialog {
  position: fixed;
  top: 10vh;
  left: 5%;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 100;
  border-radius: 16px;
  border: 1.6px solid var(--dialog-border);
  box-shadow: var(--dialog-shadow);
  padding: 0;
  margin: 0;
  background: var(--dialog-bg);
  backdrop-filter: blur(18px) saturate(1.26);
  transition: box-shadow .18s;
  font-family: 'Orbitron', monospace, sans-serif;
}

.silver-dialog header {
  background: var(--dialog-header-bg);
  color: var(--dialog-header-color);
  font-weight: 700;
  font-size: 1.15rem;
  width: 100%;
  padding: 1.13rem 1rem 1rem;
  letter-spacing: 0.04em;
  border-bottom: 1.2px solid var(--dialog-header-border);
  box-shadow: var(--dialog-header-shadow);
}

.silver-dialog header h2 {
  margin: 0;
  font-size: 1.13em;
}

.silver-dialog section {
  padding: 1.25rem 1.3rem 1rem 1.3rem;
  color: var(--dialog-section-color);
  font-size: 1.03rem;
  background: transparent;
}

.silver-dialog menu {
  text-align: right;
  padding: 0.9rem 1.3rem;
  background: transparent;
  border-top: 1px solid var(--dialog-menu-border);
  display: flex;
  justify-content: flex-end;
  gap: 0.4rem;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.82);
}

.dialog-enter-active {
  transition: all 0.3s cubic-bezier(.4,.8,.3,1);
}

.dialog-leave-active {
  transition: all 0.24s cubic-bezier(.4,.7,.5,1);
}

.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (min-width: 768px) {
  .silver-dialog {
    left: calc(50% - 19rem);
    width: 38rem;
    max-height: none;
    overflow-y: visible;
  }
}
</style>
