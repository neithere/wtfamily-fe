<template lang="pug">
.card
  .card-body
    h5.card-title
      debug-json(is-floating) {{ object }}
      fa-icon(v-if="icon" :icon="icon") {{ header }}
      // <span v-if="mentionPartners">({{ partnerNames }})</span>
    template(v-if="object")
      div(v-if="partnerIds && partnerIds.length")
        h6 {{ parentsHeader }}
        person-list(:ids="partnerIds")
      div(v-if="childIds && childIds.length")
        h6 {{ childrenHeader }}
        person-list(:ids="childIds" no-patronymic)
      event-table(v-if="object.event_ids" :ids="object.event_ids")
      p(v-if="object.attributes") TODO: attributes {{ object.attributes }}
      p(v-if="object.citation_ids")
        citation-item(
          v-for="citationId in object.citation_ids"
          :id="citationId"
          :key="citationId"
          no-events
        )
      p(v-if="object.note_ids") TODO: note-list {{ object.note_ids }}
</template>

<script>
// import { sortBy } from 'lodash'
import Axios from 'axios'

import DebugJson from '../common/DebugJson'
import EventTable from '../events/EventTable'
import CitationItem from '../sources/CitationItem'
import PersonList from './PersonList'

const BASE_URL = 'http://localhost:5000/r/families/'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    header: String,
    parentsHeader: String,
    childrenHeader: String,
    icon: String,
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
      let childIds = this.object.child_ids || []

      return childIds.filter(_ => _ !== this.centralPersonId)
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
