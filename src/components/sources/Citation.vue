<template>
  <div class="card" :title="id">
    <div class="card-header" :title="id">
        <span class="fas fa-sticky-note"></span> {{ page }}
    </div>
    <div class="card-body">
      <div class="alert alert-warning" role="alert"
        v-if="!noteIds">
        <strong>Missing notes.</strong>
        Please add a source transcript or research summary.
      </div>
      <note v-for="noteId in noteIds"
        class="card-text"
        :key="noteId"
        :id="noteId" />
    </div>
    <event-table :citation-id="id" no-header>
      <div slot="no-data" class="alert alert-info">
        <strong>Missing inferred facts.</strong>
        This citation may need some research.
      </div>
    </event-table>
  </div>
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
