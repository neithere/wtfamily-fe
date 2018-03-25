<template>
  <ul :class="{'list-inline': inline}">
    <li
      v-for="person in object_list"
      :key="person.id"
      v-if="person.id !== excludePersonId"
      :class="{'list-inline-item': inline}">

      <person-list-item
        :person-data="person"
        :no-patronymic="noPatronymic" />

    </li>
  </ul>
</template>

<script>
import { sortBy } from 'lodash'
import Axios from 'axios'

import PersonListItem from './PersonListItem'

const BASE_URL_BY_IDS = 'http://localhost:5000/r/people/?ids='
const BASE_URL_BY_EVENT = 'http://localhost:5000/r/people/?by_event='

const SORT_BY_KEY = ['birth', 'name']

export default {
  props: {
    // mutually exclusive
    ids: Array,
    eventId: String,

    excludePersonId: String,
    noPatronymic: Boolean,
    inline: Boolean
  },
  data () {
    return {
      object_list: null
    }
  },
  created () {
    let url

    if (this.ids && this.ids.length) {
      url = BASE_URL_BY_IDS + this.ids
    } else if (this.eventId) {
      url = BASE_URL_BY_EVENT + this.eventId
    }

    if (url) {
      Axios.get(url).then(resp => {
        this.object_list = sortBy(resp.data, SORT_BY_KEY)
      })
    }
  },
  components: {
    PersonListItem
  }
}
</script>

<style lang="sass" scoped>
</style>
