<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_refunds_settings')"></v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Enable refund system -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_enabled"
                                :hide-details="!errors.is_enabled"
                                :placeholder="$t('t_enable_refund_system')"
                                :items="[{ text: $t('t_enable_refund_system'), value: 1 }, { text: $t('t_disable_refund_system'), value: 0 }]"
                                item-text="text"
                                item-value="value"
                                color="indigo accent-3" 
                                :rules="errors.is_enabled"
                                :error="errors.is_enabled ? true : false" />
                        </v-col>

                        <!-- Message to customer -->
                        <v-col cols="12" class="html-editor">
                            <client-only :placeholder="$t('t_loading_editor')" placeholder-tag="span">
                                <vue-editor :placeholder="$t('t_enter_message_to_customer')" v-model="form.message_to_customer"></vue-editor>
                            </client-only>
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
            let response = await $axios.get('dashboard/settings/refunds')

			return {
				form      : {
                    is_enabled         : response.data.is_enabled,
                    message_to_customer: response.data.message_to_customer
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
                title: this.$t('t_refunds_settings')
			}
		},

        methods: {

            // Update
            async update() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    is_enabled         : this.form.is_enabled,
                    message_to_customer: this.form.message_to_customer
                }
                // Send request to server
                await this.$axios
                            .post('dashboard/settings/refunds', data)
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