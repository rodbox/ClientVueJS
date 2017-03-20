<template>
  <ul class="pagination pagination-sm  bg-faded b-faded" style="margin-top:0px;margin-bottom:0px;">
    <li class="page-item">
      <a class="page-link bg-faded b-faded" @click.prevent="navCur(-1)" href="#" aria-label="Previous">
        <span aria-hidden="true"><i class="fa fa-chevron-left"></i></span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li class="page-item">
      <select v-model="stores[storeId].state.data.pagination.cur"  class="page-link custom-select bg-faded b-faded no-bgi" style="borderRadius:0;height: calc(2.1rem - 2px); background: none !important;">
        <option v-for="n in stores[storeId].state.data.pagination.total"  :value="n">{{n}}</option>
      </select>
    </li>
     <li class="page-item">
      <a class="page-link bg-faded b-faded" @click.prevent="navCur(+1)" href="#" aria-label="Previous">
        <span aria-hidden="true"><i class="fa fa-chevron-right"></i></span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    
    </ul>
</template>
<script>
export default {
  name: 'bPagination',
  props: {
    id: {type: String, default: ''}
  }
}
</script>
<style lang="less">
</style>