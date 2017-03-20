<template>
<span class="vupload-container text-center" :id="id+'_vupload'" >
   <input :id="id" type="file" class="input-vupload" multiple>  
   <label :for="id"><slot>
     <div class="btn btn-primary"><i class="fa fa-upload fa-fw"></i> <span class="text-sm" v-if="onload">{{data.bitrate/100 | size}}</span></div>
   </slot></label>
    <div v-if="onload">
      <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" aria-valuemin="0" aria-valuemax="100"><span class="value" v-if="onload">{{progressAll}} %</span></div>
      </div>
      <ul class="list-group mb-2" >
        <li v-for="file in files" class="list-group-item"><strong>{{file.name}}</strong> <span class="text-sm ml-1 mt-1">{{file.size | size}}</span></li>
      </ul>
    </div>
</span>
</template>
<script>
  /* https://www.npmjs.com/package/blueimp-file-upload-npm */
  require('blueimp-file-upload-npm')
  import $ from 'jquery'
  export default {
    name: 'vUpload',
    props: {
      id: {type: String, default: 'vupload'},
      dir: {type: String, default: 'upload'},
      index: {type: String, default: '/'},
      rename: {type: Boolean, default: false},
      hook: {type: Array, default: []},
      onload: {type: Boolean, default: false}
    },
    data () {
      return {
        // url: 'http://192.168.1.45/__cloud_service__/web/app_dev.php/upload'
        progressAll: 0,
        data: {},
        files: {},
        onload: false,
        url: 'http://192.168.1.81/__service_rodbox__/web/app_dev.php/upload'
      }
    },
    computed: {
    },
    methods: {
      setLoad (bool) {
        this.onload = bool
      },
      setProgress (progress) {
        this.progressAll = progress
        if (progress === 100) {
          this.setLoad(false)
        }
      },
      setData (data) {
        this.data = data
      },
      setFiles (files) {
        this.files = files
      }
    },
    mounted () {
      let t = this
      let param = {
        url: this.url,
        formData: {
          dir: this.dir,
          index: this.index,
          hook: this.hook,
          rename: this.rename
        },
        progressall (e, data) {
          let progress = parseInt(data.loaded / data.total * 100, 10)
          t.setProgress(progress)

          $('#' + this.id + '_vupload .progress-bar').css(
              'width',
              progress + '%'
          )
        },
        progress (e, data) {
        },
        change: function (e, data) {
          let files = {}
          $.each(data.files, (index, file) => {
            files[index] = {
              name: file.name,
              size: file.size
            }
          })
          t.setFiles(files)
        },
        start (e, data) {
          t.setLoad(true)
          t.setData(data)
        },
        stop (e, data) {
          t.setLoad(false)
        },
        add (e, data) {
          t.setData(data)
          data.submit()
        },
        done (e, data) {
        },
        fail (e, data) {
          /* eslint-disable  */
          alert('fail')
        }
      }
      $('#' + this.id).fileupload(param)
    }
  }
</script>
<style lang="less">
.input-vupload{
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  + label{

  }
}
.progress {
  margin-top: 1rem;
  margin-bottom: 1rem;
  &,
  .progress-bar {
    font-size: .6rem;
    border-radius: .6rem;
  }
  .progress-bar {
    overflow: hidden;
    text-align: right;
    width: 0;
    height: 0.6rem;
    .value{
      position: absolute;
      margin-left: -1.6rem;
      margin-top: -1rem;
      color: #323232;
    }
  }
}
</style>