<template>
  <div class="panel-viewer">
    <div class="side-panel col-md-4">
      <div v-if="!objectList.length">
        <span class="fas fa-circle-notch fa-spin fa-5x"></span>
      </div>
      <div v-if="objectList.length">
        <p>
          <input v-model="query" type="search" class="query" name="query"
            placeholder="Filter items">
        </p>
        <ul class="list-group">
          <li v-for="item in sortedObjectList" v-if="matchesQuery(item)"
            @click="selectItem(item.id)"
            :key="item.id"
            :class="{'list-group-item': true, active: item.id === selectedId}">
            {{ item[titleAttr] }}
          </li>
        </ul>
      </div>
    </div>
    <div class="main-panel col-md-8">
      <slot :items="sortedObjectList"></slot>
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
    titleAttr: {
      type: String,
      default: 'title'
    }
  },
  data () {
    return {
      selectedId: null,
      objectList: [],
      query: ''
    }
  },
  created () {
    Axios.get(this.sourceUrl).then(resp => {
      this.objectList = resp.data
    })
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
    }
  },
  methods: {
    selectItem (id) {
      this.selectedId = id

      this.$emit('selected', this.selectedItem)
    },
    matchesQuery (item) {
      var query = this.query || ''
      var title = item[this.titleAttr] || ''
      var tokens = query.toLowerCase().split(' ')
      var text = title.toLowerCase()

      if (this.query === '') {
        return true
      }
      return tokens.map(_ => text.includes(_)).every(_ => _)
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
      height: 80vh
      overflow: hidden
      overflow-y: scroll

      .list-group-item
        cursor: pointer

.query
  width: 100%
</style>
