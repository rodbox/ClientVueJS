import paper from 'paper'
import _ from 'lodash'
/* eslint-disable  */
const state = {
  tool: 'select',
  tools: {},
  code: 'alert("toto")',
  codes: {},
  items: {
    user: {},
    service: {}
  },
  data: {
    users: {
      rod: {
        name: 'rodolphe'
      },
      toto: {
        name: 'toto'
      }
    },
    tags: {
      textures: ['paper1', 'paper2', 'concrete'],
      fabrics: ['fab1', 'fab2', 'fab3']
    }
  },
  ui: {
    sidebar1: ['props', 'layers'],
    sidebar2: ['colors', 'data', 'tags', 'items'],
    footer: ['console','code','setting']
  },
  paper: {},
  projects: [],
  project: {
    setting: {
      name: 'paper',
      width: 400,
      height: 400,
      bgc: '#fff',
    },
    meta: {
      countlayer: 1
    }
  },
  menu: {
    actions:[
      {
        name: 'bringToFront',
        icon:'<i class="fa fa-step-forward fa-rotate-270" aria-hidden="true"></i>',
      },
      {
        name: 'sendToBack',
        icon:'<i class="fa fa-step-forward fa-rotate-90" aria-hidden="true"></i>',
      }
    ]
  },
  props: {
      settings: {
        strokeWidth: 3,
        strokeColor: '#fff',
        fillColor: '#000'
      },
    object: {
      blend: {
        value: '',
        tag: false,
        suggest: {
          values: [
          'normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard- light', 'color-dodge', 'color-burn', 'darken', 'lighten', 'difference', 'exclusion', 'hue', 'saturation', 'luminosity', 'color', 'add', 'subtract', 'average', 'pin-light', 'negation', 'source- over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'lighter', 'darker', 'copy', 'xor'
          ],
          tags: []
        }
      },
      alpha: {
        value: 1,
        tag: false
      },
      cap: {
        value: 'round',
        tag: false,
        suggest: {
          values: ['round', 'square', 'butt'],
          tags: []
        }
      },
      join: {
        value: 'round',
        tag: false,
        suggest: {
          values: ['miter', 'round', 'bevel'],
          tags: []
        }
      }
    },
    fill: {
      color: {
        value: '',
        tag: false
      },
      alpha: {
        value: 1,
        tag: false
      },
      image: {
        value: '',
        tag: true
      }
    },
    stroke: {
      color: {
        value: '',
        tag: false
      },
      width: {
        value: 1,
        tag: false
      },
      alpha: {
        value: 1,
        tag: false
      },
      dash: {
        value: [5, 5],
        tag: false
      }
    }
  },
  colors: {
    active: {
      index: 'stroke',
      fill: {name: 'white', hex: '#fff'},
      stroke: {name: 'black', hex: '#000'}
    },
    palette: 'default',
    palettes: {
      default: [
      {name: 'black', hex: '#000'},
      {name: '#323232', hex: '#323232'},
      {name: 'grey', hex: '#ccc'},
      {name: 'white', hex: '#fff'},
      {name: '#f00', hex: '#f00'},
      {name: '#f90', hex: '#f90'},
      {name: '#ff0', hex: '#ff0'},
      {name: 'green', hex: 'green'},
      {name: '#0ff', hex: '#0ff'},
      {name: '#00f', hex: '#00f'},
      {name: '#90f', hex: '#90f'},
      {name: '#f0f', hex: '#f0f'}
      ]
    }
  }
}

const mutations = {
  SET_PROJECT (state, project) {
    state.project.project = project
  },
  SET_PAPER (state, paper) {
    state.paper = paper.project
  },
  INC_COUNT (state) {
    state.project.meta.counterlayer++
  },
  TOOL_ADD (state, tool) {
    let newTool = {}
    newTool[tool.name] = tool
    let tools = _.merge(state.tools, newTool)
    state.tools = tools
  },
  TOOL_ACTIVE (state, tool) {
    state.tool = tool
    let toolItem = state.tools[tool]
    toolItem.tool.activate()
  },
  COLOR_ACTIVE (state, color) {
    state.colors.active[state.colors.active.index] = color
  },
  COLOR_REVERSE (state) {
    let color1 = state.colors.active.fill
    let color2 = state.colors.active.stroke
    state.colors.active.fill = color2
    state.colors.active.stroke = color1
  },
  SET_PROPS_TO_MENU (state, item) {
    state.props = state.props
  },
  SET_MOUSE_LOCK (state, config) {
    state.props = state.props
  }
}

const getters = {
  tool (state) { return state.tool },
  tools (state) { return state.tools },
  data (state) { return state.data },
  setting (state) { return state.project.setting },
  meta (state) { return state.project.meta },
  items (state) { return state.items },
  paper (state) { return state.paper.project },
  tags (state) { return state.data.tags },
  project (state) { return state.project },
  projects (state) { return state.projects },
  countlayer (state) { return state.project.meta.counterlayer },
  props (state) { return state.props },
  itemprops (state) { return state.itemprops },
  menu (state) { return state.menu },
  code (state) { return state.code },
  codes (state) { return state.codes },
  colors (state) { return state.colors },
  fill (state) {
    return state.colors.active.fill.hex
  },
  stroke (state) {
    return state.colors.active.stroke.hex
  },
  colorsActive (state) { return state.colors.active },
  palette (state) { return state.colors.palette },
  paletteActive (state) { return state.colors.palettes[state.colors.palette] },
  palettes (state) { return state.palettes },
  sidebar (state) { return state.ui.sidebar }
}

const actions = {
  setTool ({ commit }, tool) {
    commit('TOOL_ACTIVE', tool)
  },
  setColor ({ commit }, color) {
    commit('COLOR_ACTIVE', color)
  },
  reverseColor ({ commit }) {
    commit('COLOR_REVERSE')
  },
  setUi ({ state }, e) {
    console.log(e)
  },
  playCode ({ state }) {
    /* eslint-disable  */ 
    eval(state.code)
  },
  playProps ({ state }) {
    /* eslint-disable  */ 
    alert('load and play props')
  },
  removeSelected ({ state }) {
    if(confirm('remove')) {
      $.each(state.paper.selectedItems, (k, item) => {
        item.remove()
      })
    }
  },
  createLayer () {
    new Layer ({
      name:'new Layer'
    })
  },
  createGroup({ state }){
    let name = prompt('group name')
    new Group({
      name: name
    }).addChildren(state.project.project.selectedItems)
  },
  activeLayer (layer) {
    layer.active = true
    layer.activate()
  },
  setAction ({ state }, config) {
    state.project.project.selectedItems[config.action](config.value)
  },
  init ({ state, commit, getters }, id) {
    // console.log(this.id)
    // Get a reference to the canvas object
    let canvas = document.getElementById(id)
    // Create an empty project and a view for the canvas:
    paper.install(window)
    window.onload = () => {

      paper.setup(canvas)
      var hitOptions = {
        segments  : true,
        stroke    : true,
        fill      : true,
        tolerance : 40
      }

      commit('SET_PROJECT', paper.project)
      commit('SET_PAPER', paper)


      commit('TOOL_ADD', {
        name: 'select',
        group: 'select',
        icon: '<i class="icon-cursor"></i> s',
        tool: new Tool({
          onMouseDown (e) {
            let hitResult = state.project.project.hitTest(e.point, hitOptions)

            if(!e.modifiers.control){
              $.each(state.project.project.selectedItems, (index, item) => {
                item.selected = false
              }); 
            }

            if (e.item && e.item.class !='bounds'){
              let item = e.item
              let toggleSelect = !e.item.selected

              item.selected = toggleSelect
              commit('SET_PROPS_TO_MENU')
           }
         },
         onMouseDrag (e) {
          let downPointX = e.downPoint.x
          let downPointY = e.downPoint.y
          let sizeX = e.point.x-downPointX
          let sizeY = e.point.y-downPointY

          if(e.modifiers.shift){
            let path = new Path.Rectangle({
              point : [downPointX,downPointY],
              size : [sizeX, sizeY],
              fillColor : "black",
              strokeColor : "grey",
              strokeWidth : "1",
              strokeJoin : 'round',
              dashArray : [5, 5]
            }).removeOnDrag().removeOnUp()

            path.fillColor.alpha = "0.1";

            let textX = new PointText({
              point         : [downPointX+(sizeX/2), downPointY+13],
              content       : Math.abs(sizeX),
              fillColor     : 'black',
              justification : 'center',
              fontSize      : 13
            }).removeOnDrag().removeOnUp();

            let textY = new PointText({
              point         : [downPointX+11, downPointY+(sizeY/2)],
              content       : Math.abs(sizeY),
              fillColor     : 'black',
              justification : 'center',
              fontSize      : 13
            }).rotate(-90).removeOnDrag().removeOnUp();

            return false;
          }

          $.each(state.project.project.selectedItems, (index, item) => {
            item.position.x += e.delta.x
            item.position.y += e.delta.y
          })
        }
      })
      })


      commit('TOOL_ADD', {
        name: 'line',
        group: '',
        icon: '<i class="icon-ruler"></i>|',
        tool: new Tool({
          onMouseDrag (e) {
            var path = new Path.Line({
              name: 'line ' + state.project.meta.counterlayer,
              strokeColor: state.colors.active.stroke.hex,
              strokeWidth: 3,
              from: [e.downPoint.x, e.downPoint.y],
              to: [e.point.x, e.point.y]
            })
            path.removeOnDrag();
          },
          onMouseUp (e) {
            commit('INC_COUNT')
          }
        })
      })      

      commit('TOOL_ADD', {
        name: 'Simple',
        group: 'draw',
        icon: '<i class="fa fa-pencil"></i>',
        tool: new Tool({
          minDistance : 10,
          setting:{},
          path: {},
          onKeyDown (e){
            if (e.modifiers.control){
              commit('SET_MOUSE_LOCK', {index: 'x', value: 0})
            }

            if (e.modifiers.shift){
              commit('SET_MOUSE_LOCK', {index: 'y', value: 0})
            }
          },
          onMouseDown (e) {
            this.path = new Path({
              name: 'draw ' + state.project.meta.counterlayer,
              strokeColor: state.colors.active.stroke.hex,
              strokeWidth: state.props.stroke.width.value,
            })
            
            path.add(e.point);
          },
          onMouseDrag (e) {
            this.path.add(e.point);
          },
          onMouseUp (e) {
            commit('INC_COUNT')
            if(e.modifiers.control){
              // paperjs_store.bounds(path) */
            }
          }
        })
      })
      commit('TOOL_ADD', {
        name: 'brush',
        group: 'draw',
        icon:'<i class="fa fa-paint-brush"></i>',
        tool: new Tool({
          minDistance : 5,
          setting: {},
          path: {},
          onMouseDown (e) {
            this.path = new Path({
              name        : 'brush ' + state.project.meta.counterlayer,
              fillColor   : state.colors.active.fill.hex,
              strokeColor : state.colors.active.stroke.hex
            })
            path.add(e.point)
          },
          onMouseDrag (e) {
            //let itemSetting = paperjs_store.getItemSettingMenu()
            let step = {
              x: e.delta.x * 1.2 + state.props.stroke.width.value,
              y: e.delta.y * 1.2 + state.props.stroke.width.value
            }

            let top = {
              x: e.middlePoint.x + step.x,
              y: e.middlePoint.y + step.y
            };

            let bottom = {
              x: e.middlePoint.x - step.x,
              y: e.middlePoint.y - step.y
            };
                       
            this.path.add(top);
            this.path.insert(0, bottom); 
          },
          onMouseUp (e) {
            this.path.add(e.point)

            this.path.insert(0, e.point)

            this.path.reduce(5)
            this.path.flatten(4)
            this.path.close = true
            commit('INC_COUNT')
          }
        })
      })

      commit('TOOL_ADD', {
        name: 'rectangle',
        group: 'form',
        icon: '<i class="fa fa-square-o"></i>',
        tool : new Tool({
          path:{},
          onMouseDrag (e){
            let path = new Path.Rectangle({
              name    : 'Rectangle ' + state.project.meta.counterlayer,
              strokeColor: state.colors.active.stroke.hex,
              fillColor: state.colors.active.fill.hex,
              strokeWidth: 3,
              point       : [e.downPoint.x, e.downPoint.y],
              size        : [e.point.x-e.downPoint.x, e.point.y-e.downPoint.y],
            })

            path.removeOnDrag();
            this.path = path
          },
          onMouseUp (e) {
            commit('INC_COUNT')
          }
        })
      })

      

      commit('TOOL_ADD', {
        name: 'circle',
        group: 'form',
        icon: '<i class="fa fa-circle-o"></i>',
        tool: new Tool({
          onMouseDrag (e){
            let radius      = (e.point.x - e.downPoint.x)

            let path        = new Path.Circle({
              name    : 'circle '+ state.project.meta.counterlayer,
              strokeColor: state.colors.active.stroke.hex,
              fillColor: state.colors.active.fill.hex,
              strokeWidth: 3,
              center      : e.downPoint,
              radius      : radius
            })

            path.removeOnDrag()
            this.path = path
          },
          onMouseUp (e) {
            commit('INC_COUNT')
          }
        })
      })      

      commit('TOOL_ADD', {
        name: 'Rope',
        group: '',
        icon: '<i class="fa fa-location-arrow" aria-hidden="true"></i>',
        tool: new Tool({
          first: true,
          path: {},
          onMouseDown (e){
            if(this.first){
              this.path = new Path({
                name      : 'rope ' + state.project.meta.counterlayer,
                fillColor : state.colors.active.fill.hex,
                strokeWidth : 5,
                strokeColor : state.colors.active.stroke.hex
              });
              this.first=false
            }
            this.path.add(e.point)
          },
          onKeyUp (e) {
            this.path.closed = true
            this.first = true
            /* state.addHistory(this.path)
            state.incCount() */

            if(event.modifiers.control)
              state.bounds(path)
          }
        })
      })
      
    }
  },
  paperNew ({ state }) {
    if (confirm('ok ?')) {
      state.paper.clear()
      state.paper.view.update()
    }
    // return this.state.file.name = 'new'
  },
  paperSave ({ state }) {
    /* eslint-disable */
    alert('save')
  },
  paperLoad ({ state }) {
    /* eslint-disable */
    alert('load')
  },
  paperExport ({ state }) {
    /* eslint-disable */
    alert('export')
  }
}

export const vpaperModule = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
