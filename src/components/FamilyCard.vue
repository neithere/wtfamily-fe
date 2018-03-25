<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">
        <span v-if="iconClass" :class="iconClass"></span>
        {{ header }}
        <!-- span v-if="mentionPartners">({{ partnerNames }})</span -->
      </h5>

      <template v-if="object">
        <div v-if="partnerIds && partnerIds.length">
          <person-list :ids="partnerIds" />
        </div>
        <div v-if="childIds && childIds.length">
          <h6>Children</h6>
          <person-list :ids="childIds" no-patronymic />
        </div>

        <event-table v-if="object.event_ids" :ids="object.event_ids" />

        <p v-if="object.attributes">TODO: attributes {{ object.attributes }}</p>

        <p v-if="object.citation_ids">
          <citation-item
            v-for="citationId in object.citation_ids"
            :id="citationId"
            :key="citationId"
            no-events />
        </p>

        <p v-if="object.note_ids">TODO: note-list {{ object.note_ids }}</p>
      </template>

      <debug-json>{{ object }}</debug-json>
    </div>
  </div>
</template>

<script>
// import { sortBy } from 'lodash'
import Axios from 'axios'

import PersonList from './PersonList'
import CitationItem from './CitationItem'
import EventTable from './EventTable'
import DebugJson from './DebugJson'

const BASE_URL = 'http://localhost:5000/r/families/'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    header: String,
    iconClass: String,
    centralPersonId: String

    // if true, shows "John + Mary" in family header
    // mentionPartners: Boolean
  },
  data () {
    return {
      object: null
    }
  },
  created () {
    Axios.get(BASE_URL + this.id).then(resp => {
      this.object = resp.data
    })
  },
  computed: {
    partnerNames () {
      return 'TODO: fatherFirstName + motherFirstName'
    },
    partnerIds () {
      let partners = [this.object.father, this.object.mother]

      return partners
        .filter(_ => _ && _.id !== this.centralPersonId)
        .map(_ => _.id)
    },
    childIds () {
      return this.object.child_ids.filter(_ => _ !== this.centralPersonId)
    }
  },
  components: {
    PersonList,
    EventTable,
    CitationItem,
    DebugJson
  }
}
</script>

<style lang="sass" scoped>
</style>
