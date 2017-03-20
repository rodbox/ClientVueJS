<template>
    <div class="modal fade" :id="id" tabindex="-1" role="dialog" :aria-labelledby="id" aria-hidden="true">
      <div class="modal-dialog" role="document" :class="size">
        <div class="modal-content">
          <button type="button" class="close" style="position:absolute; right:-20px; color:#fff">
            <span aria-hidden="true">&times;</span>
          </button>
          <div class="modal-header" v-if="title!=''">
            <h5 class="modal-title" :id="id+'Label'"><span class="title"></span> <span class="text-muted text-sm subtitle"></span> </h5>
            <span class="text-muted text-sm righttitle" style="float: right"></span> 
          </div>
          <div class="modal-body">
           <slot></slot>
         </div>
       </div>
     </div>
   </div>
</template>
<script>
  import modalButton from './modalButton'
  export default {
    name: 'modal',
    components: [
      modalButton
    ],
    props: {
      id: {type: String, default: 'myModal'},
      title: {type: String, default: 'default'},
      subtitle: {type: String, default: ''},
      size: {type: String, default: 'modal-md'},
      active: {type: Boolean, default: false}
    }
  }
</script>
<style lang="less">
</style>