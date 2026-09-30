export type Action = 'discovery' | 'deposition' | 'motion' | 'expert';
export type Event = { id: string; day: number; type: string; actor: string; title: string; plaintiffCost: number; defenseCost: number; hours: number; information: number; facts: string[]; source: string };
export type CaseData = { schemaVersion: 1; name: string; jurisdiction: string; caseType: string; synthetic: boolean; events: Event[] };
export const actions: Record<Action, { label: string; zh: string; cost: number; duration: number; gain: number }> = {
 discovery:{label:'Targeted discovery',zh:'定向证据开示',cost:38000,duration:42,gain:.18},
 deposition:{label:'Second deposition',zh:'第二次证言录取',cost:27000,duration:30,gain:.11},
 motion:{label:'Motion to compel',zh:'强制开示动议',cost:19000,duration:24,gain:.09},
 expert:{label:'Expert discovery',zh:'专家证据开示',cost:61000,duration:55,gain:.24}
};
export const demo: CaseData = {
 schemaVersion:1,name:'Anderson v. Meridian',jurisdiction:'U.S. federal civil',caseType:'Commercial contract · discovery',synthetic:true,
 events:[
 {id:'evt-01',day:0,type:'pleading',actor:'Plaintiff',title:'Complaint filed',plaintiffCost:4800,defenseCost:0,hours:24,information:.08,facts:['Delivery obligations and alleged breach identified.'],source:'SYN-001 · Synthetic complaint'},
 {id:'evt-02',day:28,type:'pleading',actor:'Defense',title:'Answer & initial disclosures',plaintiffCost:3600,defenseCost:9000,hours:62,information:.10,facts:['Contract formation admitted. Performance and notice remain disputed.'],source:'SYN-002 · Synthetic answer'},
 {id:'evt-03',day:54,type:'discovery',actor:'Plaintiff',title:'First document requests',plaintiffCost:6000,defenseCost:8000,hours:74,information:.06,facts:['Custodians and document categories mapped.'],source:'SYN-003 · Synthetic requests'},
 {id:'evt-04',day:86,type:'production',actor:'Defense',title:'Document production',plaintiffCost:11000,defenseCost:26000,hours:188,information:.23,facts:['Internal delivery logs contradict the initial schedule.','Notice email exists; receipt remains disputed.'],source:'SYN-004 · Synthetic production log'},
 {id:'evt-05',day:118,type:'deposition',actor:'Plaintiff',title:'Operations manager deposition',plaintiffCost:12000,defenseCost:14000,hours:142,information:.12,facts:['Witness confirms a revised delivery schedule.','Approval authority remains unclear.'],source:'SYN-005 · Synthetic transcript'},
 {id:'evt-06',day:143,type:'supplemental',actor:'Defense',title:'Supplemental production',plaintiffCost:6000,defenseCost:18000,hours:194,information:.05,facts:['Three additional emails support the revised schedule.','No new evidence of approval authority.'],source:'SYN-006 · Synthetic supplemental log'}
 ]
};
export function stateAt(data: CaseData, index: number) {
 const events=data.events.slice(0,Math.max(0,Math.min(index,data.events.length-1))+1);
 return {day:events.at(-1)!.day,events,information:Math.min(.99,events.reduce((s,e)=>s+e.information,0)),burden:events.reduce((s,e)=>s+e.plaintiffCost+e.defenseCost,0),plaintiff:events.reduce((s,e)=>s+e.plaintiffCost,0),defense:events.reduce((s,e)=>s+e.defenseCost,0),hours:events.reduce((s,e)=>s+e.hours,0)};
}
export type Projection = { path: Action[]; gain: number; quality: number; cost: number; days: number; plaintiff: number; defense: number; low: number; high: number };
// Explicit demonstration rules, not fitted coefficients or causal estimates.
// Discovery before deposition improves usable information and reduces rework.
export function project(information: number, path: Action[]): Projection {
 let current=information,cost=0,days=0,plaintiff=0,defense=0;
 const seen: Action[]=[];
 for(const action of path){
  let {gain,cost:stepCost,duration}=actions[action];
  gain*= Math.max(.12,1-current)/.36;
  if(action==='deposition'&&seen.includes('discovery')) {gain*=1.5;stepCost*=.85;}
  if(action==='discovery'&&seen.includes('deposition')) {gain*=.85;stepCost*=1.12;duration*=1.15;}
  if(seen.includes(action)){gain*=.4;stepCost*=.9;}
  const split=action==='discovery'?.24:action==='deposition'?.38:.5;
  cost+=stepCost;days+=duration;plaintiff+=stepCost*split;defense+=stepCost*(1-split);
  current+=Math.min(1-current,gain);seen.push(action);
 }
 return {path:[...path],gain:current-information,quality:current,cost:Math.round(cost),days:Math.round(days),plaintiff:Math.round(plaintiff),defense:Math.round(defense),low:Math.round(cost*.65),high:Math.round(cost*1.6)};
}
export function enumerate(information:number):Projection[]{
 const ids=Object.keys(actions) as Action[]; const paths: Action[][]=[[]];
 const walk=(prefix:Action[])=>{if(prefix.length===3)return;for(const id of ids){if(!prefix.includes(id)){const next=[...prefix,id];paths.push(next);walk(next);}}};walk([]);
 return paths.map(path=>project(information,path));
}
export function frontier(candidates: Projection[]) { return candidates.filter(p=>!candidates.some(q=>q.cost<=p.cost&&q.quality>=p.quality&&(q.cost<p.cost||q.quality>p.quality))).sort((a,b)=>a.cost-b.cost); }
export function comparable(information:number, tolerance:number) {
 const baseline=project(information,['deposition','discovery','motion']);
 const candidates=enumerate(information).filter(p=>p.quality>=baseline.quality-tolerance-1e-9);
 const best=candidates.reduce((a,b)=>b.cost<a.cost?b:a,baseline);
 return {baseline,best,gap:Math.max(0,baseline.cost-best.cost)};
}
export function parseCase(input: unknown): CaseData {
 if(!input||typeof input!=='object')throw new Error('Expected a case JSON object.');
 const c=input as CaseData;
 if(c.schemaVersion!==1||typeof c.name!=='string'||!c.name.trim()||c.name.length>160||typeof c.jurisdiction!=='string'||typeof c.caseType!=='string'||typeof c.synthetic!=='boolean'||!Array.isArray(c.events)||!c.events.length||c.events.length>200)throw new Error('Invalid case metadata or events (1–200 required).');
 const ids=new Set<string>();let last=-1;
 for(const e of c.events){
  if(!e||['id','type','actor','title','source'].some(k=>typeof e[k as keyof Event]!=='string')||!e.id||ids.has(e.id)||!Array.isArray(e.facts)||e.facts.some(f=>typeof f!=='string')||e.facts.length>100)throw new Error('Invalid event fields or duplicate event ID.');
  if(['day','plaintiffCost','defenseCost','hours','information'].some(k=>!Number.isFinite(e[k as keyof Event])||Number(e[k as keyof Event])<0)||e.information>1||!Number.isInteger(e.day)||e.day<last)throw new Error('Events must be chronological with finite, nonnegative values and information between 0 and 1.');
  ids.add(e.id);last=e.day;
 }
 if(c.events.reduce((s,e)=>s+e.information,0)>1.000001)throw new Error('Cumulative information must not exceed 1.');
 return {schemaVersion:1,name:c.name,jurisdiction:c.jurisdiction,caseType:c.caseType,synthetic:c.synthetic,events:c.events.map(e=>({...e}))};
}

