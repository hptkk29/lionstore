<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_sliders')"></v-toolbar-title>

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
                <v-btn icon nuxt to="/dashboard/sliders/create">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>

            </v-toolbar>
            
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="sliders"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Desktop slider -->
                <template v-slot:[`item.desktop`]="{ item }">
                    <v-avatar rounded :size="36">
                        <img :src="desktop_slider(item)" />
                    </v-avatar>
                </template>

                <!-- Mobile slider -->
                <template v-slot:[`item.mobile`]="{ item }">
                    <v-avatar rounded :size="36">
                        <img :src="mobile_slider(item)" />
                    </v-avatar>
                </template>

                <!-- Link type -->
                <template v-slot:[`item.link_type`]="{ item }">
                    <!-- Inside -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="light-green lighten-4" text-color="light-green darken-2" v-if="item.link_type === 'inside'">{{ $t('t_inside_website') }}</v-chip>
                    <!-- Outside -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="red lighten-4" text-color="red darken-2" v-else>{{ $t('t_outside_website') }}</v-chip>
                </template>

                <!-- Slider link -->
                <template v-slot:[`item.link_value`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="item.link_value"></span>
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
                                <v-list-item nuxt :to="`/dashboard/sliders/edit/${item.uid}`">
                                    <v-list-item-avatar>
                                        <v-avatar :color="$vuetify.theme.dark ? '#343434' : '#e4e6eb'" :size="34">
                                            <v-icon :size="20">mdi-circle-edit-outline</v-icon>
                                        </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="$t('t_edit_slider')"></v-list-item-title>
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
                                        <v-list-item-title v-text="$t('t_delete_slider')"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>

							</v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="slidersData.total > slidersData.per_page"
                v-model="slidersData.current_page"
                :length="slidersData.last_page"
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
			// Get sliders
			let response = await $axios.get('dashboard/sliders')
			return {
				slidersData : response.data.meta,
				sliders     : response.data.data
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
                title: this.$t('t_sliders')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_mobile_slider'), value: 'mobile', sortable: false, align: 'center'},
		          	{ text: this.$t('t_desktop_slider'), value: 'desktop', sortable: false, align: 'center'},
		          	{ text: this.$t('t_slider_link_type'), value: 'link_type', sortable: false, align: 'center'},
		          	{ text: this.$t('t_slider_link'), value: 'link_value', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'}
		        ]
            }
        },

        methods: {

            // Desktop slider
            desktop_slider(slider) {
                if (slider.desktop_slider_id) {
                    return this.$clientIndex(`/uploads/${ slider.desktopSlider.file_folder }/${ slider.desktopSlider.uid }.webp`)
                } else {
                    return this.$clientIndex('/images/default/icon.svg')
                }
            },

            // Mobile slider
            mobile_slider(slider) {
                if (slider.mobile_slider_id) {
                    return this.$clientIndex(`/uploads/${ slider.mobileSlider.file_folder }/${ slider.mobileSlider.uid }.webp`)
                } else {
                    return this.$clientIndex('/images/default/icon.svg')
                }
            },

            // Get sliders next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/sliders?page=${page}`)
                            .then(response => {

                                // Set new sliders
                                this.slidersData = response.data.meta
                                this.sliders     = response.data.data
                                
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
                            const url    = '/dashboard/sliders/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.sliders.splice(this.sliders.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.sliders.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.sliders.splice(vm.sliders.indexOf(item), 1);
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