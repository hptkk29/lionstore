<template>
  <v-container fluid grid-list-xl>
      <div class="empty-state">
          <div class="empty-state-container">
              <v-icon class="empty-state-icon">mdi-alert-octagon-outline</v-icon>
              <strong class="empty-state-label" v-if="error.statusCode === 404" v-t="'t_page_not_found'"></strong> 
              <strong class="empty-state-label" v-else v-t="'t_error_something_happend'"></strong> 
              <p v-if="error.statusCode === 404" class="empty-state-description" :class="$vuetify.rtl ? 'text-right' : 'text-left'" v-t="'t_page_not_found_details'"></p>
              <p v-else class="empty-state-description" :class="$vuetify.rtl ? 'text-right' : 'text-left'" v-t="'t_error_something_happend_details'"></p>
              <v-btn depressed dark nuxt to="/" color="indigo accent-3" class="mt-3 px-12">
                  <span v-t="'t_home'" class="fs-10 font-weight-medium"></span>
              </v-btn>
          </div>
      </div>
  </v-container>
</template>

<script>
export default {
  
  layout: (ctx) => ctx.$device.isMobileOrTablet ? 'mobile/main' : 'desktop/main',

  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
        return {

            // Title
            title: this.$store.state.settings.site_title,
            titleTemplate: `%s ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_tagline }`,

            // Set meta tags
            meta: [

                // Description
                { hid: 'description', name: 'description', content: this.$store.state.settings.site_description },

                // OG Type
                { hid: 'og:type', property: 'og:type', content: false },

                // OG Title
                { hid: 'og:title', property: 'og:title', content: `${ this.$store.state.settings.site_title } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_tagline }` },

                // OG Site Name
                { hid: 'og:site_name', property: 'og:site_name', content: this.$store.state.settings.site_title },

                // OG Description
                { hid: 'og:description', property: 'og:description', content: this.$store.state.settings.site_description },

                // OG Image
                { hid: 'og:image', property: 'og:image', content: this.$ogimage() },

                // OG Url
                { hid: 'og:url', property: 'og:url', content: this.$clientIndex() },

                // Twitter Title
                { hid: 'twitter:title', name: 'twitter:title', content: `${ this.$store.state.settings.site_title } ${ this.$store.state.settings.title_separator } ${ this.$store.state.settings.site_tagline }` },

                // Twitter Description
                { hid: 'twitter:description', name: 'twitter:description', content: this.$store.state.settings.site_description },

                // Twitter Image
                { hid: 'twitter:image', name: 'twitter:image', content: this.$ogimage() },

                // Twitter Image Alt
                { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.$store.state.settings.site_description },

                // Twitter Card
                { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
                
            ],
            link: [ { rel: 'canonical', href: this.$clientIndex() }  ]
        }
    },
}
</script>