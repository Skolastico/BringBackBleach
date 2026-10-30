# BringBackBleach Image Journal

*Daily notes on making Bleach frames clearer while keeping the drawing, texture and original timing intact.*

## 30 October 2026 — The detail score improved. The picture still looked much the same.

The latest selective DVD07 test lowered measured fine-detail error by **14.40% across nine validation regions**. On one EP007 action-and-effects sample, the error moved from **0.0008194 to 0.0006923** (15.52% lower). Reviewers still saw no clear visual gain in the enlarged comparison. The average masked structural gain was **0.82%**, below the preset **5%** target, so DVD07 was not promoted. DVD05 remains the strongest experimental candidate.

### What changed in the image?

**Before — DVD05:** The same enlarged EP007 action-and-effects crop measured 0.0008194 fine-detail error. The picture was already close to the comparison target in the review board.

**After — DVD07:** The same crop measured 0.0006923, a 15.52% reduction in fine-detail error. The board shows DVD05 and DVD07 nearly indistinguishable at this size, with no clear visual gain. This is a measurement change, not a 15.52% visual improvement.

The website now shows small, equal-size crops from this reviewed EP007 frame so readers can move the curtain between DVD05 and DVD07. The three EP008 examples remain clearly marked as archive images from an earlier v7 test; they are not DVD07 results.

### The problem and our response

| What is difficult | What we are doing |
| --- | --- |
| A better detail score may not make a visible difference. | Keep the image review next to the measurement. Do not promote a candidate on the score alone. |
| DVD07 changed the picture too little to justify a new version. | The masked structural gain was 0.82%, below the preset 5% minimum. Keep DVD07 for diagnosis and retain DVD05 as the reference. |
| The next round needs better examples of action and effects. | Find new, well-matched scenes in episodes EP001–EP006. Keep EP007 reserved for validation. |
| One still cannot tell us whether motion is stable. | Check frame timing and frame-to-frame consistency before making any claim about a full episode or flicker. |

### This review in plain numbers

- **200** training steps and **800** sample presentations.
- **13** training targets.
- Fine-detail error fell **14.40%** across nine validation regions.
- On the EP007 action/effects sample, fine-detail error moved **0.0008194 → 0.0006923** (15.52% lower than DVD05).
- Structural gain was **0.82%**, below the **5%** target. DVD07 was rejected.
- Five training boards were reviewed. The differences were subtle; no new large drawing distortion was observed.
- Validation scenes had already been seen during development. This was not a blind test, and it did not check continuous playback.

### Progress through this review cycle

**Stage 2 of 4 is in progress.** We are finding new scenes that can answer a better question. The stages below describe this review cycle, not a percentage of the whole project.

1. Identify where image detail is being lost — complete.
2. Choose fresh scenes for review — in progress.
3. Run one limited experiment, if the scenes justify it — pending.
4. Review image and motion before making a decision — pending.

### Next dispatch

Locate new narrative scenes with usable matches between the available DVD and upscale material in EP001–EP006. EP007 remains reserved for validation. Only after the images have been reviewed and suitable regions are found will a new, limited experiment be considered.

### What this result does not show

- It does not prove that every fine detail is original film grain or that missing detail can be recovered with certainty.
- It does not establish a clear visual improvement over DVD05.
- It does not certify continuous motion, flicker, or complete-episode processing.
- DVD07 is not promoted and must not be described as the new project model.

## Earlier candidate reference — DVD05

An earlier DVD05 comparison measured 47.21% lower fine-detail error and 42.40% lower mid-size-detail error across 24 regions. Larger structure changed by −0.33%. The validation regions had already been consulted during development. These measurements are not visual grades and do not mean that the picture looks 47% better.

## Archived frame comparisons

The website contains three small, same-frame comparisons from an earlier EP008 test with model v7 at 2×. They are labelled as archive examples. They help readers inspect the curtain interaction and see the kind of detail this journal discusses; they do not demonstrate the result of DVD07 or approve DVD05.

This repository does not publish full episodes, video clips, training data or model weights. Bleach and its frames belong to their respective rights holders. This independent research project is not affiliated with them.

