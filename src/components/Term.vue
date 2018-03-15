<template>
  <dl class="row" v-show="value">
    <dt class="col-sm-2">{{ label }}</dt>
    <dd class="col-sm-10">{{ value }}</dd>
  </dl>
</template>

<script>
export default {
  props: {
    label: String,
    value: String
  }
}
</script>
