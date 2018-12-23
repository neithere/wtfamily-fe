<template>
  <div class="panel-viewer">
    <div class="side-panel" :class="sidePanelGridClass">
      <div v-if="!objectList.length">
        <span class="fas fa-circle-notch fa-spin fa-5x"></span>
      </div>
      <div v-if="objectList.length">
        <p>
          <input v-model="query" type="search" class="query" name="query"
            placeholder="Filter items">
        </p>
        <ul class="list-group">
          <template v-if="matchesQuery(item)">
            <li v-for="item in sortedObjectList"
              @click="publishSelectedItem(item)"
              :key="item.id"
              :class="{'list-group-item': true, active: item.id === selectedId}">
              {{ item[titleAttr] }}
            </li>
          </template>
        </ul>
      </div>
    </div>
    <div class="main-panel container-fluid" :class="mainPanelGridClass">
      <slot
        :items="sortedObjectList"
        :selected-item="selectedItem">
      </slot>
    </div>
  </div>
</template>

<script>
import { sortBy } from 'lodash'
import Axios from 'axios'

export default {
  name: 'panel-viewer',
  props: {
    sourceUrl: String,
    selectedId: String,
    titleAttr: {
      type: String,
      default: 'title'
    },
    otherNamesAttr: {
      type: String,
      default: 'other_names'
    },
    wideSidePanel: Boolean
  },
  data () {
    return {
      objectList: [],
      query: ''
    }
  },
  created () {
    let maybeFetchOne = id => {
      let objectURL = this.sourceUrl + id

      if (!id) {
        return Promise.resolve(true)
      }

      return Axios.get(objectURL).then(resp => {
        this.objectList = [resp.data]
      })
    }
    let fetchAll = () => {
      Axios.get(this.sourceUrl).then(resp => {
        this.objectList = resp.data
      })
    }

    return maybeFetchOne(this.selectedId).then(fetchAll)
  },
  computed: {
    sortedObjectList () {
      return sortBy(this.objectList, this.titleAttr)
    },
    selectedItem () {
      if (this.selectedId === null) {
        return
      }
      return this.objectList.find(_ => _.id === this.selectedId)
    },
    mainPanelGridClass () {
      return this.wideSidePanel ? 'col-md-9' : 'col-md-10'
    },
    sidePanelGridClass () {
      return this.wideSidePanel ? 'col-md-3' : 'col-md-2'
    }
  },
  methods: {
    publishSelectedItem (item) {
      this.$emit('selected', item)
    },
    matchesQuery (item) {
      var query = this.query || ''
      var title = item[this.titleAttr] || ''
      var otherNames = item[this.otherNamesAttr] || ''
      var tokens = query.toLowerCase().split(' ')
      var text = `${title} ${otherNames}`.toLowerCase()

      if (this.query === '') {
        return true
      }
      return tokens.map(_ => text.includes(_)).every(_ => _)
    }
  },
  watch: {
    selectedId (newValue, oldValue) {
      this.publishSelectedItem(this.selectedItem)
    }
  },
  components: {
  }
}
</script>

<style lang="sass" scoped>
.panel-viewer
  overflow: hidden
  display: flex

  .main-panel
    // float: right;
    // width: 70%;

  .side-panel
    // float: left;
    // width: 30%;

    .list-group
      max-height: 83vh
      overflow: hidden
      overflow-y: scroll

      .list-group-item
        cursor: pointer

.query
  width: 100%
</style>
