<template>
  <panel-viewer
    :source-url="sourceUrl"
    :selected-id="id"
    title-attr="name"
    other-names-attr="names"
    @selected="selectItem($event)">
    <template slot-scope="panel">

      <debug-json>{{ panel.selectedItem }}</debug-json>

      <div v-if="panel.selectedItem">
        <h2>
          <span :class="genderIconClasses(panel.selectedItem)"></span>
          {{ panel.selectedItem.name }}
        </h2>
        <h3 class="card-subtitle text-muted">
          <small class="text-muted">
            ✶{{ panel.selectedItem.birth }}
            <template v-if="panel.selectedItem.death">
              ✝{{ panel.selectedItem.death }}
            </template>
            (age {{ panel.selectedItem.age }})
          </small>
        </h3>

        <term label="Name variations"
          :value="formatMultiNames(panel.selectedItem.names)" />

        <!--
        <term label="Pub info" :value="panel.selectedItem.pubinfo" />
        <term label="Abbrev" :value="panel.selectedItem.abbrev" />
        <term label="Repo ID" :value="panel.selectedItem.repository" />
        -->

        <div class="row">
          <div class="col-6">
            <family-card v-for="familyId in panel.selectedItem.child_in_families"
              header="Child in family"
              icon-class="fas fa-child"
              :central-person-id="panel.selectedItem.id"
              :mention-partners="panel.selectedItem.child_in_families.length > 1"
              :key="familyId"
              :id="familyId" />
          </div>

          <div class="col-6">
            <family-card v-for="familyId in panel.selectedItem.parent_in_families"
              header="Own family"
              icon-class="fas fa-users"
              :central-person-id="panel.selectedItem.id"
              :mention-partners="panel.selectedItem.parent_in_families.length > 1"
              :key="familyId"
              :id="familyId" />
          </div>
        </div>

        <event-table
          :ids="panel.selectedItem.event_ids"
          :exclude-person-id="panel.selectedItem.id" />

      </div>
    </template>
  </panel-viewer>
</template>

<script>
import Vue from 'vue'
import Router from 'vue-router'

import PanelViewer from './PanelViewer'
import FamilyCard from './FamilyCard'
import EventTable from './EventTable'
import Term from './Term'
import DebugJson from './DebugJson'

Vue.use(Router)

const SOURCE_URL = 'http://localhost:5000/r/people/'

// FIXME duplicated vs PersonListItem
const DEFAULT_ICON_NAME = 'fa-user'
const GENDER_TO_ICON_NAME = {
  M: 'fa-male',
  F: 'fa-female'
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
  computed: {
  },
  methods: {
    selectItem (item) {
      this.$router.push({
        name: 'person.detail',
        params: {id: item.id}
      })
    },
    // FIXME: duplicate vs PlaceViewer
    formatMultiNames (value) {
      return value ? value.join(' / ') : null
    },
    genderIconClasses (person) {
      let gender = person.gender
      let iconName = GENDER_TO_ICON_NAME[gender] || DEFAULT_ICON_NAME

      return ['fas', iconName]
    }
  },
  components: {
    PanelViewer,
    FamilyCard,
    EventTable,
    Term,
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
