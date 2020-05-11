<template lang="pug">
dl.row(v-show="Boolean(terms.length)")
  template(v-for="term in terms" v-if="term.value")
    dt.col-sm-3
      fa-icon(v-if="iconForLabel(term.label)" :icon="iconForLabel(term.label)")
      |
      | {{ term.label }}
    dd.col-sm-9 {{ term.value }}
</template>

<script>
const ICON_BY_LABEL = {
  'Y-DNA Haplogroup': 'dna',
  'mtDNA Haplogroup': 'dna'
}

export default {
  props: {
    terms: Array
  },
  methods: {
    iconForLabel (label) {
      return ICON_BY_LABEL[label]
    }
  }
}
</script>
