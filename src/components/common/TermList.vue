<template lang="pug">
dl.row(v-show="Boolean(terms.length)")
  template(v-for="term in terms" v-if="term")
    dt.col-sm-2 {{ term.label }}
    dd.col-sm-10 {{ term.value }}
</template>

<script>
export default {
  props: {
    terms: Array
  }
}
</script>
