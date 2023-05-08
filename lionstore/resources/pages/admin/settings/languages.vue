<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">

            <v-simple-table class="simple-table">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-left" v-text="$t('t_language')"></th>
                            <th class="text-center" v-text="$t('t_status')"></th>
                        </tr>
                    </thead>
                    <tbody>

                        <!-- AR -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_arabic')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_arabic"></v-switch>
                            </td>
                        </tr>

                        <!-- AZ -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_azerbaijani')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_azerbaijani"></v-switch>
                            </td>
                        </tr>

                        <!-- CN -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_chinese')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_chinese"></v-switch>
                            </td>
                        </tr>

                        <!-- DE -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_german')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_german"></v-switch>
                            </td>
                        </tr>

                        <!-- EN -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_english')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_english"></v-switch>
                            </td>
                        </tr>

                        <!-- ES -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_spanish')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_spanish"></v-switch>
                            </td>
                        </tr>

                        <!-- FR -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_french')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_french"></v-switch>
                            </td>
                        </tr>

                        <!-- HI -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_hindi')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_hindi"></v-switch>
                            </td>
                        </tr>

                        <!-- HU -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_hungarian')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_hungarian"></v-switch>
                            </td>
                        </tr>

                        <!-- JP -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_japanese')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_japanese"></v-switch>
                            </td>
                        </tr>

                        <!-- NL -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_dutch')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_dutch"></v-switch>
                            </td>
                        </tr>

                        <!-- PO -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_polish')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_polish"></v-switch>
                            </td>
                        </tr>

                        <!-- PT -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_portuguese')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_portuguese"></v-switch>
                            </td>
                        </tr>

                        <!-- RO -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_romanian')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_romanian"></v-switch>
                            </td>
                        </tr>

                        <!-- RU -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_russian')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_russian"></v-switch>
                            </td>
                        </tr>

                        <!-- TH -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_thai')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_thai"></v-switch>
                            </td>
                        </tr>

                        <!-- TR -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_turkish')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_turkish"></v-switch>
                            </td>
                        </tr>

                        <!-- UA -->
                        <tr>
                            <td class="ff-default fs-11 font-weight-medium" v-text="$t('t_ukrainian')"></td>
                            <td>
                                <v-switch dense inset class="switch-center" v-model="form.is_ukrainian"></v-switch>
                            </td>
                        </tr>

                    </tbody>
                </template>
            </v-simple-table>

            <!-- Submit -->
            <div class="pa-5 text-center">
                <v-btn rounded color="indigo accent-3" depressed @click="update" :loading="loading" :disabled="loading" :dark="!loading" class="px-12">
                    <span class="fs-11 font-weight-medium" v-t="'t_update'" v-if="!loading"></span>
                    <template v-slot:loader>
                        <v-progress-circular
                            :width="1"
                            :size="20"
                            color="#6c6c6c"
                            indeterminate />
                    </template>
                </v-btn>
            </div>

        </v-card>
    </v-container>
</template>

<script>
    export default {
        
        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios }) {
			// Send request to server
            let response = await $axios.get('/dashboard/settings/languages')

			return {
				form: {
                    is_english    : response.data.is_english,
                    is_arabic     : response.data.is_arabic,
                    is_french     : response.data.is_french,
                    is_spanish    : response.data.is_spanish,
                    is_russian    : response.data.is_russian,
                    is_chinese    : response.data.is_chinese,
                    is_hindi      : response.data.is_hindi,
                    is_portuguese : response.data.is_portuguese,
                    is_japanese   : response.data.is_japanese,
                    is_turkish    : response.data.is_turkish,
                    is_ukrainian  : response.data.is_ukrainian,
                    is_polish     : response.data.is_polish,
                    is_romanian   : response.data.is_romanian,
                    is_dutch      : response.data.is_dutch,
                    is_thai       : response.data.is_thai,
                    is_hungarian  : response.data.is_hungarian,
                    is_azerbaijani: response.data.is_azerbaijani,
                    is_german     : response.data.is_german,
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
                title: this.$t('t_languages_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    is_english    : this.form.is_english,
                    is_arabic     : this.form.is_arabic,
                    is_french     : this.form.is_french,
                    is_spanish    : this.form.is_spanish,
                    is_russian    : this.form.is_russian,
                    is_chinese    : this.form.is_chinese,
                    is_hindi      : this.form.is_hindi,
                    is_portuguese : this.form.is_portuguese,
                    is_japanese   : this.form.is_japanese,
                    is_turkish    : this.form.is_turkish,
                    is_ukrainian  : this.form.is_ukrainian,
                    is_polish     : this.form.is_polish,
                    is_romanian   : this.form.is_romanian,
                    is_dutch      : this.form.is_dutch,
                    is_thai       : this.form.is_thai,
                    is_hungarian  : this.form.is_hungarian,
                    is_azerbaijani: this.form.is_azerbaijani,
                    is_german     : this.form.is_german,
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/settings/languages', data)
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