<template>
<div class="colors-active">
  <a href="#" @click.prevent="reverseColor" class="btn-color-reverse">x</a>
  <input :id="id" type="text" :value="colorsActive.fill.hex" v-model="colorsActive.fill.hex" class="btn-color-active btn-color-active-fill" @click.prevent="setActive('fill')" :style="'background-color:'+colorsActive.fill.hex+ '; color:'+colorsActive.fill.hex" :class="cssActive('fill')"/>  
  <input :id="id" type="text" :value="colorsActive.stroke.hex" v-model="colorsActive.stroke.hex" class="btn-color-active btn-color-active-stroke" @click.prevent="setActive('stroke')" :style="'background-color:'+colorsActive.stroke.hex+ '; color:'+colorsActive.stroke.hex" :class="cssActive('stroke')"/>  
 <sketch-picker></sketch-picker>
</div>
</template>
<script>
  // require('spectrum')
  import { sketch } from 'vue-color'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'colorsActive',
    components: {
      'sketch-picker': sketch
    },
    computed: {
      ...mapGetters('vpaperModule', ['tool', 'tools', 'colorsActive', 'paletteActive'])
    },
    methods: {
      ...mapActions('vpaperModule', ['setColors', 'setColorActive', 'reverseColor']),
      setActive (index) {
        this.colorsActive.index = index
      },
      cssActive (index) {
        return (this.colorsActive.index === index) ? 'active' : ''
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less">
@size: 28;
.colors-active{
  width: unit(@size * 1.5, px);
  height: unit(@size * 1.5, px);
  display: inline-block;

  .btn-color-reverse{
    position: absolute;
    margin-left: unit(@size + 5, px);
  }
  .btn-color-active{
    border-radius: .225rem;
    position: absolute;
    width: unit(@size, px);
    height: unit(@size * 0.8, px);
    display: inline-block;
    border: 1px solid fade(#000, 10%);
    &.btn-color-active-stroke{
      margin-top: unit(@size / 2, px);;
      margin-left: unit(@size / 2, px);;
    }
    &:focus{
      outline: none;
      -webkit-box-shadow: 0 0 0 0 transparent !important;
      box-shadow: 0 0 0 0 transparent !important;
    }
    z-index: 1000;
    &.active{
      z-index: 1001;
      border: 1px solid fade(#000, 20%);
    }
  }
}
</style>
