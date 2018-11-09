'use strict'
const fetch = require('./sw_promise_rest')
, fetchs = require ('./sw_promise_rests_deflate')
, src = { method : 'GET'
, host : 'localhost'
, port : 8443
, path : '/rest/_app'
, auth : ''
}
, dest = { method : 'POST '
, host : 'adr-ada.1d35.starter-us-east-1.openshiftapps.com'
, port : 80
, path : '/ rest/_app/_bulk'
, auth : ''
}
;
fetchs ( src )
.then ( data=> fetch (dest,data))
.then ( console.log )
.catch ( console.log )
# First
