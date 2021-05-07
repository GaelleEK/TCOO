<template>
  <div @click="test()">
    {{ test }}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            
        }
  },
  methods: {
    test() {
      console.log(this.$store)
    }
  },
  computed: {
    // moduleErrors() {
    //   // return store.moduleErrors.state
    // }
    ...mapModuleErrorsGetters(['getErrors'])
  }
}
</script>
<style lang="scss">

</style>