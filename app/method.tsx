import {actions,actionIds,heisenbergSignature,heisenbergCommutator,heisenbergCoefficients,modelIds,orderCoefficients,project,pairs,type ModelKind} from '../lib/model';

export default function Method({zh,kind}:{zh:boolean;kind:ModelKind}) {
 const t=(en:string,cn:string)=>zh?cn:en;
 const section=(id:string,title:string,content:React.ReactNode)=><section className="panel method-section"><h2><span>{id}</span>{title}</h2>{content}</section>;
 const x=heisenbergSignature(['discovery']),y=heisenbergSignature(['deposition']);
 const loop=heisenbergCommutator(x,y);
 const a=project(.38,['discovery','deposition'],'heisenberg'),b=project(.38,['deposition','discovery'],'heisenberg');
 const dollars=(value:number)=>'$'+value.toLocaleString('en-US');
 const mappings=[
  ['discovery','X₁',t('Documents before testimony','证言录取前的文件材料')],
  ['deposition','Y₁',t('Testimony following documents','文件开示后的证言')],
  ['motion','X₂',t('Procedural intervention','程序裁定请求')],
  ['expert','Y₂',t('Expert evidence work','专家证据工作')]
 ] as const;
 return <div className="method-content">
  {section('01',t('From the research blueprint to this implementation','从研究蓝图到当前实现'),<>
   <p>{t('This workspace applies the step-2 nilpotent Heisenberg proposal in Elaine Liu’s “Heisenberg Structure and Procedural Waste in Adversarial Litigation,” Preliminary Research Blueprint, September 2026 (P2 Version 1). Its research question is how much procedural burden can be removed while preserving adjudicative quality.','本工作台应用 Elaine Liu 的《Heisenberg Structure and Procedural Waste in Adversarial Litigation》研究蓝图（2026 年 9 月，P2 Version 1）中的二阶 nilpotent Heisenberg 提案。核心问题是：在保留裁判质量的条件下，能减少多少程序负担。')}</p>
   <p>{t('The default engine is now a five-dimensional Heisenberg group H₅. Versions v0.2–v0.3 used a generic free step-2 nilpotent representation with six independent central coordinates. That representation was related to the proposal, but was not itself H₅. Both options are executable in v0.4.','默认引擎现在是五维 Heisenberg 群 H₅。v0.2–v0.3 使用的是具有六个独立中心坐标的一般自由二阶 nilpotent 表示，与蓝图相关，但它本身并不是 H₅。v0.4 中两种选项都可以实际运行。')}</p>
   <div className="method-callout">{t('Selected engine','当前所选引擎')}: <strong>{modelIds[kind]}</strong></div>
   <p>{t('This is an implementation of the proposed algebra and finite scenario comparison. It does not establish that litigation actually has a Heisenberg structure, and it does not implement the blueprint’s complete AI re-litigation experiment.','这里实现的是提案中的代数结构与有限情景比较；它没有证明真实诉讼具有 Heisenberg 结构，也没有实现蓝图中完整的 AI 重新诉讼实验。')}</p>
  </>)}
  {section('02',t('The case record supplies the starting state','案件记录提供起点'),<>
   <div className="equation">Hₜ = (Q₁, …, Qₜ) → Iₜ, Bₜ, {t('available facts','已纳入事实')}</div>
   <p>{t('Choose Zubulake, Oxbow Carbon or Victor Stanley and a cutoff. Only events up to that cutoff contribute to the displayed record and starting information score Iₜ. Each event links to a public opinion and records its publication date. These are selected procedural episodes, not full completed trial records.','选择 Zubulake、Oxbow Carbon 或 Victor Stanley 及截止日期。只有截止点及之前的事件进入显示记录和起始信息评分 Iₜ。每条事件链接到公开法院文书并保留发布日期。这些是程序选段，并非包含完整审判结果的已结案记录。')}</p>
   <p>{t('Iₜ is the sum of manually authored event increments, capped at 0.99. It is not measured adjudicative value ΔV or adjudicative quality 𝒜. Historical costs and hours stay unknown where unreported; known subtotals are not complete observed L_B.','Iₜ 是人工预设事件增量之和，上限 0.99。它不是实测的裁判价值 ΔV，也不是裁判质量 𝒜。未披露的历史费用和工时保留为未知；已知小计不等于完整的观测 L_B。')}</p>
   <p>{t('The opinions often postdate the events they describe. Excluding later events prevents input leakage within this reconstruction, but does not prove that every included fact was available to a litigant at the historical cutoff.','文书发布日期常晚于其中叙述的事件。排除后续事件可以限制这份回溯记录的输入，但不能证明所有纳入事实在历史截止点已向当事人公开。')}</p>
  </>)}
  {section('03',t('Map actions into H₅ horizontal directions','将动作映射到 H₅ 水平方向'),<>
   <div className="equation">u = (x₁, y₁, x₂, y₂), z ∈ ℝ; [Xᵢ, Yⱼ] = δᵢⱼ Z</div>
   <div className="table-scroll"><table><thead><tr><th>{t('Action','动作')}</th><th>{t('Direction','方向')}</th><th>{t('Pairing interpretation','配对解释')}</th></tr></thead><tbody>{mappings.map(([id,direction,meaning])=><tr key={id}><td>{zh?actions[id].zh:actions[id].label}</td><td>{direction}</td><td>{meaning}</td></tr>)}</tbody></table></div>
   <p>{t('Each selected action is a unit horizontal increment. Discovery/deposition form one pair; motion/expert discovery form the other. Both brackets generate the same center Z. Cross-pair brackets, [Xᵢ,Xⱼ], [Yᵢ,Yⱼ] and every bracket with Z are zero.','每个所选动作产生一个单位水平增量。证据开示／证言录取构成一对，动议／专家开示构成另一对。两组配对的括号都生成同一个中心 Z。跨配对括号、[Xᵢ,Xⱼ]、[Yᵢ,Yⱼ] 以及所有含 Z 的括号为零。')}</p>
   <p>{t('This pairing is an explicit modeling assumption, not a discovery from the three cases. Horizontal coordinates count action doses, not substantive progress D_sub. A learned representation of factual or adjudicative change would be needed to interpret horizontal displacement as substantive displacement.','此配对是明确的建模假设，不是从三个案件中发现的关系。水平坐标计数动作剂量，并不测量实质进展 D_sub。要把水平位移解释为实质位移，还需要学习或独立标注事实／裁判变化的表示。')}</p>
  </>)}
  {section('04',t('Compose the path with a symplectic central term','用辛形式中心项合成路径'),<>
   <div className="equation">ω(u,v) = x₁vᵧ₁ − y₁vₓ₁ + x₂vᵧ₂ − y₂vₓ₂<br/>(u,z) · (v,w) = (u+v, z+w+½ω(u,v))</div>
   <p>{t('Starting at (0,0), fold each action in its selected order using composeHeisenberg. The antisymmetric form ω is fixed, nondegenerate and rank 4; the model therefore has one center and two canonical pairs, as required for H₅. The symplectic form is imposed here and still needs empirical justification.','从 (0,0) 出发，按所选顺序用 composeHeisenberg 逐步合成。反对称形式 ω 是固定、非退化且秩为 4 的，因此模型具有 H₅ 所需的一个中心与两组标准配对。这里的辛形式是预设的，仍需要实证论证。')}</p>
   <div className="equation">[𝔤,𝔤] = span(Z), [𝔤,[𝔤,𝔤]] = 0</div>
   <p>{t('This is why the model is step-2 nilpotent: pairwise interactions remain central, and triple Lie brackets vanish. Nilpotent does not mean litigation ends after two actions. Longer paths still accumulate counts and center.','这就是模型为二阶 nilpotent 的原因：成对交互留在中心，而三重 Lie 括号为零。nilpotent 并不表示诉讼在两个动作后结束；更长的路径仍会累积计数与中心项。')}</p>
   <div className="method-callout">{t('Actual computed example','实际计算示例')}: discovery → deposition: z = {heisenbergSignature(['discovery','deposition']).central}; deposition → discovery: z = {heisenbergSignature(['deposition','discovery']).central}.</div>
   <p>{t('The horizontal counts are identical, but the center changes sign. The formal loop exp(X₁) exp(Y₁) exp(−X₁) exp(−Y₁) computes','水平计数相同，中心项符号不同。形式回路 exp(X₁) exp(Y₁) exp(−X₁) exp(−Y₁) 计算得到')} <code>u={JSON.stringify(loop.horizontal)}, z={loop.central}</code>. {t('Negative increments are algebraic inverses for this demonstration; they do not erase a deposition, undo disclosure, or form admissible litigation actions. The selectable candidate paths use nonnegative actions only.','负增量在此是代数逆元，不能抹去证言录取或撤回披露，也不是可选的诉讼动作。候选路径只使用非负动作。')}</p>
   <p><a className="method-link" href="https://math.nyu.edu/~ryoung/courses/subriem/subRnotes.html" target="_blank" rel="noopener noreferrer">{t('Mathematical reference: NYU notes on nilpotent groups','数学参考：NYU 幂零群讲义')} ↗</a></p>
  </>)}
  {section('05',t('Keep a generic nilpotent alternative for comparison','保留一般 nilpotent 模型供比较'),<>
   <p>{t('The full audit representation retains four counts and six signed pairwise areas aᵢⱼ. It is the free step-2 nilpotent algebra on four generators, with a six-dimensional center. The H₅ quotient keeps the same horizontal counts and identifies z = a(discovery,deposition) + a(motion,expert), discarding the other four central directions.','完整审计表示保留四个计数与六个有向成对面积 aᵢⱼ。它是四个生成元上的自由二阶 nilpotent 代数，中心为六维。H₅ 商映射保留相同水平计数，并将 z = a(开示,证言录取) + a(动议,专家开示)，舍去其余四个中心方向。')}</p>
   <p>{t('The model selector below the path editors switches the actual calculation. H₅ uses its shared z in all order adjustments. The generic alternative keeps the earlier sparse rule: only discovery/deposition area affects outputs. A motion → expert sequence therefore distinguishes these engines. This is a comparison of assumptions, not an empirical model-selection result.','路径编辑器下方的模型选择器会切换实际计算。H₅ 在所有顺序调整中使用共同的 z；一般模型沿用此前的稀疏规则，只有开示／证言录取面积影响输出。因此，动议 → 专家开示路径可以区分两种引擎。这是不同假设的比较，并非实证模型选择结果。')}</p>
   <details><summary>{t('Generic audit coordinate order','一般模型审计坐标顺序')}</summary><p>{pairs.map(p=>p.join('/')).join(' · ')}</p><p>{t('Generic order coefficients','一般模型顺序系数')}: {JSON.stringify(orderCoefficients)}</p></details>
  </>)}
  {section('06',t('Convert coordinates into value and burden scenarios','将坐标转换为信息与负担情景'),<>
   <div className="table-scroll"><table><thead><tr><th>{t('Action','动作')}</th><th>{t('Base cost · USD','基础费用 · 美元')}</th><th>{t('Base days','基础天数')}</th><th>{t('Gain input','增益输入')}</th></tr></thead><tbody>{actionIds.map(id=><tr key={id}><td>{zh?actions[id].zh:actions[id].label}</td><td>{dollars(actions[id].cost)}</td><td>{actions[id].duration}</td><td>{actions[id].gain}/0.36</td></tr>)}</tbody></table></div>
   <div className="equation">r = max(0, Σ nₖ gₖ/0.36 + {heisenbergCoefficients.gain}z)<br/>I(γ) = Iₜ + (1−Iₜ)(1−exp(−r))<br/>B(γ) = round(max(0, Σ nₖ cₖ − 8500z))<br/>T(γ) = round(max(0, Σ nₖ dₖ − 6z))</div>
   <p>{t('These are the H₅ evaluation rules in project. All base costs, days, gain inputs and center coefficients are authored scenario parameters. The sign of z is an orientation; neither positive z nor a large |z| proves waste. Burden is an outcome function, not the central coordinate itself or a Carnot–Carathéodory distance.','以上是 project 中的 H₅ 计算规则。基础费用、天数、增益输入和中心系数均为预设情景参数。z 的符号表示方向；正 z 或较大的 |z| 都不能证明浪费。负担是一个输出函数，不等于中心坐标本身，也不是 Carnot–Carathéodory 距离。')}</p>
   <div className="method-callout">{t('Worked example with starting proxy Iₜ = 0.38','以起始代理评分 Iₜ = 0.38 为例')}:<br/>A: discovery → deposition · I = {a.quality.toFixed(4)} · {dollars(a.cost)} · {a.days}d<br/>B: deposition → discovery · I = {b.quality.toFixed(4)} · {dollars(b.cost)} · {b.days}d<br/>A − B: {((a.quality-b.quality)*100).toFixed(2)} pp · {dollars(a.cost-b.cost)} · {a.days-b.days}d</div>
   <p>{t('The saturation link makes marginal information shrink near I=1 while costs can remain positive, illustrating ΔV→0 with ΔB>0 using an information proxy. Its nonlinear outputs can still show higher-order finite differences even though the underlying Lie algebra has zero triple brackets.','饱和链接使 I 接近 1 时的边际信息变小，而费用仍可为正，以信息代理指标展示 ΔV→0、ΔB>0 的情景。尽管底层 Lie 代数的三重括号为零，非线性输出仍可能有高阶有限差分；两者不能混同。')}</p>
   <p>{t('Plaintiff cost shares are base-cost-weighted assumptions [0.24,0.38,0.50,0.50]; defense receives the remainder. Cost ranges are point values × [0.65,1.60], with no probability coverage. They measure neither trauma nor established unfairness.','原告费用份额按基础费用加权，假设为 [0.24,0.38,0.50,0.50]，被告承担余数。费用区间为点值 × [0.65,1.60]，没有概率覆盖意义，也不测量心理伤害或认定不公平。')}</p>
  </>)}
  {section('07',t('Apply the quality-preserving burden constraint','应用保留质量的负担约束'),<>
   <div className="equation">{t('Blueprint','蓝图')}: Γε = {'{'}γ : 𝒜(γ) ≥ 𝒜(γᴿ) − ε{'}'}<br/>B*ε = infγ∈Γε L_B(γ), Bavoidable = L_B(γᴿ) − B*ε</div>
   <p>{t('The blueprint requires adjudicative quality to be preserved, not just a shorter or cheaper path. This implementation enumerates 41 paths: the empty continuation and all ordered selections of one to three distinct actions. It removes dominated paths and compares the cheapest feasible candidate with deposition → discovery → motion.','蓝图要求保留裁判质量，而不只是更短或更便宜。本实现枚举 41 条路径：空续行路径以及一至三个不重复动作的所有排列。它去除被支配路径，将满足约束的最低费用候选与“证言录取 → 开示 → 动议”比较。')}</p>
   <div className="equation">{t('Implemented surrogate','已实现的替代约束')}: I(γ) ≥ I(γbaseline) − ε<br/>{t('Finite scenario gap','有限情景差')} = B(γbaseline) − min{'{'}B(γ) : γ {t('is an enumerated feasible path','属于枚举可行路径')}{'}'}</div>
   <p>{t('The baseline is a stated future scenario, not the observed complete litigation γᴿ. I substitutes for 𝒜 only for demonstration. The finite minimum is not the infimum over all admissible litigation histories. The displayed gap is therefore a scenario burden gap, not an estimate of actual avoidable litigation waste. Editors allow up to five actions, including repetition; the 41-path search does not include every editable path.','这里的基准是明确的未来情景，不是完整观测诉讼 γᴿ。I 仅为演示替代 𝒜。有限集合的最小值并不是所有可允许诉讼历史上的下确界。因此显示的是情景负担差，不是实际可避免诉讼浪费的估计。编辑器允许最多五个动作及重复动作，但 41 条搜索路径不包含所有可编辑路径。')}</p>
   <p>{t('Removing an action changes its information proxy and cost within these rules. Removing a specific fact, document or claim is not implemented: that would need issue/evidence dependencies and an independent adequacy assessment. Lower burden cannot automatically justify omitting information.','删除一个程序动作会按这些规则改变信息代理指标与费用。删除具体事实、文件或主张尚未实现：它需要争议／证据依赖关系以及独立的充分性评估。更低负担不能自动成为省略信息的理由。')}</p>
  </>)}
  {section('08',t('What is implemented, and what must be tested','已实现的部分与需要检验的部分'),<>
   <div className="table-scroll"><table><thead><tr><th>{t('Blueprint component','蓝图部分')}</th><th>{t('Current application','当前应用')}</th></tr></thead><tbody>{[
    [t('Heisenberg / nilpotent structure','Heisenberg / nilpotent 结构'),t('Executable H₅ group law, center, signed loop and generic alternative. Algebra tests verify these definitions.','可执行的 H₅ 群律、中心、形式回路与一般模型。代数测试验证这些定义。')],
    [t('Marginal value and burden','边际价值与负担'),t('Authored information scores and cost/day scenarios; not measured adjudicative value.','预设信息评分与费用／天数情景；并非实测裁判价值。')],
    [t('Avoidable asymmetric burden','可避免的不对称负担'),t('Finite proxy-constrained comparison and assumed party cost shares; not validated waste or harm.','有限代理约束比较与假设的双方费用份额；未验证浪费或伤害。')],
    [t('AI plaintiff, defense and judge','AI 原告、被告与法官'),t('Not implemented. No agents, LLM calls or adversarial regime experiment.','尚未实现。没有智能体、LLM 调用或对抗制度实验。')],
    [t('Jury, generation/evaluation separation','陪审团、生成与评估分离'),t('Not implemented. There is no jury outcome or independent adjudicative score.','尚未实现。没有陪审团结果或独立裁判评分。')],
    [t('Empirical fit and falsification','实证拟合与证伪'),t('Not performed. Three public cases are showcases, not training or held-out evaluation data.','尚未进行。三个公开案件为展示材料，不是训练数据或留出评估数据。')]
   ].map(([a,b])=><tr key={a}><td>{a}</td><td>{b}</td></tr>)}</tbody></table></div>
   <p>{t('To test the hypothesis, independent evaluators would annotate ΔV, ΔB and final 𝒜; fit the action representation and bracket form on training cases; compare additive, Heisenberg, generic step-2 and higher-step models on held-out trajectories; and run counterfactuals without hindsight. Lawyer generation, judge/jury and evaluation must be separate, as the blueprint requires.','要检验假设，需要独立评估者标注 ΔV、ΔB 和最终 𝒜，在训练案件上拟合动作表示与括号形式，在留出轨迹上比较加法、Heisenberg、一般二阶和高阶模型，并在无后见信息的条件下运行反事实。律师生成、法官／陪审团与评估必须分离，符合蓝图中的方法要求。')}</p>
   <p>{t('If independently observed interaction effects require several central directions, persistent triple-bracket terms or burden-dependent changes to later actions, the one-center Heisenberg approximation may fail. Zero higher brackets in this code are imposed algebra, not evidence that the hypothesis holds in court.','如果独立观测的交互需要多个中心方向、持续的三重括号项，或累计负担改变后续动作，单中心 Heisenberg 近似可能失败。代码中的高阶括号为零是预设代数，不是真实诉讼符合假设的证据。')}</p>
  </>)}
 </div>;
}
