<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_analytics_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Facebook pixel id -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.facebook_pixel_id"
                                :hide-details="!errors.facebook_pixel_id"
                                :placeholder="$t('t_enter_facebook_pixel_id')"
                                append-icon="mdi-facebook"
                                color="indigo accent-3" 
                                :rules="errors.facebook_pixel_id"
                                :error="errors.facebook_pixel_id ? true : false" />
                        </v-col>

                        <!-- Google Tag Manager -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.google_gtm_id"
                                :hide-details="!errors.google_gtm_id"
                                :placeholder="$t('t_enter_google_gtm_id')"
                                append-icon="mdi-google"
                                color="indigo accent-3" 
                                :rules="errors.google_gtm_id"
                                :error="errors.google_gtm_id ? true : false" />
                        </v-col>

                        <!-- Snapchat Pixel Id -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.snapchat_pixel_id"
                                :hide-details="!errors.snapchat_pixel_id"
                                :placeholder="$t('t_enter_snapchat_pixel_id')"
                                append-icon="mdi-snapchat"
                                color="indigo accent-3" 
                                :rules="errors.snapchat_pixel_id"
                                :error="errors.snapchat_pixel_id ? true : false" />
                        </v-col>

                        <!-- Tiktok Pixel Id -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.tiktok_pixel_id"
                                :hide-details="!errors.tiktok_pixel_id"
                                :placeholder="$t('t_enter_tiktok_pixel_id')"
                                append-icon="mdi-alpha-t-box"
                                color="indigo accent-3" 
                                :rules="errors.tiktok_pixel_id"
                                :error="errors.tiktok_pixel_id ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="update" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 font-weight-medium" v-t="'t_update'" v-if="!loading"></span>
                                <template v-slot:loader>
                                    <v-progress-circular
                                        :width="1"
                                        :size="20"
                                        color="#6c6c6c"
                                        indeterminate />
                                </template>
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios }) {
			// Send request to server
            let response = await $axios.get('dashboard/settings/analytics')

			return {
				form      : {
                    google_gtm_id    : response.data.google_gtm_id,
                    facebook_pixel_id: response.data.facebook_pixel_id,
                    snapchat_pixel_id: response.data.snapchat_pixel_id,
                    tiktok_pixel_id  : response.data.tiktok_pixel_id,
                }
			}
		},

        data() {
            return {
                errors: [],
                loading: false
            }
        },

        head() {
			return {
                title: this.$t('t_analytics_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    google_gtm_id    : this.form.google_gtm_id,
                    facebook_pixel_id: this.form.facebook_pixel_id,
                    snapchat_pixel_id: this.form.snapchat_pixel_id,
                    tiktok_pixel_id  : this.form.tiktok_pixel_id
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/analytics', data)
                            .then(async response => {

                                // Success
                                this.$message(this.$t('t_toast_process_done'))

                                // Remove errors
                                this.errors = []

                                // Scroll to top
                                this.$scrollTo('#scroll-top-admin', 300, {})

                            })
                            .catch(error => {
                                
                                // Form errors
                                if (error.response.status === 422) {
                                    this.errors  = this.$errors(error.response.data.errors)
                                }

                                // Show error toast
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                            })
                            .finally(() => {
                                // Stop loading
                                this.loading = false
                            })

            }
        }
    }
</script>