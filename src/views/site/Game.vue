<template>
    <div>
        <game-video></game-video>
        <game-media></game-media>

        <main-footer></main-footer>

    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {

        name: "index",
        layout: 'MainLayout',
        data() {
            return {
            }
        },
        computed: mapGetters({
            authenticated: 'auth/check'
        }),
        watch: {
            '$route' (to, from) {
                // react to route changes...
            }
        }

    }
</script>

<style scoped>

</style>