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
import Event from '../../models/Event'

import PersonList from '../people/PersonList'
import PlaceItem from '../places/PlaceItem'
import CitationItem from '../sources/CitationItem'

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
      this._fetchData()
        .catch(err => console.error(err))
        .then(data => {
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
