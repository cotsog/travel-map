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
  // Smooth navigation links
  $("a").click(function () {
    $(document.scrollingElement || "body").animate({
      scrollTop: $($(this).attr("href")).offset().top
    }, 800);
    return false;
  });
  // $('a[href^="#"]').click(function () {
  //   $('html, body').animate({
  //     scrollTop: $($(this).attr('href')).offset().top
  //   }, 800);

  //   return false;
  // });
});