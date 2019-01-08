<template>
    <event-table
      :citation-id="id"
      content-title="Notes"
      :title="page"
      :sub-title="date"
      :icon="['far', 'bookmark']"
      no-citations
      no-header>

      <div slot="no-data" class="alert alert-info">
        <strong>Missing inferred facts.</strong>
        This citation may need some research.
      </div>

      <div class="alert alert-warning" role="alert"
        v-if="!noteIds">
        <strong>Missing notes.</strong>
        Please add a source transcript or research summary.
      </div>

      <note v-for="noteId in noteIds"
        class="card-text"
        :key="noteId"
        :id="noteId" />
    </event-table>
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
    date: String,
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
