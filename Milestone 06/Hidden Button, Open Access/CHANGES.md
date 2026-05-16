# ShopAdmin — Authorization Audit

## The Gap
[Describe the specific file and routes where role checks are missing]

## Before — Bypass Proof
[Paste the curl command and HTTP response showing the bypass works]

curl command:

Response (HTTP status and body):

## The Fix
[Describe requireRole middleware and where it was applied]

## After — Protection Confirmed

No token → HTTP status:
Response:

Customer token → HTTP status:
Response:

Admin token → HTTP status:
Response:
