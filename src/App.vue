<template>
  <div class="hero">
    <Navigation/>
    <Footer />
  </div>
</template>

<script>
import Footer from './views/Footer.vue'
import Navigation from './components/Nav.vue'

export default {
  name: "ProjectGps",
  components: { Navigation, Footer }
}
</script>

