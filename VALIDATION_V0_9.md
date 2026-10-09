# Procedure v0.9 validation

Both paths start with four fixed action modules in different orders. Up/down buttons reorder each path; remove deletes individual steps; reset restores that path. Swap exchanges the complete current paths. Boundary buttons are disabled. Empty paths remain valid. Current result keys include the exact path arrays and invalidate prior output after edits.

The evaluator and all 38 formulas are retained. The frontier continues to use its 41-candidate set, independently of four-step editable paths. TypeScript, production build and 19 existing tests pass. Live verification covers default sequences, up/down, deletion, reset, swap and rerunning after edits.
