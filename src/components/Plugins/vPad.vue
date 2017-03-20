<template>
<div class="pad p-3">
  <h1>Tags
  <div class="btn-group mb-1 mt-2" >
    <label class="btn btn-sm btn-link" :class="(add)?'active ':'btn-danger'">
      <input type="checkbox" v-model="add" autocomplete="off">
        
        <span class="text-muted text-sm">Mode : </span>
        <strong>
          <span v-if="add">{{"label.mode_add" | trans}}</span>
          <span v-else>{{"label.mode_del" | trans}}</span>
        </strong>
        <i class="fa fa-caret-down"></i>
    </label>
  </div>
  </h1>
  <table class="table table-sm" >
    <tr v-for="(pad, kPad, iPad) in pads">
      <td class="td-pad"><a href="#" class="btn-pad"  @click.prevent="toggleTag(kPad)">
        <span class="btn-bg">{{ iPad + 1 }}</span></a>
      </td>
      <td class="td-tags">
        <bTag :item="{id: kPad, data: pad.tags}" :data="pad.tags" :value="pad.tags" :prefix="service"></bTag>
      </td>
    </tr>
  </table>
</div>
</template>
<script>
  import $ from 'jquery'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'vPad',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters('padModule', ['current', 'selecteds']),
      ...mapGetters('clusterizeModule', ['checkeds'])
    },
    props: {
      id: {type: String, default: 'padtag'},
      service: {type: String, default: 'clust'},
      add: {type: Boolean, default: true},
      pads: {
        type: [Array, Object],
        default: {
          pad1: { tags: [] },
          pad2: { tags: [] },
          pad3: { tags: [] },
          pad4: { tags: [] },
          pad5: { tags: [] },
          pad6: { tags: [] },
          pad7: { tags: [] },
          pad8: { tags: [] },
          pad9: { tags: [] }
        }
      }
    },
    methods: {
      ...mapActions('padModule', ['setTag', 'setSelecteds']),
      setCss (css) {},
      tags () {
        window.store.dispatch('getService', {
          id: this.service,
          name: 'tags.tags',
          cache: true,
          dataSend: {
            service: this.service
          },
          callback (json) {
          },
          beforeSend () {
          },
          hook: ['trace']
        })
      },
      getTags () {
      },
      toggleTag (tag) {
        let config = {
          tags: $('#' + this.service + tag).val(),
          add: this.add,
          selecteds: this.checkeds,
          service: this.service
        }
        this.setTag(config)
      }
    },
    mounted () {
    }
  }
</script>
<style lang="less">
@pad_bt_size: 48;
@color: #F7F9FA;
@colorDefault: #323232;

@colorBg: #222A3F;
@colorInverse: #FFF;

.btn-pad {
  background-color: darken(@colorBg, 20%);
}
.select2-selection__choice{
  background-color: darken(@colorBg, 3%);
}

.quickbar {
  .btn,
  .text-muted,
  a,
  *{
    color: @colorInverse;
  }
}


.select2-results__option {
  padding: .2rem .5rem;
}
.select2-dropdown.select2-dropdown--below,
.select2-results{
  padding: 0px;
  border-width: 0 !important;
}
.select2-results__option[aria-selected=true]{
  background-color: darken(@colorBg, 20%) !important;
  &.select2-results__option--highlighted{
    background-color: darken(@colorBg, 30%) !important;
  }
}
.select2-selection__choice{
  background-color: darken(@colorBg, 20%) !important;
  &,
  a{
    color: @color !important;
    font-weight: 500;
  }
}
.btn {
  input{
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }
}
.pad {
  &,
  .table{
      
  }
  /* border-left: 1px solid darken(@colorBg, 10); */
  .table{
    td{
      border-left: 0px !important;
      border-right: 0px !important;
    }
    margin-bottom: 0px;
    .select2{
      /* min-height: unit(@pad_bt_size, px); */
      width: 100% !important;
      .selection{
        border: 0;
      }
    }
  }
  .select2-container--open,
  .select2-container--default,
  .select2-selection--multiple{
    border: 0 !important;
    padding: 0;
    background-color: transparent;
    

  }

 
  .select2-dropdown{
    border: 0 !important;
  }
}
.td-pad{
  width: unit(@pad_bt_size, px);
  padding-right: 0 !important;
}
.td-tags{
  padding: 0 !important;
}
.badge {
  margin-top: 0rem;
  margin-right: .2rem;
  margin-bottom: .2rem;
}
.btn-bg{
  position: absolute;
  left: 0;
  text-align: center;
  font-weight: 600;
  font-size: unit(@pad_bt_size / 2, px);
  line-height: unit(@pad_bt_size, px);
  margin-top: -2px;
}

a.btn-pad {
  &,
  .btn-bg{
    height: unit(@pad_bt_size, px);
    width: unit(@pad_bt_size, px);
  }
  border-radius: .3rem;
  float: left;
  margin: 1px;
  padding: .3rem;
  -webkit-transition: all 95ms linear;
  -moz-transition: all 95ms linear;
  -ms-transition: all 95ms linear;
  -o-transition: all 95ms linear;
  transition: all 95ms linear;
  position: relative;
  &.onLoad {
    -moz-transform: scale(.9);
    -webkit-transform: scale(.9);
    -o-transform: scale(.9);
    -ms-transform: scale(.9);
    transform: scale(.9);
    cursor: wait;
  }
}
</style>
