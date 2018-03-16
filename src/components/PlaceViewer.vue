<template>
  <panel-viewer
    :source-url="sourceUrl"
    title-attr="name"
    @selected="selectItem($event)">

  <template slot-scope="panel">

    <input type="checkbox" id="show_marker_labels" v-model="showMarkerLabels">
    <label for="show_marker_labels">Show marker labels</label>

    <gmap-map
      :center="selectedItem && selectedItem.coords ? selectedItem.coords : defaultCoords"
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
        :label="showMarkerLabels ? item.name : ''"
        :opacity="selectedItem === item ? 1 : .7"
        @click="selectedItem = item" />

    </gmap-map>

    <div v-if="selectedItem">
      <h2>
        <span class="fas fa-map-marker-alt"></span> {{ selectedItem.name }}
        <small class="text-muted">
          {{ selectedItem.coords.lat }} {{ selectedItem.coords.lng }}
        </small>
      </h2>

      <!-- NOTE
        these are *direct* parents; yes, there can be multiple such places,
        e.g. historically волость → район.  We do *not* show the full
        breadcrumbs here.
      -->
      <place-item
        v-if="selectedItem.parent_place_ids"
        v-for="placeId in selectedItem.parent_place_ids"
        :key="placeId"
        :id="placeId" />

      <term label="Other names" :value="selectedItem.other_names.join('; ')" />
      <!--
      <term label="Pub info" :value="selectedItem.pubinfo" />
      <term label="Abbrev" :value="selectedItem.abbrev" />
      <term label="Repo ID" :value="selectedItem.repository" />
      -->

      {{ selectedItem }}

      <event-table
        v-if="selectedItem"
        :place-id="selectedItem.id"
        no-place
        no-header />
    </div>
  </template>
  </panel-viewer>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps'
import Vue from 'vue'

import PanelViewer from './PanelViewer'
import PlaceItem from './PlaceItem'
import EventTable from './EventTable'
import Term from './Term'

const SOURCE_URL = 'http://localhost:5000/r/places/'
const GOOGLE_MAPS_API_TOKEN = 'AIzaSyCJkmtBCYVPX9ImKuKdREI35RNDwPjfEQo'

Vue.use(VueGoogleMaps, {
  load: {
    key: GOOGLE_MAPS_API_TOKEN
  }
})

export default {
  name: 'source-reader',
  data () {
    return {
      defaultCoords: {lat: 0, lng: 0},
      sourceUrl: SOURCE_URL,
      selectedItem: null,
      showMarkerLabels: false
    }
  },
  methods: {
    selectItem (item) {
      this.selectedItem = item
      this.mapCenter = item.coords
    }
  },
  components: {
    PanelViewer,
    PlaceItem,
    EventTable,
    Term
  }
}
</script>
