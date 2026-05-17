# Dev Confessions - Refactoring Changes

## Move 7 - Write CHANGES.md Document every decision. Two sections required:

## Section 1 - Variable Renames:

| Old Name | New Name            | Why                                                  |
| -------- | ------------------- | ---------------------------------------------------- |
| d        | confessionData      | 'd' gave no information about what the variable held |
| arr      | filteredConfessions | describes both the type (array) and its contents     |

## Section 2 - Function Splits:

### handleAll() split into:

- validateConfessionInput() - validates required fields before any DB call
- saveConfession() - single database write operation
- formatConfessionResponse() - shapes the response object consistently
  Why: the original function had 3 responsibilities mixed together. Splitting makes each testable independently.
