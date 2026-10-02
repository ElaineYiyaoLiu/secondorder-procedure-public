import {publicCases} from '../lib/cases.ts';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {demo,stateAt,project,enumerate,frontier,comparable,parseCase,pathSignature,compose,runModel,MODEL_ID,symplectic,composeHeisenberg,heisenbergSignature,heisenbergCommutator,quotientToHeisenberg,modelIds,actionIds,type ModelKind} from '../lib/model.ts';
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

// H5 has two symplectic pairs and exactly one shared central direction.
const hEqual=(a:ReturnType<typeof heisenbergSignature>,b:ReturnType<typeof heisenbergSignature>)=>{a.horizontal.forEach((x,i)=>near(x,b.horizontal[i]));near(a.central,b.central);};
test('H5 symplectic form is antisymmetric and has two independent nondegenerate pairs',()=>{
 const basis=actionIds.map((_,i)=>actionIds.map((_,j)=>Number(i===j)));
 const expected=[[0,1,0,0],[-1,0,0,0],[0,0,0,1],[0,0,-1,0]];
 for(let i=0;i<4;i++)for(let j=0;j<4;j++){
  assert.equal(symplectic(basis[i],basis[j]),expected[i][j]);
  near(symplectic(basis[i],basis[j]),-symplectic(basis[j],basis[i]));
  // J^2=-Id implies rank 4, distinguishing H5 from H3 × R2.
  assert.equal(expected[i].reduce((s,x,k)=>s+x*expected[k][j],0),i===j?-1:0);
 }
 assert.throws(()=>symplectic([1,2],[0,0,0,0]));
 assert.throws(()=>symplectic([NaN,0,0,0],[0,0,0,0]));
});
test('Heisenberg group law is associative; same-center brackets and triple cancellation hold',()=>{
 const states=actionIds.map(id=>heisenbergSignature([id]));
 for(const a of states)for(const b of states)for(const c of states){
  hEqual(composeHeisenberg(composeHeisenberg(a,b),c),composeHeisenberg(a,composeHeisenberg(b,c)));
  hEqual(heisenbergCommutator(heisenbergCommutator(a,b),c),heisenbergSignature([]));
 }
 const xy=heisenbergCommutator(states[0],states[1]),me=heisenbergCommutator(states[2],states[3]);
 hEqual(xy,{horizontal:[0,0,0,0],central:1});hEqual(xy,me);
 hEqual(heisenbergCommutator(states[0],states[3]),heisenbergSignature([]));
 const scaled={horizontal:[2,0,0,0],central:0},other={horizontal:[0,3,0,0],central:0};
 hEqual(heisenbergCommutator(scaled,other),{horizontal:[0,0,0,0],central:6});
 assert.throws(()=>composeHeisenberg({...scaled,central:Infinity},other));
});
test('free-step2 quotient is a homomorphism and matches independent H5 folding',()=>{
 for(const p of enumerate(.38)){
  hEqual(quotientToHeisenberg(pathSignature(p.path)),heisenbergSignature(p.path));
  for(let i=0;i<=p.path.length;i++){
   const a=pathSignature(p.path.slice(0,i)),b=pathSignature(p.path.slice(i));
   hEqual(quotientToHeisenberg(compose(a,b)),composeHeisenberg(quotientToHeisenberg(a),quotientToHeisenberg(b)));
  }
 }
 hEqual(heisenbergSignature(['discovery','deposition']),{horizontal:[1,1,0,0],central:.5});
 hEqual(heisenbergSignature(['deposition','discovery']),{horizontal:[1,1,0,0],central:-.5});
 hEqual(heisenbergSignature(['motion','expert']),{horizontal:[0,0,1,1],central:.5});
});
test('engine selector changes actual evaluation, not just labels',()=>{
 const h=project(.38,['motion','expert'],'heisenberg'),g=project(.38,['motion','expert'],'free-step2');
 assert.equal(h.cost,75750);assert.equal(g.cost,80000);assert.equal(h.days,76);assert.equal(g.days,79);assert.ok(h.quality>g.quality);
 const forward=project(.38,['motion','expert']),reverse=project(.38,['expert','motion']);
 assert.equal(forward.cost-reverse.cost,-8500);assert.equal(forward.days-reverse.days,-6);
 assert.equal(project(.38,['discovery','deposition']).cost,60750);
 assert.equal(project(.38,['deposition','discovery']).cost,69250);
 assert.deepEqual(project(.38,[], 'heisenberg'),project(.38,[], 'free-step2'));
 assert.throws(()=>project(.38,[], 'toString' as ModelKind));
});
test('both engines preserve prefixes, frontier feasibility and bounded allocations for all public cases',()=>{
 for(const kind of ['heisenberg','free-step2'] as ModelKind[])for(const data of publicCases)for(let i=0;i<data.events.length;i++){
  const r=runModel(data,i,.02,['motion','expert'],['expert','motion'],kind);
  assert.equal(r.model,modelIds[kind]);assert.equal(r.kind,kind);
  assert.deepEqual(r,runModel({...data,events:data.events.slice(0,i+1)},i,.02,['motion','expert'],['expert','motion'],kind));
  const points=enumerate(r.information,kind);assert.equal(points.length,41);
  for(const p of points){assert.ok(p.gain>=0&&p.quality<=1&&p.cost>=0&&p.days>=0);assert.equal(p.plaintiff+p.defense,p.cost);}
  for(const p of frontier(points))assert.ok(!points.some(q=>q.cost<=p.cost&&q.quality>=p.quality&&(q.cost<p.cost||q.quality>p.quality)));
  assert.ok(r.comparison.best.quality>=r.comparison.baseline.quality-.02-1e-9);
 }
});
