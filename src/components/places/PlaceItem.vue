<template lang="pug">
popper(
  trigger="hover"
  :options="{placement: 'top-start'}"
  @show="visible = true"
  @hide="visible = false"
)
  .popper.card
    .card-body
      h5.card-title
        span.fas.fa-map-marker-alt
        |
        | {{ name }}
      h6.card-subtitle.text-muted TODO: parent places: {{ parent_place_ids }}
      p.card-text(v-if="otherNames")
        | AKA:
        |
        span.item(v-for="(otherName, index) in otherNames" :key="index") {{ otherName }}
      p.card-text
        l-map(
          v-if="visible && coords"
          ref="map"
          :center="coords"
          :zoom="mapZoom"
          style="width: 400px; height: 200px;"
        )
          l-tile-layer(
            :name="mapTileLayerName"
            :url="mapTileLayerURL"
            :attribution="mapTileLayerAttribution"
          )
          l-marker(
            :lat-lng="coords"
            :title="name"
          )

  abbr(title="" slot="reference")
    span.fas.fa-map-marker-alt
    router-link(:to="{name: 'place.detail', params: {id: id}}") {{ name }}
</template>

<script>
import Axios from 'axios'
import { LMarker, LMap, LTileLayer } from 'vue2-leaflet'
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
      visible: false,
      coords: null,
      name: null,
      other_names: null,
      parent_place_ids: null,
      citation_ids: null,
      note_ids: null,
      mapZoom: 7,
      mapTileLayerName: 'OpenStreetMap',
      mapTileLayerURL: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      mapTileLayerAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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

        this.$emit('loaded', resp.data)
      })
    }
  },
  components: {
    LMarker,
    LMap,
    LTileLayer,
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
