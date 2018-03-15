<template>
  <div>
    <citation v-for="citation in object_list"
      :key="citation.id"
      :id="citation.id"
      :page="citation.page"
      :noteIds="citation.note_ids" />
  </div>
</template>

<script>
import Axios from 'axios'

import Citation from './Citation'

export default {
  props: {
    sourceId: {type: String, required: true}
  },
  data () {
    return {
      object_list: null
    }
  },
  methods: {
    fetchData () {
      const url = 'http://localhost:5000/r/citations/?source=' + this.sourceId

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
