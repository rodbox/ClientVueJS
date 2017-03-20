<template>
  <div id="app" :data-quickbar="quickbar" :data-header="header">
    <div class="main bd-content">
      <HMenu :statut=header></HMenu>
      <router-view class="view-one"></router-view>
    </div>
    <quickbar :statut=quickbar ></quickbar>
    <modal id="user_setting" :title="'route.user'|trans">
      <user-setting></user-setting>
    </modal>
    <modal id="login" :title="'action.login'|trans">
      <user-login></user-login>
    </modal>
    <modal id="register" :title="'action.register'|trans">
      <user-register></user-register>
    </modal>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'app',
    components: {
      HMenu: require('./components/Navigation/HMenu'),
      loader: require('./components/Navigation/Loader'),
      flag: require('./components/Locale/Flags'),
      userSetting: require('./pages/UserSetting'),
      userLogin: require('./pages/UserLogin'),
      userRegister: require('./pages/UserRegister')
    },
    computed: {
      ...mapGetters(['quickbar'])
    },
    methods: {
      ...mapActions('localeModule', ['isTrans'])
    },
    created () {
      this.isTrans()
      /* eslint-disable  */
      $(window).scroll(() => {
        let pos = $(window).scrollTop()
        if (pos > 50) {
          $('body').addClass('header-fixed')
        }
        else {
          $('body').removeClass('header-fixed')
        }

      })
    }
  }
</script>

<style lang="less">
  @color: #222A3F;
  @colorDefault: #323232;
  @colorBg: #F7F9FA;
  @colorInverse: #FFF;

  @quickbarSpeed: 225;
  @quickbarClose: 50;
  @quickbarOpen: 250;
  @quickbarBG: darken(@color, 5%);
  @quickbarBG2: lighten(@quickbarBG, 7%);
  @quickbarBG3: lighten(@quickbarBG, 10%);

  [draggable="true"] {
  -moz-user-select: none !important;
  -khtml-user-select: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  /* Required to make elements draggable in old WebKit */
  -khtml-user-drag: element !important;
  -webkit-user-drag: element !important;
}
.col-tools{
  margin-top: 2.5rem;
  .btn-color-reverse{
    color: @colorInverse;
    margin-top: -0.15rem;
    font-size: .7rem;
  }
   .btn{
      color: @colorInverse;
      border-color: fade(#fff, 5%) !important;
      background-color: @quickbarBG2;
      &.active{
        background-color: @quickbarBG;
      }
    }
}
#paper-footer,
.menu-side,
.col-side{
    border-color: fade(#fff, 5%) !important;
    background-color: @quickbarBG2;
    &.darken{
      background-color: @quickbarBG;
    }
    &.no-border{
      border-color: transparent !important;
      border-width: 0 !important;
    }
    .list-group,
    .list-group-item,
    .btn {
        border-color:transparent !important;
        background-color:transparent !important;
    }
    .btn.active{
        background-color:@quickbarBG !important;
    }
    border-right: 2px solid @quickbarBG2;
    .nav-tabs {
      margin-top: .3rem;
      &,
      .nav-link{
        border-bottom: 1px solid @quickbarBG;
        &:hover {
          border-color: @quickbarBG2;
        }
        &.active{
          border-color: @quickbarBG2;
          background-color: @quickbarBG2;
        }
      }
    }
    .tab-pane{
      background-color: @quickbarBG2;
      padding: .3rem;
    }
    pre,
    a,
    .btn,
    label,
    textarea,
    .list-group,
    .form-control,
    .form-control-sm,
    select,
    .list-group-item,
    a[data-toggle="collapse"]{
      font-size: .7rem !important;
        color: @colorInverse !important;
    }
    a[data-toggle="collapse"]{
      font-weight: 600;
    }
  

    label{
      opacity: .5;
    }
    textarea{
      width: 100%;
    }
    select,
    textarea,
    .form-control{
      display: block !important;
      margin-bottom: .1rem !important;
      background-color: fade(#fff, 10%);
      border-color: transparent;
      font-size: .7rem !important;
      font-weight: 400;
      &:focus {
        background-color: fade(#fff, 15%);
        border-color: transparent;
        
      }
    }
}


.badge-default{
  background-color: @colorBg;
  padding: .5rem;
  a {
    color: @colorDefault;
    &.btn-destroy {
      opacity: 0.2;
    }
  }
}
.card {
  margin-top: .5rem;
  border: 1px solid @colorBg;
  padding: .5rem;
}
p.alert {
  font-size: 0.8rem;
}
.card,
.alert-default,
.btn-default {
  background-color: @colorBg;
}

.btn-nav-edit{
  position: fixed;
  top: 7vh;
  z-index: 2000;
  font-size: 2rem;
  color: @colorBg;
  &:hover {
    color: @colorInverse;
  }
  &.btn-nav-left{
    left: -3rem;
  }
  &.btn-nav-right{
    right: -3rem;
  }
}


th,
td{
  &,
  a{
    color: darken(@colorBg, 60%) !important;
  }
}

  header {

  }

  [data-quickbar="open"] {
    .main { 
      .animate(@quickbarSpeed * 1.2);
      width: calc(~'100% - ' unit(@quickbarOpen, px)) !important; 
    }
    .quickbar{
        .animate(@quickbarSpeed);
    }
   
  }
  [data-quickbar="close"] {
    .main { 
      .animate(@quickbarSpeed * 0.5);
      width: 100% !important; 
    }
    .quickbar{ 
      .animate(@quickbarSpeed);
      .transX(@quickbarOpen);
    }
  }
  
  .transX(@value) {
    -moz-transform: translateX(unit(@value, px));
    -webkit-transform: translateX(unit(@value, px));
    -o-transform: translateX(unit(@value, px));
    -ms-transform: translateX(unit(@value, px));
    transform: translateX(unit(@value, px));
  }
  
  #paper-footer{
    .animate();
    .transX(200)
    &.open{
      .transX(0)

    }
  }

  .quickbar {
    .btn-quickbar-toggle{
      background-color: @quickbarBG;
    }
    position: fixed;
    right: 0;
    top:0;
    padding-top: 50px;
    min-height: 100vh;
    background-color: @quickbarBG;
    width: unit(@quickbarOpen, px) !important;

    tr,
    td{
      border-color: @quickbarBG2;
    }
    .btn-link {
      &,
      * {
        color: @colorBg !important;
      }
    }
  }
  .badge-default{
    background-color: @colorBg;
  }

strong {
  font-weight: 700;
}
.animate(@value : 225) {
  -webkit-transition: all unit(@value, ms) ease-in-out;
  -moz-transition: all unit(@value, ms) ease-in-out;
  -ms-transition: all unit(@value, ms) ease-in-out;
  -o-transition: all unit(@value, ms) ease-in-out;
  transition: all unit(@value, ms) ease-in-out;
}
.form-finder{
    .form-control{
      width: 0px;
      padding-right: 0px;
      padding-left: 0px;
      .animate(125);
    }
    .input-group {
      border-radius: .3rem !important;
      .animate(125);
    }
    
    &.focus,
    &:hover{
      .input-group-addon{
        padding-left: .7rem;
      }
      .input-group {
        background-color: fade(@colorInverse, 10%) !important;
      }
      .form-control{
        width: 150px !important;
        padding-right: .3rem;
        padding-left: .3rem;
      }
      border-bottom: 1px solid #fff;
    }
  }


  .form-finder{
      background-color: transparent !important;
      border: transparent !important;
      color: #fff !important;
      border-radius: 0px;
      overflow: hidden;
      
      .form-control,
      .input-group-addon{
        border-width: 0;
        background-color: transparent !important;
        border-radius: 0;
        color: @colorInverse !important;
        /* border-color: @colorInverse !important; */
      }
      .input-group-addon{
        padding-left: .3rem; 
        padding-right: .3rem;
        + .form-contol{
        }
    }

    &.active {
        width: 148px;
        .form-control,
        .input-group-addon{
          
        }
    }
  }
header{
  background-color: fade(@color, 0%) !important;
  .navbar {
    padding-top: 1.3rem;
    padding-bottom: 1.3rem;
  }
  .dropdown-menu {
    margin-top: -1px;
    background-color: @color !important;
    .dropdown-divider{
      margin: 0;
      background-color: fade(darken(@colorBg, 20%), 30%) !important;
      + .dropdown-item{
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
      }
    }
    .dropdown-item{
      i { margin-right: .5rem;}
      color:fade(@colorInverse, 40%);
      &:hover{
        background-color: fade(@colorInverse, 5%) !important;
        
      }
    }
  }
}
.body-fix{
  height: 100vh;
  overflow: hidden;
  padding-top: 5rem;
}

.header-dark,
.body-fix,
.header-fixed {
  header {
    .navbar {
    }
  
    background-color: fade(@color, 95%) !important;
    .navbar {
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
    }
  }
}

  .tab-pane{
    padding-top: .3rem;
  }
  .nav-link{
    color:darken(@colorBg, 20%);
    /* color: lighten(@colorDefault, 50%); */
    &.active{
      color: @colorDefault;
      -webkit-box-shadow:inset 0 0 0 0 rgba(0,0,0,0.05);
    box-shadow:inset 0 0 0 0 rgba(0,0,0,0.05);
    }
    &:hover{
    -webkit-box-shadow:inset 0 -5px 0 0 rgba(0,0,0,0.05);
    box-shadow:inset 0 -5px 0 0 rgba(0,0,0,0.05);
      color: @colorDefault;
    }
  }
    body{
      background-color: @colorBg;
    }
    .show .dropdown-toggle{
        &,
        &.focus,
        &:focus,
        &.active{
          background-color: darken(@colorBg, 5%);
        }
    }
    .dropdown-toggle{
      &.bg-t{
        background-color: transparent !important; 
      }
      font-weight: 600;
      &,
      &.focus,
      &:focus,
      &.active{
        color: @color;
        background-color: @colorBg;
      }
      border: 0px;
    }
    .dropdown-menu{
      background-color: darken(@colorBg, 5%);
      border: 0px;
      .dropdown-item{
        &:hover,
        &:active,
        &:focus{
          background-color: darken(@colorBg, 9%);
        }

      }

    }
  .view-one{
    margin-top: -4rem;
    padding-top: 4rem;
  }
  .bg-faded {
    background-color: @colorBg;
  }
  .mt{margin-top: 1rem;}
  .mb{margin-bottom: 1rem;}
  h1{
    margin-top: 2rem;
  }
  .text-danger{
    font-weight: 500;
  }

  .btn-success,
  .btn-primary,
  .bg-inverse {
    background-color: @color !important;
    border-color: @color !important;
    &,
    .nav-link {
     color: @colorInverse !important;
   }
 }
  
  .btn-outline-primary {
    border-color:  fade(@color, 20%) !important;
    color:  @color;
    &.active,
    &:active,
    &:hover{
       color: #fff !important;
      .btn-primary !important;
    }
  }
  .show {
    .btn-outline-primary {
      .btn-outline-primary.active;
    }
  }
 .page-link,
 .btn-link {
  &,
  *{
    color: @colorDefault;
  }
  &:hover,
  &:active,
  &:focus{
    font-decoration: none;
  }
}
a,
.page-link,
.navbar-toggler,
.btn{
  &,
  &:active,
  &.active,
  &:focus,
  &:hover {
    -webkit-box-shadow: 0 0 0 0 rgba(0,0,0,0) !important;
    box-shadow: 0 0 0 0 rgba(0,0,0,0) !important;
    outline: none;
  }
}
.navbar-inverse.bg-inverse{
  background-color: darken(@color,5%) !important ;
}
.select2{
  display: block;
}
.note-editor.note-frame{
  border-radius: .225rem;
  border-color: darken(@colorBg, 5%);
  color: @color;
  &.active,
  &:active,
  &:focus{
    border-color: darken(@colorBg, 20%);
    background-color: @colorBg;
  }
}

.select2-container--default .select2-selection--multiple,
.select2,
.input-group-addon,
.form-control{
  border-radius: .225rem;
  background-color: @colorBg;
  border-color: darken(@colorBg, 5%);
  color: @color;
  font-weight: 600;
  &.active,
  &:active,
  &:focus{
    border-color: darken(@colorBg, 20%);
    background-color: @colorBg;
  }
}
.dropdown-item {
    padding: 0.7rem 0.9rem;
}
.table-hover{
  tr:hover {
    background-color: @colorBg !important;

  }
}

 .thfixed{
    th {
      text-align: center;
    }
  }
  .message,
  textarea{
    padding: 1rem;
    margin-bottom:1rem;

  }
  .message {
    width: 80%;
    padding: 1rem;
    border-radius: .3rem;
    margin-bottom:1rem;
    &.user{
      background-color: darken(@colorBg, 5);
    }
    &.user-o {
      float: right;
      background-color: darken(@colorBg, 10);
    }
  }
  .input-model{
    border:0px !important;
    text-align: center !important;
    background-color: transparent;
  }

  th.index-order {
    background-color: darken(@colorBg, 3%);
  }
  td.index-order {
    background-color: fade(darken(@colorBg, 3%), 30%)
  }
  .nav-tabs .nav-link{
    margin-right: .3rem;
  }
  label{
    margin-bottom: .3rem;
  }
    

  .modal {
    @darkborder: darken(@color,5%);
    @colorBorder: darken(@colorBg,5%);
    .nav-tabs {
      border-bottom: 1px solid @colorBorder !important;
      background-color: @colorBg;
      margin: -15px -0.9rem 5px -0.9rem;
      padding: 1rem 0px 0rem 1rem;
      .active {
        border-color: @colorBorder;
        border-bottom-color: #fff;
      }
    }
    .modal-header{
      border-top-left-radius: .3rem;
      border-top-right-radius: .3rem;
      background-color: @colorBg !important;
      border-color: @colorBg !important;
      font-size: 1.5rem;
    }
  }
  .header-mini{
  background-color: darken(#222A3F, 5%);
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  color: #ECEEEF;
  font-size: 0.7rem;
  text-align: center;
}

  .loader-master{
    position: absolute;
    z-index: 1001;
    right: 0.7rem;
    top: 0.7rem;
  }
  .container-fluid{
    padding-right: 30px;
    padding-left: 30px;
  }
  .navbar-brand{
    font-weight: 700;
  }
  header .btn-link {
    color: #fff !important;
  }
  .dropdown-xs{
    width:calc(40px + 0.5rem) !important; min-width:32px !important; 
  }
  .dropdown-xs .dropdown-item{
    padding: 0.3rem !important;
    text-align: center;  
  }
  header .btn{
    &,
    &.active,
    &:active,
    &.focus,
    &:focus {
      border: 0px !important
    }
  }
  .f-right{
    float: right;
  }
  .navbar-collapse {
    > .navbar-nav.navbar-right {
        margin-right: -15px;
        ~ .navbar-right {
            margin-right: 0;
        }
    }
    &.show{
      background-color: @color;
    }
}
.strong {
  font-weight: bolder;
}
tr {
  .td-crud{
    min-width: 40px;
  }
  .btn-crud{
    display: none;
  }
  &:hover{
    .btn-crud{
      display: block;
    }
  }
}
input.btn{
  margin: .3rem;
  width: 16px;
  height: 16px;
  background-color: transparent;
}

    @color1: @colorBg;
    @color2: darken(@color1, 5%);
    @color3: darken(@color1, 10%);
    @color4: darken(@color1, 15%);
    @color5: darken(@color1, 20%);
    @color6: darken(@color1, 25%);

.clusterize {
  tr {
    thead{
      th{
          border-color: @color4;    
          &,
          a,
          .btn{
            background-color: @color4 !important;
          }

          &.index-order{
            &,
            a,
            .btn{
              background-color: @color4;
            }
          }
      }
    }

    &.focus {
      background-color: @color1;
      td {
        &.index-order{
          background-color: @color2;
        }
      }
    }

  }
}

.modal-open {
  .quickbar {
    z-index: 3000 !important;
  }
}
</style>