import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import JQuery from 'jquery'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/styles/index.sass'

import App from './App.vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  render: h => h(App),
}).$mount('#app')

const $ = JQuery
$(document).ready(function () {
  const $root = $('html, body');

  // Smooth navigation links
  $('.navigation-link a[href^="#"]').click(function () {
    $root.animate({
      scrollTop: $($.attr(this, 'href')).offset().top - 45
    }, 800);

    return false;
  });
});