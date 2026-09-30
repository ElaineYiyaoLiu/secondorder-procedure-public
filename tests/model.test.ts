import {test} from 'node:test';
import assert from 'node:assert/strict';
import {demo,stateAt,project,enumerate,frontier,comparable,parseCase} from '../lib/model.ts';
test('snapshot uses only events available at the selected point',()=>{const s=stateAt(demo,3);assert.equal(s.day,86);assert.equal(s.events.length,4);assert.equal(s.burden,68400);assert.equal(stateAt(demo,5).burden,118400);});
test('order effects come from explicit transition rules',()=>{const a=project(.64,['discovery','deposition']);const b=project(.64,['deposition','discovery']);assert.ok(a.gain>b.gain);assert.ok(a.cost<b.cost);assert.equal(a.plaintiff+a.defense,a.cost);});
test('frontier is nondominated and constrained gap is feasible',()=>{const points=enumerate(.64);assert.equal(points.length,41);for(const p of frontier(points))assert.ok(!points.some(q=>q.cost<p.cost&&q.quality>=p.quality));for(const epsilon of [0,.02,.05,.1]){const c=comparable(.64,epsilon);assert.ok(c.best.quality>=c.baseline.quality-epsilon-1e-9);assert.ok(c.gap>=0);}});
test('import rejects invalid, infinite, duplicate and out-of-order records',()=>{assert.equal(parseCase(demo).name,demo.name);for(const patch of [{day:-1},{information:Infinity},{day:NaN},{plaintiffCost:-3},{information:2}])assert.throws(()=>parseCase({...demo,events:[{...demo.events[0],...patch}]}));assert.throws(()=>parseCase({...demo,events:[demo.events[0],demo.events[0]]}));assert.throws(()=>parseCase({...demo,events:[demo.events[1],demo.events[0]]}));});

