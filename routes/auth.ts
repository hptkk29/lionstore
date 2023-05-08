import Route from '@ioc:Adonis/Core/Route'


// Authentication
Route
    .group(() => {

        // Register
        Route.post('register', 'RegisterController.register')

        // Login
        Route.post('login', 'LoginController.login')

        // Password
        Route
            .group(() => {

                // Reset
                Route.post('reset', 'PasswordController.reset')

                // Update
                Route.post('update', 'PasswordController.update')

            })
            .prefix('password')

    })
    .middleware(['guest', 'recaptcha'])
    .prefix('api/auth')
    .namespace('App/Controllers/Http/Main/Auth')

    
// Verify password token
Route
    .group(() => {

        // Verify
        Route.post('verify', 'PasswordController.verify')

    })
    .middleware('guest')
    .prefix('api/auth/password')
    .namespace('App/Controllers/Http/Main/Auth')


// Verify account
Route
    .group(() => {

        // Verify
        Route.post('verify', 'VerifyController.verify')

    })
    .middleware('guest')
    .prefix('api/auth')
    .namespace('App/Controllers/Http/Main/Auth')


// Logout
Route
    .post('logout', 'LogoutController.logout')
    .namespace('App/Controllers/Http/Main/Auth')
    .prefix('api/auth')
    .middleware('auth')


// Account
Route
    .post('account', 'AccountController.account')
    .namespace('App/Controllers/Http/Main/Auth')
    .prefix('api/auth')
    .middleware('auth')


// Social media login
Route
    .group(() => {

        // Facebook
        Route.post('facebook', 'FacebookController.facebook')

        // Twitter
        Route.post('twitter/redirect', 'TwitterController.redirect')
        Route.post('twitter/callback', 'TwitterController.callback')

        // Google
        Route.post('google/redirect', 'GoogleController.redirect')
        Route.post('google/callback', 'GoogleController.callback')

    })
    .middleware('guest')
    .prefix('api/auth')
    .namespace('App/Controllers/Http/Main/Auth')