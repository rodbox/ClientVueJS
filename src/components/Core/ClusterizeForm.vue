<template>
  <form action="#" :id="id" @submit.prevent="saveEdit({edit, service, crud})" >
    <div class="row">
    <div class="col">
      <div class="form-group" v-for="(item, k) in filters">
        <label :for="service + 'edit' + k">{{'label.'+k|trans}}</label>
        <input :id="service + 'edit' + k" type="text" v-if="item.form == 'text'" v-model="edit[k]" class="form-control" >
        <select :id="service + 'edit' + k" type="text" v-if="item.form == 'select'" v-model="edit[k]" class="form-control custom-select" >
          <option value="" v-if="!item.required">-</option>
          <option :value="val" v-for="val in item.data">{{val}}</option>
        </select>
        <input :id="service + 'edit' + k" type="checkbox" v-if="item.form == 'checkbox'"  v-model="edit[k]" />
      </div>
    </div>
    </div>
    <div v-if="onload">
      <button type="submit" class="btn btn-primary disabled btn-block">{{"action.onload"|trans}}</button>
    </div>
    <div v-else>
      <button type="submit" class="btn btn-primary btn-block" v-if="crud">{{"action.update"|trans}}</button>
      <button type="submit" class="btn btn-primary btn-block" v-else="crud">{{"action.save"|trans}}</button>
    </div>
  </form>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'ClusterizeForm',
    components: {
    },
    watch: {
      edit () {
        console.log('edit', this.edit)
      }
    },
    props: {
      id: {type: String, default: 'clust'},
      service: {type: String, default: 'placeholder'},
      index: {type: String, default: ''},
      crud: {type: Boolean, default: false}
    },
    computed: {
      ...mapGetters('clusterizeModule', ['type', 'meta', 'filters', 'items', 'itemsPaginate', 'cur', 'per', 'pers', 'counter', 'edit', 'order', 'pages', 'counterFilter', 'onload'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setPlaceholder', 'setFilter', 'setClearFilter', 'setPer', 'setCur', 'setEdit', 'setOrder', 'saveEdit']),
      setValue (e) {
        console.log(e.target.value)
      }
    }
  }
</script>
<style lang="less">
h1{
  font-size: 1.2rem;
}

</style>