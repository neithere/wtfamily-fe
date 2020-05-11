<template lang="pug">
panel-viewer(
  wide-side-panel
  :source-url="sourceUrl"
  :selected-id="id"
  @selected="selectItem($event)"
)
  template(slot-scope="panel")
    div(v-if="panel.selectedItem")
      h2
        span.fas.fa-book {{ panel.selectedItem.title }}
      term-list(:terms="getTermsFor(panel)")

      .map-section(v-if="placesWithCoords.length")
        l-map(
          ref="map"
          :zoom="mapZoom"
          :min-zoom="mapMinZoom"
          :max-zoom="mapMaxZoom"
          :bounds="mapBounds"
          :padding="mapPadding"
          style="width: 100%; height: 400px;"
        )
          l-control-scale(position="bottomright" :imperial="false")
          l-tile-layer(
            :name="mapTileLayerName"
            :url="mapTileLayerURL"
            :attribution="mapTileLayerAttribution"
          )

          template(v-for="(placeData, _placeId) in places")
            l-marker(
              v-if="placeData.coords"
              :key="_placeId"
              :lat-lng="placeData.coords"
              :title="placeData.name"
            )
              l-popup.place-popup
                strong {{ placeData.name }}

      citation-list(
        :source-id="panel.selectedItem.id"
        no-map
        @added-place="addPlaceToMap"
      )
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'
import { LControlScale, LMarker, LMap, LTileLayer, LPopup } from 'vue2-leaflet'

import PanelViewer from '../common/PanelViewer'
import TermList from '../common/TermList'
import CitationList from './CitationList'

Vue.use(Router)

// TODO TODO TODO
// Update this component according to changes in PanelViewer.
// See PlaceViewer as an example.
// TODO TODO TODO

const SOURCE_URL = 'http://localhost:5000/r/sources/'

// FIXME: move to constants, also use in EventTable
const MAP_FALLBACK_COORDS = { lat: 0, lng: 0 }

export default {
  name: 'source-viewer',
  props: {
    id: String
  },
  data () {
    return {
      sourceUrl: SOURCE_URL,
      selectedItem: null,
      places: {},

      // map
      mapZoom: 7,
      mapMinZoom: 4,
      mapMaxZoom: 13,
      mapPadding: [ 5, 5 ],
      mapTileLayerName: 'OpenStreetMap',
      mapTileLayerURL: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      mapTileLayerAttribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  computed: {
    mapBounds () {
      return this.placesWithCoords.map(_ => _.coords) ||
        [MAP_FALLBACK_COORDS]
    },
    placesWithCoords () {
      return Object.values(this.places || {}).filter(_ => _.coords)
    }
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        name: 'source.detail',
        params: { id: item.id }
      })

      this.places = {}
    },
    getTermsFor (panel) {
      return [
        { value: panel.selectedItem.author, label: 'Author' },
        { value: panel.selectedItem.pubinfo, label: 'Pub info' },
        { value: panel.selectedItem.abbrev, label: 'Abbrev' },
        { value: panel.selectedItem.repository, label: 'Repo ID' }
      ]
    },
    addPlaceToMap (place) {
      this.$set(this.places, place.id, place)
    }
  },
  components: {
    LControlScale,
    LMarker,
    LMap,
    LTileLayer,
    LPopup,
    PanelViewer,
    CitationList,
    TermList
  }
}
</script>
