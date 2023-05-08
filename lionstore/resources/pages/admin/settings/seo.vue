<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-alert text color="blue" icon="mdi-information-variant" border="left" class="mb-4" :class="$vuetify.rtl ? 'text-right' : 'text-left'">
            <span class="fs-12 font-weight-medium">{{ $t('t_u_can_find_sitemap_here', { url: $serverIndex('sitemap.xml') }) }}</span>
        </v-alert>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_seo_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Enable Sitemap -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_sitemap"
                                :hide-details="!errors.is_sitemap"
                                :placeholder="$t('t_sitemap')"
                                :items="[{ text: $t('t_enable_sitemap'), value: 1 }, { text: $t('t_disable_sitemap'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_sitemap"
                                :error="errors.is_sitemap ? true : false" />
                        </v-col>

                        <!-- Facebook app id -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.facebook_app_id"
                                :hide-details="!errors.facebook_app_id"
                                :placeholder="$t('t_enter_facebook_app_id')"
                                append-icon="mdi-facebook"
                                color="indigo accent-3" 
                                :rules="errors.facebook_app_id"
                                :error="errors.facebook_app_id ? true : false" />
                        </v-col>

                        <!-- Facebook page id -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.facebook_page_id"
                                :hide-details="!errors.facebook_page_id"
                                :placeholder="$t('t_enter_facebook_page_id')"
                                append-icon="mdi-flag"
                                color="indigo accent-3" 
                                :rules="errors.facebook_page_id"
                                :error="errors.facebook_page_id ? true : false" />
                        </v-col>

                        <!-- Twitter username -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.twitter_username"
                                :hide-details="!errors.twitter_username"
                                :placeholder="$t('t_enter_twitter_username')"
                                append-icon="mdi-twitter"
                                color="indigo accent-3" 
                                :rules="errors.twitter_username"
                                :error="errors.twitter_username ? true : false" />
                        </v-col>

                        <!-- Ogimage -->
                        <v-col cols="12">
                            <v-file-input dense outlined
                                @change="ogimage"
                                ref="ogimage"
                                :hide-details="!errors.ogimage"
                                append-icon="mdi-camera"
                                color="indigo accent-3" 
                                :rules="errors.ogimage"
                                :error="errors.ogimage ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_default_ogimage')"
                                prepend-icon=""
                            ></v-file-input>
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
            let response = await $axios.get('dashboard/settings/seo')

			return {
				form      : {
                    is_sitemap      : response.data.is_sitemap,
                    facebook_app_id : response.data.facebook_app_id,
                    facebook_page_id: response.data.facebook_page_id,
                    twitter_username: response.data.twitter_username,
                    ogimage         : ''
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
                title: this.$t('t_seo_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = new FormData()

                data.append('is_sitemap', this.form.is_sitemap)
                data.append('facebook_app_id', this.form.facebook_app_id)
                data.append('facebook_page_id', this.form.facebook_page_id)
                data.append('twitter_username', this.form.twitter_username)
                this.form.ogimage ? data.append('ogimage', this.form.ogimage) : ''

                // Set request config
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/seo', data, config)
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

            },

            ogimage(file) {
                this.form.ogimage = file
            }
        }
    }
</script>