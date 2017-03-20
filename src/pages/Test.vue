<template>
  <div>
    <h1>modal test</h1>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'test',
    data () {
      return {
        data: ['roto', 'tata']
      }
    },
    methods: {
      ...mapActions(['loadToggle'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ></style>
