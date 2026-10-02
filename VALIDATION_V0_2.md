# Procedure v0.2 validation

## Source checks

Reviewed the public court opinions for Zubulake (217 F.R.D. 309, May 13, 2003), Oxbow (ECF 127, September 11, 2017), and Victor Stanley (269 F.R.D. 497, September 9, 2010). Event dates, original-document references and opinion publication dates are retained. Oxbow's reported $57,197.95 sample expense is a partial plaintiff expense, not a complete litigation budget. Victor Stanley's default-liability recommendation is distinguished from a final merits judgment. Public histories are retrospective reconstructions; earlier source availability is not claimed.

## Implementation checks

- Ten model/import tests pass. They cover group identity/inverse, exact pairwise areas, associativity, central commutators with vanishing triple bracket, bounded outputs, nonnegative costs/days, cost allocation rounding, 41 candidates and nondominated frontier, feasibility, every cutoff of all three cases, prefix invariance, null metrics and preservation of source metadata.
- React DOM integration passes for all three cases: selecting a case, Run model, calculated result, evidence link, Compare, Frontier, changing cutoff, stale-result invalidation, one-event prefix, Chinese labels and unknown metric displays. This uses jsdom and the actual React components; it is not a visual browser test.
- TypeScript check and Next.js production static build pass.
- Credential-pattern scan finds no credentials or tracked .env files. The private .openai/hosting.json remains private and is excluded from the public mirror, following the existing release structure.
- Main-site public source embeds secondorder-procedure-public.vercel.app at /procedure. The existing Vercel production aliases include procedure.secondorder.tools.

## Browser limitation

The in-app browser refused to open secondorder.tools because the admin-enforced policy check was unavailable. No bypass was used. Live visual and click verification remains unconfirmed. Vercel deployment readiness and commit identity are checked separately after publication.
