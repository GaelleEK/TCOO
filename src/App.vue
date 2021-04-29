<template>
  <div>

    <Navigation/>

    <router-view :key="localStorage" class="has-text-centered"/>

    <Footer />

  </div>
</template>

<script>
import Footer from './views/Footer.vue'
import Navigation from './components/Nav.vue'

export default {
  name: "ProjectGps",
  components: { Navigation, Footer },
  data() {
    return {
      localStorage: localStorage.getItem('auth')
    }
  }
}
</script>
<style lang="scss">

  @import "./assets/styles.scss";

</style>

