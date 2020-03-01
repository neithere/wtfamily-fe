<template>
  <panel-viewer
    :source-url="sourceUrl"
    :selected-id="id"
    title-attr="name"
    @selected="selectItem($event)">

    <template slot-scope="panel">
      <!--
      <input type="checkbox" id="show_marker_labels" v-model="showMarkerLabels">
      <label for="show_marker_labels">Show marker labels</label>
      -->

      <l-map ref="map"
        :center="panel.selectedItem && panel.selectedItem.coords || defaultCoords"
        :zoom="zoom"
        :options="mapOptions"
        @update:zoom="zoom = $event"
        style="width: 100%; height: 50vh;">

        <l-control-layers position="topright"  ></l-control-layers>
        <l-control-scale position="bottomright" :imperial="false"></l-control-scale>

        <l-tile-layer
          v-for="tileProvider in tileProviders"
          :key="tileProvider.name"
          :name="tileProvider.name"
          :visible="tileProvider.visible"
          :url="tileProvider.url"
          :attribution="tileProvider.attribution"
          layer-type="base" />

        <template v-for="(item, index) in panel.items">
          <!-- TODO: detect non-point elems (cities, regions, countries) and
               draw a circle instead of the default marker.  There's `l-circle`
               (fixed radius) and `l-circle-marker` (just a shaped marker).

               Perhaps set a flat on backend depending on place type and/or ask
               user to explicitly define a custom attribute?
          -->
          <l-marker
            v-if="item.coords"
            :key="index"
            :lat-lng="item.coords"
            :title="item.name"
            :icon="item.icon"
            @click="selectItem(item)">

            <l-icon
              v-if="panel.selectedItem === item"
              :icon-url="markerSelectedURL"></l-icon>

            <l-tooltip :options="{permanent: false, interactive: true}">
              <strong>{{ item.name }}</strong>
              <p v-if="item.other_names.length">
                Also known as:
                <ul>
                  <li
                    v-for="(altName, altNameIndex) in item.other_names"
                    :key="altNameIndex">
                    {{ altName }}
                  </li>
                </ul>
              </p>
            </l-tooltip>

          </l-marker>
        </template>
      </l-map>

      <!--
      <gmap-map
        :center="panel.selectedItem && panel.selectedItem.coords || defaultCoords"
        :zoom="10"
        style="width: 100%; height: 50vh;">

        TODO: use sortedObjectList from PanelViewer
        <div v-if="item.coords">
          <gmap-marker
            :key="index"
            v-for="(item, index) in panel.items"
            :position="item.coords"
            :clickable="true"
            :title="item.name"
            :label="showMarkerLabels ? item.name : makeNameAbbr(item.name)"
            :opacity="panel.selectedItem === item ? 1 : .7"
            @click="selectItem(item)" />
        </div>

      </gmap-map>
      -->

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
        <div class="direct-parent-places"
          v-if="panel.selectedItem.parent_place_ids">
          Direct parents:
          <place-item class="direct-parent-places-item"
            v-for="placeId in panel.selectedItem.parent_place_ids"
            :key="placeId"
            :id="placeId" />
        </div>

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
import Vue from 'vue'
import { L, LControlLayers, LControlScale, LIcon, LMap, LMarker, LTileLayer, LTooltip } from 'vue2-leaflet'
import Router from 'vue-router'

import PanelViewer from '../common/PanelViewer'
import Term from '../common/Term'
import DebugJson from '../common/DebugJson'
import PlaceItem from './PlaceItem'
import EventTable from '../events/EventTable'

Vue.use(Router)

// HACK for Leaflet default icon + Webpack.
// See this long thread: https://github.com/Leaflet/Leaflet/issues/4968
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

// TODO: use Model instead?
const SOURCE_URL = 'http://localhost:5000/r/places/'

export default {
  name: 'source-viewer',
  props: {
    id: String
  },
  data () {
    return {
      zoom: 10,
      defaultCoords: { lat: 0, lng: 0 },
      sourceUrl: SOURCE_URL,
      // showMarkerLabels: false,
      mapOptions: {},
      tileProviders: [
        {
          name: 'OpenStreetMap',
          visible: true,
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        },
        {
          name: 'Wikimedia',
          visible: false,
          url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
          attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>'
        },
        {
          name: 'OpenRailwayMap',
          visible: false,
          url: 'https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png',
          attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        },
        {
          name: 'OpenMapSurfer AdminBounds',
          visible: false,
          url: 'https://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}',
          attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      ],
      markerSelectedURL: '/images/map-marker-selected.png'
    }
  },
  computed: {
    itemsAdapted () {
      // TODO: use sortedObjectList from PanelViewer
      return this.panel.items.map(_ => ({
        ..._,
        icon: {
          prefix: '',
          glyph: 'A'
        }
      }))
    }
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        name: 'place.detail',
        params: { id: item.id }
      })
      this.mapCenter = item.coords
    },
    // FIXME: duplicate vs PlaceViewer
    formatMultiNames (value) {
      return value ? value.join(' / ') : null
    }
  },
  components: {
    PanelViewer,
    PlaceItem,
    EventTable,
    LControlLayers,
    LControlScale,
    LIcon,
    LMap,
    LMarker,
    LTileLayer,
    LTooltip,
    Term,
    DebugJson
  }
}
</script>

<style lang="sass" scoped>
@import "~leaflet/dist/leaflet.css"

.direct-parent-places
  &-item:after
    content: ", "

  &-item:last-child:after
    content: ""
</style>
