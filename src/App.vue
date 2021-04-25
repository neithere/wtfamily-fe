<template lang="pug">
#app
  header
    b-navbar(toggleable="md" type="light")
      b-navbar-brand
        router-link(class="navbar-brand" :to="{name: 'home'}") WhatTheFamily
      b-navbar-toggle(target="nav_collapse")
      b-collapse(is-nav visible id="nav_collapse")
        b-navbar-nav
          b-nav-item(:to="{name: 'source.list'}" active-class="active")
            fa-icon(icon="book")
            |
            | Sources

          b-nav-item(:to="{name: 'person.list'}" active-class="active")
            fa-icon(icon="users")
            |
            | People

          b-nav-item(:to="{name: 'place.list'}" active-class="active")
            fa-icon(icon="globe")
            |
            | Places
  article
    router-view

//-
    <footer>
      (this is footer)
    </footer>
  </div>
//
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
// override Bootstrap's var with Ubuntu + orig value
$font-family-sans-serif: Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !default
$primary: #666666  // use gray instead of bright blue for active items
@import '~bootstrap/scss/bootstrap.scss'

// Cyrillic is not included in those,
//   see https://github.com/KyleAMathews/typefaces/issues/21
// @import 'typeface-kurale/index.css'
// @import 'typeface-lobster/index.css'
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700|Kurale|Lobster')

/* FIXME this doesn't assign the font to the elem for some reason;
 * for now we are just using CDN, see index.html */
// $fa-font-path: "~font-awesome/fonts"
// @import '~font-awesome/scss/font-awesome.scss'

h1,
.navbar-brand
  font-family: Lobster, sans-serif

h2
  font-family: Kurale, serif
</style>
