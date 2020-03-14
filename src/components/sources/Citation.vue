<template lang="pug">
.card
  .card-header
      span.fas.fa-sticky-note
      |
      | {{ page }}
  .card-body
    .alert.alert-warning(
      v-if="!noteIds"
      role="alert"
    )
      strong Missing notes.
      |
      | Please add a source transcript or research summary.
    note(
      v-for="noteId in noteIds"
      class="card-text"
      :key="noteId"
      :id="noteId"
    )
  event-table(
    :citation-id="id"
    no-header
  )
    .alert.alert-info(slot="no-data")
      strong Missing inferred facts.
      |
      | This citation may need some research.
</template>

<script>
import EventTable from '../events/EventTable'
import Note from './Note'

export default {
  props: {
    id: {
      type: String,
      required: true
    },
    page: String,
    noteIds: Array
  },
  components: {
    Note,
    EventTable
  }
}
</script>

<style lang="sass" scoped>
</style>
