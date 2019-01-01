<template>
  <div id="app">
    <header>
      <b-navbar toggleable="md" type="light">

        <b-navbar-brand>
          <router-link class="navbar-brand" :to="{name: 'home'}">WhatTheFamily</router-link>
        </b-navbar-brand>

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-collapse is-nav visible id="nav_collapse">
          <b-navbar-nav>

            <b-nav-item :to="{name: 'source.list'}">
              <fa-icon icon="book"></fa-icon> Sources
            </b-nav-item>

            <b-nav-item :to="{name: 'person.list'}">
              <fa-icon icon="users"></fa-icon> People
            </b-nav-item>

            <b-nav-item :to="{name: 'place.list'}">
              <fa-icon icon="globe"></fa-icon> Places
            </b-nav-item>

          </b-navbar-nav>
        </b-collapse>

      </b-navbar>
    </header>
    <article>
      <router-view></router-view>
    </article>
    <!--
    <footer>
      (this is footer)
    </footer>
    -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
// override Bootstrap's var with Ubuntu + orig value
$font-family-sans-serif: Ubuntu, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol" !default;
$primary: #666666  // use gray instead of bright blue for active items
@import '~bootstrap/scss/bootstrap.scss'

// Cyrillic is not included in those,
//   see https://github.com/KyleAMathews/typefaces/issues/21
// @import 'typeface-kurale/index.css'
// @import 'typeface-lobster/index.css'
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700|Kurale|Lobster')

/* FIXME this doesn't assign the font to the elem for some reason;
 * for now we are just using CDN, see index.html */
// $fa-font-path: "~font-awesome/fonts";
// @import '~font-awesome/scss/font-awesome.scss'

h1,
.navbar-brand
  font-family: Lobster, sans-serif

h2
  font-family: Kurale, serif
</style>
