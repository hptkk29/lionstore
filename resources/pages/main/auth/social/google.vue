<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading" :text="$t('t_authenticating')" />

    </v-container>
</template>

<script>
export default {
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    auth: 'guest',

    middleware: "guest",

    data() {
        return {
            loading: true
        }
    },

    methods: {

        // Login
        async login(code) {

            try {
               
                await this
                        .$axios
                        .post(`auth/google/callback`, { code: code })
                        .then(response => {

                            if (response.data && response.data.token) {
                                
                                // Get token
                                const token = response.data.token

                                // Set token and refresh token
                                this.$auth.setUserToken(token)
                                this.$axios.setHeader('Authorization', 'Bearer ' + token)
                                this.$auth.ctx.app.$axios.setHeader('Authorization', 'Bearer ' + token)

                                // Run analytics tools
                            if (process.client) {
                                
                                // Snapchat Pixel
                                if (this.$store.state.settings.analytics.snapchat_pixel_id) {
                                    window.snaptr('track', 'SIGN_UP',  { 
                                        'sign_up_method': 'Google'
                                    });
                                }

                                // Facebook Pixel
                                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                    window._fbq('track', 'CompleteRegistration', {
                                        'content_name': 'Google'
                                    })
                                }

                            }

                                // Go home
                                this.$router.push('/')

                            } else {

                                this.$message(this.$t('t_social_media_login_failed'), 'alert-rhombus', 'error')
                                this.$router.push('/auth/login')

                            }
                            

                        })
                        .catch(error => {

                            // Something went wrong
                            this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                            // Return to login page
                            this.$router.push('/auth/login')

                        })

            } catch (error) {
                console.log(error)
                this.$router.push('/auth/login')
            }

        }

    },

    async mounted() {

        // Get queries from url
        const code = this.$route.query.code

        // Authenticate customer
        if (code) {
            
            // Authenticate customer
            await this.login(code)

        } else {

            // No access token
            this.$router.push('/auth/login')

        }
        
    }
}
</script>