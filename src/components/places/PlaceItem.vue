<template>
  <popper trigger="hover" :options="{placement: 'top-start'}">

    <div class="popper card">
      <div class="card-body">
        <h5 class="card-title">
          <span class="fas fa-map-marker-alt"></span>
          {{ name }}
        </h5>
        <h6 class="card-subtitle text-muted">TODO: parent places: {{ parent_place_ids }}</h6>
        <p class="card-text" v-if="otherNames">
          AKA:
          <span
            v-for="(otherName, index) in otherNames" :key="index"
            class="item">{{ otherName }}</span>
        </p>
        <p class="card-text">
          TODO: show map
          {{ coords }}
        </p>
      </div>
    </div>

    <abbr title="" slot="reference">
      <span class="fas fa-map-marker-alt"></span>
      <router-link :to="{name: 'place.detail', params: {id: id}}">
        {{ name }}
      </router-link>
    </abbr>

  </popper>
</template>

<script>
import Axios from 'axios'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

const BASE_URL = 'http://localhost:5000/r/places/'

const unique = (xs) => new Set([...xs])

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      coords: null,
      name: null,
      other_names: null,
      parent_place_ids: null,
      citation_ids: null,
      note_ids: null
    }
  },
  created () {
    this.fetchData()
  },
  computed: {
    otherNames () {
      return this.other_names ? unique(this.other_names) : null
    }
  },
  methods: {
    fetchData () {
      const url = BASE_URL + this.id

      Axios.get(url).then(resp => {
        Object.keys(resp.data).forEach(k => {
          this[k] = resp.data[k]
        })
      })
    }
  },
  components: {
    Popper
  }
}
</script>

<style lang="sass" scoped>
  .popper.card
    max-width: 500px

  .item + .item:before
    content: "; "
</style>
