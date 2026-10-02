# Procedure v0.2 model

The free step-2 path representation has four first-level coordinates in the order discovery, deposition, motion, expert, and six central coordinates in lexicographic pair order: discovery/deposition, discovery/motion, discovery/expert, deposition/motion, deposition/expert, motion/expert. Each action adds a unit basis vector; BCH composition adds half the antisymmetric cross product to the central coordinates. Counts alone are unchanged by reordering; signed areas retain order. Central directions commute with every direction, so triple brackets vanish.

Scenario evaluation uses base action costs [38000,27000,19000,61000], days [42,30,24,55], and intensity rates [.18,.11,.09,.24]/.36. Only the discovery/deposition area has a nonzero order coefficient: +.16 intensity, −8500 dollars, −6 days per signed-area unit. Other pair coefficients are zero. These are deliberately sparse authored assumptions; the cases do not estimate them.

Intensity r is the nonnegative linear-count contribution plus the area contribution. Final information is I + (1−I)(1−exp(−r)). Cost and days are their linear-count contributions plus area terms, clipped to nonnegative values. Plaintiff's assumed cost share is the base-cost-weighted mix of [.24,.38,.5,.5]; defense receives the exact remainder after rounding. Cost envelopes are [0.65,1.60] times the point scenario, without probability coverage.

Discovery → deposition has area +.5 and the reverse −.5, so the scenario cost difference is −8500 and the duration difference −6 days. The information difference depends on the selected authored information state. These contrasts are scenario calculations, not observed or causal case effects.

Enumerate the empty path and all ordered selections of one to three distinct actions, giving 41 candidates. A path is nondominated if no candidate is both no more expensive and at least as informative, with one strict inequality. The constrained comparison uses deposition → discovery → motion as baseline and chooses the least-cost candidate meeting baseline information minus epsilon.

Public timeline event scores are manually authored increments for teaching: initial claim/request .06–.10, substantive testimony/sampling .14–.25, hearing .08–.15, and ruling .12–.15. Their sum is capped at .99. They do not measure adjudicative quality. Source dates may be later than event dates; the histories are retrospective reconstructions, so prefix invariance is not evidence of a contemporaneously available dataset.

Limitations: selected sparse episodes, unknown cost coverage, no empirical coefficient fitting, no transition probability model, no current-law recommendation, no calibrated forecast, and no causal counterfactual validation. The nonlinear observation link can yield nonzero higher-order finite differences even though the path-coordinate Lie algebra is exactly step-2; those are different claims.
