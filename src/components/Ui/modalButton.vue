<template>
<a href="#" @click.prevent="setModal(id)" class=" btn-modal"><slot></slot></a>
</template>
<script>
  import $ from 'jquery'
  export default {
    name: 'modalButton',
    props: {
      id: {type: String, default: 'myModal'},
      title: {type: String, default: 'default'},
      subtitle: {type: String, default: ''}
    },
    methods: {
      setModal (id) {
        let modal = $('#' + id)
        modal.find('.modal-title .title').html(this.title)
        modal.find('.modal-title .subtitle').html(this.subtitle)
        modal.modal({
          backdrop: 'static'
        })
      }
    }
  }
</script>
<style lang="less">
a.btn-modal{
  &,
  &.page-link{
    color : #323232;
  }
  &:hover{
    text-decoration: none;
    color : #323232;
  }
}
</style>