<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_pages')"></v-toolbar-title>

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

                <!-- Create -->
                <v-btn icon nuxt to="/dashboard/pages/create">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="pages"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Title -->
                <template v-slot:[`item.title`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="title(item)"></span>
                </template>

                <!-- Handler -->
                <template v-slot:[`item.handler`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.handler"></span>
                </template>

                <!-- Created -->
                <template v-slot:[`item.created`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.created_at)"></span>
                </template>

                <!-- Last update -->
                <template v-slot:[`item.updated`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.updated_at)"></span>
                </template>

                <!-- Options -->
				<template v-slot:[`item.options`]="{ item }">
                    <v-menu bottom :left="!$vuetify.rtl" :right="$vuetify.rtl" origin="center center" :max-height="300" :min-width="200" content-class="elegant-menu">
                        <template v-slot:activator="{ on }">
                            <v-btn small v-on="on" icon>
                                <v-icon :size="20" :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'">mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list dense avatar class="py-0">

                                <!-- Edit -->
                                <v-list-item nuxt :to="`/dashboard/pages/edit/${item.handler}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_page')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

                                <!-- Delete -->
                                <v-list-item @click.prevent="remove([item], true)">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-delete</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_delete_page')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="pagesData.total > pagesData.per_page"
                v-model="pagesData.current_page"
                :length="pagesData.last_page"
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
			// Get pages
			let response = await $axios.get('dashboard/pages')
			return {
				pagesData : response.data.meta,
				pages     : response.data.data
			}
		},

        data() {
            return {
                loading      : false,
                selected     : []
            }
        },

        head() {
			return {
                title: this.$t('t_pages')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_page_title'), value: 'title', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_page_handler'), value: 'handler', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_created'), value: 'created', sortable: false, align: 'center'},
		          	{ text: this.$t('t_last_update'), value: 'updated', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get pages next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/pages?page=${page}`)
                            .then(response => {

                                // Set new pages
                                this.pagesData = response.data.meta
                                this.pages     = response.data.data
                                
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
                            const url    = '/dashboard/pages/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.pages.splice(this.pages.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.pages.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.pages.splice(vm.pages.indexOf(item), 1);
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

            },

            // Get page title
            title(page) {

                // Get current locale
                const locale = this.$i18n.locale

                // Return title depends on current locale
                switch (locale) {
                    case 'ar':
                        return page.translation.title_ar
                        break;

                    case 'az':
                        return page.translation.title_az
                        break;

                    case 'cn':
                        return page.translation.title_cn
                        break;

                    case 'de':
                        return page.translation.title_de
                        break;

                    case 'en':
                        return page.translation.title_en
                        break;

                    case 'es':
                        return page.translation.title_es
                        break;

                    case 'fr':
                        return page.translation.title_fr
                        break;

                    case 'hi':
                        return page.translation.title_hi
                        break;

                    case 'hu':
                        return page.translation.title_hu
                        break;

                    case 'jp':
                        return page.translation.title_jp
                        break;

                    case 'nl':
                        return page.translation.title_nl
                        break;

                    case 'po':
                        return page.translation.title_po
                        break;

                    case 'pt':
                        return page.translation.title_pt
                        break;

                    case 'ro':
                        return page.translation.title_ro
                        break;

                    case 'ru':
                        return page.translation.title_ru
                        break;

                    case 'th':
                        return page.translation.title_th
                        break;

                    case 'tr':
                        return page.translation.title_tr
                        break;

                    case 'ua':
                        return page.translation.title_ua
                        break;
                
                    default:
                        return page.translation.title_en
                        break;
                }

            }

        }
        
    }
</script>