<template>
 <div :id="id" class="clusterize" v-if="loaded">
  <div class="row pb-2">
    <div class="col-md-5">
      <div class="input-group">
        <div class="input-group-addon"><i class="fa fa-search"></i></div>
        <input type="text" class="form-control" style="width:70px;" v-model="finder.value" @input="setSearch(finder.value)" @keydown.left="navCur(-1)" @keydown.right="navCur(+1)">
        <div class="input-group-addon">
          <span class="text-muted"><strong>{{counterFinded}}</strong> <span class="text-sm">{{'label.result'|trans(counterFinded)}}</span></span>
        </div>   
        <div class="input-group-addon">
        <div class="btn-group">
            <button data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="dropdown-toggle">
              <span class="text-sm">{{'label.by'|trans}}</span> <strong>{{per}}</strong>
            </button>
            <div class="dropdown-menu w-fix">
              <a href="#" class="dropdown-item" @click.prevent="setPer(per)" v-for="per in pers">{{per}}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-2 text-center">
      <clusterize-pagination  :showpers=true></clusterize-pagination>
    </div>
    <div class="col-md-5 text-right">
      <clusterize-filters filter="type"></clusterize-filters>
      <clusterize-filters filter="brand"></clusterize-filters>
      <clusterize-filters filter="price"></clusterize-filters>
      <clusterize-filters filter="follow"></clusterize-filters>
      <div class="btn-group">
       
      <a href="#" @click.prevent="setClearFilter" class="btn btn-link"><i class="fa fa-asterisk" aria-hidden="true"></i></a>
      </div>
    </div>
  </div>

<div class="clearfix"></div>
<table :id="id + '-table'" class="table table-sm table-hover" >
  <thead class="thfixed bg-faded">
    <tr class="bg-faded">
     <th style="padding:0!; width:60px;" @click="setEdit({})">
        <clusterize-actions :data="edit"></clusterize-actions>
    </th>
    <clusterize-order index="id" size="90"></clusterize-order>
    <clusterize-order index="name" size="170"></clusterize-order>
    <clusterize-order index="brand"></clusterize-order>
    <clusterize-order index="price"></clusterize-order>
    <clusterize-order index="follow"></clusterize-order>
    <clusterize-order index="stock" colspan="3"></clusterize-order>
    <th></th>
  </tr>
</thead>
<tbody class="clusterize-content">
  <tr> 
    <tr v-for="(item, k, n) in itemsPaginate" >
      <td>
        <div class="btn-group-sm">
          <span class="btn"><span class="text-sm">{{k + 1 + (cur - 1) * per}}.</span></span>
        </div>
      </td>
      <td :class="bgOrder('id')">{{item.id}}</td>
      <td :class="bgOrder('name')" @click="setEdit(item)">
        <modal-button id="edit">
          <strong>{{item.name}}</strong>
          <div class="text-sm">{{item.type}}</div>
        </modal-button>
      </td>
      <td :class="bgOrder('brand')" class="text-center">
        {{item.brand}}
      </td>
      <td :class="bgOrder('price')" class="text-right"><strong>{{item.price | currencyConvert('€')}} {{currency}}</strong></td>
      <td :class="bgOrder('follow')" class="text-center"> <span class="text-sm" ><i class="fa fa-eye" v-if="item.follow"></i></span></td>
      <td v-for="(shop, kShop) in item.shops" class="text-center" @click="setEdit(item)">
        <modal-button id="edit">
          <div class="text-sm">{{shop.stock}}</div>
          <span class="badge" :class="'badge-'+shop.alert">{{shop.alert}}</span>
        </modal-button>
      </td>
      <td :class="bgOrder('comments')" class="text-right" @click="setEdit(item)">
        <modal-button id="edit">
          <span class="text-sm" v-if="1 > 0"><i class="fa fa-comment-o"></i> {{item.comments|length}}</span>
        </modal-button>
      </td>
    </tr>
  </tbody>
</table>
<!-- BEGIN ROW  -->
<div class="row ">
  <div class="col text-center">
    <clusterize-pagination  :showpers=true></clusterize-pagination>
  </div>
</div>
<!-- END ROW  -->
<modal :title="'action.create'|trans" id="create">
  <clusterize-form  id="clustcreate" :crud=false :data="edit"></clusterize-form>
</modal>
<modal :title="edit.name" id="edit">
  <tabs>
    <tab id="edit-0" :title="'label.infos'|trans" :open=true>
      <clusterize-form id="clustedit" :crud=true :data="edit"></clusterize-form>
    </tab>
    <tab id="edit-1" :title="'label.stock'|trans">
      <table class="table table-sm">
        <thead>
          <tr>
            <th v-for="(shop, k) in edit.shops"  class="text-center">
              {{k}}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="(shop, k) in edit.shops" class="text-center">
              <b-input :value="shop.stock"></b-input>
            </td>
          </tr>
        </tbody>
      </table>
    </tab>
    <tab id="edit-2" :title="'label.comments'|trans">
      <textarea cols="30" rows="3" class="form-control" v-model="content" @click.prevent="addComment({edit: edit, content: content})"></textarea>
      <div class="messages">
        <div v-for="message in edit.comments" class="message user">
          {{message}}
        </div>
      </div>
    </tab>
    <tab id="edit-3" :title="'label.photo'|trans">
      <plupload id="editupload" :dir="edit.id" class="bg-faded text-center"></plupload>
    </tab>
  </tabs>
</modal>
</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import clusterizePagination from './ClusterizePagination'
  import clusterizeFilters from './ClusterizeFilters'
  import clusterizeActions from './ClusterizeActions'
  import clusterizeOrder from './ClusterizeOrder'
  import clusterizeForm from './ClusterizeForm'
  export default {
    name: 'Clusterize',
    props: {
      id: {type: String, default: 'clusterize'},
      crud: {type: Boolean, default: true}
    },
    data () {
      return {
        edit: ''
      }
    },
    components: {
      clusterizePagination,
      clusterizeFilters,
      clusterizeActions,
      clusterizeOrder,
      clusterizeForm
    },
    computed: {
      ...mapGetters(['currency']),
      ...mapGetters('clusterizeModule', ['type', 'meta', 'filters', 'items', 'itemsPaginate', 'cur', 'per', 'pers', 'counter', 'order', 'pages', 'counterFinded', 'loaded', 'itemsFinded', 'finder'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setPlaceholder', 'setFilter', 'setClearFilter', 'setPer', 'setCur', 'setEdit', 'navCur', 'setSearch']),
      ...mapActions('productModule', ['productUpdate', 'productCreate']),
      bgOrder (index) {
        return (index === this.order[0]) ? 'index-order' : ''
      },
      setEdit (item) {
        this.edit = item
      },
      updEdit (edit) {
        console.log(edit)
      },
      addComment (edit) {
        console.log(edit)
      }
    },
    created () {
      console.log(this.loaded)
      if (!this.loaded) {
        this.setPlaceholder()
      }
    }
  }
</script>
<style lang="less">
</style>