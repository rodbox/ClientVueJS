# ClientVueJs - Rodbox
Connextion api service rodbox

## Configuration :
> /src/store.js
```
const state = {
	title: 'TITLE_PROJECT', // ex: Rodbox
	key: 'KEY_API', // ex: 673F8FEZ423F4HJK
	...
	url: 'URL_FRONT', // ex: client.rodbox.fr
	urls: {
		service: 'http://service.rodbox.fr/web/api',
	    cloud: 'http://IP_SERVICE/__cloud_service__/web/',
	    upload: 'http://IP_SERVICE/__cloud_service__/web/upload',
	    spacer: 'http://IP_SERVICE/__cdn_rodbox__/img/spacer.png',
	    users: 'http://IP_SERVICE/__cdn_rodbox__/users',
	    cdn: 'http://IP_SERVICE/__cdn_rodbox__',
	    sh: 'http://IP_SERVICE/__cdn__/sh.php'
	}
```

## Composent global :
Instancier : 
> /src/components.js

Emplacement :
>/src/components/COMPONENT_FOLDER/COMPONENTS.vue


## Module vuex :
Instancier :
> /src/modules.js

Emplacement :
>/src/components/COMPONENT_FOLDER/MODULE_NAME.jd

## Instancier une route vue-router :
Instancier :
> /src/router.js

Emplacement :
> /src/pages/PAGE_COMPONENTS.vue

## Connextion API
depuis une methods ou une actions d'un module vuex :
```
window.store.dispatch('getService', {
	id: ID_SERVICE,
	name: ID_SERVICE + '.' + NOM_METHODS,
	cache: true,
	dataSend: {
	DATA_INDEX: DATA_VALUE        
	},
	callback (json) {
	},
	beforeSend () {
	}
})
```