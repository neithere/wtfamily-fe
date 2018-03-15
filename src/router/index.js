import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SourceViewer from '@/components/SourceViewer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      // require('@/components/Home.vue')
      component: Home
    },
    {
      path: '/sources',
      name: 'source.list',
      // component: require('@/components/SourceViewer.vue')
      component: SourceViewer
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
