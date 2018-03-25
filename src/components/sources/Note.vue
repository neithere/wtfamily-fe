<template>
  <div class="note" :title="id">
    <!--span class="fas fa-quote-left"></span-->
    <p class="note-text" v-if="text" :title="type">{{ text }}</p>
    <!--span class="fas fa-quote-right"></span-->
    {{ media }}
  </div>
</template>

<script>
import Axios from 'axios'

const BASE_URL = 'http://localhost:5000/r/notes/'

export default {
  props: {
    id: {type: String, required: true}
  },
  data () {
    return {
      type: null,
      text: null,
      media: null
    }
  },
  created () {
    const url = BASE_URL + this.id

    if (!this.id) {
      return
    }

    Axios.get(url).then(resp => {
      Object.keys(resp.data).forEach(k => {
        this[k] = resp.data[k]
      })
    })
  }
}
</script>

<style lang="sass" scoped>
.note
  &-text
    white-space: pre-wrap
    font-family: Kurale, serif
</style>
