export default function ({ store, $axios }) {

    $axios.onRequest(config => {
        config.headers['locale']                      = store.state.lang.locale;
        config.headers['Content-Type']                = 'application/json';
        config.headers['Access-Control-Allow-Origin'] = process.env.APP_URL;
    })
    
}