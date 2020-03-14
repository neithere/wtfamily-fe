<template lang="pug">
popper(trigger="hover" :options="{ placement: 'top-start' }")
  .popper.card
    .card-body
      h6.card-subtitle.text-muted(v-if="source") {{ source.title }}
      h5.card-title
        fa-icon(:icon="['far', 'sticky-note']")
        |
        | {{ page }}
      div(v-if="notes")
        p.card-text(
          v-for="(note, index) in notes"
          :key="index"
        ) {{ note.text }}
  abbr(title="" slot="reference")
    template(v-if="source")
      fa-icon(:icon="['far', 'sticky-note']")
      router-link(
        :to="{name: 'source.detail', params: {id: sourceId}}"
        :title="source.title"
      )
        |
        | {{ source.abbrev || source.title }}, {{ page }}
    template(v-else)
      | {{ page }} (source loading...)
</template>

<script>
import Axios from 'axios'
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

const BASE_URL = 'http://localhost:5000/r/citations/'
const SOURCES_BASE_URL = 'http://localhost:5000/r/sources/'
const NOTES_BASE_URL = 'http://localhost:5000/r/notes/'

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      date: null,
      // media_ids: null,
      noteIds: null,
      notes: null,
      page: null,
      sourceId: null,
      source: null
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      const url = BASE_URL + this.id

      Axios.get(url).then(resp => {
        this.page = resp.data.page
        this.date = resp.data.date
        this.noteIds = resp.data.note_ids
        this.sourceId = resp.data.source

        if (this.sourceId) {
          let sourceURL = SOURCES_BASE_URL + this.sourceId

          Axios.get(sourceURL).then(resp => {
            this.source = resp.data
          })
        }

        if (this.noteIds) {
          let notesURL = NOTES_BASE_URL + '?ids=' + this.noteIds.join(',')

          Axios.get(notesURL).then(resp => {
            this.notes = resp.data
          })
        }
      })
    }
  },
  components: {
    Popper
  }
}
</script>

<style lang="sass" scoped>
  .popper.card
    max-width: 500px
    text-align: left

    .card-body
      max-height: 50vh
      overflow: auto

      .card-text
        padding-bottom: 1rem

  .item + .item:before
    content: "; "
</style>
