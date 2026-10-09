import test from 'node:test';
import assert from 'node:assert/strict';
import {composeHeisenberg,heisenbergSignature,pathSignature,project,symplectic} from '../lib/model.ts';
import {methodSections} from '../app/method-content.ts';

type Matrix=number[][];
const multiply=(a:Matrix,b:Matrix):Matrix=>a.map(row=>b[0].map((_,j)=>row.reduce((s,v,k)=>s+v*b[k][j],0)));
const matrix=(u:number[],z:number):Matrix=>[[1,u[0],u[2],z+.5*(u[0]*u[1]+u[2]*u[3])],[0,1,0,u[1]],[0,0,1,u[3]],[0,0,0,1]];

test('independent 4x4 representation agrees with the documented group law',()=>{
 for(let k=0;k<25;k++){
  const u=[k%3-1,k%5-2,k%7-3,k%4-1],v=[k%4-2,k%3-1,k%6-2,k%5-2],z=k-10,w=3-k;
  const product=composeHeisenberg({horizontal:u,central:z},{horizontal:v,central:w});
  assert.deepEqual(multiply(matrix(u,z),matrix(v,w)),matrix(product.horizontal,product.central));
 }
});
test('anisotropic dilations preserve products and bracket scaling',()=>{
 const g={horizontal:[1,-2,3,-4],central:2},h={horizontal:[2,3,-1,5],central:-3};
 for(const r of [.5,2,3]){
  const scale=(x:typeof g)=>({horizontal:x.horizontal.map(v=>r*v),central:r*r*x.central});
  assert.deepEqual(composeHeisenberg(scale(g),scale(h)),scale(composeHeisenberg(g,h)));
  assert.equal(symplectic(scale(g).horizontal,scale(h).horizontal),r*r*symplectic(g.horizontal,h.horizontal));
 }
});
test('documented compression and nonmonotone five-step score are reproducible',()=>{
 const a=['discovery','deposition','expert','motion'] as const,b=['deposition','discovery','motion','expert'] as const;
 assert.deepEqual(heisenbergSignature([...a]),heisenbergSignature([...b]));
 assert.notDeepEqual(pathSignature([...a]).areas,pathSignature([...b]).areas);
 assert.equal(project(.38,[...a]).quality,project(.38,[...b]).quality);
 const before=project(.38,['expert','expert','expert','expert']),after=project(.38,['expert','expert','expert','expert','motion']);
 assert.ok(after.quality<before.quality);
});
test('printed worked values match the calculation engine',()=>{
 const section=methodSections.find(s=>s.id==='10')!;
 const table=section.blocks.find(b=>b.type==='table')!;
 assert.equal(table.type,'table');
 const a=project(.38,['discovery','deposition']),b=project(.38,['deposition','discovery']);
 assert.equal(table.rows[0][1][0],a.quality.toFixed(10));
 assert.equal(table.rows[0][2][0],b.quality.toFixed(10));
});
