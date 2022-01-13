import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import '../src/plugins/jquery/jquery.min.js';

// import '../src/plugins/jquery/jquery.min.js';

// import '../src/plugins/jquery-ui/jquery-ui.min.js';

// import '../src/plugins/bootstrap/js/bootstrap.bundle.min.js';

// import '../src/plugins/chart.js/Chart.min.js';

// import '../src/plugins/sparklines/sparkline.js';

// import '../src/plugins/jqvmap/jquery.vmap.min.js';
// import '../src/plugins/jqvmap/maps/jquery.vmap.usa.js';

// import '../src/plugins/jquery-knob/jquery.knob.min.js';

// import '../src/plugins/moment/moment.min.js';
// import '../src/plugins/daterangepicker/daterangepicker.js';

// import '../src/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min.js';

// import '../src/plugins/summernote/summernote-bs4.min.js';

// import '../src/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js';

// import '../src/dist/js/adminlte.js';

// import '../src/dist/js/demo.js';

// require('../src/dist/js/pages/dashboard.js')

// import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous';

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

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
