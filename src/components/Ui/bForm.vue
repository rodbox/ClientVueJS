<template>
  <div class="form-group">
    {{item}}
  </div>
</template>
<script>
  export default {
    name: 'bForm',
    props: {
      item: {type: Object, default: {}}
    }
  }
</script>
