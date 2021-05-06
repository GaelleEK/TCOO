<template>
<transition name="slideRight">
  <section class="section mx-5">
    <div class="has-background-transparent">
      <h1 class="title">GEOC<span><img src="../assets/logo.svg" class="icon"></span>DE</h1>
      <h2 class="subtitle">Bienvenue dans le monde des coordonnées GPS</h2>
      <div class="level">
        <div class="level-item my-5">
          <router-link to="/about" class="buttontest">En savoir plus</router-link>
        </div>
      </div>
    </div>
  </section>
</transition>
</template>

<script>

export default {
  name: 'Home',
 
}
</script>
