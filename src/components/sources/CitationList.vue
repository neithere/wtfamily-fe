<template>
  <div>
    <citation v-for="citation in object_list"
      :key="citation.id"
      :id="citation.id"
      :page="citation.page"
      :note-ids="citation.note_ids" />
  </div>
</template>

<script>
import Axios from 'axios'

import Citation from './Citation'

const BASE_URL_BY_SOURCE = 'http://localhost:5000/r/citations/?source='

export default {
  props: {
    sourceId: {
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
    this.fetchData()
  },
  methods: {
    fetchData () {
      const url = BASE_URL_BY_SOURCE + this.sourceId

      if (!this.sourceId) {
        return
      }

      Axios.get(url).then(resp => {
        this.object_list = resp.data
      })
    }
  },
  watch: {
    sourceId () {
      this.fetchData()
    }
  },
  components: {
    Citation
  }
}
</script>
