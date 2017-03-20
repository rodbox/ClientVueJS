<template>
  <div class="hello">
    <div class="bg-jumbotron" style="background-image: url(http://cdn.rodbox.fr/img/chapeau-melon_6.jpg);">
    <div class="jumbotron bga" >
      <div class="container">
        <h1 class="display-3">{{"msg.hellow"|trans}}</h1>
        <modal-button id="login" class="btn btn-xl btn-primary">{{'action.login'|trans}}</modal-button>
        <modal-button id="iframe" class="btn btn-xl btn-primary">{{'action.iframe'|trans}}</modal-button>
      </div>
    </div>
    </div>
    <modal id="iframe" title="" size="modal-lg">
<object type="application/pdf" 
:data="pdf" 
style="width:100%;height:89vh;">
<param name="src" :value="pdf"/>
Cet objet nécessite un plugin pour être lu ou le fichier n'est pas accessible.
<br/>
Vous pouvez tenter d'ouvrir directement le fichier par ce 
<a :href="pdf">lien</a>
</object>
    </modal>
    <section style="margin-top: -3.9rem; ">
      <div class="container-fluid " >
        <div class="row ">
          <div class="col-md-12">
            <clusterize id="placeholder" class="bg-border container-pad">
              <tab id="tab2" slot="tab2" :title="'label.comments'|trans">
                <textarea cols="30" rows="3" class="form-control" v-model="formadd.comments" @input="updForm" name="comments" @keydown.prevent.enter="addIndexEdit"></textarea>
                  <div v-for="(com, kcom, ncom) in edit.comments" class="alert alert-default">
                    <a href="#" class="btn btn-sm text-default pull-right opacity" @click.prevent="delIndexEdit('comments', kcom)"><i class="fa fa-remove"></i></a>
                    <textarea v-model="edit.comments[kcom]" class="form-control"></textarea>
                  </div>
              </tab>
              <tab id="tab3" slot="tab3" :title="'label.photo'|trans">
                <vupload id="uproduct" dir="products" :index="'/'+edit.id" class="btn btn-block btn-default"><i class="fa fa-upload"></i> {{'action.upload'|trans}} {{'label.photo'|trans}}</vupload>
                  <div class="card" style="width: 10rem;" v-for="(img, kimg, nimg) in edit.img">
                    <img :src="urls.cdn+'/img/placeholder/'+img" alt="" class="img-card">
                    <span class="text-sm">{{kimg + 1}}. {{img}}</span>
                  </div>
              </tab>
              <tab id="tab4" slot="tab4" :title="'label.tags'|trans">
                <div class="form-group">
                  <input type="text"  name="tags" class="form-control" v-model="formadd.tags" @input="updForm" @keydown.prevent.enter="addIndexEdit">
                </div>
                <b-tag-button v-for="tag in edit.tags" :tag="tag"></b-tag-button>
              </tab>
            </clusterize>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'hello',
    data () {
      return {
        pdf: 'http://cdn.rodbox.fr/pdf/toto.txt_1483572291.pdf'
      }
    },
    computed: {
      ...mapGetters(['urls']),
      ...mapGetters('userModule', ['user']),
      ...mapGetters('clusterizeModule', ['edit', 'formadd'])
    },
    methods: {
      ...mapActions(['loadToggle']),
      ...mapActions('clusterizeModule', ['addIndexEdit', 'delIndexEdit', 'updForm'])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .container-pad{
    padding: 0.7rem !important;
  }
  .alert{
    &.alert-default{
      padding: .3rem .7rem;
    }
    p {
      margin-bottom: 0;
    }
  }
  .jumbotron{
    border-radius: 0;
  }
  .bg-jumbotron{
    background-attachment: fixed;
    background-size: cover;
    background-position: bottom center

  }
  .bga{
    background-color:  fade(#222A3F, 90%) !important;
    *{
      color: #fff;
      .btn{
        background-color: #EE4266 !important;
      }
    }
  }
  .bg-border{
    border-radius: .225rem;
    background-color:#fff;
    padding:1rem 0px; 
    border: 1px solid fade(#222A3F, 5%) !important;
  }
  .img-card{
    width: 150px;
  }
</style>
