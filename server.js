'use strict'
const FC=(x,d='')=>new Promise((resolve,reject)=>{if(x.prot==='https')process.env.NODE_TLS_REJECT_UNAUTHORIZED="0";const pd=d,req=require(x.prot).request({host:x.host,port:x.port,method:x.method,path:x.path,headers:{'Accept':'application/json','Authorization':'Basic '+x.auth,'x-encoding':(x.senc)?'deflate':'','accept-encoding':(x.renc)?'deflate':''}},(res)=>{let output='',WS=new require('stream').Writable(),ldata=[],ldata_length=0;WS.write=(d)=>{ldata.push(d);ldata_length+=d.length}
WS.on('error',(err)=>{reject('XRES-ErRor: '+err.message)})
WS.on('finish',()=>{let buf=Buffer.alloc(ldata_length),pos=0;for(let i=0,len=ldata.length,pos=0;i<len;i++){ldata[i].copy(buf,pos);pos+=ldata[i].length}
resolve(buf.toString())});if(x.renc){res.pipe(zlib.createInflate()).pipe(WS)}
else{res.pipe(WS)}});req.on('error',(err)=>{reject('XREQ-ERror: '+err.message)});let RS=new require('stream').Readable();RS.push(pd);RS.push(null);if(x.senc){RS.pipe(zlib.createDeflate()).pipe(req)}
else{RS.pipe(req)}})
,FCSD = async (x,d) =>{await FC(x,d)}
,http=require('http'),CL=console.log,JS=JSON.stringify,DN=Date.now,AN=[{"no":"nothing"}],config=require('./package.json').config,filters={"eF":f=>v=>o=>o[f].toString()===v.toString(),"rF":f=>v=>o=>(new RegExp(v,'i')).test(o[f]),"NrF":f=>v=>o=>!(new RegExp(v,'i')).test(o[f]),"tF":f=>v=>o=>o[f],"NtF":f=>v=>o=>!o[f],"gF":f=>v=>o=>o[f]>=v,"lF":f=>v=>o=>o[f]<=v,"bF":f=>v=>o=>o[f]>=v.k&&o[f]<=v.g,"NbF":f=>v=>o=>o[f]<=v.k&&o[f]>=v.g,"iF":f=>a=>o=>(new RegExp(a.join('|'))).test(o[f]),"mfs":a=>b=>c=>a.reduce((a,d)=>a||new RegExp(b,'i').test(c[d].replace(/[<>;:\- ./\\]/g,'')),!1)},mfms=a=>(b,c)=>b.filter(filters.mfs(a)(c)),eof=s=>(t,e)=>{if(t.indexOf(e[s])===-1)t.push(e[s]);return t},fc=(t,e)=>t.filter(filters[e.f](e.k)(e.v)),as=a=>b=>a.reduce((a,c)=>{return a[c]=b[c],a},{}),icuv=(e,i)=>{e._id=e._id||'VSMC'+DN().toString(35)+i;e._ctime=e._ctime||DN();e._utime=DN();e._version=(e._version||0)+1;return e},bxpl=a=>{const A=a.map(e=>e||0).sort();return{min:A[0],q1:A[parseInt(A.length*0.25)],q5:A[parseInt(A.length*0.50)],mean:A.reduce((t,e,i,a)=>t+(e||0)/a.length,0),q7:A[parseInt(A.length*0.75)],max:A[A.length-1],l:A.length}},zlib=require('zlib'),fs=require('fs'),crypto=require('crypto'),rw={wbF:async(c,cfg,env)=>{const ws=fs.createWriteStream(cfg.data+c+'.'+cfg.zip),readStream=new require('stream').Readable();readStream.push(JS(env[c]));readStream.push(null);readStream.pipe(zlib.createDeflate()).pipe(ws);if(cfg.is_debug)CL(`wbF ${c} RECS ${env[c].length}`)},rbf:async(c,cfg,env)=>{const readStream=fs.createReadStream(cfg.data+c+'.'+cfg.zip),writeStream=new require('stream').Writable();let ldata=[],ldata_length=0;writeStream.on('error',(e)=>CL('Err WS',c,e));writeStream.on('finish',()=>{let buf=Buffer.alloc(ldata_length),pos=0;for(let i=0,len=ldata.length,pos=0;i<len;i++){ldata[i].copy(buf,pos);pos+=ldata[i].length}
env[c]=JSON.parse(buf.toString());env._all[c]=env[c].length;if(cfg.is_debug)CL(`${c} L ${ldata_length} R ${env[c].length}`)});writeStream.write=(d)=>{ldata.push(d);ldata_length+=d.length}
readStream.pipe(zlib.createInflate()).pipe(writeStream)},rbfa:async(cfg,env)=>{await Promise.all(cfg.tabs.map(async e=>rw.rbf(e,cfg,env)))},rdf:async(cfg,env)=>fs.readdir(cfg.app,(r,d)=>d.forEach((e,i)=>fs.readFile(cfg.app+e,(err,data)=>{if(err)throw err;let ckey=(cfg.is_fcrypt)?crypto.createHmac('sha256',cfg.cert+DN()).update(e).digest('hex'):e;env._file[e]=ckey;env[ckey]=data;if(cfg.is_debug)CL(`fcrypt ${cfg.is_fcrypt} FILE ${e} loaded ${data.length} ${ckey}`)})))},rest=(config,method,AU,data,readStream,jpost)=>{const index=AU[2],PJ=jpost&&JSON.parse(jpost);if(config.is_debug)CL(`REST ${method}${AU.length} ${index} ${data[index]&&data[index].length} ${jpost.slice(0,30)}`);switch(method){case 'GET':switch(AU.length){case 3:if(index==='_cmd'){if(config.is_debug)CL('sfunc',PJ.sfunc,PJ.cmd);PJ.sfunc&&Function.apply(null,PJ.sfunc)(data,null);PJ.cmd&&Function.apply(null,data.commands.filter(e=>e.cmd===PJ.cmd)[0].sfunc)(data,null)}
else readStream.push(JS((!data[index])?AN:data[index]));break;case 4:switch(AU[3]){case '_first':readStream.push(JS((!data[index])?AN:data[index][0]));break;case '_last':readStream.push(JS((!data[index])?AN:data[index][data[index].length-1]));break;case '_first5':readStream.push(JS((!data[index])?AN:data[index].slice(0,5)));break;case '_last5':readStream.push(JS((!data[index])?AN:data[index].slice(-5)));break;case '_version5':readStream.push(JS((!data[index])?AN:data[index].sort((a,b)=>b._version-a._version).slice(0,5)));break;case '_utime5':readStream.push(JS((!data[index])?AN:data[index].sort((a,b)=>b._utime-a._utime).slice(0,5)));break;case '_filter':readStream.push(JS((!data[index])?AN:PJ.reduce(fc,data[index])));break;case '_combine':readStream.push(JS((!data[index])?[{"no":"nothing"}]:PJ.filter.reduce(fc,data[index]).map(as(PJ.structure))));break;case '_structure':readStream.push(JS((!data[index])?[{"no":"nothing"}]:data[index].map(as(PJ))));break;case '_mcombine':readStream.push(JS((!data[index])?AN:PJ.searchvalues.split(' ').reduce(mfms(PJ.searchfields),PJ.filter.reduce(fc,data[index])).map(as(PJ.structure))));break;default:if(index==='_cmd'){const content=data.commands.filter(e=>e.cmd===AU[3]),file=JS((content.length>0)?Function.apply(null,content[0].sfunc)(data,null):{});readStream.push(file);break}
if(index==='_app'){const content=data[index].filter(e=>e._id===AU[3]),file=Buffer.from((content.length>0)?content[0].content:'20','hex').toString('utf8');readStream.push(file);break}}
break;case 5:readStream.push(JS((!data[index])?AN:data[index].filter(e=>e[AU[3]]===AU[4])));break;default:readStream.push('{}');break}break;case 'POST':switch(AU.length){case 3:if(index==='_bulk'){PJ.forEach(e=>{if(!data[e.index])data[e.index]=[];data[e.index].push(icuv(e.row,0))})
PJ.map(e=>e.index).forEach(E=>{data._utc[E]=DN();data._all[E]=data[E].length})}
else{if(!data[index])data[index]=[];data[index].push(icuv(PJ,0));data._utc[index]=DN();data._all[index]=data[index].length}
readStream.push('{}');break;case 4:switch(AU[3]){
case '_fetch': FCSD(PJ,JS(data[index]));break;case '_ffetch': FCSD(PJ['server'],JS(PJ['filter'].reduce(fc,data[index])));break;case '_fcfetch': FCSD(PJ['server'],JS(PJ['filter'].reduce(fc,data[index]).map(as(PJ['structure']))));break;
case '_summary':let erg=PJ.reduce((t,e)=>{t[e]={};return t},{});readStream.push(JS(data[index].reduce((T,E)=>{Object.keys(erg).forEach(A=>{T[A][E[A]]=(T[A][E[A]]||0)+1});return T},erg)));break;case '_fsummary':let ferg=PJ['structure'].reduce((t,e)=>{t[e]={};return t},{});readStream.push(JS(PJ['filter'].reduce(fc,data[index]).reduce((T,E)=>{Object.keys(ferg).forEach(A=>{T[A][E[A]]=(T[A][E[A]]||0)+1});return T},ferg)));break;case '_arfield':readStream.push(JS((!data[index])?AN:PJ.ar.reduce((t,e)=>{t.push(data[index].filter(E=>E[PJ.field]===e)[0]);return t},[])));break;case '_boxplot':let boxplot=PJ.reduce((t,e)=>{t[e]=bxpl(data[index].map(E=>E[e]));return t},{});readStream.push(JS(boxplot));break;case '_fboxplot':let fboxplot=PJ['structure'].reduce((t,e)=>{t[e]=bxpl(PJ['filter'].reduce(fc,data[index]).map(E=>E[e]));return t},{});readStream.push(JS(fboxplot));break;case '_filter':readStream.push(JS((!data[index])?AN:PJ.reduce(fc,data[index])));break;case '_combine':readStream.push(JS((!data[index])?AN:PJ.filter.reduce(fc,data[index]).map(as(PJ.structure))));break;case '_structure':readStream.push(JS((!data[index])?AN:data[index].map(as(PJ))));break;case '_mcombine':readStream.push(JS((!data[index])?AN:PJ.searchvalues.split(' ').reduce(mfms(PJ.searchfields),PJ.filter.reduce(fc,data[index])).map(as(PJ.structure))));break;case '_bulk':if(!data[index])data[index]=[];PJ.forEach(icuv);data[index]=data[index].concat(PJ);data._utc[index]=DN();data._all[index]=data[index].length;break}
break;case 6:let pelem=data[index].filter(e=>e._id===AU[3]);if(pelem.length===1){pelem[0][AU[4]]=AU[5];pelem[0]=icuv(pelem[0],0)}
break;default:readStream.push('{}');break}break;case 'PUT':switch(AU.length){case 3:if(!data[index]){data[index]=[];data[index].push(icuv(PJ,0))}
else{let pelem=data[index].filter(e=>e._id===PJ._id);if(pelem.length===1){Object.keys(PJ).forEach(e=>{pelem[0][e]=PJ[e]});pelem[0]=icuv(pelem[0],0)}}
break;case 6:let pelem=data[index].filter(e=>e._id===AU[3]);if(pelem.length===1){pelem[0][AU[4]]=AU[5];pelem[0]=icuv(pelem[0],0)}
break;case 4:if(!data[index]){data[index]=[]}
else{let pelem=data[index].filter(e=>e._id===AU[3]);if(pelem.length===1){Object.keys(PJ).forEach(e=>{pelem[0][e]=PJ[e]});pelem[0]=icuv(pelem[0],0)}}
break}data._utc[index]=DN();break;case 'DELETE':switch(AU.length){case 3:data[index]=[];break;case 4:switch(AU[3]){case '_filter':data[index]=PJ.reduce(fc,data[index]);break;case '_structure':PJ.forEach(e=>{data[index].forEach(E=>E[e]&&delete E[e])});break;default:data[index]=data[index].filter(e=>e._id!==AU[3])};break}
data._utc[index]=DN();break}},port=process.env.PORT||process.env.OPENSHIFT_NODEJS_PORT||config.webport,ipaddress=process.env.IP||process.env.OPENSHIFT_NODEJS_IP||'0.0.0.0',router=(req,res,data,config)=>{let postdata='';const method=req.method,path=req.url,accenc=req.headers['accept-encoding'],reqenc=req.headers['x-encoding'],brest=/rest\//.test(path),bfrest=/rest\/_app\//.test(path),bevent=/event-source\//.test(path),bfile=!(brest||bevent),AU=path.split('?')[0].split('/'),index=AU[(brest||bevent)?2:1],bzip=accenc&&accenc.match(/\bdeflate\b/),rzip=reqenc&&reqenc.match(/\bdeflate\b/);CL('ROUTER',req.headers['x-encoding']||'x.v.n.',req.headers['accept-encoding']||'ac.n.v',req.url,req.method);if(config.is_log)data._log.push({time:DN(),method:req.method,path:req.url,remote:req.connection.remoteAddress.split(':').pop()})
let writeSStream=new require('stream').Writable(),ldata=[],ldata_length=0;writeSStream.on('finish',()=>{let buf=Buffer.alloc(ldata_length),pos=0;for(let i=0,len=ldata.length,pos=0;i<len;i++){ldata[i].copy(buf,pos);pos+=ldata[i].length}
postdata=buf.toString();CL('WS-FINISHED',buf.toString('hex').slice(0,100));if(config.is_debug)CL(`Finish WS for LEN ${ldata_length} ${postdata.length} `);res.setHeader('Access-Control-Allow-Origin','*');res.writeHead(200,{'content-encoding':'deflate','content-type':(brest&&(!bfrest))?'application/json':''});let readStream=new require('stream').Readable();if(bfile){readStream.push(!data[index]?data[config.first]:data[index])}
if(brest){rest(config,method,AU,data,readStream,postdata)}
if(bevent){}
readStream.push(null);if(bzip)readStream.pipe(require('zlib').createDeflate()).pipe(res);else readStream.pipe(res)});writeSStream.write=(d)=>{ldata.push(d);ldata_length+=d.length}
if(rzip){CL('REQdeflate');req.pipe(require('zlib').createInflate()).pipe(writeSStream)}
else req.pipe(writeSStream);req.on('end',()=>{if(config.is_debug)CL(`REQONEND ${bfrest?'FREST':''}${bfile?'FILE':''}${brest?'REST':''}${bevent?'EVENT':''} [${method}] ${path}(${AU.length}) index:${index} data.l:${postdata.length} zip:${bzip}`)})};let data={'_utc':{},'_log':[],'_file':{},'_app':[],'_all':{},'default':' ','login':'<body>please log in</body>'},stime=DN();if(config.is_data)rw.rbfa(config,data);if(config.is_backup)setInterval(()=>{Object.keys(data._utc).filter(e=>data._utc[e]>stime).forEach(async e=>await rw.wbF(e,config,data));stime=DN()},config.backup_time);http.createServer((req,res)=>router(req,res,data,config)).listen(port,ipaddress,()=>{if(config.is_debug)CL(`start ${port} ${ipaddress}`)})
