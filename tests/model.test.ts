import {publicCases} from '../lib/cases.ts';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {demo,stateAt,project,enumerate,frontier,comparable,parseCase,pathSignature,compose,runModel,MODEL_ID} from '../lib/model.ts';
test('snapshot uses only events available at the selected point',()=>{const s=stateAt(demo,3);assert.equal(s.day,86);assert.equal(s.events.length,4);assert.equal(s.burden,68400);assert.equal(stateAt(demo,5).burden,118400);});
test('order effects come from explicit transition rules',()=>{const a=project(.64,['discovery','deposition']);const b=project(.64,['deposition','discovery']);assert.ok(a.gain>b.gain);assert.ok(a.cost<b.cost);assert.equal(a.plaintiff+a.defense,a.cost);});
test('frontier is nondominated and constrained gap is feasible',()=>{const points=enumerate(.64);assert.equal(points.length,41);for(const p of frontier(points))assert.ok(!points.some(q=>q.cost<p.cost&&q.quality>=p.quality));for(const epsilon of [0,.02,.05,.1]){const c=comparable(.64,epsilon);assert.ok(c.best.quality>=c.baseline.quality-epsilon-1e-9);assert.ok(c.gap>=0);}});
test('import rejects invalid, infinite, duplicate and out-of-order records',()=>{assert.equal(parseCase(demo).name,demo.name);for(const patch of [{day:-1},{information:Infinity},{day:NaN},{plaintiffCost:-3},{information:2}])assert.throws(()=>parseCase({...demo,events:[{...demo.events[0],...patch}]}));assert.throws(()=>parseCase({...demo,events:[demo.events[0],demo.events[0]]}));assert.throws(()=>parseCase({...demo,events:[demo.events[1],demo.events[0]]}));});

// The central coordinates are a Lie bracket representation, not learned case coefficients.

const near=(a:number,b:number)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
const equalState=(a:ReturnType<typeof pathSignature>,b:ReturnType<typeof pathSignature>)=>{a.counts.forEach((x,i)=>near(x,b.counts[i]));a.areas.forEach((x,i)=>near(x,b.areas[i]));};
const inverse=(s:ReturnType<typeof pathSignature>)=>({counts:s.counts.map(x=>-x),areas:s.areas.map(x=>-x)});
const commutator=(a:ReturnType<typeof pathSignature>,b:ReturnType<typeof pathSignature>)=>compose(compose(compose(a,b),inverse(a)),inverse(b));
test('step-2 composition is associative and has exactly central commutators',()=>{
 const x=pathSignature(['discovery']),y=pathSignature(['deposition']),z=pathSignature(['motion']);
 assert.equal(pathSignature(['discovery','deposition']).areas[0],.5);
 assert.equal(pathSignature(['deposition','discovery']).areas[0],-.5);
 equalState(compose(compose(x,y),z),compose(x,compose(y,z)));
 const xy=commutator(x,y);assert.deepEqual(xy.counts,[0,0,0,0]);assert.equal(xy.areas[0],1);
 equalState(commutator(xy,z),pathSignature([]));
 for(const path of [[],['expert'],['deposition','motion','discovery']]){const s=pathSignature(path as Parameters<typeof pathSignature>[0]);equalState(compose(s,inverse(s)),pathSignature([]));}
});
test('same counts preserve different order; zero information room remains bounded',()=>{
 const a=pathSignature(['discovery','deposition']),b=pathSignature(['deposition','discovery']);
 assert.deepEqual(a.counts,b.counts);assert.notDeepEqual(a.areas,b.areas);
 for(const info of [0,.2,.99,1])for(const p of enumerate(info)){
  assert.ok(p.gain>=0&&p.quality>=info&&p.quality<=1);assert.ok(p.cost>=0&&p.days>=0);
  assert.equal(p.plaintiff+p.defense,p.cost);
 }
 assert.throws(()=>project(NaN,[]));assert.throws(()=>pathSignature(['invalid'] as never));assert.throws(()=>runModel(demo,99));
});
for(const data of publicCases)test(`${data.name} runs every cutoff without future-event leakage or invented costs`,()=>{
 assert.equal(parseCase(data).synthetic,false);assert.equal(data.publicRecord,true);
 assert.ok(data.events.every(e=>e.sourceUrl?.startsWith('https://')&&e.date&&e.sourceDate));
 for(let i=0;i<data.events.length;i++){
  const r=runModel(data,i),prefix={...data,events:data.events.slice(0,i+1)};
  assert.deepEqual(r,runModel(prefix,i));assert.equal(r.model,MODEL_ID);assert.equal(r.candidateCount,41);
  assert.equal(r.eventCount,i+1);assert.ok(r.frontier.length>0);assert.ok(r.orderGap.gain>0);assert.ok(r.orderGap.cost<0);
  assert.ok(stateAt(data,i).unknownCosts>0);
 }
});
test('reported Oxbow sampling cost is partial; unknown costs are not reported as zero',()=>{
 const s=stateAt(publicCases[1],1);assert.equal(s.plaintiff,57197.95);assert.ok(s.unknownCosts>0);
 assert.equal(publicCases[1].events[1].defenseCost,null);assert.equal(publicCases[1].events[1].hours,null);
 assert.equal(parseCase(publicCases[1]).events[1].sourceUrl,publicCases[1].events[1].sourceUrl);
 assert.throws(()=>parseCase({...demo,events:[{...demo.events[0],sourceUrl:'javascript:alert(1)'}]}));
});
