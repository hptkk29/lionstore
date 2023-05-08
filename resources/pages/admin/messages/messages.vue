<template>
    <v-container fluid class="pt-0" :class="$device.isMobileOrTablet ? 'px-2' : 'px-12'">

        <!-- Loading -->
        <loading :value="loading"/>

        <!-- Read dialog -->
        <v-dialog v-model="dialogs.read" persistent :max-width="500" v-if="message">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="message.subject"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.read = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="fs-12 font-weight-medium grey--text text--darken-2 pt-4" v-html="message.message.replace(/(?:\r\n|\r|\n)/g, '<br>')" />
            </v-card>
        </v-dialog>

        <!-- Reply message -->
        <v-dialog v-model="dialogs.reply" persistent :max-width="500" v-if="message">
            <v-card class="c-card">
                <v-toolbar flat class="card-toolbar px-2">
                    <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="message.subject"></v-toolbar-title>
                    <v-spacer />
                    <v-btn icon @click="dialogs.reply = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text class="py-8">
                    <v-row>

                        <!-- Subject -->
                        <v-col cols="12">
                            <v-text-field dense outlined
                                v-model="form.subject"
                                :hide-details="!errors.subject"
                                :placeholder="$t('t_enter_subject')"
                                append-icon="mdi-message-arrow-left"
                                color="indigo accent-3" 
                                :rules="errors.subject"
                                :error="errors.subject ? true : false" />
                        </v-col>

                        <!-- Subject -->
                        <v-col cols="12">
                            <v-textarea dense outlined :height="150"
                                v-model="form.message"
                                :hide-details="!errors.message"
                                :placeholder="$t('t_enter_message')"
                                append-icon="mdi-message"
                                color="indigo accent-3" 
                                :rules="errors.message"
                                :error="errors.message ? true : false" />
                        </v-col>

                        <!-- Submit -->
                        <v-col cols="12">
                            <v-btn rounded color="indigo accent-3" depressed block @click="send" :loading="loading" :disabled="loading" :dark="!loading">
                                <span class="fs-11 fw-600" v-if="!loading" v-text="$t('t_send')"></span>
                                <template v-slot:loader>
                                    <v-progress-circular
                                        :width="3"
                                        :size="10"
                                        color="#6c6c6c"
                                        indeterminate />
                                </template>
                            </v-btn>
                        </v-col>

                    </v-row>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-card class="c-card">
            <v-toolbar flat>

                <v-toolbar-title class="fs-11 text-uppercase font-weight-bold" v-text="$t('t_messages')"></v-toolbar-title>

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
                :items="messages"
                item-key="uid"
                :no-data-text="$t('t_table_no_data_available')"
                hide-default-footer
                :mobile-breakpoint="0"
                disable-pagination
                show-select
            >

                <!-- Name -->
                <template v-slot:[`item.name`]="{ item }">
                    <span class="fs-12 ff-default font-weight-medium" v-text="item.name"></span>
                </template>

                <!-- Email -->
                <template v-slot:[`item.email`]="{ item }">
                    <span class="d-block fs-12 pb-1 ff-default font-weight-regular" v-text="item.email"></span>
                    <span class="d-block fs-12 ff-default font-weight-regular" v-text="item.phone"></span>
                </template>

                <!-- Subject -->
                <template v-slot:[`item.subject`]="{ item }">
                    <span class="fs-12 ff-default font-weight-medium" v-text="item.subject"></span>
                </template>

                <!-- Status -->
                <template v-slot:[`item.status`]="{ item }">
                    <!-- New -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#f1faff" text-color="#0b7fbe" v-if="!item.is_seen">{{ $t('t_new') }}</v-chip>
                    <!-- Seen -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#fffcd2" text-color="#b8a33a" v-else-if="item.is_seen && !item.is_replied">{{ $t('t_seen') }}</v-chip>
                    <!-- Replied -->
                    <v-chip class="ff-default font-weight-bold fs-11" small color="#e5fff3" text-color="#1e876a" v-else>{{ $t('t_replied') }}</v-chip>
                </template>

                <!-- Created -->
                <template v-slot:[`item.date`]="{ item }">
                    <span class="fs-12 ff-default font-weight-bold" v-text="$ago(item.created_at)"></span>
                </template>

                <!-- Options -->
				<template v-slot:[`item.options`]="{ item }">
                    
                    <!-- Read -->
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-on="on" v-bind="attrs" icon :class="$vuetify.rtl ? 'mr-2' : 'ml-2'" @click="read(item)">
                                <v-icon :size="20" :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'">mdi-eye</v-icon>
                            </v-btn>
                        </template>
                        <span v-text="$t('t_read_message')"></span>
                    </v-tooltip>

                    <!-- Reply -->
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-on="on" v-bind="attrs" icon :class="$vuetify.rtl ? 'mr-2' : 'ml-2'" @click="reply(item)">
                                <v-icon :size="21" :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'">mdi-reply</v-icon>
                            </v-btn>
                        </template>
                        <span v-text="$t('t_reply_message')"></span>
                    </v-tooltip>

                    <!-- Delete -->
                    <v-tooltip top>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-on="on" v-bind="attrs" icon :class="$vuetify.rtl ? 'mr-2' : 'ml-2'" @click="remove([item], true)">
                                <v-icon :size="20" :color="$vuetify.theme.dark ? 'white' : 'grey darken-1'">mdi-delete</v-icon>
                            </v-btn>
                        </template>
                        <span v-text="$t('t_delete_message')"></span>
                    </v-tooltip>

                </template>

            </v-data-table>

            <!-- Pagination -->
            <v-pagination
                v-if="messagesData.total > messagesData.per_page"
                v-model="messagesData.current_page"
                :length="messagesData.last_page"
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
			// Get messages
			let response = await $axios.get('dashboard/messages')
			return {
				messagesData : response.data.meta,
				messages     : response.data.data
			}
		},

        data() {
            return {
                loading : false,
                selected: [],
                message : null,
                errors: [],
                form: {
                    subject: '',
                    message: ''
                },
                dialogs: {
                    read : false,
                    reply: false
                }
            }
        },

        head() {
			return {
                title: this.$t('t_messages')
			}
		},

        computed: {
            headers() {
                return [
		          	{ text: this.$t('t_sender'), value: 'name', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_contact'), value: 'email', sortable: false, align: this.$vuetify.rtl ? 'right' : 'left'},
		          	{ text: this.$t('t_subject'), value: 'subject', sortable: false, align: 'center'},
		          	{ text: this.$t('t_status'), value: 'status', sortable: false, align: 'center'},
		          	{ text: this.$t('t_date'), value: 'date', sortable: false, align: 'center'},
		          	{ text: this.$t('t_options'), value: 'options', sortable: false, align: 'center'},
		        ]
            }
        },

        methods: {

            // Get messages next page
            async getNextPage(page) {

                // Enable loader
                this.loading = true

                // Send request
                await this.$axios
                            .get(`dashboard/messages?page=${page}`)
                            .then(response => {

                                // Set new messages
                                this.messagesData = response.data.meta
                                this.messages     = response.data.data
                                
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

            // Read message
            async read(message) {

                // Check if message already seen
                if (message.is_seen) {
                    
                    // Set selected message
                    this.message      = message 

                    // Open dialog to read message
                    this.dialogs.read = true

                    // Return
                    return

                } else {

                    // IF message is new mark it as read
                    this.loading = true

                    // Send request to server
                    await this.$axios.post('dashboard/messages/options/read', { id: message.id })
                                     .then(response => {
                                        
                                        // Set message to read
                                        this.message = message

                                        // Change message status
                                        this.messages[this.messages.indexOf(message)].is_seen = true

                                        // Open dialog
                                        this.dialogs.read = true

                                     })
                                     .catch(error => {
                                        this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                     })
                                     .finally(async () => {
                                        // Stop loading
                                        this.loading = false
                                     })

                }

            },

            // Show reply form
            reply(message) {
                this.message       = message
                this.dialogs.reply = true
            },

            // Send reply
            async send() {

                // Check if form filled
                if (!this.form.subject || !this.form.message) {
                    return
                }

                // Loading
                this.loading = true

                // Set data
                const data = {
                    id     : this.message.id,
                    subject: this.form.subject,
                    message: this.form.message
                }

                // Send request
                await this.$axios.post('dashboard/messages/options/reply', data)
                                .then(response => {
                                
                                    // Set message as replied
                                    this.messages[this.messages.indexOf(this.message)].is_replied = true
                                    this.messages[this.messages.indexOf(this.message)].is_seen    = true

                                    // Remove errors
                                    this.errors = []

                                    // Reset form
                                    this.form.subject = ''
                                    this.form.message = ''

                                    // Close dialog
                                    this.dialogs.reply = false

                                    // Success
                                    this.$message(this.$t('t_your_reply_sent_success'))

                                    // Reset selected message
                                    this.message = null

                                })
                                .catch(error => {
                                    this.$message(this.$t('t_toast_form_error'), 'alert-rhombus', 'error')
                                })
                                .finally(async () => {
                                    // Stop loading
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
                            const url    = '/dashboard/messages/options/delete'

                            // Send request
                            await this.$axios.post(url, {items: items})
                                            .then(response => {

                                                // Remove item from list (Single select)
                                                if (single) {
                                                    
                                                    this.messages.splice(this.messages.indexOf(items[0]), 1);

                                                } else {

                                                    // This
                                                    let vm       = this

                                                    // Multiple select
                                                    this.selected.forEach(function (item, i) {
                                                        vm.messages.forEach(function(v, j) {

                                                            if (item.id === v.id) {
                                                                vm.messages.splice(vm.messages.indexOf(item), 1);
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