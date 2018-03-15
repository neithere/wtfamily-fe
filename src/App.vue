<template>
  <div id="app">
    <header>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <router-link class="navbar-brand" :to="{name: 'home'}">WhatTheFamily</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">  <!-- FIXME use class from router-link? but how? -->
              <router-link class="nav-link" :to="{name: 'source.list'}">
                <span class="fas fa-book"></span> Sources
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'person.list'}">
                <span class="fas fa-users"></span> People
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="{name: 'place.list'}">
                <span class="fas fa-globe"></span> Places
              </router-link>
            </li>
          </ul>
          <span class="navbar-text">
            <!-- Navbar text with an inline element -->
          </span>
        </div>
      </nav>
    </header>
    <article>
      <router-view></router-view>
    </article>
    <footer>
      (this is footer)
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
@import 'bootstrap/dist/css/bootstrap.min.css'
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
