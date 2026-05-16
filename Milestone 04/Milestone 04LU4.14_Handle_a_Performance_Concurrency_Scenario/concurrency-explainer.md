# Concurrency Explainer

**Your name:**
**Date:**

---

## The Root Cause — Why Check-Then-Insert Fails

<!-- 
  Explain what a race condition is in the context of this endpoint.
  Why does checking with findFirst() before creating with create() fail 
  when two requests arrive at the same millisecond?
  What is the "gap" between the check and the insert?
  
  Minimum: 2 paragraphs
-->

Your explanation here.

---

## Why the Unique Constraint Fixes It

<!--
  Explain why moving the check from application code (findFirst) to the
  database level (@@unique constraint) actually closes the race condition.
  
  Why can't application-layer checking solve this, no matter how fast it runs?
  What does the database do differently that makes it atomic?
  
  Minimum: 1 paragraph
-->

Your explanation here.

---

## Why Rate Limiting Alone Is Not Enough

<!--
  Explain why adding express-rate-limit without the @@unique constraint
  would still allow double bookings.
  
  Give a concrete scenario: two users, one request each, both within the limit.
  What happens without the constraint?
  
  Minimum: 1 paragraph
-->

Your explanation here.

---

## What P2002 Means and Why 409

<!--
  What does Prisma error code P2002 mean?
  Why is 409 Conflict the correct HTTP status to return when it fires?
  Why not 400 Bad Request? Why not 500 Internal Server Error?
  
  Minimum: 1 paragraph
-->

Your explanation here.

---

**Total word count:** (aim for 300–600 words across all four sections)
