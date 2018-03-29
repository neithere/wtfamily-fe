<template>
  <ul :class="{'list-inline': inline}">
    <li
      v-for="person in object_list"
      :key="person.id"
      v-if="person.id !== excludePersonId"
      :class="{'list-inline-item': inline}">

      <person-list-item
        :person-data="person"
        :no-patronymic="noPatronymic" />

    </li>
  </ul>
</template>

<script>
import Person from '@/models/Person'

import PersonListItem from './PersonListItem'

export default {
  props: {
    // mutually exclusive
    ids: Array,
    eventId: String,

    excludePersonId: String,
    noPatronymic: Boolean,
    inline: Boolean
  },
  data () {
    return {
      object_list: null
    }
  },
  created () {
    let people

    if (this.ids && this.ids.length) {
      people = Person.findByIds(this.ids)
    } else if (this.eventId) {
      people = Person.findByEvent(this.eventId)
    }

    people.then(data => {
      this.object_list = data
    })
  },
  components: {
    PersonListItem
  }
}
</script>

<style lang="sass" scoped>
</style>
