<template>
  <div id="app">
    <Navigation/>

    
    <transition :name="slideContent" mode="out-in">
      <router-view id="content" class="container-fluid"/>
    </transition> 
    

    <div id="vanta" ref="vantaRef" class="container is-fluid"></div>
    <Footer/>
  </div>
</template>

<script>
import GLOBE from 'vanta/src/vanta.globe'
const Footer = () => import(/*webpackChunkName: "group-footer" */ './views/Footer.vue')
const Navigation = () => import(/*webpackChunkName: "group-footer" */ './views/Nav.vue')


export default {
  name: "App",
  components: { Navigation, Footer },
  data() {
   return {
      localStorage: localStorage.getItem('auth'),
      slideContent: 'slideRight'
    }
  },
  beforeRouteUpdate (to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.slideContent = toDepth < fromDepth ? 'slideLeft' : 'slideRight'
    next()
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
  },
  
}
</script>
<style lang="scss">
  @import "./assets/styles.scss";
  
</style>

