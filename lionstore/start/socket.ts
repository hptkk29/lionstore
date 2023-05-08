import Ws from 'App/Services/Ws'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
    // @ts-ignore
    socket.on('live::search', (data) => {
        
    })
})