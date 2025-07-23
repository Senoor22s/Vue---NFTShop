<template>
  <div class="auth-container">
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" title="Authenticating..." fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card class="auth-card">
      <form @submit.prevent="submitForm" class="auth-form">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid" class="error-text">
          Please enter a valid email and password (must be at least 6 characters long)
        </p>
        <div class="button-group">
          <base-button>{{ submitButtonCaption }}</base-button>
          <base-button type="button" mode="flat" @click="switchAuthMode">
            {{ switchModeButtonCaption }}
          </base-button>
        </div>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup';
    },
    switchModeButtonCaption() {
      return this.mode === 'login' ? 'Signup instead' : 'Login instead';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('auth/login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('auth/signup', {
            email: this.email,
            password: this.password,
          });
        }
        this.$router.push('/nft-list');
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try again';
      }
      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap');

.auth-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
  min-height: 100vh;
  background: var(--form-bg);
}

.auth-card {
  width: 100%;
  max-width: 400px;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: var(--form-shadow);
  backdrop-filter: blur(8px) saturate(150%);
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-control {
  margin: 0.8rem 0;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
  color: var(--form-control-color);
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 700;
  margin-bottom: 0.4rem;
  letter-spacing: 0.2px;
  color: var(--form-label);
  text-shadow: var(--form-label-shadow);
  font-size: 1rem;
}

input,
textarea {
  font: inherit;
  padding: 0.6rem 0.8rem;
  border: 1px solid var(--form-input-border);
  border-radius: 8px;
  background-color: var(--form-input-bg);
  color: var(--form-input-color);
  outline: none;
  transition: all 0.25s;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
  font-size: 1rem;
}

input:focus,
textarea:focus {
  border-color: var(--form-input-focus-border);
  background-color: var(--form-input-focus-bg);
  box-shadow: var(--form-input-focus-shadow);
  outline: none;
}

.error-text {
  color: var(--form-error-color);
  font-weight: 700;
  margin: 0.7em 0 1em 0;
  font-family: 'Orbitron', 'Segoe UI', Tahoma, Geneva, Arial, sans-serif;
  font-size: 0.9rem;
}

.button-group {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

@media (max-width: 480px) {
  .auth-card {
    max-width: 100%;
    padding: 1rem;
  }
  label,
  input {
    font-size: 0.9rem;
  }
  .button-group {
    flex-direction: column;
    gap: 0.8rem;
  }
  .button-group base-button {
    width: 100%;
  }
}
</style>
