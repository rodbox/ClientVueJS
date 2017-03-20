<template>
  <div class="container">
    <h1>{{"label.users"|trans}}</h1>
    <button @click.prevent="all" class="btn btn-primary"><i class="fa fa-refresh"></i> {{"action.refresh"|trans}}</button>
    <hr>
    
    <div class="row">
      <div class="col-md-3 col-xs-6 " v-for="user in users">
        <user-card :user="user"></user-card>
      </div>
    </div>
    <modal id="sendMsg" title="Send">
      <send></send>
    </modal>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Users',
    computed: {
      ...mapGetters(['urls', 'headerCss']),
      ...mapGetters('usersModule', ['users', 'loaded'])
    },
    methods: {
      ...mapActions(['setHeaderCss', 'addUi']),
      ...mapActions('usersModule', ['all', 'serverScan'])
    },
    created () {
      if (!this.loaded) {
        this.all()
      }
      this.addUi({index: 'body', value: 'body-fix'})
    }
  }
</script>
