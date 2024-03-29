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
  faAward,
  faBaby,
  faBook,
  faBriefcase,
  faCalendar,
  faChild,
  faChurch,
  faCross,
  faDna,
  faHandHoldingUsd,
  faHome,
  faFemale,
  faFeatherAlt,
  faGavel,
  faGlobe,
  faGraduationCap,
  faMale,
  faMonument,
  faShieldAlt,
  faStickyNote,
  faUniversity,
  faUser,
  faUsers,
  faWarehouse
} from '@fortawesome/free-solid-svg-icons'
import {
  faStickyNote as faStickyNoteRegular
} from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

faLibrary.add(
  faAward,
  faBaby,
  faBook,
  faBriefcase,
  faCalendar,
  faChild,
  faChurch,
  faCross,
  faDna,
  faHandHoldingUsd,
  faHome,
  faFemale,
  faFeatherAlt,
  faGavel,
  faGlobe,
  faGraduationCap,
  faMale,
  faMonument,
  faShieldAlt,
  faStickyNote,
  faStickyNoteRegular,
  faUniversity,
  faUser,
  faUsers,
  faWarehouse
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
