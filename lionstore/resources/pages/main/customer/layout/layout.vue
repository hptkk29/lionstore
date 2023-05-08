<template>
    <v-col cols="3">
        <v-card class="c-card">
            <v-card-text class="text-center mb-3">
                <v-avatar :size="90" class="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <rect x="0" y="0" width="90" height="90"/>
                            <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
                            <path d="M12,11 C10.8954305,11 10,10.1045695 10,9 C10,7.8954305 10.8954305,7 12,7 C13.1045695,7 14,7.8954305 14,9 C14,10.1045695 13.1045695,11 12,11 Z M7.00036205,16.4995035 C7.21569918,13.5165724 9.36772908,12 11.9907452,12 C14.6506758,12 16.8360465,13.4332455 16.9988413,16.5 C17.0053266,16.6221713 16.9988413,17 16.5815,17 L7.4041679,17 C7.26484009,17 6.98863236,16.6619875 7.00036205,16.4995035 Z" fill="#000000" opacity="0.3"/>
                        </g>
                    </svg>
                </v-avatar>
                <div class="ff-default fs-11 font-weight-bold" v-text="$auth.user.username"></div>
                <div class="ff-default fs-10 grey--text" v-text="$auth.user.email"></div>
            </v-card-text>
            <v-list dense class="pt-0 pb-2">

                <!-- Sidebar links -->
                <template v-for="i in items">
                    <v-list-item :key="i.to" nuxt exact exact-active-class="customer-sidebar-active-link" :to="i.to">
                        <v-list-item-avatar class="my-1">
                            <v-avatar :color="$vuetify.theme.dark ? '#3a3a3a' : '#e4e6eb'" :size="34">
                                <v-icon :size="20">{{ i.icon }}</v-icon>
                            </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="i.title" class="ff-default fs-12 font-weight-bold"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>

                <!-- Logout -->
                <v-list-item @click.stop="logout()">
                    <v-list-item-avatar class="my-1">
                        <v-avatar :color="$vuetify.theme.dark ? '#3a3a3a' : '#e4e6eb'" :size="34">
                            <v-icon :size="20">mdi-logout</v-icon>
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="ff-default fs-12 font-weight-bold" v-t="'t_logout'"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-card>
    </v-col>
</template>

<script>
    export default {

        middleware: 'auth',

        computed: {
            items() {
                return [
                    { 
                        icon: 'mdi-account', 
                        size: '22', 
                        title: this.$t('t_my_account'),
                        to: '/customer/settings'
                    },
                    { 
                        icon: 'mdi-shopping', 
                        size: '22', 
                        title: this.$t('t_my_orders'),
                        to: '/customer/orders'
                    },
                    { 
                        icon: 'mdi-star', 
                        size: '22', 
                        title: this.$t('t_reviews'),
                        to: '/customer/reviews'
                    },
                    { 
                        icon: 'mdi-google-maps', 
                        size: '22', 
                        title: this.$t('t_my_addresses'),
                        to: '/customer/addresses'
                    },
                    { 
                        icon: 'mdi-tag-heart', 
                        size: '22', 
                        title: this.$t('t_wishlist'),
                        to: '/customer/wishlist'
                    }
                ]
            }
        },

        methods: {
            async logout () {
		      	await this.$auth.logout()

                delete this.$axios.defaults.headers.common["Authorization"]
                delete this.$auth.ctx.app.$axios.defaults.headers.common["Authorization"]

		      	// Redirect to Home
                this.$router.push('/')
                  
		    }
        }

    }
</script>