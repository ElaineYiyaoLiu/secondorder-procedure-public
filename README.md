This is SecondOrder Procedure, a bilingual workspace for replaying civil discovery records and comparing the order of procedural actions.

Current release: **v0.2**.

Choose a public case, choose a cutoff, and click **Run model**. The engine calculates two candidate sequences, their information/cost/duration differences, and a frontier from 41 paths. Changing the case, cutoff, sequence or tolerance marks the previous run stale. Snapshot exports include only events through the selected cutoff and the current run.

## Public cases

- Zubulake v. UBS Warburg: email requests, retrieval agreement, retention-policy deposition and the five-tape sampling order. Source: [217 F.R.D. 309 (May 13, 2003)](https://openjurist.org/217/frd/309/zubulake-v-ubs-warburg-llc-8753319).
- Oxbow Carbon v. Union Pacific: sampling, a joint report, a second hearing and the production ruling. Source: [ECF 127 (September 11, 2017)](https://law.justia.com/cases/federal/district-courts/district-of-columbia/dcdce/1:2011cv01049/148519/127/).
- Victor Stanley v. Creative Pipe: early discovery, production orders, evidentiary hearing and sanctions/recommendation. Source: [269 F.R.D. 497 (September 9, 2010)](https://openjurist.org/269/frd/497/victor-stanley-inc-v-creative-pipe-inc-8776470).

These are selected historical episodes, reconstructed retrospectively from opinions. Each event links to its source, identifies the document publication date, and carries an authored information increment. They are not full dockets, contemporaneous forecasts, or training cases. The Oxbow sample cost of $57,197.95 is a reported partial expense; missing costs and hours remain null. Public-case charts use elapsed days rather than implying a complete cost history. The fictional Anderson v. Meridian fixture remains available separately.

## Model

`nilpotent-step2-v0.2` uses four action counts and six signed pairwise areas. Composition follows `(x,z) · (y,w) = (x+y, z+w+½ x∧y)`. Pairwise commutators are central and triple brackets vanish. The engine evaluates the resulting coordinates with explicit scenario coefficients and a saturating information link. It is an executable mathematical scenario model, not a trained predictor or an established causal description of litigation.

All continuation costs, durations, and order coefficients are authored assumptions. There are no learned transition probabilities or calibrated forecast intervals. See [MODEL.md](MODEL.md) for coefficients and limitations. This workspace does not provide legal recommendations.

## Run

Node 22.13 or later:

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

Next.js exports a static site to `out/`. JSON imports stay in browser memory; there is no backend, API key, LLM or automated document extraction. Imports support 1–200 chronological events, with null for unreported costs and hours. The legacy numeric template remains compatible.

## Publishing

`secondorder-procedure-private / v0.2 → secondorder-procedure-public / main → Vercel Production`

Earlier branches are retained. Public has only main. The existing Procedure domain and the embedding at secondorder.tools/procedure serve this public project.

## 中文

这是 SecondOrder Procedure，一个用公开民事诉讼记录展示程序顺序效应的中英文工作台。选择案件和截止点，点击“运行模型”，可以查看两条程序路径的差异及 41 条候选路径的前沿。

三个真实案件的事实与日期都有来源。事件是根据判决回溯整理的选段，并非完整案卷或历史时点预测。信息评分及续行费用、时长和顺序系数属于演示假设，未披露的历史费用与工时显示为未知。模型现在可以实际计算二阶幂零路径表示，但尚未经过真实案件训练或校准。
