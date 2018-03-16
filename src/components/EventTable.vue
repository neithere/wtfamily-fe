<template>
  <div>
    <table class="table table-hover table-event mb-0">
      <thead v-if="!noHeader">
        <th scope="col" v-if="showId"><span class="fas fa-list-ol"></span></th>
        <th scope="col"><span class="fas fa-calendar"></span></th>
        <th scope="col"><span class="fas fa-map-marker-alt"></span></th>
        <th scope="col"><span class="fas fa-clipboard-list"></span></th>
        <th scope="col"><span class="fas fa-users"></span></th>
        <th scope="col"><span class="fas fa-quote-right"></span></th>
      </thead>
      <tbody>
        <tr v-for="event in object_list" :key="event.id">
          <th scope="row" v-if="showId">{{ event.id }}</th>
          <td scope="col">{{ event.date }}</td>
          <td scope="col">
            <place-item v-if="event.place_id" :id="event.place_id" />
          </td>
          <td scope="col">{{ event.type }}</td>
          <td scope="col">
            <person-list :event-id="event.id" />
          </td>
          <td scope="col" class="cell-summary">{{ event.summary }}</td>
        </tr>
      </tbody>
    </table>

    <slot name="no-data"
      v-if="!object_list || !object_list.length"></slot>
  </div>
</template>

<script>
import Axios from 'axios'

import PersonList from './PersonList'
import PlaceItem from './PlaceItem'

const EVENTS_BY_CITATION_URL = 'http://localhost:5000/r/events/?proven_by='

export default {
  props: {
    // data source
    citationId: String,

    // display settings
    noHeader: Boolean,
    showId: Boolean
  },
  data () {
    return {
      object_list: null
    }
  },
  created () {
    const url = EVENTS_BY_CITATION_URL + this.citationId

    Axios.get(url).then(resp => {
      this.object_list = resp.data
    })
  },
  components: {
    PersonList,
    PlaceItem
  }
}
</script>

<style lang="sass" scoped>
.table-event td
  font-size: 90%
</style>
