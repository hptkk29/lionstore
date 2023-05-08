<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_edit_slider')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon nuxt exact to="/dashboard/sliders">
                            <v-icon>mdi-folder-multiple-image</v-icon>
                        </v-btn>
                    </template>
                    <span v-text="$t('t_sliders')"></span>
                </v-tooltip>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>
                        
                        <!-- Link type -->
                        <v-col cols="12" md="6">
                            <v-select dense outlined
                                v-model="form.link_type"
                                :hide-details="!errors.link_type"
                                :placeholder="$t('t_choose_slider_type')"
                                :items="[{ text: $t('t_inside_website'), value: 'inside' }, { text: $t('t_outside_website'), value: 'outside' }]"
                                item-value="value"
                                item-text="text"
                                color="indigo accent-3" 
                                :rules="errors.link_type"
                                :error="errors.link_type ? true : false" />
                        </v-col>

                        <!-- Slider link -->
                        <v-col cols="12" md="6">
                            <v-text-field dense outlined persistent-hint
                                v-model="form.link_value"
                                :placeholder="$t('t_enter_slider_link')"
                                color="indigo accent-3"
                                :hint="form.link_type === 'inside' ? $t('t_slider_link_inside_hint', { domain: $clientIndex() + '/' }) : $t('t_slider_link_outside_hint')"
                                :rules="errors.link_value"
                                :error="errors.link_value ? true : false" />
                        </v-col>

                        <!-- Desktop slider image -->
                        <v-col cols="12">
                            <v-file-input dense outlined
                                @change="desktop_slider"
                                ref="desktop_slider"
                                :hide-details="!errors.desktop_slider"
                                append-icon="mdi-monitor"
                                color="indigo accent-3" 
                                :rules="errors.desktop_slider"
                                :error="errors.desktop_slider ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_desktop_slider')"
                                prepend-icon=""
                            ></v-file-input>
                        </v-col>

                        <!-- Mobile slider image -->
                        <v-col cols="12">
                            <v-file-input dense outlined
                                @change="mobile_slider"
                                ref="mobile_slider"
                                :hide-details="!errors.mobile_slider"
                                append-icon="mdi-cellphone"
                                color="indigo accent-3" 
                                :rules="errors.mobile_slider"
                                :error="errors.mobile_slider ? true : false"
                                accept="image/png, image/jpeg, image/bmp, image/svg+xml"
                                :placeholder="$t('t_upload_mobile_slider')"
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
            let response = await $axios.post('dashboard/sliders/options/edit', { id: params.id })

			return {
                form: {
                    id            : response.data.id,
                    link_type     : response.data.link_type,
                    link_value    : response.data.link_value,
                    desktop_slider: '',
                    mobile_slider : ''
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
                title: this.$t('t_edit_slider')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = new FormData()
                data.append('id', this.form.id)
                data.append('link_type', this.form.link_type)
                data.append('link_value', this.form.link_value)
                if (this.form.desktop_slider) {
                    data.append('desktop_slider', this.form.desktop_slider)
                }
                if (this.form.mobile_slider) {
                    data.append('mobile_slider', this.form.mobile_slider)
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/sliders/options/update', data)
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

            // Set desktop slider
            desktop_slider(file) {
                this.form.desktop_slider = file
            },

            // Set mobile slider
            mobile_slider(file) {
                this.form.mobile_slider = file
            }

        }
        
    }
</script>