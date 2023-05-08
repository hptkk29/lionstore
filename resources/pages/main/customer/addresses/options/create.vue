<template>
    <v-container fluid grid-list-xl>

        <!-- Loading -->
        <loading :value="loading"/>

        <v-row>

            <!-- Sidebar -->
            <customer-layout v-if="!$device.isMobileOrTablet" />

            <v-col :cols="$device.isMobileOrTablet ? 12 : 9">
                <v-card class="c-card">
                    <v-toolbar flat class="card-toolbar px-4">
                        <v-toolbar-title class="font-weight-bold ff-default fs-13" v-t="'t_create_address'"></v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>

                    <v-card-text class="py-10 px-8">
                        <v-row>

                            <!-- Name -->
                            <v-col cols="12" v-if="$store.state.settings.checkout.field_name">
                                <v-text-field dense outlined
                                    v-model="form.name"
                                    :hide-details="!errors.name"
                                    :placeholder="$t('t_enter_your_name')"
                                    append-icon="mdi-account"
                                    color="indigo accent-3" 
                                    :rules="errors.name"
                                    :error="errors.name ? true : false" />
                            </v-col>

                            <!-- Phone -->
                            <v-col cols="12" v-if="$store.state.settings.checkout.field_phone">
                                <v-text-field dense outlined
                                    v-model="form.phone"
                                    :hide-details="!errors.phone"
                                    :placeholder="$t('t_enter_phone')"
                                    append-icon="mdi-phone"
                                    color="indigo accent-3" 
                                    :rules="errors.phone"
                                    :error="errors.phone ? true : false" />
                            </v-col>

                            <!-- Countries -->
                            <v-col cols="12" v-if="$store.state.settings.is_global">
                                <v-autocomplete dense outlined
                                    v-model="form.country_id"
                                    :hide-details="!errors.country_id"
                                    :placeholder="$t('t_choose_country')"
                                    :items="countries"
                                    item-text="name"
                                    item-value="id"
                                    color="indigo accent-3" 
                                    :rules="errors.country_id"
                                    :error="errors.country_id ? true : false" />
                            </v-col>

                            <!-- State -->
                            <v-col cols="12" v-if="$store.state.settings.checkout.field_state">
                                <v-text-field dense outlined
                                    v-model="form.state"
                                    :hide-details="!errors.state"
                                    :placeholder="$t('t_enter_state')"
                                    append-icon="mdi-flag"
                                    color="indigo accent-3" 
                                    :rules="errors.state"
                                    :error="errors.state ? true : false" />
                            </v-col>

                            <!-- City -->
                            <v-col cols="12" v-if="$store.state.settings.checkout.field_city">
                                <v-text-field dense outlined
                                    v-model="form.city"
                                    :hide-details="!errors.city"
                                    :placeholder="$t('t_enter_city')"
                                    append-icon="mdi-city"
                                    color="indigo accent-3" 
                                    :rules="errors.city"
                                    :error="errors.city ? true : false" />
                            </v-col>

                            <!-- Zipcode -->
                            <v-col cols="12" v-if="$store.state.settings.checkout.field_zipcode">
                                <v-text-field dense outlined
                                    v-model="form.zipcode"
                                    :hide-details="!errors.zipcode"
                                    :placeholder="$t('t_enter_zipcode')"
                                    append-icon="mdi-numeric"
                                    color="indigo accent-3" 
                                    :rules="errors.zipcode"
                                    :error="errors.zipcode ? true : false" />
                            </v-col>

                            <!-- Address -->
                            <v-col cols="12" v-if="$store.state.settings.checkout.field_address">
                                <v-textarea dense outlined :height="160"
                                    v-model="form.address"
                                    :hide-details="!errors.address"
                                    :placeholder="$t('t_enter_address')"
                                    append-icon="mdi-map-marker"
                                    color="indigo accent-3" 
                                    :rules="errors.address"
                                    :error="errors.address ? true : false" />
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
                    </v-card-text>
                    
                </v-card>
            </v-col>
        </v-row>

    </v-container>
</template>

<script>
export default {
    
    layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

    auth: true,

    middleware: 'auth',

    components: {
        'customer-layout': () => import('~/pages/main/customer/layout/layout')
    },

    async asyncData({ app, $axios, params }) {
        // Send request to server
        let response = await $axios.post('customer/addresses/options/fetch')

        return {
            countries: response.data
        }
    },

    data() {
        return {
            form: {
                name      : '',
                phone     : '',
                country_id: this.$store.state.settings.default_country,
                state     : '',
                city      : '',
                zipcode   : '',
                address   : ''
            },
            errors: [],
            loading: false
        }
    },

    head() {
        return {

            // Title
            title: this.$t('t_create_address')

        }
    },

    methods: {

        // Create
        async create() {

            // Start loading
            this.loading = true

            // Get data
            let data     = {
                name      : this.form.name,
                phone     : this.form.phone,
                country_id: this.form.country_id,
                state     : this.form.state,
                city      : this.form.city,
                zipcode   : this.form.zipcode,
                address   : this.form.address
            }

            // Send request to server
            await this.$axios
                        .post('customer/addresses/options/create', data)
                        .then(response => {

                            // Success
                            this.$message(this.$t('t_toast_process_done'))

                            // Remove errors
                            this.errors = []

                            // Reset form
                            this.reset()

                            // Scroll to top
                            this.$scrollTo(this.$device.isMobileOrTablet ? '#mobile-container' : '#desktop-container', 300, {})

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

        // Reset form
        reset() {
            this.form.name    = ''
            this.form.phone   = ''
            this.form.state   = ''
            this.form.city    = ''
            this.form.zipcode = ''
            this.form.address = ''
        }

    }

}
</script>