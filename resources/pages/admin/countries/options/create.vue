<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>


        <v-card flat class="c-card">
            <v-toolbar flat class="card-toolbar px-4">
                <v-toolbar-title class="font-weight-bold ff-default fs-13" v-text="$t('t_create_country')"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-btn v-on="on" icon nuxt exact to="/dashboard/countries">
                            <v-icon>mdi-flag</v-icon>
                        </v-btn>
                    </template>
                    <span v-text="$t('t_countries')"></span>
                </v-tooltip>
            </v-toolbar>

            <v-card-text class="py-8 px-5">
                <v-container class="py-0">
                    <v-row>

                        <!-- Country name -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.name"
                                :hide-details="!errors.name"
                                :placeholder="$t('t_enter_country_name')"
                                append-icon="mdi-flag-triangle"
                                color="indigo accent-3" 
                                :rules="errors.name"
                                :error="errors.name ? true : false" />
                        </v-col>

                        <!-- Country code -->
                        <v-col cols="12">
                            <v-autocomplete dense outlined
                                v-model="form.code"
                                :hide-details="!errors.code"
                                :placeholder="$t('t_enter_country_code')"
                                :items="countriesCodes.sort()"
                                color="indigo accent-3" 
                                :rules="errors.code"
                                :error="errors.code ? true : false" />
                        </v-col>

                        <!-- Status -->
                        <v-col cols="12">
                            <v-select dense outlined
                                v-model="form.is_active"
                                :hide-details="!errors.is_active"
                                :placeholder="$t('t_country_status')"
                                :items="[{ text: $t('t_active'), value: 1 }, { text: $t('t_inactive'), value: 0 }]"
                                item-value="value"
                                item-text="text"
                                color="indigo accent-3" 
                                :rules="errors.is_active"
                                :error="errors.is_active ? true : false" />
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

        data() {
            return {
                form: {
                    name     : '',
                    code     : '',
                    is_active: 1,
                },
                errors: [],
                loading: false
            }
        },

        head() {
			return {
                title: this.$t('t_create_country')
			}
		},

        computed: {
            countriesCodes() {
                return [    "BD",    "BE",    "BF",    "BG",    "BA",    "BB",    "WF",    "BL",    "BM",    "BN",    "BO",    "BH",    "BI",    "BJ",    "BT",    "JM",    "BV",    "BW",    "WS",    "BQ",    "BR",    "BS",    "JE",    "BY",    "BZ",    "RU",    "RW",    "RS",    "TL",    "RE",    "TM",    "TJ",    "RO",    "TK",    "GW",    "GU",    "GT",    "GS",    "GR",    "GQ",    "GP",    "JP",    "GY",    "GG",    "GF",    "GE",    "GD",    "GB",    "GA",    "SV",    "GN",    "GM",    "GL",    "GI",    "GH",    "OM",    "TN",    "JO",    "HR",    "HT",    "HU",    "HK",    "HN",    "HM",    "VE",    "PR",    "PS",    "PW",    "PT",    "SJ",    "PY",    "IQ",    "PA",    "PF",    "PG",    "PE",    "PK",    "PH",    "PN",    "PL",    "PM",    "ZM",    "EH",    "EE",    "EG",    "ZA",    "EC",    "IT",    "VN",    "SB",    "ET",    "SO",    "ZW",    "SA",    "ES",    "ER",    "ME",    "MD",    "MG",    "MF",    "MA",    "MC",    "UZ",    "MM",    "ML",    "MO",    "MN",    "MH",    "MK",    "MU",    "MT",    "MW",    "MV",    "MQ",    "MP",    "MS",    "MR",    "IM",    "UG",    "TZ",    "MY",    "MX",    "IL",    "FR",    "IO",    "SH",    "FI",    "FJ",    "FK",    "FM",    "FO",    "NI",    "NL",    "NO",    "NA",    "VU",    "NC",    "NE",    "NF",    "NG",    "NZ",    "NP",    "NR",    "NU",    "CK",    "XK",    "CI",    "CH",    "CO",    "CN",    "CM",    "CL",    "CC",    "CA",    "CG",    "CF",    "CD",    "CZ",    "CY",    "CX",    "CR",    "CW",    "CV",    "CU",    "SZ",    "SY",    "SX",    "KG",    "KE",    "SS",    "SR",    "KI",    "KH",    "KN",    "KM",    "ST",    "SK",    "KR",    "SI",    "KP",    "KW",    "SN",    "SM",    "SL",    "SC",    "KZ",    "KY",    "SG",    "SE",    "SD",    "DO",    "DM",    "DJ",    "DK",    "VG",    "DE",    "YE",    "DZ",    "US",    "UY",    "YT",    "UM",    "LB",    "LC",    "LA",    "TV",    "TW",    "TT",    "TR",    "LK",    "LI",    "LV",    "TO",    "LT",    "LU",    "LR",    "LS",    "TH",    "TF",    "TG",    "TD",    "TC",    "LY",    "VA",    "VC",    "AE",    "AD",    "AG",    "AF",    "AI",    "VI",    "IS",    "IR",    "AM",    "AL",    "AO",    "AQ",    "AS",    "AR",    "AU",    "AT",    "AW",    "IN",    "AX",    "AZ",    "IE",    "ID",    "UA",    "QA",    "MZ"]
            }
        },

        methods: {

            // Insert
            async create() {

                // Start loading
                this.loading = true

                // Get data
                let data     = {
                    name     : this.form.name,
                    code     : this.form.code,
                    is_active: this.form.is_active,
                }

                // Send request to server
                await this.$axios
                            .post('dashboard/countries/options/create', data)
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

            // Reset form
            reset() {
                this.form.name = ''
                this.form.code = ''
            }
        }
    }
</script>