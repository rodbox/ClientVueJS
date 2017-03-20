<template>
 <div :id="id" class="clusterize" v-if="loaded">
  <clusterize-filters :id="id">
    <label for="vpad" class="btn btn-link"><i class="fa fa-th"></i></label>
    <input type="checkbox" id="vpad" v-model="vpad"/>
  </clusterize-filters>
  <slot></slot>
  <table :id="id + '-table'" class="table table-sm table-hover" >
    <thead class="thfixed bg-faded">
      <tr class="bg-faded">
       <th style="width:40px;" class="text-right" @click="setEdit({})">
        <clusterize-actions :data="edit" :service="service"></clusterize-actions>
      </th>
      <clusterize-order :index="k" :size="col.size" v-for="(col, k) in cols"></clusterize-order>
      <th class="" style="width: 80px;"></th>
    </tr>
  </thead>
  <tbody class="clusterize-content">
    <tr v-for="(item, k, n) in itemsPaginate" :class="trCSS(k, item)" @click="setEdit(item)">
      <td v-if="crud" class="text-center td-crud" >
        <input type="checkbox" @change="toggleCheck" class="btn" v-model="item.check" :value=item.check :id="'check'+item.id">
       <label :for="'check'+item.id" class="text-sm">
        <i class="fa fa-check-square text-success" v-if="item.check"></i>
        <i class="fa fa-square text-default opacity" v-else></i>
        {{k + 1 + (cur - 1) * per}}. 
      </label>
      </td>
      <td v-for="(col, k, i) in cols" :class="col.css + ' ' + bgOrder(k)" >
        <dyn :index="k" :item="item"></dyn>
      </td>
      <td>
        <b-tag-button v-for="tag in item.tags" :tag="tag" :service="service" :id="item.id"></b-tag-button>
        <span class="badge badge-default" >{{tag}}</span>
      </td>
    </tr>
  </tbody>
</table>

<div class="row ">
  <div class="col text-center">
    <clusterize-pagination :showpers=true></clusterize-pagination>
  </div>
</div>

<div v-if="crud">
  <modal :title="'action.create'|trans" id="create">
    <clusterize-form  id="clustcreate" :service=service :crud=false :data=edit></clusterize-form>
  </modal>
  <modal :title="edit.name" id="edit">
    <a href="#" class="btn btn-nav-edit btn-nav-left " @click.prevent="setEditNav(-1)"> <i class="fa fa-chevron-left"></i></a>
    <a href="#" class="btn btn-nav-edit btn-nav-right " @click.prevent="setEditNav(+1)"> <i class="fa fa-chevron-right"></i></a>
    <tabs :id="'clustedit-' + service">
        <tab id="tab1" :title="'label.edit'|trans" open=true>
            <clusterize-form  id="clustedit" :service=service :crud=true :data=edit></clusterize-form>
        </tab>
        <slot name="tab2"></slot>
        <slot name="tab3"></slot>
        <slot name="tab4"></slot>
        <slot name="tab5"></slot>
    </tabs>
  </modal>
</div>
</div>
</template>
<script>
  // const compiler = require('vue-template-compiler')
  import { mapGetters, mapActions } from 'vuex'
  import clusterizePagination from './ClusterizePagination'
  import clusterizeFilters from './ClusterizeFilters'
  import clusterizeActions from './ClusterizeActions'
  import clusterizeFilter from './ClusterizeFilter'
  import clusterizeOrder from './ClusterizeOrder'
  import clusterizeForm from './ClusterizeForm'
  export default {
    name: 'Clusterize',
    props: {
      id: {type: String, default: 'clusterize'},
      service: {type: String, default: 'placeholder'},
      crud: {type: Boolean, default: true},
      vpad: {type: Boolean, default: true}
    },
    data () {
      return {
        edit: ''
      }
    },
    components: {
      clusterizePagination,
      clusterizeFilters,
      clusterizeFilter,
      clusterizeActions,
      clusterizeOrder,
      clusterizeForm
    },
    computed: {
      ...mapGetters(['currency']),
      ...mapGetters('clusterizeModule', ['type', 'meta', 'filters', 'items', 'itemsPaginate', 'cur', 'per', 'pers', 'counter', 'order', 'pages', 'counterFinded', 'loaded', 'itemsFinded', 'finder', 'cols', 'templates', 'focus', 'checked', 'edit', 'itemFocus', 'checkeds', 'counterChecked'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setDataService', 'setFilter', 'setClearFilter', 'setPer', 'setCur', 'setEdit', 'navCur', 'setSearch', 'setFocus', 'toggleCheck', 'setEditNav']),
      ...mapActions('productModule', ['productUpdate', 'productCreate']),
      ...mapActions('padModule', ['getItemtags']),
      bgOrder (index) {
        return (index === this.order[0]) ? 'index-order' : ''
      },
      updEdit (edit) {
        console.log(edit)
      },
      trChecked (item) {
        return 'checked'
      },
      trCSS (k, item) {
        let css = ''
        if (k === this.focus) {
          css += 'focus '
        }
        if (item.check) {
          css += 'checked '
        }
        return css
      }
    },
    created () {
      if (!this.loaded) {
        this.setDataService({
          service: this.service
        })
      }
    }
  }
</script>
<style lang="less">

.opacity{
  opacity: 0.3;
}


th {
  padding: 0rem;
  a {
    padding: .3rem !important;
  }
}
.clusterize {
  td,
  th {
    border-right: 1px solid;
    border-color:  fade(#000, 2%) !important;
    &,
    *{
      font-size: .9rem;
    }
  }
  tr {
    &.focus {
      > td:first-child {
        -webkit-box-shadow:inset 5px 0 0 0 fade(#000, 10%);
        box-shadow:inset 5px 0 0 0 fade(#000, 10%);
      } 
    }
    &.checked {
      > td:first-child {
        -webkit-box-shadow:inset 5px 0 0 0 fade(green, 20%);
        box-shadow:inset 5px 0 0 0 fade(green, 20%);
      }
      > td{
          background-color: fade(green, 10%);
          &.index-order {
              background-color: fade(green, 20%);
          }
      }

      &.focus{
        > td{
          background-color: fade(green, 20%);
          &.index-order {
              background-color: fade(green, 30%);
          }
        }
      }
    }
    td{
      input[type="checkbox"] {
        position: absolute;
        width: 1px;
        height: 1px;
        opacity: 0;
      }

    }
  }
  .col-md-12,
  .col-md-9 {
    margin-left: -1rem;
  }
  .col-md-12,
  .col-md-3 {
    margin-right: -1rem;
  }
  .badge {
    &,
    a{
        font-size: .7rem !important ;
    }
  }
}
</style>