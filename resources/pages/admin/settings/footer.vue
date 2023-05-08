<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_footer_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Copyrights -->
                        <v-col cols="12">
                            <v-textarea dense outlined :height="140"
                                v-model="form.copyrights"
                                :hide-details="!errors.copyrights"
                                :placeholder="$t('t_enter_copyrights')"
                                append-icon="mdi-copyright"
                                color="indigo accent-3" 
                                :rules="errors.copyrights"
                                :error="errors.copyrights ? true : false" />
                        </v-col>

                        <!-- First column name -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.first_column"
                                :hide-details="!errors.first_column"
                                :placeholder="$t('t_enter_first_column')"
                                append-icon="mdi-format-columns"
                                color="indigo accent-3" 
                                :rules="errors.first_column"
                                :error="errors.first_column ? true : false" />
                        </v-col>

                        <!-- Second column name -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.second_column"
                                :hide-details="!errors.second_column"
                                :placeholder="$t('t_enter_second_column')"
                                append-icon="mdi-format-columns"
                                color="indigo accent-3" 
                                :rules="errors.second_column"
                                :error="errors.second_column ? true : false" />
                        </v-col>

                        <!-- Third column name -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.third_column"
                                :hide-details="!errors.third_column"
                                :placeholder="$t('t_enter_third_column')"
                                append-icon="mdi-format-columns"
                                color="indigo accent-3" 
                                :rules="errors.third_column"
                                :error="errors.third_column ? true : false" />
                        </v-col>

                        <!-- Facebook -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.facebook_url"
                                :hide-details="!errors.facebook_url"
                                :placeholder="$t('t_enter_facebook_url')"
                                append-icon="mdi-facebook"
                                color="indigo accent-3" 
                                :rules="errors.facebook_url"
                                :error="errors.facebook_url ? true : false" />
                        </v-col>

                        <!-- Twitter -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.twitter_url"
                                :hide-details="!errors.twitter_url"
                                :placeholder="$t('t_enter_twitter_url')"
                                append-icon="mdi-twitter"
                                color="indigo accent-3" 
                                :rules="errors.twitter_url"
                                :error="errors.twitter_url ? true : false" />
                        </v-col>

                        <!-- Instagram -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.instagram_url"
                                :hide-details="!errors.instagram_url"
                                :placeholder="$t('t_enter_instagram_url')"
                                append-icon="mdi-instagram"
                                color="indigo accent-3" 
                                :rules="errors.instagram_url"
                                :error="errors.instagram_url ? true : false" />
                        </v-col>

                        <!-- Whatsapp -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.whatsapp_url"
                                :hide-details="!errors.whatsapp_url"
                                :placeholder="$t('t_enter_whatsapp_url')"
                                append-icon="mdi-whatsapp"
                                color="indigo accent-3" 
                                :rules="errors.whatsapp_url"
                                :error="errors.whatsapp_url ? true : false" />
                        </v-col>

                        <!-- Telegram -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.telegram_url"
                                :hide-details="!errors.telegram_url"
                                :placeholder="$t('t_enter_telegram_url')"
                                append-icon="mdi-telegram"
                                color="indigo accent-3" 
                                :rules="errors.telegram_url"
                                :error="errors.telegram_url ? true : false" />
                        </v-col>

                        <!-- Pinterest -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.pinterest_url"
                                :hide-details="!errors.pinterest_url"
                                :placeholder="$t('t_enter_pinterest_url')"
                                append-icon="mdi-pinterest"
                                color="indigo accent-3" 
                                :rules="errors.pinterest_url"
                                :error="errors.pinterest_url ? true : false" />
                        </v-col>

                        <!-- Vk -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.vk_url"
                                :hide-details="!errors.vk_url"
                                :placeholder="$t('t_enter_vk_url')"
                                append-icon="mdi-vk"
                                color="indigo accent-3" 
                                :rules="errors.vk_url"
                                :error="errors.vk_url ? true : false" />
                        </v-col>

                        <!-- Youtube -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.youtube_url"
                                :hide-details="!errors.youtube_url"
                                :placeholder="$t('t_enter_youtube_url')"
                                append-icon="mdi-youtube"
                                color="indigo accent-3" 
                                :rules="errors.youtube_url"
                                :error="errors.youtube_url ? true : false" />
                        </v-col>

                        <!-- Footer payment methods images -->
                        <v-col cols="12">
                            <v-file-input dense outlined
                                @change="image"
                                ref="image"
                                :hide-details="!errors.footer_image"
                                append-icon="mdi-image"
                                color="indigo accent-3" 
                                :rules="errors.footer_image"
                                :error="errors.footer_image ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_footer_image')"
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
            let response = await $axios.get('/dashboard/settings/footer')

			return {
				form      : {
                    copyrights   : response.data.copyrights,
                    first_column : response.data.first_column,
                    second_column: response.data.second_column,
                    third_column : response.data.third_column,
                    facebook_url : response.data.facebook_url,
                    twitter_url  : response.data.twitter_url,
                    instagram_url: response.data.instagram_url,
                    whatsapp_url : response.data.whatsapp_url,
                    telegram_url : response.data.telegram_url,
                    pinterest_url: response.data.pinterest_url,
                    vk_url       : response.data.vk_url,
                    youtube_url  : response.data.youtube_url,
                    footer_image : ''
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
                title: this.$t('t_footer_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = new FormData()

                this.form.copyrights ? data.append('copyrights', this.form.copyrights) : ''
                this.form.first_column ? data.append('first_column', this.form.first_column) : ''
                this.form.second_column ? data.append('second_column', this.form.second_column) : ''
                this.form.third_column ? data.append('third_column', this.form.third_column) : ''
                this.form.facebook_url ? data.append('facebook_url', this.form.facebook_url) : ''
                this.form.twitter_url ? data.append('twitter_url', this.form.twitter_url) : ''
                this.form.instagram_url ? data.append('instagram_url', this.form.instagram_url) : ''
                this.form.whatsapp_url ? data.append('whatsapp_url', this.form.whatsapp_url) : ''
                this.form.telegram_url ? data.append('telegram_url', this.form.telegram_url) : ''
                this.form.pinterest_url ? data.append('pinterest_url', this.form.pinterest_url) : ''
                this.form.vk_url ? data.append('vk_url', this.form.vk_url) : ''
                this.form.youtube_url ? data.append('youtube_url', this.form.youtube_url) : ''
                this.form.footer_image ? data.append('footer_image', this.form.footer_image) : ''

                // Set request config
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/settings/footer', data, config)
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

            // Change footer file
            image(file) {
                this.form.footer_image = file
            }
        }
    }
</script>