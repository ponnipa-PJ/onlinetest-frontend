import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';
// import { FontAwesomeIcon } from './plugins/font-awesome'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store';

require('../src/dist/css/adminlte.min.css')
require('../src/plugins/fontawesome-free/css/all.min.css')
require('../src/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css')
require('../src/plugins/icheck-bootstrap/icheck-bootstrap.min.css')
require('../src/plugins/jqvmap/jqvmap.min.css')
require('../src/plugins/overlayScrollbars/css/OverlayScrollbars.min.css')
require('../src/plugins/daterangepicker/daterangepicker.css')
require('../src/plugins/summernote/summernote-bs4.min.css')

// require('../src/plugins/jquery/jquery.min.js')
// require('../src/plugins/jquery-ui/jquery-ui.min.js')

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

