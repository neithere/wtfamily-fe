<template>
  <div class="panel-viewer">
    <div class="side-panel col-md-4">
      <div v-if="!object_list.length">
        <pulse-loader></pulse-loader>
      </div>
      <div v-if="object_list.length">
        <p><input v-model="query" name="query" placeholder="Filter items"></p>
        <ul class="list-group">
          <li v-for="item in object_list" v-if="matchesQuery(item)"
            @click="selectItem(item.id)"
            :key="item.id"
            :class="{'list-group-item': true, active: item.id === selectedId}">
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
    <div class="main-panel col-md-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default {
  name: 'panel-viewer',
  props: {
    sourceUrl: String
  },
  data () {
    return {
      selectedId: null,
      object_list: [],
      query: ''
    }
  },
  created () {
    Axios.get(this.sourceUrl).then(items => {
      this.object_list = items.data
    })
  },
  computed: {
    selectedItem () {
      if (this.selectedId === null) {
        return
      }
      return this.object_list.find(_ => _.id === this.selectedId)
    }
  },
  methods: {
    selectItem (id) {
      this.selectedId = id

      this.$emit('selected', this.selectedItem)
    },
    matchesQuery (item) {
      var tokens = this.query.toLowerCase().split(' ')
      var text = item.title.toLowerCase()

      if (this.query === '') {
        return true
      }
      return tokens.map(_ => text.includes(_)).every(_ => _)
    }
  },
  components: {
    PulseLoader
  }
}
</script>

<style lang="sass">
.panel-viewer
  overflow: hidden

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
</style>
