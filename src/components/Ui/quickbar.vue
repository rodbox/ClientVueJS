<template>
  <div class="quickbar" :class="statut">
    <a href="#" class="btn-quickbar-toggle btn btn-primary btn-sm" @click.prevent="uiToggle({index: 'quickbar', values: ['close', 'open']})"><i class="fa fa-list"></i></a>
    <slot name="quickbar">
      <vPad service="placeholder" ></vPad>
    </slot>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'quickbar',
    props: {
      statut: {type: String, default: 'open'}
    },
    methods: {
      ...mapActions(['uiToggle'])
    }
  }
</script>
<style lang="less">
.quickbar {
  .btn-quickbar-toggle {
    position: absolute;
    left: -1.9rem;
    margin-top: 1.9rem;

  }
  h1 {
    margin-top: .5rem;
    font-size: 1.5rem;
  }
}
</style>