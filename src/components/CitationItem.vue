<template>
  <popper trigger="hover" :options="{placement: 'top-start'}">

    <div class="popper card">
      <div class="card-body">
        <h5 class="card-title">
          <span class="fas fa-sticky-note"></span>
          {{ page }}
        </h5>
        <h6 v-if="source" class="card-subtitle text-muted">{{ source.title }}</h6>
        <p class="card-text"
          v-if="notes"
          v-for="(note, index) in notes"
          :key="index">
          {{ note.text }}
        </p>
      </div>
    </div>

    <abbr title="" slot="reference">
      <span class="fas fa-sticky-note"></span>

      <template v-if="source">
        <router-link
          :to="{name: 'source.detail', params: {id: sourceId}}"
          :title="source.title">
          {{ source.abbrev }}
          {{ page }}
        </router-link>
      </template>
      <template v-else>
        {{ page }} (source loading...)
      </template>

    </abbr>

  </popper>
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

  .item + .item:before
    content: "; "
</style>
