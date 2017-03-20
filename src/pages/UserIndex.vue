<template>
 <div class="bg-jumbotron" :style="'background-image: url(http://cdn.rodbox.fr/img/' + meta.bgimg + ');'">
    <div class="jumbotron " :style="'background-color: ' + rgba(meta.bg, meta.bgopacity) + ';color: ' + meta.color + ';'" >
      <div class="container">
        <h1 class="display-3">{{ $route.params.username }}</h1>
         <p>{{meta.subtext}}</p>
      </div>
    </div>
  <div class="container">
  </div>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'User',
    computed: {
      ...mapGetters(['urls']),
      ...mapGetters('usersModule', ['users']),
      ...mapGetters('indexModule', ['meta'])
    },
    methods: {
      ...mapActions('usersModule', ['all']),
      ...mapActions('indexModule', ['loadIndex']),
      rgba (h, opacity) {
        function hexToR (h) { return parseInt((cutHex(h)).substring(0, 2), 16) }
        function hexToG (h) { return parseInt((cutHex(h)).substring(2, 4), 16) }
        function hexToB (h) { return parseInt((cutHex(h)).substring(4, 6), 16) }
        function cutHex (h) { return (h.charAt(0) === '#') ? h.substring(1, 7) : h }

        return 'rgba(' + hexToR(h) + ',' + hexToG(h) + ',' + hexToB(h) + ',' + opacity + ')'
      }
    },
    created () {
      this.loadIndex(this.$route.params.username)
    }
  }
</script>
