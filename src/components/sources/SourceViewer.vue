<template lang="pug">
panel-viewer(
  wide-side-panel
  :source-url="sourceUrl"
  :selected-id="id"
  @selected="selectItem($event)"
)
  template(slot-scope="panel")
    div(v-if="panel.selectedItem")
      h2
        span.fas.fa-book {{ panel.selectedItem.title }}
      term-list(:terms="getTermsFor(panel)")
      citation-list(:source-id="panel.selectedItem.id")
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'

import PanelViewer from '../common/PanelViewer'
import TermList from '../common/TermList'
import CitationList from './CitationList'

Vue.use(Router)

// TODO TODO TODO
// Update this component according to changes in PanelViewer.
// See PlaceViewer as an example.
// TODO TODO TODO

const SOURCE_URL = 'http://localhost:5000/r/sources/'

export default {
  name: 'source-viewer',
  props: {
    id: String
  },
  data () {
    return {
      sourceUrl: SOURCE_URL,
      selectedItem: null
    }
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        name: 'source.detail',
        params: { id: item.id }
      })
    },
    getTermsFor (panel) {
      return [
        { value: panel.selectedItem.author, label: 'Author' },
        { value: panel.selectedItem.pubinfo, label: 'Pub info' },
        { value: panel.selectedItem.abbrev, label: 'Abbrev' },
        { value: panel.selectedItem.repository, label: 'Repo ID' }
      ]
    }
  },
  components: {
    PanelViewer,
    CitationList,
    TermList
  }
}
</script>
