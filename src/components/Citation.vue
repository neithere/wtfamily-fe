<template>
  <div class="card" :title="id">
    <div class="card-header" :title="id">
        <span class="fas fa-sticky-note"></span> {{ page }}
    </div>
    <div class="card-body">
      <note v-for="noteId in noteIds"
        class="card-text"
        :key="noteId"
        :id="noteId" />
    </div>
  </div>
</template>

<script>
import Note from './Note'

export default {
  props: {
    id: {type: String, required: true},
    page: {type: String, required: true},
    noteIds: {type: Array}
  },
  components: {
    Note
  }
}
</script>

<style lang="sass" scoped>
</style>
