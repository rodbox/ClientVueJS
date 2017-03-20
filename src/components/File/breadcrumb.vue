class filesStore {
	constructor (){
	    this.state = {
	    	dir    : '',
	    	index  : '/',
	    	breads : [],
	    	files  : {},
	    	icons  : {
				txt  : {css : 'fa fa-file-word-o'   , color : '#196ca7'} ,
				md   : {css : 'fa fa-file-word-o'   , color : '#196ca7'} ,
				json : {css : 'fa fa-file-code-o'   , color : '#136055'} ,
				csv  : {css : 'fa fa-file-excel-o ' , color : '#27a877'} ,
				xls  : {css : 'fa fa-file-excel-o ' , color : '#27a877'} ,
				xlsx : {css : 'fa fa-file-excel-o ' , color : '#27a877'} ,
				avi  : {css : 'fa fa-movie'         , color : '#4e2472'} ,
				mpg  : {css : 'fa fa-movie'         , color : '#4e2472'} ,
				mp3  : {css : 'fa fa-file-audio-o ' , color : '#f39c12'} ,
				wav  : {css : 'fa fa-file-audio-o ' , color : '#f39c12'} ,
				mp4  : {css : 'fa fa-file-audio-o ' , color : '#f39c12'} ,
				flac : {css : 'fa fa-file-audio-o'  , color : '#f39c12'}
			}
	    }
	}

	setBread(){
		let index = files_store.getState('index')
		let split = index.split('/')
		let start = ''
		let bread = {}

		let indexParent = {}

		split.forEach( (element, index) => {
			if (index > 0) {
				start += '/'+element
				bread[element] = start 
			}
		});

		return this.state.breads = bread
	}

	setState(index, value){
		return this.state[index] = value
	}

	getState(index){
		return this.state[index]
	}

	scan(){
		app_store.getService('files.scan',{dir:this.state.dir, index:this.state.index},(data)=>{
			files_store.setFiles(data)
			files_store.setBread()
		})
	}

	setFiles(list){
		return this.state.files = list
	}

	new(type){
		let name = prompt(translate('label.'+type+'name'))

		if(name){
			app_store.getService('files.new',
				{
					dir   : this.state.dir,
					index : this.state.index,
					type,
					name
				},(data)=>{
				
				files_store.scan()
			})
		}
	}

	delete(file){
		let confirmDelete = confirm(translate('msg.confirm_file_delete'))
		if (confirmDelete) {
			app_store.getService('files.remove',
				{
					dir   : this.state.dir,
					index : this.state.index,
					file
				},(data)=>{
				files_store.scan()
			})
		}
	}
}
let files_store 		= new filesStore()


let fileComponent 	= Vue.component('file',{
	props:{
		'file':{type:Object, default:{}}
	},
	methods:{
		preview(file){
			modal_store.add({
				title : file.filename,
				url   : file.url,
				size  : 'modal-lg'
			});
		}
	},
	template:`
		<div class="card file">
			<a href="#" v-if="!file.protect" @click.prevent="files_store.delete(file)" class="btn-del"> <i class="fa fa-remove"></i></a>
			<a href="#" v-if="file.protect" @click.prevent="preview(file)" class=" ">
				<div class="card-block text-center" style=" padding:0.75rem;">
				<file_icon :ext="file.ext" ></file_icon>
				<div class="file-title" >{{file.filename}}</div>
				</div>
			</a>
			<router-link v-else="file.protect" :to="{name: 'editor',params:file}" class="">
				<div class="card-block text-center" style=" padding:0.75rem;">
					<file_icon :ext="file.ext" ></file_icon>
					
					<div class="file-title" >{{file.filename}}</div>
				</div>
			</router-link>
		</div>
	`
})

let folderComponent 	= Vue.component('folder',{
	props:{
		'folder':{type:Object, default:{}}
	},
	template:`
	<div class="card file folder">
		<a href="#" v-if="!folder.protect" @click.prevent="files_store.delete(folder)" class="btn-del"> <i class="fa fa-remove"></i></a>
		<a href="#" @click.prevent="open(folder.rel)" >
			<div class="card-block text-center" style=" padding:0.75rem;">
			<i class="fa fa-folder fa-2x"></i>
			<div class="file-title" >{{folder.filename}}</div>
			</div>
		</a>
	</div>
	`,
	methods:{
		open(index){
			files_store.setState('index',files_store.state.index+index)
			files_store.scan()
		}
	}
})

let breadcrumbComponent 	= Vue.component('breadcrumb',{
	data () {
		return files_store.state
	},
	props: {
		dir      : {type : String, default  : 'media'},
		index    : {type : String, default  : '/'},
		filename : {type : String, default  : ''},
		upload   : {type : Boolean, default : false},
		create   : {type : Boolean, default : false}
	},
	template:`
		<ol class="breadcrumb">
  			<li class="breadcrumb-item ">
				<router-link :to="{name:'files',params:{index:toParent(),dir}}"  class="btn btn-link btn-sm"><i class="fa fa-arrow-circle-left "></i></router-link>
  			</li>
  			
  			<li class="breadcrumb-item" v-for="(bread , k) in breads" ><a href="#" @click.prevent="files_store.setState('index',bread)">{{k}}</a></li>
  			<li class="breadcrumb-item active" v-if="filename!=''"  >{{filename}}</li>
  			<li class=" pull-right" v-if="create">
				<div class="btn-group">
				    <a data-close-others="true" data-hover="dropdown" data-toggle="dropdown" href="#" class="btn btn-link btn-sm">
				    {{'label.file'|trans(1)}} <i class="fa fa-angle-down"></i>
				    </a>
				    <div class="dropdown-menu dropdown-menu-right">
				    	<button class="dropdown-item" @click.prevent="files_store.new('folder')"> <i class="fa fa-folder"></i> {{'action.create_folder'|trans}}</button>
				      	<button class="dropdown-item" @click.prevent="files_store.new('file')"><i class="fa fa-file-o"></i> {{'action.create_file'|trans}}</button>  
				    </div>
				</div>
  			</li>
  			<li class=" pull-right" v-if="upload">
	  			<plupload :id="dir" :index="index" size="sm"></plupload>
  			</li>
  			<slot></slot>
		</ol>
	`,
	methods:{
		getIndex(){
			return this.index
		},
		toParent(){
			let index = this.getIndex()
			let split = index.split('/')
			split.pop()
			//split.pop()
			let join = split.join('/')
			//router.push('/files/media/');

			return join
		}
	},
	created(){
		files_store.setBread()
	}
})

let filesComponent 	= Vue.component('files',{
	props:{
		'dir'    : {type : String, default  : 'media'},
		'index'  : {type : String, default  : '/'},
		'upload' : {type : Boolean, default : true },
		'create' : {type : Boolean, default : true }
	},
	watch:{
		index(){
			files_store.scan()
			
		}
	},
	data () {
		return files_store.state
	},
	template: `
	<div>
		<breadcrumb :dir="dir" :index="index" :upload="upload" :create="create"></breadcrumb>
		<folder v-for="(folder , k) in files.folders" :folder="folder"></folder>
		<file v-for="(file , k) in files.files" :file="file"></file>
	</div>	
	`,
	
	methods:{
		setFiles(list){
			files_store.setFiles(data)	
		},
		
	},
	created(){
		files_store.setState('dir',this.dir)
		files_store.setState('index',this.index)

		files_store.scan()
		files_store.setBread()
	}
})


let fileIconComponent 	= Vue.component('file_icon',{
	props:{
		ext : {type : String, default : 'dzadza' }
	},
	data(){
		return files_store.state
	},
	methods:{
		getCss(ext){
			if(this.icons[ext] != undefined)
				return this.icons[ext]['css']
			else
				return ''
		},
		getColor(ext){
			if(this.icons[ext] != undefined)
				return 'color:'+this.icons[ext]['color']
			else
				return ''
		}
	},
	template: `
		<span class="fa-stack" :style="getColor(ext)">
			<i class=" fa-stack-1x fa-2x " :class="getCss(ext)"></i>
			<i class="fa fa-file-o fa-stack-2x fa-2x"></i>
		</span>
	`
})


let filePageComponent 	= Vue.component('files_page',{
	props:{
		'dir'    : {type : String, default  : 'media'},
		'index'  : {type : String, default  : '/'},
		'upload' : {type : Boolean, default : true },
		'create' : {type : Boolean, default : true }
	},
	data(){
		return files_store.state
	},
	template: `
		<files :dir="dir" :index="index" :upload="upload" :create="create"></files>
	`
})