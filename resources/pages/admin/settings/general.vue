<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_general_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Site title -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.site_title"
                                :hide-details="!errors.site_title"
                                :placeholder="$t('t_enter_site_title')"
                                append-icon="mdi-format-title"
                                color="indigo accent-3" 
                                :rules="errors.site_title"
                                :error="errors.site_title ? true : false" />
                        </v-col>

                        <!-- Title separator -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.title_separator"
                                :hide-details="!errors.title_separator"
                                :placeholder="$t('t_enter_title_separator')"
                                append-icon="mdi-drag-vertical-variant"
                                color="indigo accent-3" 
                                :rules="errors.title_separator"
                                :error="errors.title_separator ? true : false" />
                        </v-col>

                        <!-- Site tagline -->
                        <v-col cols="12" md="4">
                            <v-text-field dense outlined
                                v-model="form.site_tagline"
                                :hide-details="!errors.site_tagline"
                                :placeholder="$t('t_enter_site_tagline')"
                                append-icon="mdi-format-size"
                                color="indigo accent-3" 
                                :rules="errors.site_tagline"
                                :error="errors.site_tagline ? true : false" />
                        </v-col>

                        <!-- Site description -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.site_description"
                                :hide-details="!errors.site_description"
                                :placeholder="$t('t_enter_site_description')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.site_description"
                                :error="errors.site_description ? true : false" />
                        </v-col>

                        <!-- Global site -->
                        <v-col cols="12" md="6">
                            <v-select dense outlined
                                v-model="form.is_global"
                                :hide-details="!errors.is_global"
                                :placeholder="$t('t_enter_is_global')"
                                :items="[{ text: $t('t_global_website'), value: 1 }, { text: $t('t_local_website'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_global"
                                :error="errors.is_global ? true : false" />
                        </v-col>

                        <!-- Default country -->
                        <v-col cols="12" md="6">
                            <v-autocomplete dense outlined
                                v-model="form.default_country"
                                :hide-details="!errors.default_country"
                                :placeholder="$t('t_enter_default_country')"
                                :items="countries"
                                item-text="name"
                                item-value="id"
                                color="indigo accent-3" 
                                :rules="errors.default_country"
                                :error="errors.default_country ? true : false" />
                        </v-col>

                        <!-- Default language -->
                        <v-col cols="12" md="6">
                            <v-autocomplete dense outlined
                                v-model="form.default_language"
                                :hide-details="!errors.default_language"
                                :placeholder="$t('t_enter_default_language')"
                                :items="languages"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.default_language"
                                :error="errors.default_language ? true : false" />
                        </v-col>

                        <!-- Site direction -->
                        <v-col cols="12" md="6">
                            <v-select dense outlined
                                v-model="form.is_rtl"
                                :hide-details="!errors.is_rtl"
                                :placeholder="$t('t_choose_site_direction')"
                                :items="[{ text: $t('t_rtl'), value: 1 }, { text: $t('t_ltr'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_rtl"
                                :error="errors.is_rtl ? true : false" />
                        </v-col>

                        <!-- Desktop logo -->
                        <v-col cols="12" md="4">
                            <v-file-input dense outlined
                                @change="desktop_logo"
                                ref="desktop_logo"
                                :hide-details="!errors.desktop_logo"
                                append-icon="mdi-monitor"
                                color="indigo accent-3" 
                                :rules="errors.desktop_logo"
                                :error="errors.desktop_logo ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_desktop_logo')"
                                prepend-icon=""
                            ></v-file-input>
                        </v-col>

                        <!-- Mobile logo -->
                        <v-col cols="12" md="4">
                            <v-file-input dense outlined
                                @change="mobile_logo"
                                ref="mobile_logo"
                                :hide-details="!errors.mobile_logo"
                                append-icon="mdi-cellphone"
                                color="indigo accent-3" 
                                :rules="errors.mobile_logo"
                                :error="errors.mobile_logo ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_mobile_logo')"
                                prepend-icon=""
                            ></v-file-input>
                        </v-col>

                        <!-- Favicon -->
                        <v-col cols="12" md="4">
                            <v-file-input dense outlined
                                @change="favicon"
                                ref="favicon"
                                :hide-details="!errors.favicon"
                                append-icon="mdi-camera"
                                color="indigo accent-3" 
                                :rules="errors.favicon"
                                :error="errors.favicon ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_favicon')"
                                prepend-icon=""
                            ></v-file-input>
                        </v-col>

                        <!-- Site email -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.site_email"
                                :hide-details="!errors.site_email"
                                :placeholder="$t('t_enter_site_email')"
                                append-icon="mdi-email"
                                color="indigo accent-3" 
                                :rules="errors.site_email"
                                :error="errors.site_email ? true : false" />
                        </v-col>

                        <!-- Site phone -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.site_phone"
                                :hide-details="!errors.site_phone"
                                :placeholder="$t('t_enter_site_phone')"
                                append-icon="mdi-phone"
                                color="indigo accent-3" 
                                :rules="errors.site_phone"
                                :error="errors.site_phone ? true : false" />
                        </v-col>

                        <!-- Site address -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.site_address"
                                :hide-details="!errors.site_address"
                                :placeholder="$t('t_enter_site_address')"
                                append-icon="mdi-map-marker"
                                color="indigo accent-3" 
                                :rules="errors.site_address"
                                :error="errors.site_address ? true : false" />
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
            let response = await $axios.get('/dashboard/settings/general')

			return {
				countries : response.data.countries,
				form      : {
                    site_title      : response.data.general.site_title,
                    site_tagline    : response.data.general.site_tagline,
                    site_description: response.data.general.site_description,
                    title_separator : response.data.general.title_separator,
                    is_global       : response.data.general.is_global,
                    default_country : response.data.general.default_country,
                    default_language: response.data.general.default_language,
                    site_email      : response.data.general.site_email,
                    site_phone      : response.data.general.site_phone,
                    site_address    : response.data.general.site_address,
                    is_rtl          : response.data.general.is_rtl,
                    mobile_logo     : '',
                    desktop_logo    : '',
                    favicon         : ''
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
                title: this.$t('t_general_settings')
			}
		},

        computed: {

            // Available languages
            languages() {

                // Set empty array
                const data  = []

                // Get default languages
                const langs = this.$store.state.settings.languages

                langs.ar ? data.push({ text: 'العربية', value: 'ar' }) : ''
                langs.az ? data.push({ text: 'Azərbaycan', value: 'az' }) : ''
                langs.cn ? data.push({ text: '汉语/漢語', value: 'cn' }) : ''
                langs.de ? data.push({ text: 'Deutsch', value: 'de' }) : ''
                langs.en ? data.push({ text: 'English', value: 'en' }) : ''
                langs.es ? data.push({ text: 'Español', value: 'es' }) : ''
                langs.fr ? data.push({ text: 'Français', value: 'fr' }) : ''
                langs.hi ? data.push({ text: 'Hindi', value: 'hi' }) : ''
                langs.hu ? data.push({ text: 'Magyar', value: 'hu' }) : ''
                langs.jp ? data.push({ text: '日本語', value: 'jp' }) : ''
                langs.nl ? data.push({ text: 'Dutch', value: 'nl' }) : ''
                langs.po ? data.push({ text: 'Polski', value: 'po' }) : ''
                langs.pt ? data.push({ text: 'Português', value: 'pt' }) : ''
                langs.ro ? data.push({ text: 'Română', value: 'ro' }) : ''
                langs.ru ? data.push({ text: 'Pусский', value: 'ru' }) : ''
                langs.th ? data.push({ text: 'ภาษาไทย', value: 'th' }) : ''
                langs.tr ? data.push({ text: 'Türkçe', value: 'tr' }) : ''
                langs.ua ? data.push({ text: 'Український', value: 'ua' }) : ''

                return data
            }

        },

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = new FormData()

                data.append('site_title', this.form.site_title)
                data.append('site_tagline', this.form.site_tagline)
                this.form.site_description ? data.append('site_description', this.form.site_description) : ''
                data.append('title_separator', this.form.title_separator)
                data.append('is_global', this.form.is_global)
                data.append('default_country', this.form.default_country)
                data.append('default_language', this.form.default_language)
                this.form.site_email ? data.append('site_email', this.form.site_email) : ''
                this.form.site_phone ? data.append('site_phone', this.form.site_phone) : ''
                this.form.site_address ? data.append('site_address', this.form.site_address) : ''
                data.append('is_rtl', this.form.is_rtl)
                this.form.mobile_logo ? data.append('mobile_logo', this.form.mobile_logo) : ''   
                this.form.desktop_logo ? data.append('desktop_logo', this.form.desktop_logo) : ''  
                this.form.favicon ? data.append('favicon', this.form.favicon) : ''

                // Set request config
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/settings/general', data, config)
                            .then(async response => {

                                // Success
                                this.$message(this.$t('t_toast_process_done'))

                                // Remove errors
                                this.errors = []

                                // Set RTL if enabled
                                if (this.form.is_rtl) {
                                    this.$store.commit('settings/SET_RTL', true)
                                } else {
                                    this.$store.commit('settings/SET_RTL', false)
                                }

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

            // Change mobile logo file
            mobile_logo(file) {
                this.form.mobile_logo = file
            },

            // Change desktop logo file
            desktop_logo(file) {
                this.form.desktop_logo = file
            },

            // Change favicon file
            favicon(file) {
                this.form.favicon = file
            }
        }
    }
</script>