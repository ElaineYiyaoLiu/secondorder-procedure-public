This is SecondOrder Procedure, a bilingual workspace for replaying civil discovery records and comparing the order of procedural actions.

Current release: **v0.5**.

Choose a public case and cutoff, edit paths A and B, select the model below the editors, then click **Run model**. The engine calculates two candidate sequences, their information/cost/duration differences, and a frontier from 41 paths. Changing the case, cutoff, sequence, model or tolerance marks the previous run stale. Snapshot exports include only events through the selected cutoff and the current run.

## Public cases

- Zubulake v. UBS Warburg: email requests, retrieval agreement, retention-policy deposition and the five-tape sampling order. Source: [217 F.R.D. 309 (May 13, 2003)](https://openjurist.org/217/frd/309/zubulake-v-ubs-warburg-llc-8753319).
- Oxbow Carbon v. Union Pacific: sampling, a joint report, a second hearing and the production ruling. Source: [ECF 127 (September 11, 2017)](https://law.justia.com/cases/federal/district-courts/district-of-columbia/dcdce/1:2011cv01049/148519/127/).
- Victor Stanley v. Creative Pipe: early discovery, production orders, evidentiary hearing and sanctions/recommendation. Source: [269 F.R.D. 497 (September 9, 2010)](https://openjurist.org/269/frd/497/victor-stanley-inc-v-creative-pipe-inc-8776470).

These are selected historical episodes, reconstructed retrospectively from opinions. Each event links to its source, identifies the document publication date, and carries an authored information increment. They are not full dockets, contemporaneous forecasts, or training cases. The Oxbow sample cost of $57,197.95 is a reported partial expense; missing costs and hours remain null. Public-case charts use elapsed days rather than implying a complete cost history. The fictional Anderson v. Meridian fixture remains available separately.

## Model

The default engine is `heisenberg-h5-nilpotent-v0.5`, an executable five-dimensional Heisenberg group. Four horizontal action directions share a single central term. The group is step-2 nilpotent: pairwise brackets are central and triple brackets vanish.

The selector also retains the earlier generic free step-2 model with six central coordinates. It changes the actual calculation. Method explains the action mapping, symplectic form, H₅ quotient, exact coefficients, worked examples, finite burden constraint and research components still unimplemented. See [MODEL.md](MODEL.md) for the technical specification.

Action pairings, information scores, continuation costs and order coefficients are assumptions. No parameters are fitted to the three cases. The displayed burden gap preserves a proxy score within a finite candidate set; it is not measured avoidable litigation waste or a calibrated legal prediction. There are no AI lawyers, judge or jury.

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

`secondorder-procedure-private / v0.5 → secondorder-procedure-public / main → Vercel Production`

Earlier branches are retained. Public has only main. The existing Procedure domain and the embedding at secondorder.tools/procedure serve this public project.

## 中文

这是 SecondOrder Procedure，一个用公开民事诉讼记录展示程序顺序效应的中英文工作台。选择案件和截止点，设置两条路径，在下方选择模型并点击“运行模型”，可以查看两条程序路径的差异及 41 条候选路径的前沿。

三个真实案件的事实与日期都有来源。事件是根据判决回溯整理的选段，并非完整案卷或历史时点预测。信息评分及续行费用、时长和顺序系数属于演示假设，未披露的历史费用与工时显示为未知。默认模型为二阶 nilpotent Heisenberg H₅：四个动作方向共享一个中心项。也可切换到此前的一般二阶模型。Method 详细解释公式怎样落实到代码，并区分信息代理评分与裁判质量。模型尚未经过真实案件训练或校准。

Start by selecting a case and cutoff, then edit paths A and B. The Run model button sits below both path editors. Results appear after running; changing inputs clears them until the next run.

