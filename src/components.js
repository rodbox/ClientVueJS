import Vue from 'vue'
import Brace from 'vue-bulma-brace'
import Loader from './components/Navigation/Loader'
import Dyn from './components/Core/Dyn'
import User from './components/User/User'
import UserCard from './components/User/UserCard'
import UserIdentity from './components/User/UserIdentity'
import flag from './components/Locale/Flags'
import modal from './components/Ui/modal'
import modalButton from './components/Ui/modalButton'
import tabs from './components/Ui/tabs'
import tab from './components/Ui/tab'
import bForm from './components/Ui/bForm'
import bCheck from './components/Ui/bCheck'
import bSelect from './components/Ui/bSelect'
import bTag from './components/Ui/bTag'
import bTagButton from './components/Ui/bTagButton'
import vPad from './components/Plugins/vPad'
import bInput from './components/Ui/bInput'
import bInputAuto from './components/Ui/bInputAuto'
import bLabel from './components/Ui/bLabel'
import quickbar from './components/Ui/quickbar'
import clusterize from './components/Core/Clusterize'
import vUpload from './components/Plugins/vUpload'
import vCodemirror from './components/Plugins/vCodemirror'
import send from './components/Message/Send'

Vue.component('dyn', Dyn)
Vue.component('Brace', Brace)
Vue.component('quickbar', quickbar)
Vue.component('loader', Loader)
Vue.component('user', User)
Vue.component('userCard', UserCard)
Vue.component('userIdentity', UserIdentity)
Vue.component('tabs', tabs)
Vue.component('tab', tab)
Vue.component('bForm', bForm)
Vue.component('bInputAuto', bInputAuto)
Vue.component('bInput', bInput)
Vue.component('bSelect', bSelect)
Vue.component('bTag', bTag)
Vue.component('bTagButton', bTagButton)
Vue.component('vPad', vPad)
Vue.component('bLabel', bLabel)
Vue.component('bCheck', bCheck)
Vue.component('modal', modal)
Vue.component('modalButton', modalButton)
Vue.component('flag', flag)
Vue.component('clusterize', clusterize)
Vue.component('vUpload', vUpload)
Vue.component('vCodemirror', vCodemirror)
Vue.component('send', send)
