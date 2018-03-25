<template>
  <panel-viewer
    :source-url="sourceUrl"
    :selected-id="id"
    title-attr="name"
    @selected="selectItem($event)">
    <template slot-scope="panel">
      <input type="checkbox" id="show_marker_labels" v-model="showMarkerLabels">
      <label for="show_marker_labels">Show marker labels</label>

      <gmap-map
        :center="panel.selectedItem && panel.selectedItem.coords || defaultCoords"
        :zoom="10"
        style="width: 100%; height: 50vh;">

        <!-- TODO: use sortedObjectList from PanelViewer -->
        <gmap-marker
          :key="index"
          v-for="(item, index) in panel.items"
          v-if="item.coords"
          :position="item.coords"
          :clickable="true"
          :title="item.name"
          :label="showMarkerLabels ? item.name : makeNameAbbr(item.name)"
          :opacity="panel.selectedItem === item ? 1 : .7"
          @click="selectItem(item)" />

      </gmap-map>

      <div v-if="panel.selectedItem">
        <h2>
          <span class="fas fa-map-marker-alt"></span> {{ panel.selectedItem.name }}
          <small class="text-muted" v-if="panel.selectedItem.coords">
            {{ panel.selectedItem.coords.lat }}
            {{ panel.selectedItem.coords.lng }}
          </small>
        </h2>

        <!-- NOTE
          these are *direct* parents; yes, there can be multiple such places,
          e.g. historically волость → район.  We do *not* show the full
          breadcrumbs here.
        -->
        <place-item
          v-if="panel.selectedItem.parent_place_ids"
          v-for="placeId in panel.selectedItem.parent_place_ids"
          :key="placeId"
          :id="placeId" />

        <term label="Other names"
          :value="formatMultiNames(panel.selectedItem.other_names)" />
        <!--
        <term label="Pub info" :value="selectedItem.pubinfo" />
        <term label="Abbrev" :value="selectedItem.abbrev" />
        <term label="Repo ID" :value="selectedItem.repository" />
        -->

        <debug-json>{{ panel.selectedItem }}</debug-json>

        <event-table
          v-if="panel.selectedItem"
          :place-id="panel.selectedItem.id"
          no-place
          no-header />
      </div>
    </template>
  </panel-viewer>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'
import Router from 'vue-router'

import PanelViewer from './PanelViewer'
import PlaceItem from './PlaceItem'
import EventTable from './EventTable'
import Term from './Term'
import DebugJson from './DebugJson'

Vue.use(Router)

const SOURCE_URL = 'http://localhost:5000/r/places/'
const GOOGLE_MAPS_API_TOKEN = 'AIzaSyCJkmtBCYVPX9ImKuKdREI35RNDwPjfEQo'

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_TOKEN
  }
})

export default {
  name: 'source-viewer',
  props: {
    id: String
  },
  data () {
    return {
      defaultCoords: {lat: 0, lng: 0},
      sourceUrl: SOURCE_URL,
      showMarkerLabels: false
    }
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        name: 'place.detail',
        params: {id: item.id}
      })
      this.mapCenter = item.coords
    },
    // FIXME: duplicate vs PlaceViewer
    formatMultiNames (value) {
      return value ? value.join(' / ') : null
    },
    makeNameAbbr (name) {
      let words = name.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
        .replace(/\s{2,}/g, ' ')
        .split(' ')

      if (words.length > 1) {
        name = words.map(_ => _[0]).join('')
      }
      return name.slice(0, 3)
    }
  },
  components: {
    PanelViewer,
    PlaceItem,
    EventTable,
    Term,
    DebugJson
  }
}
</script>
