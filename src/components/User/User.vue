<template>
  <img :src="urls.spacer" class="user-img img" :class="'img-'+size" :style="'background-image:url('+urls.users+'/_profiles/'+user.img+');'" :alt="user.username"/>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'user',
    props: {
      user: {type: Object, default: {}},
      size: {
        type: String,
        default: () => {
          return 'M'
        }
      }
    },
    computed: {
      ...mapGetters(['urls'])
    }
  }
</script>
<style>
.user-img{
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-size: cover;
  background-color: #ECEEEF;
}
</style>