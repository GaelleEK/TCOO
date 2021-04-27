<template>
  <div class="container">
    <Navigation/>
    <Footer />
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Navigation from './components/Nav.vue'

export default {
  name: "ProjectGps",
  components: { Navigation, Footer }
}
</script>

