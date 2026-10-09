export type Action = 'discovery' | 'deposition' | 'motion' | 'expert';
export type Event = { id: string; day: number; type: string; actor: string; title: string; plaintiffCost: number | null; defenseCost: number | null; hours: number | null; date?: string; sourceUrl?: string; sourceDate?: string; titleZh?: string; factsZh?: string[]; information: number; facts: string[]; source: string };
export type CaseData = { schemaVersion: 1; name: string; jurisdiction: string; caseType: string; synthetic: boolean; id?: string; docket?: string; summary?: string; summaryZh?: string; publicRecord?: boolean; events: Event[] };
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
 return {day:events.at(-1)!.day,events,information:Math.min(.99,events.reduce((s,e)=>s+e.information,0)),burden:events.reduce((s,e)=>s+(e.plaintiffCost??0)+(e.defenseCost??0),0),plaintiff:events.reduce((s,e)=>s+(e.plaintiffCost??0),0),defense:events.reduce((s,e)=>s+(e.defenseCost??0),0),unknownCosts:events.filter(e=>e.plaintiffCost===null||e.defenseCost===null).length,unknownHours:events.filter(e=>e.hours===null).length,hours:events.reduce((s,e)=>s+(e.hours??0),0)};
}
export type Projection = { path: Action[]; gain: number; quality: number; cost: number; days: number; plaintiff: number; defense: number; low: number; high: number };
export type ModelKind = 'heisenberg' | 'free-step2';
export const modelIds:Record<ModelKind,string> = {heisenberg:'heisenberg-h5-nilpotent-v0.6','free-step2':'free-step2-nilpotent-v0.6'};
export const MODEL_ID = modelIds.heisenberg;
export const DEFAULT_MODEL:ModelKind = 'heisenberg';
export const actionIds: Action[] = ['discovery','deposition','motion','expert'];
export const pairs = actionIds.flatMap((a,i)=>actionIds.slice(i+1).map(b=>[a,b] as [Action,Action]));
export type Signature = {counts: number[]; areas: number[]};
export function compose(left:Signature,right:Signature):Signature {
 if(left.counts.length!==4||right.counts.length!==4||left.areas.length!==6||right.areas.length!==6||[...left.counts,...right.counts,...left.areas,...right.areas].some(x=>!Number.isFinite(x)))throw Error('Invalid step-2 state.');
 return {counts:left.counts.map((x,i)=>x+right.counts[i]),areas:pairs.map(([a,b],k)=>{
  const i=actionIds.indexOf(a),j=actionIds.indexOf(b);
  return left.areas[k]+right.areas[k]+.5*(left.counts[i]*right.counts[j]-left.counts[j]*right.counts[i]);
 })};
}
export function pathSignature(path:Action[]):Signature {
 if(!Array.isArray(path)||path.length>20||Array.from(path).some(id=>!actionIds.includes(id)))throw Error('Use at most 20 valid actions.');
 return path.reduce((state,id)=>compose(state,{counts:actionIds.map(a=>Number(a===id)),areas:Array(6).fill(0)}),{counts:Array(4).fill(0),areas:Array(6).fill(0)});
}
// Coordinates follow actionIds: X1, Y1, X2, Y2. One shared center Z.
export type HeisenbergState = {horizontal:number[]; central:number};
const validHorizontal=(v:number[])=>Array.isArray(v)&&v.length===4&&Array.from(v).every(Number.isFinite);
export function symplectic(left:number[],right:number[]):number {
 if(!validHorizontal(left)||!validHorizontal(right))throw Error('Expected four finite horizontal coordinates.');
 return left[0]*right[1]-left[1]*right[0]+left[2]*right[3]-left[3]*right[2];
}
export function composeHeisenberg(left:HeisenbergState,right:HeisenbergState):HeisenbergState {
 if(!Number.isFinite(left.central)||!Number.isFinite(right.central))throw Error('Expected a finite central coordinate.');
 const area=.5*symplectic(left.horizontal,right.horizontal);
 return {horizontal:left.horizontal.map((x,i)=>x+right.horizontal[i]),central:left.central+right.central+area};
}
export function heisenbergSignature(path:Action[]):HeisenbergState {
 pathSignature(path); // Reuse action/count limits before folding the H5 group law.
 return path.reduce((s,id)=>composeHeisenberg(s,{horizontal:actionIds.map(a=>Number(a===id)),central:0}),{horizontal:[0,0,0,0],central:0});
}
export function quotientToHeisenberg(s:Signature):HeisenbergState {
 // Validate the free state, then identify [X1,Y1] and [X2,Y2] with the same Z.
 compose(s,{counts:[0,0,0,0],areas:[0,0,0,0,0,0]});
 return {horizontal:[...s.counts],central:s.areas[0]+s.areas[5]};
}
// A formal signed loop demonstrates the algebra. It does not undo real procedure.
export function heisenbergCommutator(left:HeisenbergState,right:HeisenbergState):HeisenbergState {
 const inverse=(s:HeisenbergState)=>({horizontal:s.horizontal.map(x=>-x),central:-s.central});
 return composeHeisenberg(composeHeisenberg(composeHeisenberg(left,right),inverse(left)),inverse(right));
}
export const heisenbergCoefficients = {gain:.16,cost:-8500,days:-6};
// Authored scenario coefficients, never inferred from public case outcomes.
// Central coordinates retain pairwise order. Triple Lie brackets are zero.
export const orderCoefficients = {gain:[.16,0,0,0,0,0],cost:[-8500,0,0,0,0,0],days:[-6,0,0,0,0,0]};
export function project(information: number, path: Action[],kind:ModelKind=DEFAULT_MODEL): Projection {
 if(!Object.hasOwn(modelIds,kind))throw Error('Invalid model kind.');
 if(!Number.isFinite(information)||information<0||information>1)throw Error('Information must be between 0 and 1.');
 const signature=pathSignature(path),h=heisenbergSignature(path);
 const dot=(xs:number[],ys:number[])=>xs.reduce((s,x,i)=>s+x*ys[i],0);
 const order=(metric:keyof typeof orderCoefficients)=>kind==='heisenberg'?h.central*heisenbergCoefficients[metric]:dot(signature.areas,orderCoefficients[metric]);
 const intensity=Math.max(0,dot(signature.counts,actionIds.map(a=>actions[a].gain/.36))+order('gain'));
 const quality=information+(1-information)*(1-Math.exp(-intensity));
 const cost=Math.round(Math.max(0,dot(signature.counts,actionIds.map(a=>actions[a].cost))+order('cost')));
 const days=Math.round(Math.max(0,dot(signature.counts,actionIds.map(a=>actions[a].duration))+order('days')));
 const plaintiffShare=cost?dot(signature.counts,actionIds.map(a=>actions[a].cost*(a==='discovery'?.24:a==='deposition'?.38:.5)))/Math.max(1,dot(signature.counts,actionIds.map(a=>actions[a].cost))):0;
 const plaintiff=Math.round(cost*plaintiffShare),defense=cost-plaintiff;
 return {path:[...path],gain:quality-information,quality,cost,days,plaintiff,defense,low:Math.round(cost*.65),high:Math.round(cost*1.6)};
}
export function runModel(data:CaseData,index:number,tolerance=.02,pathA:Action[]=['discovery','deposition'],pathB:Action[]=['deposition','discovery'],kind:ModelKind=DEFAULT_MODEL) {
 if(!Number.isInteger(index)||index<0||index>=data.events.length||!Number.isFinite(tolerance)||tolerance<0||tolerance>.1)throw Error('Invalid cutoff or tolerance.');
 const state=stateAt(data,index),a=project(state.information,pathA,kind),b=project(state.information,pathB,kind),candidates=enumerate(state.information,kind);
 return {model:modelIds[kind],kind,heisenbergA:heisenbergSignature(pathA),heisenbergB:heisenbergSignature(pathB),caseName:data.name,asOfDay:state.day,eventCount:state.events.length,information:state.information,signatureA:pathSignature(pathA),signatureB:pathSignature(pathB),a,b,orderGap:{gain:a.gain-b.gain,cost:a.cost-b.cost,days:a.days-b.days},candidateCount:candidates.length,frontier:frontier(candidates),comparison:comparable(state.information,tolerance,kind),tolerance};
}
export function enumerate(information:number,kind:ModelKind=DEFAULT_MODEL):Projection[]{
 const ids=Object.keys(actions) as Action[]; const paths: Action[][]=[[]];
 const walk=(prefix:Action[])=>{if(prefix.length===3)return;for(const id of ids){if(!prefix.includes(id)){const next=[...prefix,id];paths.push(next);walk(next);}}};walk([]);
 return paths.map(path=>project(information,path,kind));
}
export function frontier(candidates: Projection[]) { return candidates.filter(p=>!candidates.some(q=>q.cost<=p.cost&&q.quality>=p.quality&&(q.cost<p.cost||q.quality>p.quality))).sort((a,b)=>a.cost-b.cost); }
export function comparable(information:number, tolerance:number,kind:ModelKind=DEFAULT_MODEL) {
 const baseline=project(information,['deposition','discovery','motion'],kind);
 const candidates=enumerate(information,kind).filter(p=>p.quality>=baseline.quality-tolerance-1e-9);
 const best=candidates.reduce((a,b)=>b.cost<a.cost?b:a,baseline);
 return {baseline,best,gap:Math.max(0,baseline.cost-best.cost)};
}
export function parseCase(input: unknown): CaseData {
 if(!input||typeof input!=='object')throw new Error('Expected a case JSON object.');
 const c=input as CaseData;
 if(c.schemaVersion!==1||typeof c.name!=='string'||!c.name.trim()||c.name.length>160||typeof c.jurisdiction!=='string'||typeof c.caseType!=='string'||typeof c.synthetic!=='boolean'||!Array.isArray(c.events)||!c.events.length||c.events.length>200)throw new Error('Invalid case metadata or events (1–200 required).');
 if(['id','docket','summary','summaryZh'].some(k=>c[k as keyof CaseData]!==undefined&&typeof c[k as keyof CaseData]!=='string')||(c.publicRecord!==undefined&&typeof c.publicRecord!=='boolean'))throw Error('Invalid optional metadata.');
 const ids=new Set<string>();let last=-1;
 for(const e of c.events){
  if(!e||['id','type','actor','title','source'].some(k=>typeof e[k as keyof Event]!=='string')||!e.id||ids.has(e.id)||!Array.isArray(e.facts)||e.facts.some(f=>typeof f!=='string')||e.facts.length>100)throw new Error('Invalid event fields or duplicate event ID.');
  if(['day','information'].some(k=>!Number.isFinite(e[k as keyof Event])||Number(e[k as keyof Event])<0)||e.information>1||!Number.isInteger(e.day)||e.day<last)throw new Error('Events must be chronological with finite, nonnegative values and information between 0 and 1.');
  if(['plaintiffCost','defenseCost','hours'].some(k=>{const v=e[k as keyof Event];return v!==null&&(!Number.isFinite(v)||Number(v)<0);}))throw Error('Costs and hours must be nonnegative numbers or null.');
  if(['date','sourceDate','sourceUrl'].some(k=>e[k as keyof Event]!==undefined&&typeof e[k as keyof Event]!=='string'))throw Error('Invalid source metadata.');
  if((e.titleZh!==undefined&&typeof e.titleZh!=='string')||(e.factsZh!==undefined&&(!Array.isArray(e.factsZh)||e.factsZh.some(f=>typeof f!=='string'))))throw Error('Invalid translated fields.');
  for(const date of [e.date,e.sourceDate])if(date&&(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date))||new Date(date).toISOString().slice(0,10)!==date))throw Error('Invalid source or event date.');
  if(e.sourceUrl&&(typeof e.sourceUrl!=='string'||!/^https:\/\//.test(e.sourceUrl)))throw Error('Use HTTPS source URLs.');
  ids.add(e.id);last=e.day;
 }
 if(c.events.reduce((s,e)=>s+e.information,0)>1.000001)throw new Error('Cumulative information must not exceed 1.');
 return {...c,events:c.events.map(e=>({...e,facts:[...e.facts],...(e.factsZh?{factsZh:[...e.factsZh]}:{})}))};
}

