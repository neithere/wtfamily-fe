<template>
  <popper trigger="hover" :options="{placement: 'top-start'}">
    <div class="popper card" style="text-align: left;">
      <pre><slot /></pre>
    </div>
    <abbr title="" class="text-muted" slot="reference">[view JSON]</abbr>
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
