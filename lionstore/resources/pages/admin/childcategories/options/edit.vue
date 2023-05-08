<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_edit_childcategory')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon nuxt exact to="/dashboard/childcategories">
                            <v-icon>mdi-format-list-bulleted</v-icon>
                        </v-btn>
                    </template>
                    <span v-text="$t('t_childcategories')"></span>
                </v-tooltip>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Name AR -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ar">
                            <v-text-field dense outlined
                                v-model="form.title_ar"
                                :hide-details="!errors.title_ar"
                                :placeholder="$t('t_enter_title_in_ar')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_ar"
                                :error="errors.title_ar ? true : false" />
                        </v-col>

                        <!-- Name AZ -->
                        <v-col cols="12" v-if="$store.state.settings.languages.az">
                            <v-text-field dense outlined
                                v-model="form.title_az"
                                :hide-details="!errors.title_az"
                                :placeholder="$t('t_enter_title_in_az')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_az"
                                :error="errors.title_az ? true : false" />
                        </v-col>

                        <!-- Name CN -->
                        <v-col cols="12" v-if="$store.state.settings.languages.cn">
                            <v-text-field dense outlined
                                v-model="form.title_cn"
                                :hide-details="!errors.title_cn"
                                :placeholder="$t('t_enter_title_in_cn')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_cn"
                                :error="errors.title_cn ? true : false" />
                        </v-col>

                        <!-- Name DE -->
                        <v-col cols="12" v-if="$store.state.settings.languages.de">
                            <v-text-field dense outlined
                                v-model="form.title_de"
                                :hide-details="!errors.title_de"
                                :placeholder="$t('t_enter_title_in_de')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_de"
                                :error="errors.title_de ? true : false" />
                        </v-col>

                        <!-- Name EN -->
                        <v-col cols="12" v-if="$store.state.settings.languages.en">
                            <v-text-field dense outlined
                                v-model="form.title_en"
                                :hide-details="!errors.title_en"
                                :placeholder="$t('t_enter_title_in_en')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_en"
                                :error="errors.title_en ? true : false" />
                        </v-col>

                        <!-- Name ES -->
                        <v-col cols="12" v-if="$store.state.settings.languages.es">
                            <v-text-field dense outlined
                                v-model="form.title_es"
                                :hide-details="!errors.title_es"
                                :placeholder="$t('t_enter_title_in_es')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_es"
                                :error="errors.title_es ? true : false" />
                        </v-col>

                        <!-- Name FR -->
                        <v-col cols="12" v-if="$store.state.settings.languages.fr">
                            <v-text-field dense outlined
                                v-model="form.title_fr"
                                :hide-details="!errors.title_fr"
                                :placeholder="$t('t_enter_title_in_fr')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_fr"
                                :error="errors.title_fr ? true : false" />
                        </v-col>

                        <!-- Name HI -->
                        <v-col cols="12" v-if="$store.state.settings.languages.hi">
                            <v-text-field dense outlined
                                v-model="form.title_hi"
                                :hide-details="!errors.title_hi"
                                :placeholder="$t('t_enter_title_in_hi')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_hi"
                                :error="errors.title_hi ? true : false" />
                        </v-col>

                        <!-- Name HU -->
                        <v-col cols="12" v-if="$store.state.settings.languages.hu">
                            <v-text-field dense outlined
                                v-model="form.title_hu"
                                :hide-details="!errors.title_hu"
                                :placeholder="$t('t_enter_title_in_hu')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_hu"
                                :error="errors.title_hu ? true : false" />
                        </v-col>

                        <!-- Name JP -->
                        <v-col cols="12" v-if="$store.state.settings.languages.jp">
                            <v-text-field dense outlined
                                v-model="form.title_jp"
                                :hide-details="!errors.title_jp"
                                :placeholder="$t('t_enter_title_in_jp')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_jp"
                                :error="errors.title_jp ? true : false" />
                        </v-col>

                        <!-- Name NL -->
                        <v-col cols="12" v-if="$store.state.settings.languages.nl">
                            <v-text-field dense outlined
                                v-model="form.title_nl"
                                :hide-details="!errors.title_nl"
                                :placeholder="$t('t_enter_title_in_nl')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_nl"
                                :error="errors.title_nl ? true : false" />
                        </v-col>

                        <!-- Name PO -->
                        <v-col cols="12" v-if="$store.state.settings.languages.po">
                            <v-text-field dense outlined
                                v-model="form.title_po"
                                :hide-details="!errors.title_po"
                                :placeholder="$t('t_enter_title_in_po')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_po"
                                :error="errors.title_po ? true : false" />
                        </v-col>

                        <!-- Name PT -->
                        <v-col cols="12" v-if="$store.state.settings.languages.pt">
                            <v-text-field dense outlined
                                v-model="form.title_pt"
                                :hide-details="!errors.title_pt"
                                :placeholder="$t('t_enter_title_in_pt')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_pt"
                                :error="errors.title_pt ? true : false" />
                        </v-col>

                        <!-- Name RO -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ro">
                            <v-text-field dense outlined
                                v-model="form.title_ro"
                                :hide-details="!errors.title_ro"
                                :placeholder="$t('t_enter_title_in_ro')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_ro"
                                :error="errors.title_ro ? true : false" />
                        </v-col>

                        <!-- Name RU -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ru">
                            <v-text-field dense outlined
                                v-model="form.title_ru"
                                :hide-details="!errors.title_ru"
                                :placeholder="$t('t_enter_title_in_ru')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_ru"
                                :error="errors.title_ru ? true : false" />
                        </v-col>

                        <!-- Name TH -->
                        <v-col cols="12" v-if="$store.state.settings.languages.th">
                            <v-text-field dense outlined
                                v-model="form.title_th"
                                :hide-details="!errors.title_th"
                                :placeholder="$t('t_enter_title_in_th')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_th"
                                :error="errors.title_th ? true : false" />
                        </v-col>

                        <!-- Name TR -->
                        <v-col cols="12" v-if="$store.state.settings.languages.tr">
                            <v-text-field dense outlined
                                v-model="form.title_tr"
                                :hide-details="!errors.title_tr"
                                :placeholder="$t('t_enter_title_in_tr')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_tr"
                                :error="errors.title_tr ? true : false" />
                        </v-col>

                        <!-- Name UA -->
                        <v-col cols="12" v-if="$store.state.settings.languages.ua">
                            <v-text-field dense outlined
                                v-model="form.title_ua"
                                :hide-details="!errors.title_ua"
                                :placeholder="$t('t_enter_title_in_ua')"
                                append-icon="mdi-post-outline"
                                color="indigo accent-3" 
                                :rules="errors.title_ua"
                                :error="errors.title_ua ? true : false" />
                        </v-col>

                        <!-- Categories -->
                        <v-col md="6" cols="12">
                            <v-autocomplete dense outlined
                                v-model="form.parent_id"
                                :hide-details="!errors.parent_id"
                                @change="fetchSubcategories"
                                :placeholder="$t('t_choose_parent_category')"
                                :items="categories"
                                :item-text="item => JSON.parse(item.translation.title)[$store.state.settings.default_language]"
                                item-value="id"
                                color="indigo accent-3" 
                                :rules="errors.parent_id"
                                :error="errors.parent_id ? true : false" />
                        </v-col>

                        <!-- Subcategories -->
                        <v-col md="6" cols="12">
                            <v-autocomplete dense outlined :disabled="subcategories.length === 0"
                                v-model="form.subcategory_id"
                                :hide-details="!errors.subcategory_id"
                                :placeholder="$t('t_choose_subcategory')"
                                :items="subcategories"
                                :item-text="item => JSON.parse(item.translation.title)[$store.state.settings.default_language]"
                                item-value="id"
                                color="indigo accent-3" 
                                :rules="errors.subcategory_id"
                                :error="errors.subcategory_id ? true : false" />
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

                        <!-- Featured -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_featured"
                                :hide-details="!errors.is_featured"
                                :placeholder="$t('t_products_visibility')"
                                :items="[ { text: $t('t_show_products_in_home'), value: 1 }, { text: $t('t_dont_show_products_home'), value: 0 } ]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_featured"
                                :error="errors.is_featured ? true : false" />
                        </v-col>

                        <!-- Icon -->
                        <v-col cols="12">
                            <v-file-input dense outlined
                                @change="icon"
                                ref="icon"
                                :hide-details="!errors.icon"
                                append-icon="mdi-camera"
                                color="indigo accent-3" 
                                :rules="errors.icon"
                                :error="errors.icon ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_icon')"
                                prepend-icon=""
                            ></v-file-input>
                        </v-col>

                        <!-- OGimage -->
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
                                :placeholder="$t('t_upload_ogimage')"
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
            let response = await $axios.post('dashboard/childcategories/options/edit', { id: params.id })

            // Decode title
            const title = JSON.parse(response.data.childcategory.translation.title)

			return {
				categories   : response.data.categories,
				subcategories: response.data.subcategories,
				form         : {
                    id            : response.data.childcategory.id,
                    title_ar      : title.ar,
                    title_az      : title.az,
                    title_cn      : title.cn,
                    title_de      : title.de,
                    title_en      : title.en,
                    title_es      : title.es,
                    title_fr      : title.fr,
                    title_hi      : title.hi,
                    title_hu      : title.hu,
                    title_jp      : title.jp,
                    title_nl      : title.nl,
                    title_po      : title.po,
                    title_pt      : title.pt,
                    title_ro      : title.ro,
                    title_ru      : title.ru,
                    title_th      : title.th,
                    title_tr      : title.tr,
                    title_ua      : title.ua,
                    description   : response.data.childcategory.translation.description,
                    parent_id     : response.data.childcategory.parent_id,
                    subcategory_id: response.data.childcategory.subcategory_id,
                    is_featured   : response.data.childcategory.is_featured,
                    handler       : response.data.childcategory.handler,
                    icon          : '',
                    ogimage       : ''
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
                title: this.$t('t_edit_childcategory')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = new FormData()
                this.$store.state.settings.languages.ar ? data.append('title_ar', this.form.title_ar) : ''
                this.$store.state.settings.languages.az ? data.append('title_az', this.form.title_az) : ''
                this.$store.state.settings.languages.cn ? data.append('title_cn', this.form.title_cn) : ''
                this.$store.state.settings.languages.de ? data.append('title_de', this.form.title_de) : ''
                this.$store.state.settings.languages.en ? data.append('title_en', this.form.title_en) : ''
                this.$store.state.settings.languages.es ? data.append('title_es', this.form.title_es) : ''
                this.$store.state.settings.languages.fr ? data.append('title_fr', this.form.title_fr) : ''
                this.$store.state.settings.languages.hi ? data.append('title_hi', this.form.title_hi) : ''
                this.$store.state.settings.languages.hu ? data.append('title_hu', this.form.title_hu) : ''
                this.$store.state.settings.languages.jp ? data.append('title_jp', this.form.title_jp) : ''
                this.$store.state.settings.languages.nl ? data.append('title_nl', this.form.title_nl) : ''
                this.$store.state.settings.languages.po ? data.append('title_po', this.form.title_po) : ''
                this.$store.state.settings.languages.pt ? data.append('title_pt', this.form.title_pt) : ''
                this.$store.state.settings.languages.ro ? data.append('title_ro', this.form.title_ro) : ''
                this.$store.state.settings.languages.ru ? data.append('title_ru', this.form.title_ru) : ''
                this.$store.state.settings.languages.th ? data.append('title_th', this.form.title_th) : ''
                this.$store.state.settings.languages.tr ? data.append('title_tr', this.form.title_tr) : ''
                this.$store.state.settings.languages.ua ? data.append('title_ua', this.form.title_ua) : ''
                data.append('id', this.form.id)
                data.append('description', this.form.description)
                data.append('parent_id', this.form.parent_id)
                data.append('subcategory_id', this.form.subcategory_id)
                data.append('is_featured', this.form.is_featured)
                data.append('handler', this.form.handler)
                if (this.form.icon) {
                    data.append('icon', this.form.icon)
                }
                if (this.form.ogimage) {
                    data.append('ogimage', this.form.ogimage)
                }

                // Set request config
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/childcategories/options/update', data, config)
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

            // Fetch subcatgeories
            async fetchSubcategories() {

                // Start loading spinner
                this.loading = true

                // Send request
                await this.$axios
                            .post('dashboard/fetch/subcategories', { id: this.form.parent_id })
                            .then(response => {

                                // Check if this category has subcategories or no
                                if (response.data.length === 0) {
                                    this.$message(this.$t('t_select_cat_has_no_subs'), 'checkbox-blank-off', 'info')
                                } else {
                                    // Category has subcategories
                                    this.subcategories = response.data
                                }
                            })
                            .catch(error => {
                                // Show error toast
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                            })
                            .finally(() => {
                                // Stop loading
                                this.loading = false
                            })


            },

            // Set icon file
            icon(file) {
                this.form.icon = file
            },

            // Set ogimage file
            ogimage(file) {
                this.form.ogimage = file
            }
        }
    }
</script>