module.exports = {
    apps: [

        // Frontend
        {
            name: 'Frontend',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start'
        },

        // Backend
        {
            name: 'Backend',
            script: 'server.js',
            instances: 'max',
            exec_mode: 'cluster',
            autorestart: true,
        }

    ]
};