<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_create_page')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon nuxt exact to="/dashboard/pages">
                            <v-icon>mdi-file-pdf-box</v-icon>
                        </v-btn>
                    </template>
                    <span v-text="$t('t_pages')"></span>
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

                        <!-- Content AR -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.ar">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_ar')" v-model="form.content_ar"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content AZ -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.az">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_az')" v-model="form.content_az"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content CN -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.cn">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_cn')" v-model="form.content_cn"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content DE -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.de">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_de')" v-model="form.content_de"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content EN -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.en">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_en')" v-model="form.content_en"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content ES -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.es">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_es')" v-model="form.content_es"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content FR -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.fr">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_fr')" v-model="form.content_fr"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content HI -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.hi">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_hi')" v-model="form.content_hi"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content HU -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.hu">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_hu')" v-model="form.content_hu"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content JP -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.jp">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_jp')" v-model="form.content_jp"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content NL -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.nl">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_nl')" v-model="form.content_nl"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content PO -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.po">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_po')" v-model="form.content_po"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content PT -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.pt">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_pt')" v-model="form.content_pt"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content RO -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.ro">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_ro')" v-model="form.content_ro"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content RU -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.ru">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_ru')" v-model="form.content_ru"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content TH -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.th">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_th')" v-model="form.content_th"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content TR -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.tr">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_tr')" v-model="form.content_tr"></vue-editor>
                            </client-only>
                        </v-col>

                        <!-- Content UA -->
                        <v-col cols="12" class="html-editor" v-if="$store.state.settings.languages.ua">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_page_content_ua')" v-model="form.content_ua"></vue-editor>
                            </client-only>
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

                        <!-- Column -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.column"
                                :hide-details="!errors.column"
                                :placeholder="$t('t_choose_footer_column')"
                                :items="[{ text: settings.first_column, value: 'first' }, { text: settings.second_column, value: 'second' }, { text: settings.third_column, value: 'third' }]"
                                item-value="value"
                                item-text="text"
                                color="indigo accent-3" 
                                :rules="errors.column"
                                :error="errors.column ? true : false" />
                        </v-col>

                        <!-- Seo title -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.seo_title"
                                :hide-details="!errors.seo_title"
                                :placeholder="$t('t_enter_seo_title')"
                                append-icon="mdi-google"
                                color="indigo accent-3" 
                                :rules="errors.seo_title"
                                :error="errors.seo_title ? true : false" />
                        </v-col>

                        <!-- Seo description -->
                        <v-col cols="12">
                            <v-textarea dense outlined
                                v-model="form.seo_description"
                                :hide-details="!errors.seo_description"
                                :placeholder="$t('t_enter_seo_description')"
                                append-icon="mdi-google"
                                color="indigo accent-3" 
                                :rules="errors.seo_description"
                                :error="errors.seo_description ? true : false" />
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
                            <v-btn rounded color="indigo accent-3" depressed block @click="create" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 font-weight-medium" v-t="'t_create'" v-if="!loading"></span>
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
            let response = await $axios.get('dashboard/pages/options/create')

			return {
				settings: response.data
			}
		},

        data() {
            return {
                form: {
                    title_ar       : '',
                    title_az       : '',
                    title_cn       : '',
                    title_de       : '',
                    title_en       : '',
                    title_es       : '',
                    title_fr       : '',
                    title_hi       : '',
                    title_hu       : '',
                    title_jp       : '',
                    title_nl       : '',
                    title_po       : '',
                    title_pt       : '',
                    title_ro       : '',
                    title_ru       : '',
                    title_th       : '',
                    title_tr       : '',
                    title_ua       : '',
                    content_ar     : '',
                    content_az     : '',
                    content_cn     : '',
                    content_de     : '',
                    content_en     : '',
                    content_es     : '',
                    content_fr     : '',
                    content_hi     : '',
                    content_hu     : '',
                    content_jp     : '',
                    content_nl     : '',
                    content_po     : '',
                    content_pt     : '',
                    content_ro     : '',
                    content_ru     : '',
                    content_th     : '',
                    content_tr     : '',
                    content_ua     : '',
                    handler        : '',
                    column         : '',
                    seo_title      : '',
                    seo_description: '',
                    ogimage        : ''
                },
                errors: [],
                loading: false
            }
        },

        head() {
			return {
                title: this.$t('t_create_page')
			}
		},

        methods: {

            // Insert
            async create() {

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
                this.$store.state.settings.languages.ar ? data.append('content_ar', this.form.content_ar) : ''
                this.$store.state.settings.languages.az ? data.append('content_az', this.form.content_az) : ''
                this.$store.state.settings.languages.cn ? data.append('content_cn', this.form.content_cn) : ''
                this.$store.state.settings.languages.de ? data.append('content_de', this.form.content_de) : ''
                this.$store.state.settings.languages.en ? data.append('content_en', this.form.content_en) : ''
                this.$store.state.settings.languages.es ? data.append('content_es', this.form.content_es) : ''
                this.$store.state.settings.languages.fr ? data.append('content_fr', this.form.content_fr) : ''
                this.$store.state.settings.languages.hi ? data.append('content_hi', this.form.content_hi) : ''
                this.$store.state.settings.languages.hu ? data.append('content_hu', this.form.content_hu) : ''
                this.$store.state.settings.languages.jp ? data.append('content_jp', this.form.content_jp) : ''
                this.$store.state.settings.languages.nl ? data.append('content_nl', this.form.content_nl) : ''
                this.$store.state.settings.languages.po ? data.append('content_po', this.form.content_po) : ''
                this.$store.state.settings.languages.pt ? data.append('content_pt', this.form.content_pt) : ''
                this.$store.state.settings.languages.ro ? data.append('content_ro', this.form.content_ro) : ''
                this.$store.state.settings.languages.ru ? data.append('content_ru', this.form.content_ru) : ''
                this.$store.state.settings.languages.th ? data.append('content_th', this.form.content_th) : ''
                this.$store.state.settings.languages.tr ? data.append('content_tr', this.form.content_tr) : ''
                this.$store.state.settings.languages.ua ? data.append('content_ua', this.form.content_ua) : ''
                data.append('handler', this.form.handler)
                data.append('column', this.form.column)
                this.form.seo_title ? data.append('seo_title', this.form.seo_title) : ''
                this.form.seo_description ? data.append('seo_description', this.form.seo_description) : ''
                if (this.form.ogimage) {
                    data.append('ogimage', this.form.ogimage)
                }

                // Set request config
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/pages/options/create', data, config)
                            .then(response => {

                                // Success
                                this.$message(this.$t('t_toast_process_done'))

                                // Remove errors
                                this.errors = []

                                // Reset form
                                this.reset()

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

            // Set ogimage file
            ogimage(file) {
                this.form.ogimage = file
            },

            // Reset form
            reset() {
                this.form.title_ar        = ''
                this.form.title_az        = ''
                this.form.title_cn        = ''
                this.form.title_de        = ''
                this.form.title_en        = ''
                this.form.title_es        = ''
                this.form.title_fr        = ''
                this.form.title_hi        = ''
                this.form.title_hu        = ''
                this.form.title_jp        = ''
                this.form.title_nl        = ''
                this.form.title_po        = ''
                this.form.title_pt        = ''
                this.form.title_ro        = ''
                this.form.title_ru        = ''
                this.form.title_th        = ''
                this.form.title_tr        = ''
                this.form.title_ua        = ''
                this.form.content_ar      = ''
                this.form.content_az      = ''
                this.form.content_cn      = ''
                this.form.content_de      = ''
                this.form.content_en      = ''
                this.form.content_es      = ''
                this.form.content_fr      = ''
                this.form.content_hi      = ''
                this.form.content_hu      = ''
                this.form.content_jp      = ''
                this.form.content_nl      = ''
                this.form.content_po      = ''
                this.form.content_pt      = ''
                this.form.content_ro      = ''
                this.form.content_ru      = ''
                this.form.content_th      = ''
                this.form.content_tr      = ''
                this.form.content_ua      = ''
                this.form.handler         = ''
                this.form.seo_title       = ''
                this.form.seo_description = ''
                this.form.ogimage         = ''
                this.$refs.ogimage.value  = null
            }
        }
    }
</script>