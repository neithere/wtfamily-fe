<template lang="pug">
panel-viewer(
  :source-url="sourceUrl"
  :selected-id="id"
  title-attr="name"
  other-names-attr="names"
  @selected="selectItem($event)"
)
  template(slot-scope="panel")
    debug-json(is-floating) {{ panel.selectedItem }}
    div(v-if="panel.selectedItem")
      h2
        fa-icon(:icon="genderIcon(panel.selectedItem)")
        |
        | {{ panel.selectedItem.name }}
      h3.card-subtitle.text-muted
        small.text-muted
          | ✶{{ panel.selectedItem.birth }}
          |
          template(v-if="panel.selectedItem.death") ✝{{ panel.selectedItem.death }}
          |
          | (age {{ panel.selectedItem.age }})
      term(
        label="Name variations"
        :value="formatMultiNames(panel.selectedItem.names)"
      )

      // can't extract to computed because `panel` is slot scope
      term-list(:terms="panel.selectedItem.attributes.map(_ => ({ label: _.type, value: _.value }))")

      // <term label="Pub info" :value="panel.selectedItem.pubinfo" />
      // <term label="Abbrev" :value="panel.selectedItem.abbrev" />
      // <term label="Repo ID" :value="panel.selectedItem.repository" />

      .row
        .col-6
          family-card(
            v-for="familyId in panel.selectedItem.child_in_families"
            header="Child in family"
            parents-header="Parents"
            children-header="Siblings"
            icon="child"
            :central-person-id="panel.selectedItem.id"
            :mention-partners="panel.selectedItem.child_in_families.length > 1"
            :key="familyId"
            :id="familyId"
          )
        .col-6
          family-card(
            v-for="familyId in panel.selectedItem.parent_in_families"
            header="Own family"
            parents-header="Partner"
            children-header="Children"
            icon="users"
            :central-person-id="panel.selectedItem.id"
            :mention-partners="panel.selectedItem.parent_in_families.length > 1"
            :key="familyId"
            :id="familyId"
          )
      event-table(
        :ids="panel.selectedItem.event_ids"
        :exclude-person-id="panel.selectedItem.id"
      )
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'

import PanelViewer from '../common/PanelViewer'
import Term from '../common/Term'
import TermList from '../common/TermList'
import DebugJson from '../common/DebugJson'
import FamilyCard from './FamilyCard'
import EventTable from '../events/EventTable'

Vue.use(Router)

const SOURCE_URL = 'http://localhost:5000/r/people/'

// FIXME duplicated vs PersonListItem
const DEFAULT_ICON_NAME = 'user'
const GENDER_TO_ICON_NAME = {
  M: 'male',
  F: 'female'
}

export default {
  name: 'person-viewer',
  props: {
    id: String
  },
  data () {
    return {
      sourceUrl: SOURCE_URL,
      selectedItem: null
    }
  },
  methods: {
    selectItem (item) {
      // HACK: `item.id` would raise attribute error if `item` is undefined.
      //       it's unclear whether the event should happen at all.
      if (!item) {
        return
      }

      this.$router.push({
        name: 'person.detail',
        params: { id: item.id }
      })
    },
    // FIXME: duplicate vs PlaceViewer
    formatMultiNames (value) {
      return value ? value.join(' / ') : null
    },
    genderIcon (person) {
      let gender = person.gender

      return GENDER_TO_ICON_NAME[gender] || DEFAULT_ICON_NAME
    }
  },
  components: {
    PanelViewer,
    FamilyCard,
    EventTable,
    Term,
    TermList,
    DebugJson
  }
}
</script>

<style lang="sass" scoped>
  // FIXME: gender classes are duplicated vs PersonListItem
  .fa-male
    color: #003399

  .fa-female
    color: #9933FF
</style>
