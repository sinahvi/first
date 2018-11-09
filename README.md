{
    "sfunc": [
      "a",
      "const R=RegExp,O='2730-10-02-45',X={eF:f=>v=>o=>o[f].toString()===v.toString(),gF:f=>v=>o=>o[f]>=v,rF:f=>v=>o=>(new R(v,'i')).test(o[f])},Y=(t,e)=>t.filter(X[e.f](e.k)(e.v)),Z=(e,f=1,g=1)=>(T,E)=>{Object.keys(e).forEach(A=>{T[A][E[A]]=(T[A][E[A]]||0)+(E[f]||1)*(E[g]||1)});return T},T=A=>E=>A.reduce((T,X)=>{return T[X]=E[X],T},{}),W=l=>{let w=[1],L=l.length,t=true,d=3,p=1;while(p>0.0001){p=l.filter(e=>e.dur>d).length/L;d+=3;w.push(p);};return w},P=Object.entries([{f:'rF',k:'TPLNR',v:O},{f:'eF',k:'QMART',v:'Z2'},{f:'gF',k:'EAUSZT',v:5}].reduce(Y,a.blist).reduce(Z({TPLNR:{}}),{TPLNR:{}})['TPLNR']).map(e=>{return{k:e[0],v:e[1]}}).filter(e=>e.v>35).map(({k,v})=>{return{k:k,v:v}});P.forEach(e=>e.w=W([{f:'eF',k:'TPLNR',v:e.k},{f:'eF',k:'QMART',v:'Z2'},{f:'gF',k:'EAUSZT',v:5}].reduce(Y,a.blist).map(T(['TPLNR','ERDAT_ERZEIT','EAUSZT'])).map(E=>{return{time:Date.parse(E['ERDAT_ERZEIT'].split(' ').join('T')),eauszt:E['EAUSZT']}}).sort((a,b)=>a.time-b.time).map((e,i,a)=>{return{time:e.time,eausz:e.eauszt,dur:(i>0)?(e.time-a[i-1].time)/86400000:0}}).filter(e=>e.dur>3)));a.wsurvival=P;a._utc.wsurvival=Date.now();return {};"
    ]}
    
    
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>swBIsvg</title>
    <style>
     circle{fill:blue;opacity:0.5}
     text{font-size:6%;}
     footer {font-size:150%;}
    </style>
  </head>
  <body><footer id="footer"></footer>
     <div id="c"></div>
  </body>
  <script>
'use strict'
const
  canvas    = document.getElementById("c")
, c2l       = (m,k) => [...new Set(m.map(e=>e[k]).sort())].reduce((T,E,I)=>{T[E]=I;return T},{})
, gluPoints = (m,l0,l1) => m.reduce( (T,E)=>T+`<circle cx="${l1[E['k1']]}" data-x="" data-y="" cy="${l0[E['k0']]}" r="${E.v/2000}"></circle>`,'') //getLookUp Points
, gluCatY   = (l) => Object.entries(l).reduce((T,E)=>T+`<text y="${E[1]}" x="-12">${E[0]}</text>` ,'') //getLookUp Points
, gluCatX   = (l) => Object.entries(l).reduce((T,E)=>T+`<text x="${E[1]}" y="45" transform="rotate(-90,${E[1]},45)">${E[0]}</text>` ,'') //getLookUp Points
, catalog   = ['10','20','30','40','50','60','70','80','90']
, show      = c => {
                      fetch( '/rest/blist/_fcsummaryc'  // MULTI-FILTER ABFRAGE
                           , { method : "POST"
                             , body   : JSON.stringify({"filter"    : [{"f":"rF","k":"TPLNR","v":"2730-10-02-45"}
                                                                      ,{"f":"rF","k":"OTGRP","v":"CPM-00"+c}
                                                                      ]
                                                       ,"structure" : ["TPLNR","PERIOD","KST"]
                                                       ,"cfield"    : "EAUSZT"
                                                       })
                             }
                           )
                      .then( m => m.json())
                      .then( m => m.filter (e => e.v>50 )
                                   .map    (e => {e.k.split('_').slice(1)
                                                  .reduce((T,E,I)=>{e['k'+I]=E;e['x'+I]=parseInt(E.slice(-2));return e},e); return e})  )
                      .then( m => {  console.log(m.slice(-2));
                                
     let l0=c2l(m,'k0'),l1=c2l(m,'k1');
                                     console.log (l1["2018-07"],l0["2730-10-02-45-1120"]);
                                     canvas.innerHTML = `<svg width="600" height="600" ViewBox="-12 -3 20 50">${gluCatX(l1)}${gluCatY(l0)}${gluPoints(m,l0,l1)}</svg>`
                                  }
                           )
                      .catch(console.log);
}
;
let cat=window.location.search.slice(1)||'40',data=null;
show(cat);
document.querySelector('#footer').innerHTML = catalog.map( e => `<span onmouseover="javascript:kst='${e}';show(kst);">${e}</span>`).join(' ');
</script>
</html>

    
# First
