import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home  // require('@/components/Home.vue')
    },
    {
      path: '/sources',
      name: 'source.list',
      component: require('@/components/SourceViewer.vue')
    },
    {
      path: '/people',
      name: 'person.list',
      component: { template: '<div>Not implemented.</div>' }
      // component: require('./components/PersonViewer.vue')
    },
    {
      path: '/places',
      name: 'place.list',
      component: { template: '<div>Not implemented.</div>' }
      // component: require('./components/PlaceViewer.vue')
    }
  ]
})
