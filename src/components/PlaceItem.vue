<template>
  <popper trigger="hover" :options="{placement: 'top-start'}">

    <div class="popper card">
      <div class="card-body">
        <h5 class="card-title">
          <span class="fas fa-map-marker-alt"></span>
          {{ name }}
        </h5>
        <h6 class="card-subtitle text-muted">TODO: parent places: {{ parent_place_ids }}</h6>
        <p class="card-text">
          AKA:
          <span v-if="other_names"
            v-for="name in other_names" :key="name"
            class="item">{{ name }}</span>
        </p>
        <p class="card-text">
          TODO: show map
          {{ coords }}
        </p>
      </div>
    </div>

    <abbr title="" slot="reference">
      <span class="fas fa-map-marker-alt"></span>
      {{ name }}
    </abbr>

  </popper>
</template>

<script>
import Axios from 'axios'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

const BASE_URL = 'http://localhost:5000/r/places/'

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
  methods: {
    fetchData () {
      const url = BASE_URL + this.id

      Axios.get(url).then(resp => {
        console.log(resp)
        Object.keys(resp.data).forEach(k => {
          this[k] = resp.data[k]
          console.log(k, this[k])
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
