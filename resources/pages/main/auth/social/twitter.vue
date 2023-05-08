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
        async login(oauth_token, oauth_verifier) {

            await this
                    .$axios
                    .post(`auth/twitter/callback`, { oauth_token: oauth_token, oauth_verifier: oauth_verifier })
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
                                        'sign_up_method': 'Twitter'
                                    });
                                }

                                // Facebook Pixel
                                if (this.$store.state.settings.analytics.facebook_pixel_id) {
                                    window._fbq('track', 'CompleteRegistration', {
                                        'content_name': 'Twitter'
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

        }

    },

    async mounted() {

        // Get queries from url
        const oauth_token    = this.$route.query.oauth_token
        const oauth_verifier = this.$route.query.oauth_verifier

        // Authenticate customer
        if (oauth_token && oauth_verifier) {
            
            // Authenticate customer
            await this.login(oauth_token, oauth_verifier)

        } else {

            // No access token
            this.$router.push('/auth/login')

        }
        
    }
}
</script>