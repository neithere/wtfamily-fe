<template>
  <div>
    <table class="table table-hover table-event mb-0">
      <thead v-if="!noHeader">
        <th scope="col" title="Event id" v-if="showId"><span class="fas fa-list-ol"></span></th>
        <th scope="col" title="Event date"><span class="fas fa-calendar"></span></th>
        <th scope="col" title="Event place" v-if="!noPlace"><span class="fas fa-map-marker-alt"></span></th>
        <th scope="col" title="Event type"><span class="fas fa-clipboard-list"></span></th>
        <th scope="col" title="People related to the event"><span class="fas fa-users"></span></th>
        <th scope="col" title="Event description and citations"><span class="fas fa-quote-right"></span></th>
      </thead>
      <tbody>
        <tr v-for="event in object_list" :key="event.id">
          <th scope="row" v-if="showId">{{ event.id }}</th>
          <td scope="col">{{ event.date }}</td>
          <td scope="col" v-if="!noPlace">
            <place-item v-if="event.place_id" :id="event.place_id" />
          </td>
          <td scope="col">{{ event.type }}</td>
          <td scope="col">
            <person-list inline
              :event-id="event.id"
              :exclude-person-id="excludePersonId" />
          </td>
          <td scope="col" class="cell-summary">
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
import { sortBy } from 'lodash'
import Axios from 'axios'

import PersonList from './PersonList'
import PlaceItem from './PlaceItem'
import CitationItem from './CitationItem'

const EVENTS_BY_IDS_URL = 'http://localhost:5000/r/events/?ids='
const EVENTS_BY_CITATION_URL = 'http://localhost:5000/r/events/?proven_by='
const EVENTS_BY_PLACE_URL = 'http://localhost:5000/r/events/?place_id='

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
    noCitations: Boolean,
    showId: Boolean,
    excludePersonId: String
  },
  data () {
    return {
      object_list: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const url = this.getURL()
      console.log({url})

      if (!url) {
        console.error('No specific URL could be generated')
        return
      }

      Axios.get(url).then(resp => {
        this.object_list = sortBy(resp.data, 'date_year')
      })
    },
    getURL () {
      if (this.ids) {
        return EVENTS_BY_IDS_URL + this.ids.join(',')
      }
      if (this.placeId) {
        return EVENTS_BY_PLACE_URL + this.placeId
      }
      if (this.citationId) {
        return EVENTS_BY_CITATION_URL + this.citationId
      }
    }
  },
  watch: {
    ids () {
      this.fetchData()
    },
    placeId () {
      this.fetchData()
    },
    citationId () {
      this.fetchData()
    }
  },
  components: {
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
