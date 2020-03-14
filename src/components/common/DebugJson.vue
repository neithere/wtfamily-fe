<template>
  <popper trigger="hover" :options="{ placement: 'top-start' }">
    <div class="popper card debug-card">
      <slot />
    </div>
    <abbr title="" :class="cssClasses" slot="reference">Ⓙ</abbr>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs'

export default {
  props: {
    isFloating: Boolean
  },
  computed: {
    cssClasses () {
      return {
        'text-muted': true,
        'debug-label': true,
        'debug-label-floating': this.isFloating
      }
    }
  },
  components: {
    Popper
  }
}
</script>

<style lang="sass" scoped>
.debug
  &-card
    padding: 1rem
    text-align: left
    max-width: 100%
    max-height: 70vh
    overflow: auto
    font-size: .75rem

    // <pre>-like:
    font-family: monospace
    white-space: pre
    unicode-bidi: embed

  &-label
    background: #ffffcc

    &-floating
      position: absolute
      opacity: .5

      &:hover
        opacity: 1
</style>
