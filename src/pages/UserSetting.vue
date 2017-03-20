<template>
   <tabs v-if="connected">
     <tab id="t1" :title="'label.infos'|trans" :open='true'>
      
      <form action="#" @submit.prevent="updUser">
      <v-upload id="uprofile" dir="users" :rename="user.username" class="btn btn-block">
        <img :src="urls.spacer"  class="user-img-xl" :style="'background-image:url('+urls.users+'/_profiles/'+user.img+');'" alt="">
        <div>
          <i class="fa fa-upload"></i>
        </div>
      </v-upload>
      <b-input :item="{value: user.firstname, label: 'firstname'}" :value="user.firstname" v-model="user.firstname" :label=true></b-input>
      <b-input :item="{value: user.lastname, label: 'lastname'}" :value="user.lastname" v-model="user.lastname" :label=true></b-input>
      <b-input :item="{value: user.email, label: 'email'}" :value="user.email" v-model="user.email" :label=true></b-input>
      <hr>
      <b-input :item="{value: user.birthday, label: 'birthday'}" :value="user.birthday" v-model="user.birthday" :label=true></b-input>
      <button class="btn btn-success btn-block">
        {{"action.update"|trans}} 
      </button>
      </form>
    </tab>
    <tab id="t2" :title="'label.params'|trans" :open='false'>
      <b-label label="lang">
       <div class="btn-group">
        <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn btn-secondary btn-block dropdown-toggle">
          <flag :locale="locale"></flag>
        </a>
        <div class="dropdown-menu " style="">
          <a href="#" class="dropdown-item" v-for="locale in locales" @click="setLocale(locale)">
            <flag :locale="locale" ></flag>
          </a>
        </div>
      </div>
      </b-label>
      <b-label label="currency">
       <div class="btn-group">
      <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn btn-secondary btn-block dropdown-toggle">
        {{currency}}
      </a>
      <div class="dropdown-menu " style="">
        <a href="#" class="dropdown-item" v-for="currency in currencys.list" @click.prevent="setCurrency(currency.symbole)">
          {{currency.symbole}} {{currency.name}}
        </a>
      </div>
    </div>
      </b-label>
    <hr>
      <b-label label="bg">
      <input class="form-control form-control-color" type="color" :value="user.meta.bg" v-model="user.meta.bg" @keypress.13.prevent="setMeta({index:'bg', value:user.meta.bg, username:user.username})" :style="'background-color:'+user.meta.bg"/>
      </b-label>
      <b-label label="color">
      <input class="form-control form-control-color" type="color" :value="user.meta.color" v-model="user.meta.color" @keypress.13.prevent="setMeta({index:'color', value:user.meta.color, username:user.username})" :style="'background-color:'+user.meta.color"/>
      </b-label>
      <b-label label="bgopacity">
      <input class="form-control form-control-color" type="range" min="0" max="1" step="0.01" :value="user.meta.bgopacity" v-model="user.meta.bgopacity" @keypress.13.prevent="setMeta({index:'bgopacity', value:user.meta.bgopacity, username:user.username})" :style="'background-color:'+user.meta.bgopacity"/>
      </b-label>
      <b-label label="bgimg">
      <input class="form-control form-control-color" type="text" :value="user.meta.bgimg" v-model="user.meta.bgimg" @keypress.13.prevent="setMeta({index:'bgimg', value:user.meta.bgimg, username:user.username})" :style="'background-color:'+user.meta.bgimg"/>
      </b-label>
      <hr>
      <b-label label="subtext">
      <input class="form-control" type="text" :value="user.meta.subtext" v-model="user.meta.subtext" @keypress.13.prevent="setMeta({index:'subtext', value:user.meta.subtext, username:user.username})" />
      </b-label>
      <hr>
       
  </div>
</div>
  </tab>
    <tab id="t3" :title="'label.files'|trans" :open='false'>
      <v-upload id="upfile" dir="users" :index="user.username+'/files'" class="btn btn-block btn-default"><i class="fa fa-upload"></i> {{"label.upload" |trans}} {{"label.file"|trans(0)}}</v-upload>
      <a href="#" @click.prevent="getFiles({dir:'users', index: user.username})" class="btn btn-link nav-link"><i class="fa fa-folder fa-fw"></i> {{"action.view"|trans}} {{"label.files"|trans}}</a>
    </tab>
</tabs>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'User',
    compontents: {
      files: require('../components/File/files')
    },
    computed: {
      ...mapGetters(['urls']),
      ...mapGetters('localeModule', ['locale', 'locales']),
      ...mapGetters('userModule', ['user', 'connected']),
      ...mapGetters('fileModule', ['files']),
      ...mapGetters(['currency', 'currencys'])
    },
    methods: {
      ...mapActions('localeModule', ['setLocale']),
      ...mapActions('userModule', ['updUser', 'setMeta']),
      ...mapActions('fileModule', ['getFiles']),
      ...mapActions(['setCurrency']),
      onChange () {
        console.log('New picture selected!')
        if (this.$refs.pictureInput.image) {
          console.log('Picture loaded.')
        } else {
          console.log('FileReader API not supported: use the <form>, Luke!')
        }
      }
    },
    created () {
    }
  }
</script>
<style lang="less">
  .form-control-color{
    height: 2rem;
  }
  .user-img-xl{
    width: 125px;
    height: 125px;
    background-position: center center;
    background-size: contain;
    border-radius: 50%;
  }
</style>
