<template>
  <div class="pagination-container" v-if="pages > 1">
    <!-- END DROPDOWN HOVER  -->
    <div class="btn-group">
      <ul class="pagination">
        <li class="page-item">
        <button class="page-link " @click.prevent="navCur(-1)" aria-label="Previous">
            <span aria-hidden="true"><i class="fa fa-chevron-left"></i></span>
            <span class="sr-only">Previous</span>
            </button>
        </li>
        <li class="page-item">
         <!-- BEGIN DROPDOWN HOVER  -->
         <div class="btn-group">
           <button data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="page-link text-center w-fix">
             <strong>{{cur}}</strong><span class="text-sm">/{{pages}}</span>
           </button>
           <div class="dropdown-menu w-fix" style="">
              <div class="dropdown-item" style="padding: 0.2rem;">
                <input type="text" class="form-control" v-model="cur">
              </div>
              <div class="dropdown-divider"></div>
             <a href="#" v-for="page in pages" @click.prevent="setCur(page)" class="dropdown-item"> {{page}} </a>
           </div>
         </div>
         <!-- END DROPDOWN HOVER  -->
       </li>
       <li class="page-item">
        <a class="page-link " @click.prevent="navCur(+1)" href="#" aria-label="Previous">
          <span aria-hidden="true"><i class="fa fa-chevron-right"></i></span>
          <span class="sr-only">Previous</span>
        </a>
      </li>
    </ul>
  </div>

</div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'clusterizePagination',
    props: {
      id: {type: String, default: ''},
      showpers: {type: Boolean, default: false}
    },
    computed: {
      ...mapGetters('clusterizeModule', ['pages', 'cur', 'pers', 'per'])
    },
    methods: {
      ...mapActions('clusterizeModule', ['setCur', 'navCur', 'setPer'])
    }
  }
</script>
<style lang="less">
  .w-fix {
    width: 4rem !important;
    min-width:4rem;
  }
  ul.pagination{
    margin-bottom: 0px;
  }
  .pagination-container{
    display: inline;
    .btn-group{
      vertical-align: top;
    }
    .page-link{
      border-width: 0;
    }
    .dropdown-menu{
      max-height: 20vh;
      overflow-y: auto;
      overflow-x: hidden;
      .dropdown-item{
        padding:0.3rem;
        .form-control{
          padding:0.3rem;

        }
      }
    }
  }
</style>
