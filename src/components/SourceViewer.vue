<template>
  <panel-viewer :source-url="sourceUrl" @selected="selectedItem = $event">
    <div v-if="selectedItem">
      <h1>{{selectedItem.title}}</h1>
      {{selectedItem.pubinfo}}
    </div>
  </panel-viewer>
</template>

<script>
import PanelViewer from './PanelViewer'

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
    PanelViewer
  }
}
</script>

<style lang="sass">
.source-reader
  overflow: hidden

  .main-panel
    // float: right;
    // width: 70%;

  .side-panel
    // float: left;
    // width: 30%;

    .object-list
      height: 100%
      overflow-y: scroll

      .list-group-item
        cursor: pointer
</style>
