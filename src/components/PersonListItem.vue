<template>
  <popper trigger="click" :options="{placement: 'top-start'}">

    <div class="popper card">
      <div class="card-body">
        <h5 class="card-title">
          <span :class="genderIconClasses"></span>
          {{ person.name }}
        </h5>
        <h6 class="card-subtitle text-muted">{{ person.birth }} — {{
          person.death }} (age ≈{{ person.age }})</h6>
        <p class="card-text">
          <span v-for="name in person.names" :key="name"
            class="item">{{ name }}</span>
        </p>
        <!--
        <a href="#" class="card-link">view card</a>
        <a href="#" class="card-link">view in tree</a>
        -->
      </div>
    </div>

    <abbr title="" slot="reference">
      <span :class="genderIconClasses"></span>
      {{ person.name }} ({{ person.birth }})
    </abbr>

  </popper>
</template>

<script>
import Popper from 'vue-popperjs'
import 'vue-popperjs/dist/css/vue-popper.css'

const DEFAULT_ICON_NAME = 'fa-user'
const GENDER_TO_ICON_NAME = {
  M: 'fa-male',
  F: 'fa-female'
}

export default {
  props: {
    personData: {
      type: Object
    }
    // id: {type: String, required: true},
  },
  data () {
    return {
      person: this.personData // TODO: AJAX if only id is supplied
    }
  },
  computed: {
    genderIconClasses () {
      let gender = this.person.gender
      let iconName = GENDER_TO_ICON_NAME[gender] || DEFAULT_ICON_NAME

      return ['fas', iconName]
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

  .fa-male
    color: #003399

  .fa-female
    color: #9933FF
</style>
