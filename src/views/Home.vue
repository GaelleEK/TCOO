<template>
  <div>
    <div class="hero is-large">
      <div ref="vantaRef" class="hero-body">
        <div class="box has-text-red">
          <h1 class="title">GEOC<span><img src="../assets/logo.svg" class="icon"></span>DE</h1>
          <h2 class="subtitle">Bienvenue dans le monde des coordonnées GPS</h2>
          <div class="button">
            <router-link to="/about">En savoir plus</router-link>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import GLOBE from 'vanta/src/vanta.globe'


export default {
  name: 'Home',
  mounted() {
    
    this.vantaEffect = GLOBE({
      el: this.$refs.vantaRef,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 300.00,
        minWidth: 300.00,
        scale: 1.00,
        scaleMobile: 1.00,
        size: 0.9,
        color: 0xb31254,
        color2: 0x1f36e6,
        backgroundColor: 0xffffff
    })
  },
  beforeDestroy() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
  
}
</script>
<style>

</style>