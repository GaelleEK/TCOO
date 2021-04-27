<template>
    <div class="column">
        <button></button>
    </div>
</template>

<script>
export default {
    name: 'BaseAdresseButton',
    props: {
        adresse: {
           type: Object,
           required: true
        }

    }
}
</script>