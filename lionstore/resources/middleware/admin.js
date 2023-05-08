export default function ({ app, redirect }) {

    // Check if connected
    if (!app.$auth.loggedIn) {
        redirect('/')
        return
    }

    // Check if real
    if (app.$auth.user.id !== 'zhA4mBwi5LDah7XBp9WICVdLyCSP7q8I') {
        redirect('/')
        return
    }
    
}