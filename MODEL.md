# Procedure v0.7: nilpotent Heisenberg application

This specifies the ordered action model, its Heisenberg group law and its scenario evaluation. Method presents the mathematical framework, full calculation workflow and empirical testing protocol in English and Chinese.

## Default: higher-dimensional Heisenberg H₅

Action coordinates in code order are discovery=X₁, deposition=Y₁, motion=X₂, expert discovery=Y₂. Each action supplies a unit horizontal increment. The two pairs share a single central direction Z:

```
[Xᵢ,Yⱼ] = δᵢⱼ Z
[Xᵢ,Xⱼ] = [Yᵢ,Yⱼ] = [Xᵢ,Z] = [Yᵢ,Z] = 0
```

For u=(x₁,y₁,x₂,y₂), v=(vₓ₁,vᵧ₁,vₓ₂,vᵧ₂):

```
ω(u,v) = x₁vᵧ₁ − y₁vₓ₁ + x₂vᵧ₂ − y₂vₓ₂
(u,z) · (v,w) = (u+v, z+w+½ω(u,v))
```

The form is antisymmetric and nondegenerate, with rank 4. The center is one-dimensional, the derived algebra spans Z, and triple Lie brackets vanish. This is H₅ rather than H₃ × R² or a generic six-center step-2 group. `composeHeisenberg` applies this law directly; `heisenbergSignature` folds the selected actions. The declared action pairing and unit doses are assumptions that still require empirical justification.

Discovery→deposition gives horizontal [1,1,0,0], z=+0.5; its reverse gives identical horizontal counts and z=−0.5. Motion→expert behaves analogously. Cross-pair brackets vanish. The signed algebraic commutator exp(aX₁)exp(bY₁)exp(−aX₁)exp(−bY₁) has zero horizontal displacement and center ab. Negative increments illustrate group inverses, not admissible actions or the ability to undo real disclosure. All selectable candidates have nonnegative increments. Counts are action doses, not measured substantive displacement D_sub.

## Generic alternative and quotient

The earlier representation is retained as `free-step2`. It has four counts and six central areas in lexicographic order: discovery/deposition, discovery/motion, discovery/expert, deposition/motion, deposition/expert, motion/expert. BCH composition adds half the antisymmetric product. `quotientToHeisenberg` sends this state to H₅ by keeping the four counts and setting z=a₀+a₅. Independent H₅ folding agrees with this quotient, which respects composition.

The generic evaluation retains its sparse earlier coefficients: gain [.16,0,0,0,0,0], cost [−8500,0,0,0,0,0], days [−6,0,0,0,0,0]. H₅ evaluates the shared z with gain .16, cost −8500 and days −6. The workspace uses H₅. The free model remains available in the library for mathematical comparison and audit; there is no model selector in the interface. Neither representation has been fitted to establish empirical superiority.

## Evaluation rules

Base costs in action order are [38000,27000,19000,61000] USD, days [42,30,24,55], and gain inputs [.18,.11,.09,.24]/.36. For H₅:

```
r = max(0, Σ nₖ gₖ/.36 + .16z)
I_final = I_start + (1−I_start)(1−exp(−r))
B = round(max(0, Σ nₖ cₖ − 8500z))
T = round(max(0, Σ nₖ dₖ − 6z))
```

Every coefficient is authored, not estimated from the public cases. The sign of z encodes orientation, not fairness; large |z| does not prove waste. Burden is an assumed outcome function, not the center itself or a Carnot–Carathéodory distance. At I_start=.38, discovery→deposition costs $60,750 and 69 days; its reverse costs $69,250 and 75 days. Motion→expert costs $75,750 and 76 days under H₅, versus $80,000 and 79 days under the generic engine.

The assumed plaintiff cost share is the base-cost-weighted mix of [.24,.38,.5,.5]; defense receives the exact remainder after rounding. Cost ranges equal [.65,1.60] times the scenario point, without probability coverage. There is no measured psychological harm or unfairness outcome. The saturating information link can exhibit higher-order finite differences although the underlying Lie algebra has zero triple brackets; these are different claims.

## Quality-preserving burden comparison

The quality constraint is Γε={γ:𝒜(γ)≥𝒜(γᴿ)−ε}, B*ε=infΓε L_B(γ), and B_avoidable=L_B(γᴿ)−B*ε. This requires an independent adjudicative quality assessment and an observed complete history.

The implementation uses a narrower surrogate. It enumerates the empty path and all ordered selections of one to three distinct actions, giving 41 candidates. A path is nondominated if no candidate is no more expensive and at least as informative with one strict inequality. `comparable` selects the least-cost candidate with I≥I_baseline−ε, where the baseline is the future scenario deposition→discovery→motion. This finite information-proxy constraint does not preserve demonstrated adjudicative quality; it does not compute the infimum over every admissible history or the observed case’s avoidable waste. Editors permit up to five actions including repeats, so not every editable path is in the candidate search.

## Record and temporal limits

The three showcases are selected retrospective episodes, not complete dockets or training cases. At a chosen cutoff, only the selected event prefix supplies the starting state. Information increments are authored and their sum is capped at .99; this is neither ΔV nor 𝒜. Unreported costs/hours remain null. A reported expense is a partial subtotal, not complete observed L_B. Opinion publication dates can postdate the underlying events, so prefix invariance is not evidence of a contemporaneously available dataset.

## Empirical components not yet implemented

No AI lawyers, judge, jury ensemble, regime comparison, independent generation/evaluation, empirical bracket fitting, held-out quality assessment or causal counterfactual validation is implemented. Removing a fact, document or claim requires issue/evidence dependencies and an independent adequacy assessment; removing a procedural action only changes the specified proxy scenario.

Testing the research hypothesis requires independently annotated ΔV, ΔB and 𝒜, a justified action representation and learned bracket form, held-out comparisons of additive/Heisenberg/generic/higher-step structures, and counterfactuals without hindsight. Multiple required central directions, persistent triple-bracket terms or burden-dependent later actions can challenge the one-center approximation. Algebra tests verify the chosen code definitions, not an empirical law of litigation.

Mathematical reference: [Robert Young’s NYU notes on nilpotent groups](https://math.nyu.edu/~ryoung/courses/subriem/subRnotes.html).


## Mathematical review

Method has fifteen numbered sections and 38 LaTeX equations. It includes the general step-2 construction, associativity and Jacobi checks, the rank-4 condition for H5, a faithful 4x4 matrix representation, and the five-dimensional kernel of the quotient from the free algebra. Ordinary dimension is five; homogeneous dimension is six.

The action encoding uses nonnegative unit increments, so no nonempty selectable word has zero horizontal displacement. The center can cancel independent areas; it is not a measure of all interaction. Predictive sufficiency and the legal meaning of these coordinates remain empirical questions.

The outcome rules are independent assumptions. Saturation in intensity does not guarantee monotonicity in actions: four expert actions followed by a motion reduce intensity by 0.07 and lower the information score. For longer repeated words the cost rules also need not have nonnegative marginal increments. The current projected cost therefore cannot automatically be identified with a sum of nonnegative observed burdens.

Method provides the precise quality constraint, finite-search existence argument, scale covariance, rank/identifiability conditions, smooth-flow conditions for a bracket approximation, experimental protocol and questions for mathematical review. It has a print layout for taking the specification to a reviewer.
