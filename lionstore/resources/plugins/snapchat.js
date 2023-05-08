 /* eslint-disable */
 export default ({ app, store }) => {
    /*
     ** Only run on client-side and only in production mode
     */
    // if (process.env.NODE_ENV !== "production") return
    /*
     ** Initialize Snapchat Pixel Script
     */
    if (process.client) {

        (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
        {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
        a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
        r.src=n;var u=t.getElementsByTagName(s)[0];
        u.parentNode.insertBefore(r,u);})(window,document,
        'https://sc-static.net/scevent.min.js');

        snaptr('init', store.state.settings.analytics ? store.state.settings.analytics.snapchat_pixel_id : '', {
        'user_email': '__INSERT_USER_EMAIL__'
        });

        snaptr('track', 'PAGE_VIEW');

      }
  }