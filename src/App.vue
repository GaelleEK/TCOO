<template>
  <div id="app">
    <Navigation v-scroll="handleScroll"/>

    
      <section id="content" class="container">
        <router-view />
      </section>
    

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
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollTop > el.scrollTop) {
        el.removeAttribute('is-fixed-top')
        el.setAttribute('class', 'anime')

        console.log('event: ', evt)
        console.log('el: ', el)
        // el.style.top = '0'
      } else {
        // el.style.top = '-3em'
      }
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
  },
  directives: {
        scroll: {
            mounted: (el, binding) => {
                let f = function (evt) {
                if (binding.value(evt, el)) {
                    window.removeEventListener('scroll', f)
                }
            }
            window.addEventListener('scroll', f)
            }
        }   
    }
}
</script>
<style lang="scss">
  @import "./assets/styles.scss";
  
</style>

