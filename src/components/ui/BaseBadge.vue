<template>
  <span class="blue-silver-badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase();
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap');

.blue-silver-badge {
  padding: 0.25rem 0.8rem;        
  border-radius: 16px;          
  font-size: 0.6rem;            
  font-weight: 600;          
  letter-spacing: 0.03em;
  margin-right: 0.4rem;
  display: inline-block;

  background: #183963 !important;
  color: #fff !important;

  font-family: 'Orbitron', monospace, sans-serif;
  border: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
  transition: none;
}


.gaming,
.pfp,
.art,
.collectibles,
.utility {
  background: #183963 !important;
  color: #fff !important;
  border: none !important;
  text-shadow: none !important;
  box-shadow: none !important;
}
</style>
