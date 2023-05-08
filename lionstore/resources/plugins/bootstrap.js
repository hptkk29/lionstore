import Vue from 'vue'
import Loading from '~/components/utils/loading'
import ProductCard from '~/components/main/partials/product'

Vue.component('loading', Loading)
Vue.component('product-card', ProductCard)

Vue.directive('click-outside-search', {
    bind: function (element, binding, vnode) {
      if (element && typeof document !== undefined) {
        element.clickOutsideEvent = function (event) {  //  check that click was outside the el and his children
          if (!(element === event.target || element.contains(event.target))) { // and if it did, call method provided in attribute value
            vnode.context[binding.expression](event);
            // binding.value(); run the arg
          }
        };
        document.body.addEventListener('click', element.clickOutsideEvent)
      }
    },
    unbind: function (element) {
      if (element && typeof document !== undefined) {
        document.body.removeEventListener('click', element.clickOutsideEvent)
      }
    }
});