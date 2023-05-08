<template>
</template>

<script>
export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    auth: 'guest',

    middleware: "guest",

    async asyncData({ app, $axios, redirect, query }) {
        await $axios
            .post('auth/verify', { token: query.token })
            .then(response => {
                // Success
                redirect('/auth/login')
            })
            .catch(error =>{
                // Error
                redirect('/?error=VERIFY_TOKEN_EXPIRED')
            })
    }

}
</script>