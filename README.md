{
    "sfunc": [
      "a",
      "const R=RegExp,O='2730-10-02-45',X={eF:f=>v=>o=>o[f].toString()===v.toString(),gF:f=>v=>o=>o[f]>=v,rF:f=>v=>o=>(new R(v,'i')).test(o[f])},Y=(t,e)=>t.filter(X[e.f](e.k)(e.v)),Z=(e,f=1,g=1)=>(T,E)=>{Object.keys(e).forEach(A=>{T[A][E[A]]=(T[A][E[A]]||0)+(E[f]||1)*(E[g]||1)});return T},T=A=>E=>A.reduce((T,X)=>{return T[X]=E[X],T},{}),W=l=>{let w=[1],L=l.length,t=true,d=3,p=1;while(p>0.0001){p=l.filter(e=>e.dur>d).length/L;d+=3;w.push(p);};return w},P=Object.entries([{f:'rF',k:'TPLNR',v:O},{f:'eF',k:'QMART',v:'Z2'},{f:'gF',k:'EAUSZT',v:5}].reduce(Y,a.blist).reduce(Z({TPLNR:{}}),{TPLNR:{}})['TPLNR']).map(e=>{return{k:e[0],v:e[1]}}).filter(e=>e.v>35).map(({k,v})=>{return{k:k,v:v}});P.forEach(e=>e.w=W([{f:'eF',k:'TPLNR',v:e.k},{f:'eF',k:'QMART',v:'Z2'},{f:'gF',k:'EAUSZT',v:5}].reduce(Y,a.blist).map(T(['TPLNR','ERDAT_ERZEIT','EAUSZT'])).map(E=>{return{time:Date.parse(E['ERDAT_ERZEIT'].split(' ').join('T')),eauszt:E['EAUSZT']}}).sort((a,b)=>a.time-b.time).map((e,i,a)=>{return{time:e.time,eausz:e.eauszt,dur:(i>0)?(e.time-a[i-1].time)/86400000:0}}).filter(e=>e.dur>3)));a.wsurvival=P;a._utc.wsurvival=Date.now();return {};"
    ]}
# First
