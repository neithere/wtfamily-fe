<template>
  <ul class="list-inline">
    <li v-for="person in object_list" :key="person.id"
      class="list-inline-item">
      <person-list-item :person-data="person" />
    </li>
  </ul>
</template>

<script>
import Axios from 'axios'

import PersonListItem from './PersonListItem'

const BASE_URL = 'http://localhost:5000/r/people/?by_event='

export default {
  props: {
    eventId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      object_list: null
    }
  },
  created () {
    Axios.get(BASE_URL + this.eventId).then(resp => {
      this.object_list = resp.data
    })
  },
  components: {
    PersonListItem
  }
}
</script>

<style lang="sass" scoped>
</style>
