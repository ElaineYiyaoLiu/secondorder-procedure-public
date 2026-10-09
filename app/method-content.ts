export type TextBlock = {type:'text'; en:string; zh:string; role?:'assumption'|'proposition'|'proof'|'review'};
export type MathBlock = {type:'math'; id:string; tex:string};
export type TableBlock = {type:'table'; headers:[string,string][]; rows:[string,string][][]};
export type Block = TextBlock | MathBlock | TableBlock;
export type MethodSection = {id:string; title:[string,string]; blocks:Block[]};
const p=(en:string,zh:string,role?:TextBlock['role']):TextBlock=>({type:'text',en,zh,role});
const m=(id:string,tex:string):MathBlock=>({type:'math',id,tex});
const table=(headers:TableBlock['headers'],rows:TableBlock['rows']):TableBlock=>({type:'table',headers,rows});
export const methodSections:MethodSection[] = [
{id:'01',title:['Scope, claims and notation','范围、命题与记号'],blocks:[
p('This page develops the algebra behind Procedure, proves its main properties and traces the calculations to the code. It also sets out how procedural histories enter the model and how its assumptions can be tested.','本页展开 Procedure 的代数结构，证明主要性质，并将计算公式对应到代码。同时说明程序历史如何进入模型，以及如何检验模型假设。'),
p('Model scope: the algebra is defined and tested; action pairings and outcome coefficients are specified scenario assumptions. Empirical calibration and quality-preserving counterfactual analysis remain to be carried out.','模型范围：代数结构已定义并测试；动作配对与输出系数是给定的情景假设。实证校准及保持裁判质量的反事实分析尚待完成。'),
p('All vector spaces and groups here are real. H₅ means a Heisenberg group of ordinary manifold dimension five. Some references write this same group as ℍ² or H₂, indexing by the number of canonical pairs. We reserve n for that number, N for the number of procedural actions, Z for a basis vector and z for its scalar coordinate.','本页的向量空间与群均取实数域。H₅ 表示通常流形维数为五的 Heisenberg 群。有些文献按标准配对数编号，将同一群写作 ℍ² 或 H₂。这里 n 表示配对数，N 表示程序动作数，Z 表示基向量，z 表示其标量坐标。')
]},
{id:'02',title:['Histories, states and the encoding map','历史、状态与编码映射'],blocks:[
m('2.1',String.raw`\gamma=(Q_1,\ldots,Q_N),\quad H_t=(Q_1,\ldots,Q_t),\quad S_t=Q_t(S_{t-1})`),
p('Qₜ is a role-specific procedural transition on an admissible litigation state, including available evidence, unresolved issues and any history needed for future decisions. Procedure compares chronological sequences. Standard function composition applies right to left, so “Qᵢ then Qⱼ” is Qⱼ∘Qᵢ. Group products below instead list increments in chronological order. The two conventions must not be conflated.','Qₜ 是作用于合法诉讼状态的角色相关程序转移。状态包含可用证据、待决争议及未来决策所需的历史。Procedure 比较按时间排列的动作。通常的函数复合从右向左作用，因此“先 Qᵢ 后 Qⱼ”是 Qⱼ∘Qᵢ；下文群乘积则按时间顺序排列增量。两种约定须明确区分。'),
m('2.2',String.raw`a_t=\phi(Q_t,H_{t-1})\in V,\qquad g_0=(0,0),\quad g_t=g_{t-1}\cdot(a_t,0)`),
p('The current φ maps discovery, deposition, motion and expert discovery to the four standard basis vectors of ℝ⁴, independent of state, intensity or role. A richer φ could use normalized doses or substantive-state changes, but that would require a defined measurement model. The implementation assumes zero direct central increment per action.','当前 φ 将开示、证言录取、动议和专家开示映射为 ℝ⁴ 的四个标准基向量，不随状态、强度或角色变化。更丰富的 φ 可编码归一化剂量或实质状态变化，但需要明确测量模型。当前实现假设每个动作的直接中心增量为零。','assumption'),
p('The encoding represents chronological action words. To connect it to actual state transitions, specify a compatible transition map; to use it for prediction, test whether histories with the same features and initial state have comparable conditional outcomes. These are separate requirements.','编码表示按时间排列的动作词。若要对应实际状态转移，需定义与之相容的转移映射；若用于预测，则需检验特征和初始状态相同的历史是否具有相近的条件结果。这是两项不同要求。')
]},
{id:'03',title:['General step-2 construction and its proof','一般二阶构造及证明'],blocks:[
p('Let V and W be finite-dimensional vector spaces and let β:Λ²V→W be linear, equivalently an alternating bilinear map. Assume im β=W when W is intended to be exactly the commutator layer. On V⊕W define the following bracket and multiplication.','令 V、W 为有限维向量空间，β:Λ²V→W 为线性映射，等价于反对称双线性映射。若 W 要恰好等于交换子层，则另假设 im β=W。在 V⊕W 上定义如下括号与乘法。'),
m('3.1',String.raw`[(u,z),(v,w)]=(0,\beta(u,v)),\qquad [V,W]=[W,W]=0`),
m('3.2',String.raw`(u,z)\cdot(v,w)=\left(u+v,z+w+\tfrac12\beta(u,v)\right)`),
p('The bracket is bilinear and antisymmetric. Every inner bracket lies in W, which commutes with everything, so each term in the Jacobi identity is zero. The resulting Lie algebra is nilpotent of class at most two, and exactly two if β≠0. “Step two” refers to nested brackets, not to the number of actions.','括号满足双线性和反对称性。每个内括号都落在与所有元素交换的 W 中，因此 Jacobi 恒等式各项均为零。此 Lie 代数的幂零阶至多为二；β≠0 时恰为二。二阶指嵌套括号层数，并非动作数。','proof'),
m('3.3',String.raw`\beta(u,v)+\beta(u+v,q)=\beta(v,q)+\beta(u,v+q)`),
p('Expanding bilinearly proves (3.3), which makes the central coordinates of (g·h)·k and g·(h·k) equal; horizontal coordinates add associatively. The identity is (0,0), the inverse is (−u,−z), and multiplication is polynomial on the simply connected manifold V×W. Thus (3.2) defines a Lie group directly. The step-2 BCH formula log(exp A exp B)=A+B+½[A,B] agrees with it in exponential coordinates of the first kind.','双线性展开即可验证 (3.3)，从而 (g·h)·k 与 g·(h·k) 的中心坐标相等，水平坐标的加法也结合。单位元为 (0,0)，逆元为 (−u,−z)，乘法在单连通流形 V×W 上为多项式，因此 (3.2) 直接定义 Lie 群。一类指数坐标中的二阶 BCH 公式 log(exp A exp B)=A+B+½[A,B] 与之相符。','proof'),
m('3.4',String.raw`[\mathfrak g,\mathfrak g]=\{0\}\oplus\operatorname{im}\beta,\qquad Z(\mathfrak g)=\operatorname{rad}\beta\oplus W`),
p('Here rad β={u:β(u,v)=0 for every v}. The full center Z(𝔤) and the derived algebra [𝔤,𝔤] need not coincide. A degenerate bracket can leave additional horizontal directions in the center.','这里 rad β={u:对所有 v 均有 β(u,v)=0}。完整中心 Z(𝔤) 与导出代数 [𝔤,𝔤] 未必相等。退化括号可使额外的水平方向进入中心。')
]},
{id:'04',title:['Why five dimensions?','为什么是五维？'],blocks:[
p('Five dimensions follow from three choices: four independent horizontal directions, one shared central direction, and a nondegenerate alternating form ω with β(u,v)=ω(u,v)Z. Thus dim V+dim W=4+1=5. Section 06 gives the quotient that implements these choices.','五维来自三个选择：四个独立水平方向、一个共享中心方向，以及非退化反对称形式 ω，满足 β(u,v)=ω(u,v)Z。因此 dim V+dim W=4+1=5。第 06 节给出实现这些选择的商映射。','assumption'),
m('4.1',String.raw`\dim H_{2n+1}=2n+1;\qquad n=2\ \Longrightarrow\ \dim H_5=5`),
m('4.2',String.raw`u=(x_1,y_1,x_2,y_2),\quad \omega(u,v)=u^TJv,\quad J=\begin{pmatrix}0&1&0&0\\-1&0&0&0\\0&0&0&1\\0&0&-1&0\end{pmatrix}`),
m('4.3',String.raw`J^T=-J,\qquad J^2=-I_4,\qquad \det J=1,\qquad \operatorname{rank}J=4`),
p('Classification under these assumptions: if dim V=4, dim W=1, im β=W and rad β=0, the step-2 algebra is isomorphic to 𝔥₅. Choose Z to identify β with a scalar alternating form. A symplectic basis gives two canonical pairs [Xᵢ,Yⱼ]=δᵢⱼZ, with all other basis brackets zero. This establishes the claimed isomorphism.','在这些假设下，若 dim V=4、dim W=1、im β=W 且 rad β=0，则二阶代数同构于 𝔥₅。选择 Z 后，β 对应标量反对称形式。取辛基得到两组标准配对 [Xᵢ,Yⱼ]=δᵢⱼZ，其余基括号为零，因而得到所述同构。','proposition'),
table([['Structure','结构'],['Ordinary dimension','通常维数'],['Meaning','含义']],[
[['H₃','H₃'],['3','3'],['Two horizontal directions, one center','两个水平方向、一个中心']],
[['H₅','H₅'],['5','5'],['Four horizontal directions, rank-4 scalar bracket','四个水平方向、秩为 4 的标量括号']],
[['H₃ × ℝ²','H₃ × ℝ²'],['5','5'],['Rank-2 scalar bracket; full center has dimension 3','秩为 2 的标量括号，完整中心为三维']],
[['H₃ × H₃','H₃ × H₃'],['6','6'],['Two pairs with independent central directions','两组配对具有独立中心方向']],
[['Free step-2 algebra on four generators','四生成元自由二阶代数'],['10 = 4 + 6','10 = 4 + 6'],['All six pairwise brackets retained independently','六个成对括号均独立保留']]]),
p('Four action labels justify four coordinates only if the encoded directions are independent. The chosen pairings, common central scale and zero cross-pair effects require separate evidence. A Darboux basis canonicalizes a fitted symplectic form but can mix action labels, so the fitted form must also be examined in the original discovery, deposition, motion and expert coordinates.','四个动作标签能支持四个坐标的前提，是编码方向相互独立。所选配对、共同中心尺度及跨配对效应为零，需要分别论证。Darboux 基可将拟合的辛形式标准化，但可能混合动作标签，因此还须在原有开示、证言录取、动议和专家开示坐标中检查拟合形式。'),
p('Five is the ordinary manifold dimension. With weights one on V and two on W, the Carnot homogeneous dimension is 4+2×1=6. These are different notions of dimension.','五是通常流形维数。若 V 权重为一、W 权重为二，则 Carnot 齐次维数为 4+2×1=6。两者是不同的维数概念。')
]},
{id:'05',title:['H₅ brackets, fields and matrix realization','H₅ 的括号、向量场与矩阵表示'],blocks:[
m('5.1',String.raw`[X_i,Y_j]=\delta_{ij}Z,\quad [X_i,X_j]=[Y_i,Y_j]=[X_i,Z]=[Y_i,Z]=0`),
table([['Code action','代码动作'],['Basis','基向量'],['Assumed partner','假设配对']],[
[['discovery','开示'],['X₁','X₁'],['deposition / Y₁','证言录取 / Y₁']],
[['deposition','证言录取'],['Y₁','Y₁'],['discovery / X₁','开示 / X₁']],
[['motion','动议'],['X₂','X₂'],['expert / Y₂','专家开示 / Y₂']],
[['expert','专家开示'],['Y₂','Y₂'],['motion / X₂','动议 / X₂']]]),
m('5.2',String.raw`X_i=\partial_{x_i}-\tfrac12 y_i\partial_z,\quad Y_i=\partial_{y_i}+\tfrac12 x_i\partial_z,\quad Z=\partial_z`),
p('These are left-invariant fields for (3.2) with J from (4.2). Direct differentiation gives [Xᵢ,Yⱼ]=δᵢⱼ∂z, while the other brackets vanish. This independently checks the sign and the factor ½. The lower central series is 𝔥₅ ⊃ ℝZ ⊃ 0.','这些是 (3.2)、(4.2) 所定义群的左不变向量场。直接求导得到 [Xᵢ,Yⱼ]=δᵢⱼ∂z，其余括号为零，可独立核查符号与 ½ 因子。下降中心列为 𝔥₅ ⊃ ℝZ ⊃ 0。','proof'),
m('5.3',String.raw`M(u,z)=\begin{pmatrix}1&x_1&x_2&z+\tfrac12(x_1y_1+x_2y_2)\\0&1&0&y_1\\0&0&1&y_2\\0&0&0&1\end{pmatrix}`),
p('Multiplying these 4×4 matrices adds x and y and contributes x·y′ to the top-right entry. Subtracting ½(x+x′)·(y+y′) to recover z gives z+z′+½(x·y′−y·x′). Hence M(g·h)=M(g)M(h), and M is injective. A 4×4 matrix representation has five free coordinates; matrix size does not determine group dimension.','矩阵相乘将 x、y 分别相加，并在右上角产生 x·y′。减去 ½(x+x′)·(y+y′) 以恢复 z，即得 z+z′+½(x·y′−y·x′)。因此 M(g·h)=M(g)M(h)，且 M 单射。此 4×4 矩阵表示具有五个自由坐标，矩阵大小并不决定群维数。','proof')
]},
{id:'06',title:['The free model and the five-dimensional quotient','自由模型与五维商'],blocks:[
m('6.1',String.raw`\mathfrak f_{4,2}=V\oplus\Lambda^2V,\quad [u,v]=u\wedge v,\quad \dim\mathfrak f_{4,2}=4+\binom42=10`),
p('In code order e₁=X₁,e₂=Y₁,e₃=X₂,e₄=Y₂, write the six central coordinates as A₁₂,A₁₃,A₁₄,A₂₃,A₂₄,A₃₄. Free composition adds ½u∧v. Define the linear functional ℓ by ℓ(e₁∧e₂)=ℓ(e₃∧e₄)=1 and zero on the other four basis wedges.','按代码顺序 e₁=X₁、e₂=Y₁、e₃=X₂、e₄=Y₂，将六个中心坐标记为 A₁₂、A₁₃、A₁₄、A₂₃、A₂₄、A₃₄。自由模型合成增加 ½u∧v。定义线性泛函 ℓ，使 ℓ(e₁∧e₂)=ℓ(e₃∧e₄)=1，其余四个基楔积映为零。'),
m('6.2',String.raw`q(u,A)=(u,\ell(A))=(u,A_{12}+A_{34}),\qquad \ell(u\wedge v)=\omega(u,v)`),
m('6.3',String.raw`\ker q=\operatorname{span}\{A_{13},A_{14},A_{23},A_{24},A_{12}-A_{34}\},\qquad \dim\ker q=5`),
p('q is a surjective Lie algebra homomorphism because q([u,v])=(0,ω(u,v)); its kernel is central, hence an ideal. Applying the group laws also gives q(g·h)=q(g)·q(h). Therefore the quotient has dimension 10−5=5. Four interactions are removed and the two retained interactions are identified at equal scale.','q 是满射 Lie 代数同态，因为 q([u,v])=(0,ω(u,v))；核位于中心，因此是理想。代入群律还可验证 q(g·h)=q(g)·q(h)。故商的维数为 10−5=5。四类交互被移除，另两类按相同尺度识别。','proof'),
p('The quotient loses information in a concrete way. The words (e₁,e₂,e₄,e₃) and (e₂,e₁,e₃,e₄) both have u=(1,1,1,1), z=0, while A₁₂ and A₃₄ have opposite signs. Their H₅ outputs therefore coincide despite different full signatures. Signed areas can cancel; |z| measures the retained net area rather than total accumulated interaction.','商映射的信息损失有具体实例：(e₁,e₂,e₄,e₃) 与 (e₂,e₁,e₃,e₄) 都有 u=(1,1,1,1)、z=0，但 A₁₂ 和 A₃₄ 的符号分别相反。因此，完整签名不同的两条路径具有相同 H₅ 输出。有向面积可抵消，|z| 衡量保留的净面积，而非累计交互总量。'),
p('The code also retains the free model as a mathematical comparison and records all six areas for audit. Its existing output rules use only A₁₂, so it has not been fitted as a six-interaction alternative. A meaningful model comparison would fit comparable output rules for both representations.','代码保留自由模型用于数学比较，也记录六个面积供核查。其现有输出规则只使用 A₁₂，尚未拟合六类交互。要有意义地比较模型，应为两种表示拟合可比的输出规则。')
]},
{id:'07',title:['Path accumulation, signed area and commutators','路径累积、有向面积与交换子'],blocks:[
m('7.1',String.raw`u_N=\sum_{t=1}^N a_t,\qquad z_N=\tfrac12\sum_{1\le s<t\le N}\omega(a_s,a_t)`),
p('Proof by induction: adding aₜ contributes ½ω(uₜ₋₁,aₜ)=½Σₛ<ₜω(aₛ,aₜ), giving (7.1). If direct central increments bₜ are allowed, Σbₜ must be added. Current code sets all bₜ=0. Along the piecewise linear horizontal path U starting at zero, the same center is its symplectic area integral.','归纳证明：加入 aₜ 时增加 ½ω(uₜ₋₁,aₜ)=½Σₛ<ₜω(aₛ,aₜ)，于是得到 (7.1)。若允许直接中心增量 bₜ，则须另加 Σbₜ；当前代码将全部 bₜ 设为零。对从零出发的分段线性水平路径 U，同一中心项可写为辛面积积分。','proof'),
m('7.2',String.raw`z_N=\tfrac12\int\omega(U,dU)=\tfrac12\sum_{i=1}^2\int(x_i\,dy_i-y_i\,dx_i)`),
m('7.3',String.raw`[g,h]_{\rm grp}:=ghg^{-1}h^{-1}=(0,\omega(u,v)),\qquad g=(u,z),\ h=(v,w)`),
m('7.4',String.raw`\exp(aX_i)\exp(bY_i)\exp(-aX_i)\exp(-bY_i)=\exp(abZ)`),
p('For unit discovery then deposition, u=(1,1,0,0),z=½; reversing them gives z=−½. The commutator loop has zero horizontal endpoint and z=1. Equations (7.3)–(7.4) follow by four applications of (3.2), with no asymptotic remainder. Reversing the commutator convention reverses the sign.','单位开示后接证言录取得到 u=(1,1,0,0)、z=½；逆序得到 z=−½。交换子回路的水平终点为零、z=1。(7.3)–(7.4) 由四次使用 (3.2) 精确得到，无渐近余项。交换子约定逆转时符号也逆转。','proof'),
p('Algebraic inverses represent signed increments; real disclosures and depositions remain in the case history. In the current nonnegative unit encoding, each action increases one coordinate, so u_N=0 implies N=0. To represent a nonempty horizontal loop or substantial work with little substantive progress, introduce a substantive-state encoding or a matched counterfactual.','代数逆元表示有符号增量，真实披露和证言录取仍留在案件历史中。当前非负单位编码中，每个动作增加一个坐标，因此 u_N=0 蕴含 N=0。若要表示非空水平回路，或大量工作但实质进展很少的情形，需要实质状态编码或匹配反事实。')
]},
{id:'08',title:['Geometry, substantive progress and burden','几何、实质进展与负担'],blocks:[
m('8.1',String.raw`G/[G,G]\cong(V,+),\qquad \pi(u,z)=u,\qquad D_{\rm sub}=\|s(S_N)-s(S_0)\|`),
p('Abelianization retains first-layer displacement. Its interpretation as substantive progress requires a specified map s from legal states to a measured vector space. Current u records action counts and supplies no such map. Information I, adjudicative quality 𝒜 and the central coordinate z are three separate quantities.','阿贝尔化保留第一层位移。若将其解释为实质进展，需给定法律状态到可测向量空间的映射 s。当前 u 记录动作计数，并未提供该映射。信息 I、裁判质量 𝒜 和中心坐标 z 是三个不同的量。'),
m('8.2',String.raw`L_h(U)=\int_0^T\|\dot U(t)\|\,dt,\quad \dot z=\tfrac12\omega(U,\dot U),\quad d_{CC}(g,h)=\inf_{\eta:g\to h\ \rm horizontal}L_h(\eta)`),
p('Use a declared horizontal norm, here Euclidean when discussing d_CC. Each encoded unit segment has length one, so the implemented word has L_h=N. The CC infimum permits signed horizontal controls, including controls absent from legal action menus. L_h−d_CC(g₀,g_N) is a geometric detour relative to the same endpoint; it does not impose legal admissibility or adjudicative-quality preservation.','讨论 d_CC 时须指定水平范数，这里取欧氏范数。每个编码单位线段长度为一，因此当前动作词有 L_h=N。CC 下确界允许有符号水平控制，包括法律动作菜单未提供的控制。L_h−d_CC(g₀,g_N) 衡量相同终点下的几何绕行，尚未加入程序合法性或裁判质量约束。'),
m('8.3',String.raw`\delta_r(u,z)=(ru,r^2z),\quad d_{CC}(0,\delta_r g)=r\,d_{CC}(0,g),\quad r>0`),
p('The dilation gives homogeneous dimension six and scales horizontal and central coordinates differently. Interpreting z in terms of cost or harm requires a measurement model that fixes dose units and accounts for area cancellation.','此伸缩给出齐次维数六，水平与中心坐标按不同次数缩放。若要将 z 解释为费用或伤害，需用测量模型固定剂量单位，并处理面积抵消。'),
m('8.4',String.raw`b_t=(\text{USD},\text{hours},\text{delay},\text{disclosure},\ldots)_t,\qquad L_B(\gamma)=\sum_t\langle w,b_t\rangle`),
p('A scalar burden requires nonnegative weights and declared unit normalization. If costs and hours are missing, a known subtotal is not complete L_B. Party-specific L_Bᴾ and L_Bᴰ support an asymmetry analysis; psychological harm requires a separately validated measurement. The scenario objective below uses USD alone and reports days separately.','标量负担需指定非负权重与单位归一化。费用或工时缺失时，已知小计不能代表完整 L_B。分别定义 L_Bᴾ、L_Bᴰ 可分析不对称负担，心理伤害则需要另行验证的测量。下文情景目标仅使用美元费用，天数单独报告。')
]},
{id:'09',title:['Record inputs and exact scenario functions','记录输入与精确情景函数'],blocks:[
p('stateAt uses only the chosen prefix of the selected case, sums its authored information increments and caps I₀ at 0.99. Selected public episodes are retrospective reconstructions from opinions, not complete litigation histories. Event dates and opinion publication dates are separate; a prefix restriction alone cannot establish historical availability to each party. Unreported costs and hours stay unknown.','stateAt 只使用所选案件的截止点前缀，汇总人工设定的信息增量，并将 I₀ 上限设为 0.99。公开案件选段是依据文书回溯重建的历史，并非完整诉讼记录。事件日期与文书发布日期分别记录，仅限制前缀不能证明信息当时已向各方开放。未披露费用与工时保留为未知。'),
table([['Action / basis','动作 / 基向量'],['Cost cₖ · USD','费用 cₖ · 美元'],['Days dₖ','天数 dₖ'],['Gain input gₖ','增益输入 gₖ'],['Plaintiff share sₖ','原告份额 sₖ']],[
[['Discovery / X₁','开示 / X₁'],['38,000','38,000'],['42','42'],['0.18','0.18'],['0.24','0.24']],
[['Deposition / Y₁','证言录取 / Y₁'],['27,000','27,000'],['30','30'],['0.11','0.11'],['0.38','0.38']],
[['Motion / X₂','动议 / X₂'],['19,000','19,000'],['24','24'],['0.09','0.09'],['0.50','0.50']],
[['Expert / Y₂','专家开示 / Y₂'],['61,000','61,000'],['55','55'],['0.24','0.24'],['0.50','0.50']]]),
m('9.1',String.raw`r=\max\left(0,\sum_{k=1}^4n_k\frac{g_k}{0.36}+0.16z\right),\qquad I=1-(1-I_0)e^{-r}`),
m('9.2',String.raw`B=\operatorname{round}\!\left(\max(0,\sum_kn_kc_k-8500z)\right),\quad T=\operatorname{round}\!\left(\max(0,\sum_kn_kd_k-6z)\right)`),
m('9.3',String.raw`s_P=\frac{\sum_kn_kc_ks_k}{\sum_kn_kc_k},\quad B_P=\operatorname{round}(Bs_P),\quad B_D=B-B_P`),
m('9.4',String.raw`B_{\rm low}=\operatorname{round}(0.65B),\qquad B_{\rm high}=\operatorname{round}(1.60B)`),
p('For an empty path, set B=T=B_P=B_D=0 and I=I₀. For the free alternative replace 0.16z,−8500z,−6z with 0.16A₁₂,−8500A₁₂,−6A₁₂. Each coefficient, the divisor 0.36, pair mapping and range multiplier is an authored parameter. The range has no stated probability coverage. Neither BCH nor Heisenberg geometry determines these outcome functions.','空路径规定 B=T=B_P=B_D=0、I=I₀。自由替代模型将 0.16z、−8500z、−6z 分别替换为 0.16A₁₂、−8500A₁₂、−6A₁₂。全部系数、除数 0.36、配对及区间倍数均为预设参数，区间未给定概率覆盖率。这些输出函数不由 BCH 或 Heisenberg 几何推出。','assumption')
]},
{id:'10',title:['Worked calculation and marginal effects','计算实例与边际效应'],blocks:[
m('10.1',String.raw`\begin{aligned}I_0&=0.38,\quad \gamma_A=(X_1,Y_1),\quad \gamma_B=(Y_1,X_1),\\u_A&=u_B=(1,1,0,0),\quad z_A=\tfrac12,\quad z_B=-\tfrac12,\\r_A&=\tfrac{0.29}{0.36}+0.08=0.885555\ldots,\\r_B&=\tfrac{0.29}{0.36}-0.08=0.725555\ldots.\end{aligned}`),
table([['Output','输出'],['Path A','路径 A'],['Path B','路径 B']],[
[['Final I','最终 I'],['0.7442593302','0.7442593302'],['0.6998855438','0.6998855438']],
[['USD B','费用 B'],['60,750','60,750'],['69,250','69,250']],
[['Days T','天数 T'],['69','69'],['75','75']],
[['Plaintiff / defense','原告 / 被告'],['18,113 / 42,637','18,113 / 42,637'],['20,647 / 48,603','20,647 / 48,603']],
[['Scenario range','情景区间'],['39,488–97,200','39,488–97,200'],['45,013–110,800','45,013–110,800']]]),
p('Both paths use the same action doses. Their central difference is one, giving B_A−B_B=−8,500 and T_A−T_B=−6, unchanged by rounding here. The information difference is about 4.44 percentage points. This example can be reproduced directly from (9.1)–(9.4).','两条路径使用相同动作剂量，中心差为一，故 B_A−B_B=−8,500、T_A−T_B=−6；本例取整后差值不变。信息差约为 4.44 个百分点。可直接用 (9.1)–(9.4) 复现此例。'),
m('10.2',String.raw`\Delta\widetilde r_k=\frac{g_k}{0.36}+0.08\,\omega(u,e_k),\qquad \Delta I=(1-I_0)(e^{-r_{\rm before}}-e^{-r_{\rm after}})`),
p('Let r̃ denote intensity before clipping at zero. The derivative ∂I/∂r=(1−I₀)e⁻ʳ decreases as r grows, giving saturation in r. Appending an action can still reduce I when Δr̃ₖ<0. For example, four expert actions followed by a motion give Δr̃=0.09/0.36−0.08×4=−0.07. This example distinguishes saturation in intensity from monotonicity in action count; the automatic search uses the finite set in section 11.','令 r̃ 表示截断为非负之前的强度。导数 ∂I/∂r=(1−I₀)e⁻ʳ 随 r 增大而减小，得到对 r 的饱和性。若 Δr̃ₖ<0，追加动作仍可使 I 下降。例如四次专家开示后接一个动议，有 Δr̃=0.09/0.36−0.08×4=−0.07。此例区分强度上的饱和性与动作数上的单调性；自动搜索采用第 11 节的有限集合。'),
m('10.3',String.raw`\Delta\widetilde B_k=c_k-4250\,\omega(u,e_k),\qquad \Delta\widetilde T_k=d_k-3\,\omega(u,e_k)`),
p('Tildes denote unrounded, unclipped values. For sufficiently long repeated paths, the area term can make marginal cost negative. Equating projected B with the nonnegative burden sum in (8.4) therefore requires path constraints or a revised evaluator. Nonlinear differences in I, B or T describe the output functions; higher Lie brackets belong to the underlying algebra.','波浪号表示未经取整或截断的值。重复路径足够长时，面积项可使边际费用为负。若要将推演 B 等同于 (8.4) 的非负负担累加，需限制路径或修改评分函数。I、B、T 的非线性差分描述输出函数，高阶 Lie 括号则属于底层代数。')
]},
{id:'11',title:['Quality-constrained burden and finite optimization','质量约束负担与有限优化'],blocks:[
m('11.1',String.raw`\Gamma_\varepsilon=\{\gamma\in\Gamma_{\rm adm}:\mathcal A(\gamma)\ge\mathcal A(\gamma^R)-\varepsilon\},\quad B^*_\varepsilon=\inf_{\gamma\in\Gamma_\varepsilon}L_B(\gamma)`),
m('11.2',String.raw`B_{\rm avoidable}=L_B(\gamma^R)-B^*_\varepsilon`),
p('Γ_adm must specify legal admissibility, initial information, available resources and termination criteria. Fix the quality rubric and ε before comparing paths. Assume γᴿ∈Γ_adm, ε≥0, finite observed burden and L_B≥0. Then γᴿ∈Γε, so 0≤B_avoidable≤L_B(γᴿ). The infimum need not be attained without compactness or another existence condition.','Γ_adm 须指定程序合法性、初始信息、可用资源及终止条件。比较前须固定质量量表与 ε。假设 γᴿ∈Γ_adm、ε≥0、观测负担有限且 L_B≥0，则 γᴿ∈Γε，因此 0≤B_avoidable≤L_B(γᴿ)。若缺少紧性或其他存在性条件，下确界未必能达到。','proposition'),
p('Current C is the empty continuation plus all ordered selections of one to three distinct actions: |C|=1+4+4·3+4·3·2=41. The baseline is deposition→discovery→motion, a future scenario, not γᴿ. The evaluator uses the information proxy I rather than 𝒜.','当前 C 包含空续行路径及一至三个不重复动作的所有有序选择，|C|=1+4+4·3+4·3·2=41。基准为“证言录取→开示→动议”，它是未来情景，并非 γᴿ。评分函数使用信息代理 I，而非 𝒜。'),
m('11.3',String.raw`C_\varepsilon=\{\gamma\in C:I(\gamma)\ge I(\gamma_b)-\varepsilon-10^{-9}\},\quad \widehat\gamma=\arg\min_{\gamma\in C_\varepsilon}B(\gamma)`),
m('11.4',String.raw`\widehat B_{\rm gap}=\max(0,B(\gamma_b)-B(\widehat\gamma))`),
p('The baseline belongs to Cε for nonnegative ε, so this finite feasible set is nonempty and a minimum exists. comparable searches all feasible candidates, retaining the first candidate if costs tie. The frontier is separate: η dominates γ if Bη≤Bγ and Iη≥Iγ with at least one strict inequality. Days and party allocation are not optimization constraints. The frontier uses C. Path comparison starts with all four actions in two different orders and permits reordering and deletion; these editable paths can lie outside C. Swap paths reverses A and B. The underlying formulas also admit longer words and repeats.','ε 非负时基准属于 Cε，因此有限可行集非空且存在最小值。comparable 搜索全部可行候选，费用相同时保留先出现者。前沿另行计算：若 Bη≤Bγ、Iη≥Iγ 且至少一项严格更优，则 η 支配 γ。天数与双方分配不参与优化约束。前沿搜索使用 C。路径比较默认包含全部四个动作，两边顺序不同，可调整顺序或删除步骤；这些可编辑路径可能位于 C 之外。交换路径可反转 A、B。底层公式也允许更长动作词与重复动作。'),
p('A finite subset of Γε, evaluated with the same observed baseline, quality and burden measures, has a minimum at least B*ε and a saving gap at most B_avoidable. Applying this bound to litigation requires those shared measures and admissibility conditions; the current search instead compares scenario continuations using I and B.','对 Γε 的有限子集，若采用相同观测基准、质量与负担测量，其最小值不小于 B*ε，节省差不大于 B_avoidable。将此界用于诉讼，需要满足这些共同测量与合法性条件；当前搜索用 I 和 B 比较续行情景。')
]},
{id:'12',title:['Scaling, identifiability and sufficient statistics','尺度、可识别性与充分统计量'],blocks:[
m('12.1',String.raw`u'=Cu,\quad z'=\lambda z,\quad \Omega'=\lambda C^{-T}\Omega C^{-1},\quad C\in GL(4),\ \lambda\ne0`),
p('Here Ω represents ω. This coordinate change preserves the abstract bracket when Ω is transformed as shown. An output coefficient θ multiplying z must become θ/λ. Thus the magnitude and sign of z, and its outcome coefficients, are not separately meaningful without an orientation and scale convention. The current unit doses, standard J and fixed coefficient values fix a convention; they do not identify it empirically.','这里 Ω 表示 ω。按公式变换 Ω 时，此坐标变换保持抽象括号结构。输出中乘以 z 的系数 θ 须改为 θ/λ。因此，若未固定方向与尺度，z 的大小、符号及其输出系数不能分别解释。当前单位剂量、标准 J 和固定系数确定了一种约定，尚未实证识别。'),
m('12.2',String.raw`\operatorname{Pf}(\Omega)=\Omega_{12}\Omega_{34}-\Omega_{13}\Omega_{24}+\Omega_{14}\Omega_{23},\quad \det\Omega=\operatorname{Pf}(\Omega)^2`),
p('For a 4×4 alternating matrix, nonzero Pfaffian is the rank-4 criterion. A fitted scalar alternating form can be rank 0,2 or 4. Claiming H₅ requires rank 4 with a defensible uncertainty assessment. Several observed outcome dimensions are needed to test a common one-dimensional interaction layer; a single scalar outcome cannot establish its dimension.','对 4×4 反对称矩阵，Pfaffian 非零即为秩 4 条件。拟合的标量反对称形式可有秩 0、2 或 4。主张 H₅ 需要可辩护的不确定性评估支持秩 4。检验共同的一维交互层需要多个观测结果维度，仅一个标量结果不能确定层的维数。'),
p('Under an additional linear-observation assumption for isolated bracket effects, arrange independently measured pairwise effects as a K×6 matrix M. A shared scalar center implies rank M≤1. This is a necessary condition for that observation model, not a general theorem for nonlinear outputs. Noise, confounding, scaling and state dependence must be modeled. The fixed zero and equal-pair restrictions of J are stronger than the rank-one hypothesis.','若另假设孤立括号效应被线性观测，可将独立测得的成对效应排列为 K×6 矩阵 M。共同标量中心蕴含 rank M≤1。这是该观测模型的必要条件，不是对非线性输出的一般定理。噪声、混杂、尺度与状态依赖都须建模。J 中固定为零及两配对相等的限制，比秩一假设更强。'),
p('I(γ), B(γ) and T(γ) currently depend only on I₀, action counts and the retained center. Different histories with equal features are forced to share predictions. Validate that compression on held-out histories and compare it with full pair areas and explicit state variables before treating these features as sufficient.','当前 I(γ)、B(γ)、T(γ) 只依赖 I₀、动作计数与保留的中心项。不同历史若特征相同，会被强制赋予相同预测。须在留出历史上验证压缩，并与完整成对面积及显式状态变量比较，才能将这些特征视为充分。')
]},
{id:'13',title:['From observed order effects to a Lie bracket','从观测顺序效应到 Lie 括号'],blocks:[
p('A finite order effect does not by itself identify a Lie algebra. A local bracket interpretation requires a smooth state manifold, sufficiently regular vector fields Vᵢ representing small-dose action flows, a chart or other common comparison space, and comparable initial states. For C³ fields and sufficiently small a,b, use the following convention.','有限顺序效应本身不能识别 Lie 代数。局部括号解释需要光滑状态流形、表示小剂量动作流的充分正则向量场 Vᵢ、坐标图或共同比较空间，以及可比的初始状态。对 C³ 向量场及充分小的 a、b，采用如下约定。'),
m('13.1',String.raw`[V_i,V_j]=DV_j\,V_i-DV_i\,V_j`),
m('13.2',String.raw`\begin{aligned}\Phi_j^b(\Phi_i^a(s))-\Phi_i^a(\Phi_j^b(s))&=ab[V_i,V_j](s)\\&\quad+O(|a|^2|b|+|a||b|^2).\end{aligned}`),
p('The subtraction is taken in the chosen local chart; the leading bracket is coordinate-invariant as a tangent vector. Arbitrary discrete discovery or deposition operations need not admit such flows or small-dose limits. Signed inverse flows used in a mathematical commutator may be inadmissible in law. A measured finite contrast should then be called an order effect, with a separately tested approximation to a bracket.','相减在选定局部坐标图中进行，首阶括号作为切向量具有坐标不变性。任意离散开示或证言录取操作未必允许这种流或小剂量极限。数学交换子所用的有符号逆流在法律上也可能不允许。此时应将测得的有限差异称为顺序效应，并另行检验其括号近似。'),
p('In a general step-2 candidate, fit β:Λ²V→W and test centrality, stability across states and held-out prediction. Persistent effects corresponding to [Vᵢ,Zα]≠0 contradict an exactly central second layer in the same state model. They can motivate a higher-step algebra, a nonnilpotent model or explicit state dependence. Burden-dependent behavior alone does not identify which alternative is correct.','对一般二阶候选，拟合 β:Λ²V→W，检验中心性、跨状态稳定性及留出预测。在同一状态模型中，持续存在对应 [Vᵢ,Zα]≠0 的效应，会否定第二层严格中心性；可考虑高阶代数、非幂零模型或显式状态依赖。仅观察到负担影响行为，尚不能确定哪种替代结构正确。')
]},
{id:'14',title:['Empirical protocol and falsifiable claims','实证流程与可证伪主张'],blocks:[
p('First define the quality rubric, substantive-state measurement and burden units. Quality may include issue coverage, evidentiary adequacy, outcome fidelity and procedural guarantees; preserving a verdict alone does not establish preserved adjudicative quality. If these are separate dimensions, use componentwise tolerances rather than an unexplained scalar. ΔV, information gain ΔI and jury-belief change ΔJ must remain separately scored.','先定义质量量表、实质状态测量及负担单位。质量可包含争议覆盖、证据充分性、结果一致性与程序保障，仅保留相同裁判结果不能证明裁判质量得以保留。若这些是独立维度，应使用逐项容差，而非未经解释的标量。ΔV、信息增益 ΔI 与陪审团信念变化 ΔJ 须分别评分。'),
p('Reconstruct completed observed histories from pleadings, discovery, transcripts, production, motions, orders, admitted evidence and outcomes. Record source dates, role-specific availability and unknown values. Independent evaluators score increments and final quality, with agreement and uncertainty reported. Split by case, not by nearby events from the same case, to limit leakage.','用诉状、开示、笔录、材料提交、动议、裁定、获准证据与结果重建已完成历史。记录来源日期、各角色可获时间与未知值。由独立评估者评分增量及最终质量，并报告一致性与不确定性。按案件划分训练与留出集，避免同一案件相邻事件造成泄漏。'),
p('For counterfactual simulation reset the initial information state. Separate plaintiff and defense agents, procedural judge, admitted-evidence jury ensemble and evaluators. At each step expose only information available to that role at that time. Compare unrestricted adversarial optimization with a prespecified cost for low-value procedure; repeat across seeds and model families. Agent generation and quality scoring must remain independent.','反事实模拟从重置的初始信息状态开始。分别设置原告、被告智能体、程序法官、只接收获准证据的陪审团组及评估者。每步只提供该角色当时可获的信息。比较不受低价值程序成本约束的对抗优化与预设成本条件，并跨随机种子与模型系列重复。路径生成与质量评分须独立。'),
p('Compare additive, H₅, full step-2 and appropriate higher-order/state-dependent candidates using the same input information, parameter-fitting rules and held-out quality/burden outcomes. Measure whether discarded interactions improve prediction and whether a one-center rank-4 representation is stable. A scenario gap is not causally identified by running two agents; causal interpretation requires assumptions about interventions, comparability, omitted state and simulation validity.','用相同输入信息、参数拟合规则与留出质量／负担结果，比较加法、H₅、完整二阶及合适的高阶或状态依赖候选。检验被舍弃交互是否改善预测，以及单中心秩四表示是否稳定。仅运行两组智能体不能因果识别情景差；因果解释需要干预、可比性、遗漏状态与模拟有效性的假设。'),
p('The representation is challenged by unstable pairings, multiple necessary interaction dimensions, failed centrality, substantial higher-order residuals, or different outcomes for histories with identical encoded features. Evaluate descriptive fit, causal interpretation and quality preservation against their respective criteria.','配对不稳定、需要多个交互维度、中心性失败、高阶残差显著，或编码相同的历史结果不同，均可挑战该表示。描述性拟合、因果解释与质量保持应分别按各自标准评估。')
]},
{id:'15',title:['Code audit and questions for mathematical review','代码核查与数学审阅问题'],blocks:[
table([['Function','函数'],['Equation / role','公式 / 作用']],[
[['symplectic','symplectic'],['(4.2): fixed J and coordinate order','(4.2)：固定 J 与坐标顺序']],
[['composeHeisenberg','composeHeisenberg'],['(3.2): exact H₅ multiplication','(3.2)：精确 H₅ 乘法']],
[['heisenbergSignature','heisenbergSignature'],['(7.1): chronological fold','(7.1)：按时间顺序累积']],
[['heisenbergCommutator','heisenbergCommutator'],['(7.3): signed group loop','(7.3)：有符号群回路']],
[['pathSignature / compose','pathSignature / compose'],['(6.1): counts and six pairwise areas','(6.1)：计数与六个成对面积']],
[['quotientToHeisenberg','quotientToHeisenberg'],['(6.2): central quotient','(6.2)：中心商映射']],
[['project','project'],['(9.1)–(9.4): authored scenario outputs','(9.1)–(9.4)：预设情景输出']],
[['enumerate / frontier / comparable','enumerate / frontier / comparable'],['(11.3)–(11.4): finite search and dominance','(11.3)–(11.4)：有限搜索与支配关系']],
[['stateAt / runModel','stateAt / runModel'],['Prefix inputs and selected-engine execution','前缀输入与所选引擎执行']]]),
p("1. What mathematical conditions are needed to represent discrete, irreversible procedural actions in a Lie group? Is a fixed action encoding enough to connect the group product to actual state transitions?","1. 将离散、不可逆的程序动作表示在 Lie 群中，需要哪些数学条件？固定动作编码是否足以把群乘法与实际状态转移连接起来？",'review'),
p("2. Is the quotient from the ten-dimensional free step-2 model to H₅ appropriate here? How can we assess whether a shared center and the chosen pairings discard too much order information?","2. 从十维自由二阶模型取商得到 H₅，在这里是否合适？怎样判断共享中心和所选配对是否舍弃了过多顺序信息？",'review'),
p("3. Which state-level relations would test step-2 nilpotency? How can nonzero third-order brackets be distinguished from higher-order effects caused by nonlinear output functions?","3. 应检验哪些状态层面的关系，才能判断二阶幂零性？如何区分非零三阶括号与非线性输出函数造成的高阶效应？",'review'),
p("4. With irreversible actions and legally constrained paths, how should minimum burden be defined while preserving adjudicative quality? Under what assumptions could Carnot–Carathéodory distance provide a useful bound?","4. 动作不可逆、路径受法律约束时，怎样定义保留裁判质量的最小负担？在什么假设下，Carnot–Carathéodory 距离能提供有用的界限？",'review')
]}
];
