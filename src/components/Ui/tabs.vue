<template>
  <div class="tabs">
    <ul class="nav nav-tabs " :class="'nav-tabs-'+size">
      <li class="nav-item"  v-for="(item,index) in items">
        <a :href="'#'+item.id" class="nav-link" :class="openClass(item)" data-toggle="tab" :aria-expanded="openBool(item)" v-html="item.title" ></a>
      </li>
    </ul>
    <div class="tab-content"><slot></slot></div>
  </div>
</template>
<script>
  export default {
    name: 'tabs',
    components: ['tab'],
    data () {
      return {
        items: {}
      }
    },
    props: {
      size: {type: String, default: 'md'}
    },
    methods: {
      clearItems () {
        this.items = []
        return this.items
      },
      openBool (item) {
        return JSON.parse(item.open) ? 'true' : 'false'
      },
      openClass (item) {
        return JSON.parse(item.open) ? 'active' : ''
      }
    },
    created () {
      this.clearItems()
    }
  }
</script>
