<template>
  <div>

    <div class="map-section"
      v-if="!placeId && placesWithCoords.length">

      <l-map ref="map"
        :zoom="mapZoom"
        :min-zoom="mapMinZoom"
        :max-zoom="mapMaxZoom"
        :bounds="mapBounds"
        :padding="mapPadding"
        style="width: 100%; height: 400px;">

        <l-control-scale position="bottomright" :imperial="false"></l-control-scale>

        <l-tile-layer
          :name="mapTileLayerName"
          :url="mapTileLayerURL"
          :attribution="mapTileLayerAttribution" />

        <template
          v-for="(placeData, _placeId) in places">
          <l-marker
            v-if="placeData.coords"
            :key="_placeId"
            :lat-lng="placeData.coords"
            :title="placeData.name">

            <l-popup class="place-popup">
              <strong>{{ placeData.name }}</strong>
              <ul class="place-popup-event-list">
                <li class="place-popup-event-list-item"
                  v-for="event in eventsByPlace[_placeId]"
                  :key="event.id">
                  <span class="place-popup-event-list-item-col">
                    {{ event.date }} — {{ event.type }}
                  </span>
                  <person-list inline brief
                    class="place-popup-event-list-item-col place-popup-event-list-item-person-list"
                    v-if="!personId && !noPeople"
                    :event-id="event.id"
                    :exclude-person-id="excludePersonId" />
                </li>
              </ul>
            </l-popup>

          </l-marker>
        </template>
      </l-map>
    </div>

    <table class="table table-hover table-event mb-0">
      <thead v-if="!noHeader">
        <th scope="col" title="Event id"
          v-if="showId">
          <span class="fas fa-list-ol"></span>
        </th>
        <th scope="col" title="Event date">
          <span class="fas fa-calendar"></span>
        </th>
        <th scope="col" title="Event place"
          v-if="!noPlace">
          <span class="fas fa-map-marker-alt"></span>
        </th>
        <th scope="col" title="Event type">
          <span class="fas fa-clipboard-list"></span>
        </th>
        <th scope="col" title="People related to the event"
          v-if="!noPeople">
          <span class="fas fa-users"></span>
        </th>
        <th scope="col" title="Event description and citations"
          v-if="!noDescription">
          <span class="fas fa-quote-right"></span>
        </th>
      </thead>
      <tbody>
        <tr v-for="event in object_list" :key="event.id">
          <th scope="row" v-if="showId">{{ event.id }}</th>
          <td scope="col">{{ event.date }}</td>
          <td scope="col" v-if="!noPlace">
            <place-item
              v-if="event.place_id"
              :id="event.place_id"
              @loaded="addPlaceToMap" />
          </td>
          <td scope="col">{{ event.type }}</td>
          <td scope="col"
            v-if="!noPeople">
            <person-list inline
              :event-id="event.id"
              :exclude-person-id="excludePersonId" />
          </td>
          <td scope="col" class="cell-summary"
            v-if="!noDescription">
            <p class="small">{{ event.summary }}</p>
            <ul v-if="!noCitations && event.citation_ids" class="list-inline">
              <li v-for="citationId in event.citation_ids"
                :key="citationId"
                class="list-inline-item">
                <citation-item
                  :id="citationId" />
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>

    <slot name="no-data"
      v-if="!object_list || !object_list.length"></slot>
  </div>
</template>

<script>
import { LControlScale, LMarker, LMap, LTileLayer, LPopup } from 'vue2-leaflet'

import Event from '../../models/Event'

import PersonList from '../people/PersonList'
import PlaceItem from '../places/PlaceItem'
import CitationItem from '../sources/CitationItem'

const MAP_FALLBACK_COORDS = { lat: 0, lng: 0 }

export default {
  props: {
    // data source
    ids: Array,
    placeId: String,
    citationId: String,
    personId: String,
    // NOTE: adding something here? update `watch`, too.

    // display settings
    noHeader: Boolean,
    noPlace: Boolean,
    noPeople: Boolean,
    noDescription: Boolean,
    noCitations: Boolean,
    showId: Boolean,
    excludePersonId: String
  },
  data () {
    return {
      object_list: null,

      // cache for places metadata fetched by one component and used by another
      places: {},

      isTimelineVisible: true,
      isMapVisible: false,

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
  created () {
    this.fetchData()
  },
  computed: {
    mapBounds () {
      return this.placesWithCoords.map(_ => _.coords) ||
        [MAP_FALLBACK_COORDS]
    },
    placesWithCoords () {
      return Object.values(this.places || {}).filter(_ => _.coords)
    },
    eventsByPlace () {
      let mapping = {}

      if (!this.object_list) {
        return
      }

      this.object_list.forEach(event => {
        let placeId = event.place_id
        let place = this.places[placeId]

        if (!place) {
          return
        }

        if (!mapping[placeId]) {
          mapping[placeId] = []
        }

        mapping[placeId].push(event)
      })

      return mapping
    }
  },
  methods: {
    fetchData () {
      this._fetchData()
        .catch(err => console.error(err))
        .then(data => {
          this.places = {}
          this.object_list = data
        })
    },
    _fetchData () {
      if (this.ids) {
        return Event.findByIds(this.ids)
      }
      if (this.placeId) {
        return Event.findByPlace(this.placeId)
      }
      if (this.citationId) {
        return Event.findByCitation(this.citationId)
      }
      /* NOTE: apparently this is not supported by backend
      if (this.personId) {
        return Event.findByPerson(this.personId)
      }
      */

      throw Error('No specific URL could be generated')
    },
    addPlaceToMap (place) {
      if (!this.places[place.id]) {
        this.$set(this.places, place.id, place)
      }
    }
  },
  watch: {
    ids (val, oldVal) {
      // FIXME: for some reason it re-fetches data sometimes (in parent
      // component), and somehow visually equal arrays appear different in the
      // comparison below (OTOH, maybe try `JSON.parse(JSON.stringify(x))` on
      // these values before printing them to console?). This leads to the map
      // sources being removed.
      // Either solve that problem outside of this component, or make this
      // component more robust (either compare arrays better, or recompute data
      // for the map).
      this.fetchData()
    },
    placeId (val, oldVal) {
      this.fetchData()
    },
    citationId (val, oldVal) {
      this.fetchData()
    }
  },
  components: {
    LControlScale,
    LMarker,
    LMap,
    LTileLayer,
    LPopup,
    PersonList,
    PlaceItem,
    CitationItem
  }
}
</script>

<style lang="sass" scoped>

.table-event td
  font-size: 90%

</style>
