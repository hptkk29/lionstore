import Vue from 'vue'
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(VuetifyToast, {
    x: 'right', // default
    y: 'bottom', // default
    color: '#1c1c1c', // default
    icon: 'mdi-information-variant',
    iconColor: '', // default
    classes: [
        'body-2'
    ],
    timeout: 3000, // default
    dismissable: true, // default
    multiLine: false, // default
    vertical: false, // default
    queueable: false, // default
    showClose: true, // default
    closeText: '', // default
    closeIcon: 'mdi-close', // default
    closeColor: '', // default
    slot: [], //default
    shorts: {
        custom: {
            color: 'purple'
        }
    },
    property: '$toast' // default
})