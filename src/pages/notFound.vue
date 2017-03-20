<template>
   <div class="text-center">
      <h1>404</h1>
      <p>{{"msg.are_u_lost"|trans}}</p>
      <router-link :to="{name: 'home'}" class="" style="font-weight:700">{{'title.home'|trans}}</router-link>
    </div>
</template>

<script>
  export default {
    name: 'notFoundComponent',
    data () {
      return {
        data: ['roto', 'tata']
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ></style>
