<template>
  <panel-viewer wide-side-panel
    :source-url="sourceUrl"
    :selected-id="id"
    @selected="selectItem($event)">
    <template slot-scope="panel">
      <div v-if="panel.selectedItem">
        <h2><span class="fas fa-book"></span> {{ panel.selectedItem.title }}</h2>

        <term label="Author" :value="panel.selectedItem.author" />
        <term label="Pub info" :value="panel.selectedItem.pubinfo" />
        <term label="Abbrev" :value="panel.selectedItem.abbrev" />
        <term label="Repo ID" :value="panel.selectedItem.repository" />

        {{panel.selectedItem.id}}
        <citation-list :source-id="panel.selectedItem.id" />
      </div>
    </template>
  </panel-viewer>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'

import PanelViewer from '../common/PanelViewer'
import Term from '../common/Term'
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
    }
  },
  components: {
    PanelViewer,
    CitationList,
    Term
  }
}
</script>
