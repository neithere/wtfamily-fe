<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-inverse navbar-static-top">
        <div class="container-fluid">
         <div class="navbar-header">
           <router-link class="navbar-brand" :to="{name: 'home'}">WhatTheFamily</router-link>
         </div>
         <div class="collapse navbar-collapse">
           <ul class="nav navbar-nav">
             <li>
               <router-link :to="{name: 'source.list'}">
                 <span class="glyphicon glyphicon-book"></span> Sources
               </router-link>
             </li>
             <li>
               <router-link :to="{name: 'person.list'}">
                 <span class="glyphicon glyphicon-user"></span> People
               </router-link>
             </li>
             <li>
               <router-link :to="{name: 'place.list'}">
                 <span class="glyphicon glyphicon-map-marker"></span> Places
               </router-link>
             </li>
           </ul>
         </div>
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
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
@import url('https://fonts.googleapis.com/css?family=Ubuntu:400,400i,700|Kurale|Lobster')

h1,
.navbar-brand
  font-family: Lobster, sans-serif

h2
  font-family: Kurale, serif
</style>
