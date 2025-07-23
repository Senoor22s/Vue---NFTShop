<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="form-control" :class="{invalid: !name.isValid}">
      <label for="name">Name</label>
      <input
        type="text"
        id="name"
        v-model.trim="name.val"
        @blur="clearValidity('name')"
      />
      <p v-if="!name.isValid" role="alert">Name must not be empty.</p>
    </div>

    <div class="form-control" :class="{invalid: !image.isValid}">
      <label for="imageUpload">Image</label>
      <input
        type="file"
        id="imageUpload"
        name="imageUpload"
        accept="image/*"
        aria-label="Upload image"
        @change="onFileChange"
      />
      <p v-if="!image.isValid" role="alert">Image must not be empty.</p>
      <div v-if="image.preview" class="image-preview">
        <img :src="image.preview" alt="Image preview" />
      </div>
    </div>

    <div class="form-control" :class="{invalid: !price.isValid}">
      <label for="price">Price</label>
      <input
        type="number"
        id="price"
        v-model.number="price.val"
        min="0"
        @blur="clearValidity('price')"
      />
      <p v-if="!price.isValid" role="alert">Price must be greater than 0.</p>
    </div>

    <div class="form-control" :class="{invalid: !description.isValid}">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid" role="alert">Description must not be empty.</p>
    </div>

    <div class="form-control" :class="{invalid: !areas.isValid}">
      <h3>Areas</h3>
      <div>
        <input
          type="checkbox"
          id="gaming"
          value="gaming"
          v-model="areas.val"
        />
        <label for="gaming">Gaming</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="pfp"
          value="pfp"
          v-model="areas.val"
        />
        <label for="pfp">PFP</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="art"
          value="art"
          v-model="areas.val"
        />
        <label for="art">Art</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="collectibles"
          value="collectibles"
          v-model="areas.val"
        />
        <label for="collectibles">Collectibles</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="utility"
          value="utility"
          v-model="areas.val"
        />
        <label for="utility">Utility</label>
      </div>
      <p v-if="!areas.isValid" role="alert">At least one must be selected.</p>
    </div>

    <p v-if="!formIsValid" class="form-error" role="alert">
      Please fix the above errors and submit again.
    </p>

    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: { val: '', isValid: true },
      image: { file: null, preview: null, isValid: true },
      price: { val: null, isValid: true },
      description: { val: '', isValid: true },
      areas: { val: [], isValid: true },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(field) {
      this[field].isValid = true;
    },
    onFileChange(event) {
      const file = event.target.files[0];
      this.image.file = file;
      this.image.isValid = !!file;

      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          this.image.preview = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.image.preview = null;
      }
    },
    validateForm() {
      this.formIsValid = true;

      if (this.name.val.trim() === '') {
        this.name.isValid = false;
        this.formIsValid = false;
      }

      if (!this.image.file) {
        this.image.isValid = false;
        this.formIsValid = false;
      }

      if (!this.price.val || this.price.val <= 0) {
        this.price.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.val.trim() === '') {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) return;

      const formData = {
        name: this.name.val.trim(),
        image: this.image.file,
        price: this.price.val,
        description: this.description.val.trim(),
        areas: this.areas.val,
      };

      this.$emit('save', formData);

    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500&display=swap');

form {
  max-width: 450px;
  margin: 1rem auto;
  padding: 0 1rem;
  font-family: 'Orbitron', monospace, sans-serif;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
  color: var(--form-label);
  letter-spacing: 0.01em;
  font-size: 1rem;
}

.form-control > div {
  display: flex;
  align-items: center;
  margin-bottom: 0.31rem;
  flex-wrap: wrap;
}

input[type='checkbox'] + label {
  cursor: pointer;
  margin-left: 0.32rem;
  font-weight: 500;
  font-size: 1rem;
  color: var(--form-label-checkbox);
  border-radius: 1.25rem;
  padding: 0.12rem 0.36rem 0.12rem 0.44rem;
  background: var(--form-label-checkbox-bg);
  transition: background 0.16s, color 0.16s, font-weight 0.14s, text-shadow 0.19s;
  text-shadow: 0 2px 9px #e3eeff12;
}

input[type='checkbox'] {
  accent-color: var(--form-checkbox-accent);
  width: 18px;
  height: 18px;
  min-width: 18px;
  border-radius: 6px;
  border: 1.5px solid var(--form-checkbox-border);
  background: var(--form-checkbox-bg);
  box-shadow: 0 0 8px #c3ddf855;
  transition: border 0.17s, box-shadow 0.15s;
  vertical-align: middle;
}

input[type='checkbox']:focus {
  outline: var(--form-checkbox-focus) solid 1.3px;
  box-shadow: 0 1px 8px var(--form-checkbox-focus-shadow);
}

input[type='checkbox']:checked + label {
  color: var(--form-checkbox-checked);
  font-weight: 700;
  background: var(--form-checkbox-checked-bg);
  text-shadow:
    0 3px 10px #b7d4f240,
    0 2px 6px #b5cdfa23,
    0 0 2px #aed4fa0c;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid var(--form-input-border);
  font: inherit;
  border-radius: 8px;
  background: var(--form-input-bg);
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  color: var(--form-input-color);
  box-shadow: 0 1px 8px #eaf5ff18;
  transition: border 0.15s, box-shadow 0.15s, background 0.2s, color 0.18s;
}

input:focus,
textarea:focus {
  background: var(--form-input-focus-bg);
  outline: none;
  border-color: var(--form-input-focus-border);
  box-shadow: 0 2px 10px var(--form-input-focus-shadow);
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: var(--form-h3);
  text-shadow: var(--form-h3-shadow);
  letter-spacing: 0.01em;
}

.invalid label {
  color: var(--form-label-invalid) !important;
}

.invalid input,
.invalid textarea {
  border: 1.2px solid var(--form-input-invalid);
}

.image-preview img {
  max-width: 100%;
  max-height: 160px;
  border-radius: 10px;
  object-fit: contain;
  display: block;
  margin-top: 0.3rem;
}

.form-error {
  color: var(--form-label-invalid);
  font-weight: 700;
  margin-top: 1rem;
  text-align: center;
  letter-spacing: 0.02em;
  font-size: 1rem;
}

base-button {
  display: block;
  width: 100%;
  max-width: 280px;
  margin: 1.5rem auto 0;
  padding: 0.6em 1.3em;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  background: var(--primary-btn, #333);
  color: #fff;
  border: none;
  transition: background 0.25s;
}

base-button:hover {
  background: var(--primary-btn-hover, #4248a7);
}
</style>
