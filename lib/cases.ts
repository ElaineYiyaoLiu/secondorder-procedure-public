import type {CaseData,Event} from './model.ts';
const z='https://openjurist.org/217/frd/309/zubulake-v-ubs-warburg-llc-8753319';
const o='https://law.justia.com/cases/federal/district-courts/district-of-columbia/dcdce/1:2011cv01049/148519/127/';
const v='https://openjurist.org/269/frd/497/victor-stanley-inc-v-creative-pipe-inc-8776470';
function record(id:string,origin:string,date:string,type:string,actor:string,title:string,titleZh:string,fact:string,factZh:string,information:number,source:string,sourceUrl:string,sourceDate:string,plaintiffCost:number|null=null):Event {
 return {id,date,day:Math.round((Date.parse(date)-Date.parse(origin))/86400000),type,actor,title,titleZh,facts:[fact],factsZh:[factZh],information,source,sourceUrl,sourceDate,plaintiffCost,defenseCost:null,hours:null};
}
export const publicCases:CaseData[]=[
 {schemaVersion:1,id:'zubulake',name:'Zubulake v. UBS Warburg',jurisdiction:'S.D.N.Y.',docket:'02 Civ. 1243 (SAS)',caseType:'Employment · electronic discovery',synthetic:false,publicRecord:true,
 summary:'A dispute over archived email led to a retention-policy deposition and a five-tape sample before a cost-allocation decision.',summaryZh:'围绕归档邮件的争议，先通过证言录取了解保存方式，再恢复五盘磁带样本，为费用分配提供依据。',events:[
 record('z-1','2002-02-15','2002-02-15','pleading','Plaintiff','Complaint filed','起诉','Zubulake filed employment discrimination and retaliation claims.','Zubulake 提起就业歧视与报复诉讼。',.06,'217 F.R.D. 309, pp. 312–313',z,'2003-05-13'),
 record('z-2','2002-02-15','2002-06-03','discovery','Plaintiff','Document requests served','送达文件请求','Requests included communications between UBS employees concerning Zubulake.','请求包括 UBS 员工之间涉及 Zubulake 的通信。',.08,'217 F.R.D. 309, p. 313',z,'2003-05-13'),
 record('z-3','2002-02-15','2002-09-12','discovery','Parties','Email retrieval agreement','邮件检索协议','The parties agreed to seek responsive email from five named accounts.','双方同意从五个具名账户寻找相关邮件。',.10,'217 F.R.D. 309, p. 313',z,'2003-05-13'),
 record('z-4','2002-02-15','2003-01-14','deposition','Witness','Retention-policy deposition','邮件保存政策证言录取','UBS messaging manager Christopher Behny testified about backups and restoration burden.','UBS 邮件经理 Christopher Behny 说明备份方式与恢复负担。',.14,'217 F.R.D. 309, pp. 313–314',z,'2003-05-13'),
 record('z-5','2002-02-15','2003-05-13','motion','Court','Five-tape sample ordered','命令恢复五盘磁带样本','The court ordered accessible email production and a five-tape sample at UBS expense; cost shifting remained for later analysis.','法院要求 UBS 自费提供可访问邮件并恢复五盘磁带样本，费用转移留待后续分析。',.15,'217 F.R.D. 309, p. 324',z,'2003-05-13')
 ]},
 {schemaVersion:1,id:'oxbow',name:'Oxbow Carbon v. Union Pacific',jurisdiction:'D.D.C.',docket:'11-cv-1049 (PLF/GMH)',caseType:'Antitrust · proportionality',synthetic:false,publicRecord:true,
 summary:'Sampling the CEO’s records changed the cost estimate; the parties still disputed proportionality, and the court compelled production.',summaryZh:'对 CEO 文件的抽样改变了费用估计，但双方仍对比例性有分歧，法院最终要求继续提供文件。',events:[
 record('o-1','2017-06-14','2017-06-14','motion','Court','Motion held for sampling','暂缓动议，先做抽样','The court held the motion in abeyance while the parties sampled Koch’s records and attempted negotiation.','法院暂缓处理动议，让双方抽样 Koch 的文件并尝试协商。',.10,'ECF 127, pp. 3–4',o,'2017-09-11'),
 record('o-2','2017-06-14','2017-08-02','production','Plaintiffs','Sample results reported','报告抽样结果','The joint report described roughly 1,300 responsive documents and $57,197.95 spent on initial processing and sample review.','联合报告记载约 1,300 份相关文件；初始处理及样本审阅已花费 57,197.95 美元。',.25,'ECF 127, pp. 4–5; joint report ECF 121',o,'2017-09-11',57197.95),
 record('o-3','2017-06-14','2017-08-24','motion','Parties','Second discovery hearing','第二次证据开示听证','The parties argued about the sample, remaining review and proposed search-term changes.','双方讨论样本、剩余审阅及拟议检索词调整。',.08,'ECF 127, pp. 10–12; hearing ECF 125',o,'2017-09-11'),
 record('o-4','2017-06-14','2017-09-11','motion','Court','Production compelled','要求继续提供文件','The court granted the motion to compel and denied shifting production costs to defendants.','法院准许强制开示动议，拒绝把文件提供费用转移给被告。',.14,'ECF 127, pp. 16–17',o,'2017-09-11')
 ]},
 {schemaVersion:1,id:'victor-stanley',name:'Victor Stanley v. Creative Pipe',jurisdiction:'D. Md.',docket:'06-cv-2662 (MJG)',caseType:'Intellectual property · preservation',synthetic:false,publicRecord:true,
 summary:'Repeated preservation and production disputes led to evidentiary hearings and a sanctions order with a recommendation on copyright liability.',summaryZh:'反复的证据保存与文件提供争议，引发证据听证、制裁命令及关于版权责任的建议。',events:[
 record('v-1','2006-10-11','2006-10-11','pleading','Plaintiff','Complaint filed','起诉','Victor Stanley alleged intellectual-property violations and unfair competition.','Victor Stanley 主张知识产权侵权及不正当竞争。',.06,'269 F.R.D. 497, pp. 502–503',v,'2010-09-09'),
 record('v-2','2006-10-11','2006-10-23','discovery','Court','Immediate discovery authorized','允许立即开展证据开示','The court authorized early discovery concerning use of restricted design documents.','法院允许就受限设计文件的使用提前开展证据开示。',.07,'269 F.R.D. 497, p. 503; ECF 9',v,'2010-09-09'),
 record('v-3','2006-10-11','2006-10-24','discovery','Plaintiff','Limited requests served','送达有限范围请求','Victor Stanley served limited document requests and interrogatories.','Victor Stanley 送达有限范围的文件请求与书面询问。',.08,'269 F.R.D. 497, p. 503; ECF 22-1',v,'2010-09-09'),
 record('v-4','2006-10-11','2007-08-01','motion','Court','ESI production ordered','要求提供电子信息','The court ordered relevant nonprivileged ESI production; further orders followed.','法院要求提供相关且不受特权保护的电子信息，随后又发出进一步命令。',.09,'269 F.R.D. 497, p. 513; ECF 131',v,'2010-09-09'),
 record('v-5','2006-10-11','2009-10-29','expert','Court','Preservation evidence hearing','证据保存听证','The court held an evidentiary hearing on preservation failures; additional hearings followed.','法院就证据保存失误举行证据听证，后续还有多次听证。',.15,'269 F.R.D. 497, p. 500',v,'2010-09-09'),
 record('v-6','2006-10-11','2010-09-09','motion','Court','Sanctions and recommendation','制裁命令与建议','The magistrate ordered monetary sanctions and recommended default liability on the copyright count; the recommendation was not itself a final merits judgment.','治安法官命令金钱制裁，并建议就版权诉求作出缺席责任判决；该建议本身不是最终实体判决。',.12,'269 F.R.D. 497, pp. 540–541; ECF 377',v,'2010-09-09')
 ]}
];
