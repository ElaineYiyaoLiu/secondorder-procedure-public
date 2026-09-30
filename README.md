# SecondOrder Procedure

This is a bilingual research prototype for exploring U.S. federal civil discovery. It compares how the order of procedural steps changes information, cost, and duration.

The current application version is **v0.1**. Its navy wordmark, serif explanations, light workspace, and language controls follow the SecondOrder brand used by Markets and Scenario.

## Run

Requires Node 22.13 or later.

```sh
npm ci
npm run dev
npm test
npm run typecheck
npm run build
```

The build exports a static site to `out/`. In containers that restrict process memory statistics, run `NODE_OPTIONS=--require=./build-memory-shim.cjs npm run build -- --webpack`. Normal hosts do not need the shim.

## Explore

- **Live:** information and burden at the selected date, possible next steps, and a configurable continuation horizon.
- **Path:** the event record, sources, information increments, and costs for each party.
- **Compare:** editable sequences and the effect of changing their order.
- **Frontier:** 41 candidate sequences, an information tolerance, and comparison with a baseline.
- **Method:** definitions, coefficients, assumptions, and research milestones.

The review demo compares a frozen forecast with a separate completed synthetic record. It does not change the active case.

Import a local JSON record of up to 1 MB and 200 chronological events. Export a template or a snapshot containing only events through the selected cutoff. Imports stay in browser memory and are lost on refresh. There is no backend, LLM, legal database, or API key. The interface supports English and Chinese; imported records retain their source language.

## Model limits

The Anderson v. Meridian case and all its values are fictional. Projections use fixed demonstration rules in `lib/model.ts`, not a trained or calibrated model. Next-state percentages are preset weights; cost ranges are scenario ranges, not statistical intervals. Information is a proxy for record development, not adjudicative quality. The least-cost path is a minimum within the enumerated candidates. This prototype does not provide legal recommendations.

The model adjusts marginal gain for remaining information, applies discovery/deposition ordering factors, and reduces gains for repeated actions. Method shows these rules. The original research blueprint still needs to be checked before research use.

## Versions and publishing

Formal development uses numbered branches in the private source repository. The latest approved release is mirrored to the public repository's sole `main` branch, which is the source for Vercel production:

`secondorder-procedure-private / v0.X → secondorder-procedure-public / main → Vercel Production`

Before publishing, run the tests, type check, and build; check the displayed version; and review tracked files for secrets and internal configuration. Verify the deployed English and Chinese interface after publishing. Repository naming and deployment setup are tracked separately from the application version.

## Research next steps

1. Define information and quality rubrics that independent reviewers can annotate from cited sources.
2. Extract events from documents with human confirmation.
3. Train and calibrate transition, cost, and duration models using temporal splits of completed cases.
4. Evaluate frozen forecasts and examine counterfactual assumptions separately.
5. Compare action-count, pairwise-order, and higher-order models with independent evaluation and repeated runs.

## 中文

这是一个面向美国联邦民事证据开示的双语研究原型，用来比较程序步骤的顺序如何影响信息、费用和时长。

当前应用版本为 **v0.1**。可以查看案件记录、编辑并比较路径，或在设定的信息容差内寻找费用较低的候选方案。导入的 JSON 只在浏览器内处理，刷新后不保留；可以导出模板或截至所选日期的时间切片。

演示案件与数值均为虚构，推演使用固定规则，尚未经过训练或校准。信息指标不代表裁判质量，最低费用仅限于枚举路径。本原型不提供法律行动建议。具体规则与研究计划见 Method 页面。
