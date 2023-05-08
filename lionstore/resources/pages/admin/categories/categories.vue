<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_categories')"></v-toolbar-title>

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
                <v-btn icon nuxt to="/dashboard/categories/create">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="categories"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Category -->
                <template v-slot:[`item.title`]="{ item }">
                    <v-list class="transparent">
                        <v-list-item color="transparent" class="px-0">
                            <v-list-item-avatar rounded>
                                <v-img :alt="title(item)" :src="icon(item)"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title class="fs-11 font-weight-medium" v-text="title(item)"></v-list-item-title>
                                <v-list-item-title class="fs-10 font-weight-regular grey--text pt-2" v-text="item.handler"></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </template>

                <!-- Subcategories -->
                <template v-slot:[`item.subcategories`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.meta.subcategories_count"></span>
                </template>

                <!-- Childcategories -->
                <template v-slot:[`item.childcategories`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.meta.childcategories_count"></span>
                </template>

                <!-- Created -->
                <template v-slot:[`item.created`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.created_at)"></span>
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
                                <v-list-item nuxt :to="`/dashboard/categories/edit/${item.uid}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_category')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_category')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="categoriesData.total > categoriesData.per_page"
                v-model="categoriesData.current_page"
                :length="categoriesData.last_page"
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
			// Get categories
			let response = await $axios.get('dashboard/categories')
			return {
				categoriesData : response.data.meta,
				categories     : response.data.data
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
                title: this.$t('t_categories'),
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_category'), value: 'title', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_subcategories'), value: 'subcategories', sortable: false, align: 'center'},
		          	{ text: this.$t('t_childcategories'), value: 'childcategories', sortable: false, align: 'center'},
		          	{ text: this.$t('t_created'), value: 'created', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get categories next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/categories?page=${page}`)
                            .then(response => {

                                // Set new categories
                                this.categoriesData = response.data.meta
                                this.categories     = response.data.data
                                
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
                            const url    = '/dashboard/categories/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.categories.splice(this.categories.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.categories.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.categories.splice(vm.categories.indexOf(item), 1);
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

            // Category title
            title(category) {

                // Get current locale
                const locale = this.$i18n.locale

                // Decode category title
                const title  = JSON.parse(category.translation.title)

                // Return title
                return title[locale]

            },

            // Category icon
            icon(category) {

                // Check if category has icon
                if (category.icon) {
                    
                    return this.$clientIndex(`/uploads/${ category.icon.file_folder }/${ category.icon.uid }.webp`)

                } else {

                    // Return default icon
                    return this.$clientIndex('/images/default/icon.svg')

                }

            }

        }
        
    }
</script>