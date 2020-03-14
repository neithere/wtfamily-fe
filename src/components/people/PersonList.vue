<template lang="pug">
  ul(:class="{'list-inline': inline}")
    template(v-for="person in object_list")
      li(
        v-if="person.id !== excludePersonId"
        :key="person.id"
        :class="{'list-inline-item': inline}"
      )
        person-list-item(
          :person-data="person"
          :no-patronymic="noPatronymic || brief"
          :no-date="brief"
        )
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
    inline: Boolean,
    brief: Boolean
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
