<template>

  <section class="section is-large">
    <div class="has-background-transparent pl-5">
      <h1 class="title">GEOC<span><img src="../assets/logo.svg" class="icon"></span>DE</h1>
      <h2 class="subtitle">Bienvenue dans le monde des coordonnées GPS</h2>
      <div class="level">
        <div class="level-item my-5">
          <particle-effect-button
            :visible.sync="btnOps.visible"
            :animating.sync="btnOps.animating"
            :options="btnOps"
            cls="a-cls"
          >
            En savoir plus
          </particle-effect-button>
        </div>
        
      </div>
    </div>
  </section>

</template>

<script>
import ParticleEffectButton from "vue-particle-effect-buttons"
export default {
  name: 'Home',
  components: {
    ParticleEffectButton
  },
  data() {
    return {
      btnOps: {
        type: "triangle",
        easing: "easeOutQuart",
        size: 6,
        particlesAmountCoefficient: 6,
        oscillationCoefficient: 10,
        color: function () {
          return  "#b31254";
        },
        onComplete: () => {
          //console.log("complete");
          if (this.btnOps.visible === false) {
              this.$router.push({ path: '/about'})
            }
        },
        onBegin: () => {
          //console.log("begin");
        },
        visible: true,
        animating: true,
      },
    }
  },
  methods: {
    
  }
}
</script>
