<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Dyn',
    template: '<div class="text-center">-</div>',
    computed: {
      ...mapGetters(['currency']),
      ...mapGetters('clusterizeModule', ['templates'])
    },
    watch: {
      templates () {
        this.$options.template = this.templates[this.index]
      }
    },
    methods: {
      ...mapActions([''])
    },
    data () {
      return {
      }
    },
    props: {
      index: {type: String, default: 'name'},
      item: {type: [String, Array, Object, Number, Boolean], default: 'dzadza'}
    },
    created () {
      // toto
      if (this.templates[this.index] !== undefined) {
        this.$options.template = this.templates[this.index]
      }
    }
  }
</script>
<style lang="less">
.table td .table {
  margin-bottom: 0;
  &,
  th,
  td{
    border: 0;
    background-color: transparent;
  }
}
</style>