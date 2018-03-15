<template>
  <panel-viewer :source-url="sourceUrl" @selected="selectedItem = $event">
    <div v-if="selectedItem">
      <h2><span class="fas fa-book"></span> {{selectedItem.title}}</h2>

      <term label="Author" :value="selectedItem.author" />
      <term label="Pub info" :value="selectedItem.pubinfo" />
      <term label="Abbrev" :value="selectedItem.abbrev" />
      <term label="Repo ID" :value="selectedItem.repository" />

      <citation-list :source-id="selectedItem.id" />
    </div>
  </panel-viewer>
</template>

<script>
import PanelViewer from './PanelViewer'
import CitationList from './CitationList'
import Term from './Term'

const SOURCE_URL = 'http://localhost:5000/r/sources/'

export default {
  name: 'source-reader',
  data () {
    return {
      sourceUrl: SOURCE_URL,
      selectedItem: null
    }
  },
  components: {
    PanelViewer,
    CitationList,
    Term
  }
}
</script>
