<template>
  <popper trigger="hover" :options="{placement: 'top-start'}">
    <div class="popper card debug-card">
      <pre><slot /></pre>
    </div>
    <abbr title="" class="text-muted debug-label" slot="reference">[view JSON]</abbr>
  </popper>
</template>

<script>
import Popper from 'vue-popperjs'

export default {
  components: {
    Popper
  }
}
</script>

<style lang="sass" scoped>
.debug
  &-card
    text-align: left

  &-label
    background: #ffffcc
</style>
