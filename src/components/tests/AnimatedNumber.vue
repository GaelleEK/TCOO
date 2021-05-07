<template>
    <span>{{ tweeningValue }}</span>
</template>
<script>
import { gsap } from "gsap"
import { mapState } from 'vuex'

export default {
    props: {
        value: {
        type: Number,
        required: true
        }
  },
  data() {
      
  },
  mounted() {
      return this.tweenedNumber.fixedTo(0)
  },
  methods: {
    tweeningValue: function (startValue, endValue) {
      
          gsap.to(this.$data, {
              duration: 3,
              tweeningValue: endValue
          })
      
    }
  },
  computed: {
      ...mapState['getAdresses']
  }
}
</script>
