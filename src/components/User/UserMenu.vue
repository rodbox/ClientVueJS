<template>
  <ul class="navbar-nav pull-right">
  <li class="nav-item dropdown">
    <div v-if="connected">
      <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn nav-link dropdown-toggle bg-t">
       <user :user="user"></user>
       {{user.username}}
      </a>
      <div class="dropdown-menu dropdown-menu-right">
        <modal-button id="user_setting" class="dropdown-item"><i class="fa fa-user fa-fw"></i>  {{"label.my_account" | trans}}</modal-button>
        <router-link :to="{name: 'users'}" class="dropdown-item"><i class="fa fa-users fa-fw"></i> {{"route.Users" | trans}}</router-link>
        <router-link :to="{name: 'admin_user'}" class="dropdown-item"><i class="fa fa-th fa-fw" aria-hidden="true"></i> {{"label.admin"|trans}}</router-link>
        <router-link :to="{name: 'index_user', params: {username: user.username}}" class="dropdown-item"><i class="fa fa-th fa-fw" aria-hidden="true"></i> {{"label.box"|trans}}</router-link>
        <router-link :to="{name: 'paper'}" class="dropdown-item"><i class="fa fa-pencil fa-fw" aria-hidden="true"></i> {{"label.paper"|trans}}</router-link>
        <div class="dropdown-divider"></div>
        <button @click="setLogout" class="dropdown-item opacity"> <i class="fa fa-sign-out fa-fw"></i> {{"action.logout"|trans}}</button>
      </div>
    </div>
    <div v-else>
      <modal-button id="login" class="btn nav-link">{{"action.login" | trans}}</modal-button>
    </div>
  </li>
  </ul>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'UserMenu',
    methods: {
      ...mapActions('userModule', ['setLogout'])
    },
    computed: {
      ...mapGetters('userModule', ['connected', 'user'])
    }
  }
</script>
<style>
  .dropdown-menu-center{
    width:200px !important; left:50% !important; margin-left:-100px !important;
  }
  .dropdown-divider{
    margin-top: 1rem !important;
  }
</style>