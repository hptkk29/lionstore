<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_keywords')"></v-toolbar-title>

                <v-spacer></v-spacer>

                <!-- Delete -->
                <v-tooltip top>
                    <template v-slot:activator="{ on }">
                        <v-expand-transition>
                        <v-btn v-if="selected.length" v-on="on" key="delete" icon @click="remove(selected)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                        </v-expand-transition>
                    </template>
                    <span v-text="$t('t_delete')"></span>
                </v-tooltip>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="keywords"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Keyword -->
                <template v-slot:[`item.keyword`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.keyword"></span>
                </template>

                <!-- Counter -->
                <template v-slot:[`item.counter`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.counter"></span>
                </template>

                <!-- First search date -->
                <template v-slot:[`item.first_search`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.created_at)"></span>
                </template>

                <!-- Last search date -->
                <template v-slot:[`item.last_search`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.updated_at)"></span>
                </template>

                <!-- Options -->
				<template v-slot:[`item.options`]="{ item }">

                    <!-- Delete -->
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-on="on" v-bind="attrs" icon @click="remove([item], true)">
                                <v-icon :size="20" :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'">mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span v-text="$t('t_delete_search')"></span>
                    </v-tooltip>

                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="keywordsData.total > keywordsData.per_page"
                v-model="keywordsData.current_page"
                :length="keywordsData.last_page"
                @input="getNextPage"
                :total-visible="7"
                prev-icon="mdi-menu-left"
                next-icon="mdi-menu-right"
                color="indigo accent-3"
                class="pa-4"
                ></v-pagination>

        </v-card>

    </v-container>
</template>

<script>
    export default {

        layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/admin' : 'desktop/admin',

        middleware: 'admin',

        async asyncData({ app, $axios, redirect }) {
			// Get keywords
			let response = await $axios.get('dashboard/keywords')
			return {
				keywordsData : response.data.meta,
				keywords     : response.data.data
			}
		},

        data() {
            return {
                loading : false,
                selected: []
            }
        },

        head() {
			return {
                title: this.$t('t_keywords')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_keyword'), value: 'keyword', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_counter'), value: 'counter', sortable: false, align: 'center'},
		          	{ text: this.$t('t_first_search'), value: 'first_search', sortable: false, align: 'center'},
		          	{ text: this.$t('t_last_search'), value: 'last_search', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get keywords next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/keywords?page=${page}`)
                            .then(response => {

                                // Set new keywords
                                this.keywordsData = response.data.meta
                                this.keywords     = response.data.data
                                
                                // Scroll top
                                this.$scrollTo('#scroll-top-admin', 300, {})

                            })
                            .catch(error => {

                                // Error
                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                            }).finally(() => {

                                // Stop loader
                                this.loading = false

                            })

            },

            // Delete data
            async remove(items, single = false) {

                this.$confirm(
                    {
                    title: this.$t('t_delete'),
                    message: this.$t('t_confirm_deletion_text'),
                    button: {
                        no: this.$t('t_cancel'),
                        yes: this.$t('t_confirm')
                    },
                    /**
                     * Callback Function
                     * @param {Boolean} confirm 
                     */
                    callback: async confirm => {
                        if (confirm) {
                        
                            // Start loading
                            this.loading = true

                            // Get server url
                            const url    = '/dashboard/keywords/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.keywords.splice(this.keywords.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.keywords.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.keywords.splice(vm.keywords.indexOf(item), 1);
                                                            }
                                                            
                                                        })
                                                    })
                                                    
                                                    // Deselect old items
                                                    this.selected = []

                                                }

                                                // Success
                                                this.$message(this.$t('t_toast_process_done'))

                                            }).catch(error => {

                                                // Error
                                                this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')

                                            }).finally(() => {

                                                // Stop loading
                                                this.loading = false

                                            })

                        }
                    }
                    }
                )

            }

        }
        
    }
</script>