<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_edit_brand')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon nuxt exact to="/dashboard/brands">
                            <v-icon>mdi-watermark</v-icon>
                        </v-btn>
                    </template>
                    <span v-text="$t('t_brands')"></span>
                </v-tooltip>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Name AR -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ar">
                            <v-text-field dense outlined
                                v-model="form.name_ar"
                                :hide-details="!errors.name_ar"
                                :placeholder="$t('t_enter_name_in_ar')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_ar"
                                :error="errors.name_ar ? true : false" />
                        </v-col>

                        <!-- Name AZ -->
                        <v-col cols="12" v-if="$store.state.settings.languages.az">
                            <v-text-field dense outlined
                                v-model="form.name_az"
                                :hide-details="!errors.name_az"
                                :placeholder="$t('t_enter_name_in_az')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_az"
                                :error="errors.name_az ? true : false" />
                        </v-col>

                        <!-- Name CN -->
                        <v-col cols="12" v-if="$store.state.settings.languages.cn">
                            <v-text-field dense outlined
                                v-model="form.name_cn"
                                :hide-details="!errors.name_cn"
                                :placeholder="$t('t_enter_name_in_cn')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_cn"
                                :error="errors.name_cn ? true : false" />
                        </v-col>

                        <!-- Name DE -->
                        <v-col cols="12" v-if="$store.state.settings.languages.de">
                            <v-text-field dense outlined
                                v-model="form.name_de"
                                :hide-details="!errors.name_de"
                                :placeholder="$t('t_enter_name_in_de')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_de"
                                :error="errors.name_de ? true : false" />
                        </v-col>

                        <!-- Name EN -->
                        <v-col cols="12" v-if="$store.state.settings.languages.en">
                            <v-text-field dense outlined
                                v-model="form.name_en"
                                :hide-details="!errors.name_en"
                                :placeholder="$t('t_enter_name_in_en')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_en"
                                :error="errors.name_en ? true : false" />
                        </v-col>

                        <!-- Name ES -->
                        <v-col cols="12" v-if="$store.state.settings.languages.es">
                            <v-text-field dense outlined
                                v-model="form.name_es"
                                :hide-details="!errors.name_es"
                                :placeholder="$t('t_enter_name_in_es')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_es"
                                :error="errors.name_es ? true : false" />
                        </v-col>

                        <!-- Name FR -->
                        <v-col cols="12" v-if="$store.state.settings.languages.fr">
                            <v-text-field dense outlined
                                v-model="form.name_fr"
                                :hide-details="!errors.name_fr"
                                :placeholder="$t('t_enter_name_in_fr')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_fr"
                                :error="errors.name_fr ? true : false" />
                        </v-col>

                        <!-- Name HI -->
                        <v-col cols="12" v-if="$store.state.settings.languages.hi">
                            <v-text-field dense outlined
                                v-model="form.name_hi"
                                :hide-details="!errors.name_hi"
                                :placeholder="$t('t_enter_name_in_hi')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_hi"
                                :error="errors.name_hi ? true : false" />
                        </v-col>

                        <!-- Name HU -->
                        <v-col cols="12" v-if="$store.state.settings.languages.hu">
                            <v-text-field dense outlined
                                v-model="form.name_hu"
                                :hide-details="!errors.name_hu"
                                :placeholder="$t('t_enter_name_in_hu')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_hu"
                                :error="errors.name_hu ? true : false" />
                        </v-col>

                        <!-- Name JP -->
                        <v-col cols="12" v-if="$store.state.settings.languages.jp">
                            <v-text-field dense outlined
                                v-model="form.name_jp"
                                :hide-details="!errors.name_jp"
                                :placeholder="$t('t_enter_name_in_jp')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_jp"
                                :error="errors.name_jp ? true : false" />
                        </v-col>

                        <!-- Name NL -->
                        <v-col cols="12" v-if="$store.state.settings.languages.nl">
                            <v-text-field dense outlined
                                v-model="form.name_nl"
                                :hide-details="!errors.name_nl"
                                :placeholder="$t('t_enter_name_in_nl')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_nl"
                                :error="errors.name_nl ? true : false" />
                        </v-col>

                        <!-- Name PO -->
                        <v-col cols="12" v-if="$store.state.settings.languages.po">
                            <v-text-field dense outlined
                                v-model="form.name_po"
                                :hide-details="!errors.name_po"
                                :placeholder="$t('t_enter_name_in_po')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_po"
                                :error="errors.name_po ? true : false" />
                        </v-col>

                        <!-- Name PT -->
                        <v-col cols="12" v-if="$store.state.settings.languages.pt">
                            <v-text-field dense outlined
                                v-model="form.name_pt"
                                :hide-details="!errors.name_pt"
                                :placeholder="$t('t_enter_name_in_pt')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_pt"
                                :error="errors.name_pt ? true : false" />
                        </v-col>

                        <!-- Name RO -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ro">
                            <v-text-field dense outlined
                                v-model="form.name_ro"
                                :hide-details="!errors.name_ro"
                                :placeholder="$t('t_enter_name_in_ro')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_ro"
                                :error="errors.name_ro ? true : false" />
                        </v-col>

                        <!-- Name RU -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ru">
                            <v-text-field dense outlined
                                v-model="form.name_ru"
                                :hide-details="!errors.name_ru"
                                :placeholder="$t('t_enter_name_in_ru')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_ru"
                                :error="errors.name_ru ? true : false" />
                        </v-col>

                        <!-- Name TH -->
                        <v-col cols="12" v-if="$store.state.settings.languages.th">
                            <v-text-field dense outlined
                                v-model="form.name_th"
                                :hide-details="!errors.name_th"
                                :placeholder="$t('t_enter_name_in_th')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_th"
                                :error="errors.name_th ? true : false" />
                        </v-col>

                        <!-- Name TR -->
                        <v-col cols="12" v-if="$store.state.settings.languages.tr">
                            <v-text-field dense outlined
                                v-model="form.name_tr"
                                :hide-details="!errors.name_tr"
                                :placeholder="$t('t_enter_name_in_tr')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_tr"
                                :error="errors.name_tr ? true : false" />
                        </v-col>

                        <!-- Name UA -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ua">
                            <v-text-field dense outlined
                                v-model="form.name_ua"
                                :hide-details="!errors.name_ua"
                                :placeholder="$t('t_enter_name_in_ua')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.name_ua"
                                :error="errors.name_ua ? true : false" />
                        </v-col>

                        <!-- Description -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.description"
                                :hide-details="!errors.description"
                                :placeholder="$t('t_enter_description')"
                                append-icon="mdi-clipboard-text"
                                color="indigo accent-3" 
                                :rules="errors.description"
                                :error="errors.description ? true : false" />
                        </v-col>

                        <!-- Handler -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.handler"
                                :hide-details="!errors.handler"
                                :placeholder="$t('t_enter_handler')"
                                append-icon="mdi-link"
                                color="indigo accent-3" 
                                :rules="errors.handler"
                                :error="errors.handler ? true : false" />
                        </v-col>

                        <!-- Logo -->
                        <v-col cols="12">
                            <v-file-input dense outlined
                                @change="logo"
                                ref="logo"
                                :hide-details="!errors.logo"
                                append-icon="mdi-camera"
                                color="indigo accent-3" 
                                :rules="errors.logo"
                                :error="errors.logo ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_logo')"
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

        async asyncData({ app, $axios, params }) {
			// Send request to server
            let response = await $axios.post('/dashboard/brands/options/edit', { id: params.id })

            // Decode name
            const name   = JSON.parse(response.data.translation.name)

			return {
				form: {
                    id         : response.data.id,
                    description: response.data.translation.description,
                    handler    : response.data.handler,
                    name_ar    : name.ar,
                    name_az    : name.az,
                    name_cn    : name.cn,
                    name_de    : name.de,
                    name_en    : name.en,
                    name_es    : name.es,
                    name_fr    : name.fr,
                    name_hi    : name.hi,
                    name_hu    : name.hu,
                    name_jp    : name.jp,
                    name_nl    : name.nl,
                    name_po    : name.po,
                    name_pt    : name.pt,
                    name_ro    : name.ro,
                    name_ru    : name.ru,
                    name_th    : name.th,
                    name_tr    : name.tr,
                    name_ua    : name.ua,
                    logo       : ''
                },
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
                title: this.$t('t_edit_brand'),
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = new FormData()
                this.$store.state.settings.languages.ar ? data.append('name_ar', this.form.name_ar) : ''
                this.$store.state.settings.languages.az ? data.append('name_az', this.form.name_az) : ''
                this.$store.state.settings.languages.cn ? data.append('name_cn', this.form.name_cn) : ''
                this.$store.state.settings.languages.de ? data.append('name_de', this.form.name_de) : ''
                this.$store.state.settings.languages.en ? data.append('name_en', this.form.name_en) : ''
                this.$store.state.settings.languages.es ? data.append('name_es', this.form.name_es) : ''
                this.$store.state.settings.languages.fr ? data.append('name_fr', this.form.name_fr) : ''
                this.$store.state.settings.languages.hi ? data.append('name_hi', this.form.name_hi) : ''
                this.$store.state.settings.languages.hu ? data.append('name_hu', this.form.name_hu) : ''
                this.$store.state.settings.languages.jp ? data.append('name_jp', this.form.name_jp) : ''
                this.$store.state.settings.languages.nl ? data.append('name_nl', this.form.name_nl) : ''
                this.$store.state.settings.languages.po ? data.append('name_po', this.form.name_po) : ''
                this.$store.state.settings.languages.pt ? data.append('name_pt', this.form.name_pt) : ''
                this.$store.state.settings.languages.ro ? data.append('name_ro', this.form.name_ro) : ''
                this.$store.state.settings.languages.ru ? data.append('name_ru', this.form.name_ru) : ''
                this.$store.state.settings.languages.th ? data.append('name_th', this.form.name_th) : ''
                this.$store.state.settings.languages.tr ? data.append('name_tr', this.form.name_tr) : ''
                this.$store.state.settings.languages.ua ? data.append('name_ua', this.form.name_ua) : ''
                data.append('id', this.form.id)
                data.append('description', this.form.description)
                data.append('handler', this.form.handler)
                if (this.form.logo) {
                    data.append('logo', this.form.logo)
                }

                // Set request config
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/brands/options/update', data, config)
                            .then(response => {

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

            // Change logo file
            logo(file) {
                this.form.logo = file
            }
        }
    }
</script>