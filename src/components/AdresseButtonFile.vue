<template>
    
    <button class="button" @click="csvExport(csvData)">Extraire coordonnées</button>
    
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'BaseAdresseButton',
    data() {
        return {
            //
        }
    },
    methods: {
        csvExport(arrData) {
            let csvContent = 'data:text/csv;charset=utf-8,'
            csvContent += [
                Object.keys(arrData[0]).join(';'),
                ...arrData.map(item => Object.values(item).join(';'))
                ]
                .join('\n')
                .replace(/(^\[)|(\]$)/gm, '')
            const data = encodeURI(csvContent)
            const link = document.createElement('a')
            link.setAttribute('href', data)
            link.setAttribute('download', 'export.csv')
            link.click()
            //console.log(csvContent)
        }
    },
    computed: {
        ...mapGetters(['getAdresses']),
        csvData() {
            return this.getAdresses.map(adresse => ({
                ...adresse
            }))
        }
    }

}
</script>