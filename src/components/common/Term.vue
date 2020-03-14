<template lang="pug">
dl.row(v-show="value")
  dt.col-sm-2 {{ label }}
  dd.col-sm-10 {{ value }}
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: String
    }
  }
}
</script>
