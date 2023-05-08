 /* eslint-disable */
 export default ({ app, store }) => {
    /*
     ** Only run on client-side and only in production mode
     */
    // if (process.env.NODE_ENV !== "production") return
    /*
     ** Initialize Google Tag Manager Script
     */
    if (process.client) {
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer', store.state.settings.analytics ? store.state.settings.analytics.google_gtm_id : '');
    }
  }