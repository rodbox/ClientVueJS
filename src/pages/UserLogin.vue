<template>
    <div>
      <form action="#" @submit.prevent="setLogin">
       <fieldset>
        <div class="form-group">
          <input id="loginName" v-model="login.username" class="form-control mcb" name="loginName" type="text" :placeholder="'label.name'|trans" v-validate data-vv-rules="required" >
          <span v-show="errors.has('loginName')" class="help text-danger">{{ errors.first('loginName') }}</span>
        </div>
        <div class="form-group">
          <input id="loginPw"  v-model="login.pw" class="form-control mcb" name="loginPw" type="password" :placeholder="'label.pw'|trans" v-validate data-vv-rules="required">
          <span v-show="errors.has('loginPw')" class="help text-danger">{{ errors.first('loginPw') }}</span>
        </div>
      </fieldset>
      <button type="submit" class="btn btn-primary btn-block">{{"action.login"|trans}}</button>
    </form>
</div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'UserLogin',
    data () {
      return {
        login: {
          username: '',
          pw: ''
        }
      }
    },
    computed: {
      ...mapGetters('userModule', ['user'])
    },
    methods: {
      setLogin (e) {
        this.$store.commit('userModule/FORM', this.login)
        this.$store.dispatch('userModule/setLogin')
      }
    }
  }
</script>
<style lang="css">
  .top-1{
    margin-top: 2rem;
  }
</style>
