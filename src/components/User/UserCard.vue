<template>
  <div class="card" :style="'background-image:url('+urls.users+'/_profiles/'+user.img+');'">
    <span class="card-state">
      <span class="user-connected" v-if="user.active">
        <i class="fa fa-circle " style="color:green" ></i> <span class="text-sm">{{"label.connected"|trans}}</span>
      </span>
      <i class="fa fa-circle-o" style="opacity: 0.2;" v-else="user.active"></i>
    </span>
    <div class="card-block text-center">
      <br>
      <img :src="urls.spacer" class="card-img-top card-spacer" :style="'background-image:url('+urls.users+'/_profiles/'+user.img+');'" :alt="user.username" />
    </div>
    <div class="card-block text-center">
      <div class="btn-group">
        <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn nav-link btn-link dropdown-toggle bg-t"><h4 class="card-title">{{user.username}}</h4>
          <p class="card-text">{{user.firstname}} {{user.lastname}}</p>
        </a>
        <div class="dropdown-menu dropdown-menu-center ">
          <a href="#" id="" @click.prevent="scan(user.username)"  class="dropdown-item"> <i class="fa fa-folder fa-fw"></i> {{"action.scan_files"|trans}} </a>
          <v-upload :id="'upfile'+user.id" dir="users" :index="user.username+'/files'" class="dropdown-item" :hook="['cloud.scan']"><i class="fa fa-upload fa-fw"></i> {{"action.send"|trans}}</v-upload>
          <a href="#" @click.prevent="sendModal(user)">{{"action.send"|trans}} {{"label.message"|trans}}</a>
          <router-link :to="{name: 'index_user', params: {username: user.username}}" class="dropdown-item"><i class="fa fa-globe fa-fw"></i> {{"label.box"|trans}}</router-link>
        </div>
      </div>
    </div>
  </div>
  
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'userCard',
    props: {
      user: {type: Object, default: {}}
    },
    computed: {
      ...mapGetters(['urls'])
    },
    methods: {
      ...mapActions('usersModule', ['serverScan']),
      ...mapActions('messageModule', ['sendModal']),
      scan (username) {
        window.store.dispatch('usersModule/serverScan', {
          username
        })
      },
      sendPreset (user) {
      }
    }
  }
</script>
<style lang="less">
  .card-state{
    position: absolute;
    font-size: 1rem;
    top:0.2rem;
    left: 0.5rem !important;
  }
  .card-actions{
    right: 0rem;
    position: absolute;
  }
  .card{
    position: relative;
    border: 0px;
    background-color: #fff;
    margin-bottom: 1rem;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    -webkit-background-origin: center center;
    background-origin: center center;
  }
  .card-block,
  .card-footer,
  .card-img-top,
  .card-bg{
    background-color: fade(#fff, 95%);
  }  
  .card-spacer{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
  }
  .text-sm {
    font-size: 0.7rem;
  }
</style>
