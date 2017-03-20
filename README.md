# ClientVueJs - Rodbox

> Connextion api service rodbox

## configuration :
/src/store.js
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

## exemple de connextion depuis une methods ou une actions d'un module :
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