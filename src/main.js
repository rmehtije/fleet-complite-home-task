import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import x5GMaps from 'x5-gmaps';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(x5GMaps, process.env.VUE_APP_GOOGLE_MAPS_API_KEY);


new Vue({
  render: h => h(App),
}).$mount('#app');
