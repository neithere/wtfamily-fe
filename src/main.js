// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'

import { library as faLibrary } from '@fortawesome/fontawesome-svg-core'
import {
  faBook,
  faChild,
  faGlobe,
  faFemale,
  faMale,
  faStickyNote,
  faUser,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import {
  faStickyNote as faStickyNoteRegular
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

faLibrary.add(
  faBook,
  faChild,
  faFemale,
  faGlobe,
  faMale,
  faStickyNote,
  faStickyNoteRegular,
  faUser,
  faUsers
)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.use(BootstrapVue)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render (h) {
    return h(App)
  },
  components: { App }
})
