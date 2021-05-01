<template>
  <div id="app">
    <Navigation/>

    
    <div class="hero-body">
      <router-view />
    </div>

    <div id="vanta" ref="vantaRef" class="container is-fluid"></div>
    <Footer/>
  </div>
</template>

<script>
import GLOBE from 'vanta/src/vanta.globe'
const Footer = () => import(/*webpackChunkName: "group-footer" */ './views/Footer.vue')
const Navigation = () => import(/*webpackChunkName: "group-footer" */ './views/Nav.vue')

const screenWidth = window.screen.width
const screenHeight = window.screen.height


export default {
  name: "App",
  components: { Navigation, Footer },
  data() {
   return {
      localStorage: localStorage.getItem('auth')
    }
  },
  mounted() {
    this.vantaEffect = GLOBE({
    el: '#vanta',
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 300,
        minWidth: 300,
        scale: 1.00,
        scaleMobile: 1.00,
        size: 0.9,
        color: 0xb31254,
        color2: 0x1f36e6,
        backgroundColor: 0x848484,
        showDots: false
    })
  },
  beforeDestroy() {
      if (this.vantaEffect) {
      this.vantaEffect.destroy()
      }
  }
}
</script>
<style lang="scss">

// .hero-body {
//   z-index: 3;
// }


  div#vanta {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    height: 100%;
  }
  @import "./assets/styles.scss";

</style>

