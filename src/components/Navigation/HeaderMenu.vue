<template>
	<nav class="navbar navbar-toggleable-md navbar-light bg-faded">
  <button class="navbar-toggler navbar-toggler-right btn btn-link" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <a href="#" class="navbar-brand">{{title}}</a>
  <div class="collapse navbar-collapse" id="navbarToggler">
    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
       <li class="nav-item">
        <router-link to="user" class="nav-link">User</router-link>
      </li>
    </ul>
     <ul class="navbar-nav my-2 my-lg-0">
      <li class="nav-item">
      {{ locale }}
      </li>
      <userMenu></userMenu>
     </ul>
  </div>
</nav>
</template>
<script>
import AppStore from '../../AppStore'
export default {
  name: 'HeaderMenu',
  data () {
    return AppStore.state
  },
  created () {}
}
</script>
<style>
	.navbar-brand{
		font-weight: 700;
	}
</style>