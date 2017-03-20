<template>
  <span class="flag-icon " :class="'flag-icon-'+locale"></span>
</template>
<script>
  import 'flag-icon-css/css/flag-icon.min.css'
  export default {
    name: 'flag',
    props: {
      locale: {type: String, default: 'gb'}
    }
  }
</script>
