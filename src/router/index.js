import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SourceViewer from '@/components/SourceViewer.vue'
import PlaceViewer from '@/components/PlaceViewer.vue'

Vue.use(Router)

const ROUTES_HOME = [
  { path: '/', name: 'home', component: Home }
]

const ROUTES_SOURCES = [
  {
    path: '/sources',
    name: 'source.list',
    component: SourceViewer
  },
  {
    path: '/sources/:id',
    name: 'source.detail',
    component: SourceViewer,
    props: true
  }
]

const ROUTES_PEOPLE = [
  {
    path: '/people',
    name: 'person.list',
    component: { template: '<div>Not implemented.</div>' }
  }
]

const ROUTES_PLACES = [
  {
    path: '/places',
    name: 'place.list',
    component: PlaceViewer
  },
  {
    path: '/places/:id',
    name: 'place.detail',
    component: PlaceViewer,
    props: true
  }
]

export default new Router({
  routes: [].concat(
    ROUTES_HOME,
    ROUTES_SOURCES,
    ROUTES_PEOPLE,
    ROUTES_PLACES
  )
})
