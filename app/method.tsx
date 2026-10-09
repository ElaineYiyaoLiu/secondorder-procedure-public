import type {ReactNode} from 'react';
import katex from 'katex';
import {modelIds,project} from '../lib/model';
import {productVersion} from '../lib/version';
import {methodSections,type Block} from './method-content';

// Only author-controlled formulas are rendered; no uploaded content or macros enter KaTeX.
const renderedMath=new Map(methodSections.flatMap(s=>s.blocks.filter(b=>b.type==='math').map(b=>[b.id,katex.renderToString(b.tex,{displayMode:true,throwOnError:true,strict:'error',trust:false,output:'htmlAndMathml'})] as const)));
const roleLabels={assumption:['Assumption','假设'],proposition:['Proposition','命题'],proof:['Proof','证明']} as const;

export default function Method({zh}:{zh:boolean}) {
 const t=(en:string,cn:string)=>zh?cn:en;
 const cell=(value:[string,string])=>value[zh?1:0];
 const renderBlock=(b:Block,index:number):ReactNode=>{
  if(b.type==='math')return <figure className="review-equation" key={b.id} aria-label={t(`Equation ${b.id}`,`公式 ${b.id}`)}><div className="review-math" dangerouslySetInnerHTML={{__html:renderedMath.get(b.id)!}}/><figcaption>({b.id})</figcaption></figure>;
  if(b.type==='table')return <div className="table-scroll" key={index}><table><thead><tr>{b.headers.map((h,i)=><th scope="col" key={i}>{cell(h)}</th>)}</tr></thead><tbody>{b.rows.map((row,i)=><tr key={i}>{row.map((c,j)=><td key={j}>{cell(c)}</td>)}</tr>)}</tbody></table></div>;
  return <div className={b.role?`review-statement review-${b.role}`:undefined} key={index}>{b.role&&b.role!=='review'&&<strong className="review-label">{cell(roleLabels[b.role] as [string,string])}</strong>}<p>{t(b.en,b.zh)}</p></div>;
 };
 const A=project(.38,['discovery','deposition']),B=project(.38,['deposition','discovery']);
 return <article className="method-content mathematical-review" aria-label={t('Mathematical framework','数学框架')}>
  <section className="panel method-section review-intro">
   <div className="review-topline"><div><h2>{t('Mathematical framework','数学框架')}</h2><p>{t('Definitions, proofs, model choices and reproducible calculations.','定义、证明、模型选择与可复现计算。')}</p></div><button className="secondary method-screen" onClick={()=>window.print()}>{t('Print / save PDF','打印 / 保存 PDF')}</button></div>
   <div className="method-callout">SecondOrder Procedure · {productVersion}<br/>{t('Workspace model','工作台模型')}: <strong>{modelIds.heisenberg}</strong></div>
   <p>{t('Start with the group construction in section 03. Section 04 explains why the model has five dimensions, sections 05–07 verify its representations and path formulas, and sections 09–11 reproduce the calculations. The final sections develop the validation protocol and questions for review.','可从第 03 节的群构造开始。第 04 节解释为何是五维，第 05–07 节核查表示与路径公式，第 09–11 节复现计算。最后几节展开验证流程和审阅问题。')}</p>
   <nav className="method-toc method-screen" aria-label={t('Method contents','方法目录')}>{methodSections.map(s=><button key={s.id} onClick={()=>document.getElementById(`method-${s.id}`)?.scrollIntoView({behavior:'smooth',block:'start'})}><span>{s.id}</span>{cell(s.title)}</button>)}</nav>
  </section>
  {methodSections.map(s=><section id={`method-${s.id}`} className="panel method-section" key={s.id}><h2><span>{s.id}</span>{cell(s.title)}</h2>{s.blocks.map(renderBlock)}{s.id==='10'&&<div className="method-callout">{t('Live values from project()','由 project() 实际计算')}<br/>A: I={A.quality.toFixed(10)}, B=${A.cost.toLocaleString('en-US')}, T={A.days}<br/>B: I={B.quality.toFixed(10)}, B=${B.cost.toLocaleString('en-US')}, T={B.days}</div>}</section>)}
  <section className="panel method-section review-references"><h2>{t('Mathematical references','数学参考资料')}</h2><p>{t('These references support the standard algebraic definitions. The litigation encoding, scenario coefficients and review analysis are specified on this page.','这些资料支持标准代数定义。本页另行规定诉讼编码、情景系数与审阅分析。')}</p><ol className="method-steps">
   <li><a className="method-link" href="https://math.mit.edu/classes/18.157/S2012/semistart.pdf" target="_blank" rel="noopener noreferrer">Victor Guillemin &amp; Shlomo Sternberg, Semi-classical analysis, §16.4, pp. 447–448.</a> {t('Symplectic-vector-space construction of the Heisenberg algebra and exponential-coordinate group law.','由辛向量空间构造 Heisenberg 代数及指数坐标群律。')}</li>
   <li><a className="method-link" href="https://math.nyu.edu/~ryoung/courses/subriem/subRnotes.html" target="_blank" rel="noopener noreferrer">Robert Young, Notes on nilpotent groups and subriemannian manifolds.</a> {t('Nilpotent groups, Heisenberg brackets and Carnot geometry.','幂零群、Heisenberg 括号与 Carnot 几何。')}</li>
   <li><a className="method-link" href="https://fabricebaudoin.blog/2013/01/05/lecture-16-free-carnot-groups/" target="_blank" rel="noopener noreferrer">Fabrice Baudoin, Lecture 16: Free Carnot groups (2013).</a> {t('Free nilpotent layers, BCH coordinates and path lifts. Sign conventions may differ; this page fixes J in (4.2).','自由幂零层、BCH 坐标与路径提升。文献符号约定可能不同，本页以 (4.2) 的 J 为准。')}</li>
  </ol></section>
 </article>;
}
