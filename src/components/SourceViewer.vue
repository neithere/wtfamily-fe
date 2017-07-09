<template>
  <div class="source-reader">
    <div class="side-panel col-md-4">
      <div v-if="!object_list.length">
        <pulse-loader></pulse-loader>
      </div>
      <div v-if="object_list.length" class="object-list">
        <p><input v-model="query" name="query" placeholder="Filter items"></p>
        <ul class="list-group">
          <li v-for="item in object_list" v-if="matchesQuery(item)"
            @click="selectItem(item.id)"
            track-by="id" 
            :class="{'list-group-item': true, active: item.id === selectedId}">
            {{item.title}}
          </li>
        </ul>
      </div>
    </div>
    <div class="main-panel col-md-8">
      <div v-if="selectedItem">
        <h1>{{selectedItem.title}}</h1>
        {{selectedItem.pubinfo}}
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

const SOURCE_URL = 'http://localhost:5000/r/sources/'

export default {
  name: 'source-reader',
  data () {
    return {
      selectedId: null,
      object_list: [],
      query: ''
    }
  },
  created () {
    Axios.get(SOURCE_URL).then((items) => {
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
    },
    matchesQuery (item) {
      var tokens = this.query.toLowerCase().split(' ')
      var text = item.title.toLowerCase()

      if (this.query === '') {
        return true
      }
      return tokens.map(token => text.includes(token)).every(_ => _)
    }
  },
  components: {
    PulseLoader
  }
}
</script>

<style>
.source-reader {
  overflow: hidden;

  .main-panel {
    /*
    float: right;
    width: 70%;
    */
  }
  .side-panel {
    /*
    float: left;
    width: 30%;
    */

    .object-list {
      height: 100%; 
      overflow-y: scroll;
    }
  }
}
</style>
