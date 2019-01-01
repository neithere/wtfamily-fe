<template>
  <popper trigger="hover"
    :options="{placement: 'top-start'}"
    @show="shownAtLeastOnce = true">

    <div class="popper">  <!-- "card" makes items jump due to flex? -->
      <div class="card-body">
        <h5 class="card-title">
          <fa-icon :icon="genderIcon"></fa-icon>
          {{ person.name }}
        </h5>
        <h6 class="card-subtitle text-muted">
          {{ person.birth }} — {{ person.death }} (age ≈{{ person.age }})
        </h6>
        <p class="card-text" v-if="names.length > 1">
          <span v-for="(altName, index) in names" :key="index"
            class="item">{{ altName }}</span>
        </p>
        <!--
        <a href="#" class="card-link">view card</a>
        <a href="#" class="card-link">view in tree</a>
        -->
      </div>
    </div>

    <abbr title="" slot="reference">
      <fa-icon :icon="genderIcon"></fa-icon>
      <router-link :to="{name: 'person.detail', params: {id: person.id}}">
        {{ name }}
        <template v-if="!noDate">({{ person.birth }})</template>
      </router-link>
    </abbr>

  </popper>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

// FIXME duplicated vs PersonViewer
const DEFAULT_ICON_NAME = 'user'
const GENDER_TO_ICON_NAME = {
  M: 'male',
  F: 'female'
}

const unique = (xs) => new Set([...xs])

export default {
  props: {
    personData: {
      type: Object
    },
    // id: {type: String, required: true},
    noPatronymic: Boolean,
    noDate: Boolean
  },
  data () {
    return {
      person: this.personData, // TODO: AJAX if only id is supplied
      shownAtLeastOnce: false
    }
  },
  computed: {
    name () {
      if (this.noPatronymic) {
        return this.person.first_and_last_names
      }
      return this.person.name
    },
    names () {
      return unique(this.person.names)
    },
    genderIcon () {
      let gender = this.person.gender

      return GENDER_TO_ICON_NAME[gender] || DEFAULT_ICON_NAME
    }
  },
  methods: {
    loadMoreData () {
      this.shownAtLeastOnce = true
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
    text-align: initial

  .item + .item:before
    content: "; "

  // FIXME: gender classes are duplicated vs PersonViewer
  .fa-male
    color: #003399

  .fa-female
    color: #9933FF
</style>
