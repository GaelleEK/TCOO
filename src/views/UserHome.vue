<template>
<section class="section is-medium">
    <div></div>
    <h1 @click="test">Home {{ user || '' }}</h1>
</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            
        }
    },
    methods: {
        test() {
            console.log(this)
        }
    },
    computed: {
       
    }
}
</script>
