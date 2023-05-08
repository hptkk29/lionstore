<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_offline_payments')"></v-toolbar-title>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Title -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.title"
                                :hide-details="!errors.title"
                                :placeholder="$t('t_enter_title')"
                                append-icon="mdi-alphabetical-variant"
                                color="indigo accent-3" 
                                :rules="errors.title"
                                :error="errors.title ? true : false" />
                        </v-col>

                        <!-- Description -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.description"
                                :hide-details="!errors.description"
                                :placeholder="$t('t_enter_description')"
                                append-icon="mdi-folder-text-outline"
                                color="indigo accent-3" 
                                :rules="errors.description"
                                :error="errors.description ? true : false" />
                        </v-col>

                        <!-- Details -->
                        <v-col cols="12">
                            <v-textarea dense outlined no-resize height="160px"
                                v-model="form.details"
                                :hide-details="!errors.details"
                                :placeholder="$t('t_enter_details')"
                                append-icon="mdi-format-align-center"
                                color="indigo accent-3" 
                                :rules="errors.details"
                                :error="errors.details ? true : false" />
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
            let response = await $axios.get('dashboard/services/offline')

			return {
				form: {
                    title      : response.data.title,
                    description: response.data.description,
                    details    : response.data.details,
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
                title: this.$t('t_offline_payments')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = new FormData()
                data.append('title', this.form.title)
                data.append('description', this.form.description)
                data.append('details', this.form.details)
                if (this.form.logo) {
                    data.append('logo', this.form.logo)
                }

                // Set request config
                const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/services/offline', data, config)
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

            // Set logo file
            logo(file) {
                this.form.logo = file
            }
            
        }
    }
</script>