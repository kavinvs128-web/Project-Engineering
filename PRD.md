# Dorm Marketplace — Product Requirements Document (PRD)

## 1. Scope Cut

1. Payments  
Payments are not included because transactions happen in person and handling money adds unnecessary complexity for an MVP.

2. Live Chat  
Real-time chat is excluded since buyers and sellers can coordinate outside the app.

3. Advanced Search & Filters  
Search and filtering are not required because the number of listings in an MVP is small.

---

## 2. MVP Features

1. List Item  
Users can create a listing with a title.

2. View Items  
Users can see all items and their current status (available, reserved, sold).

3. Claim Item  
Users can claim an item, which reserves it temporarily.

---

## 3. Acceptance Criteria — Claim Item Flow

### 1. Successful Claim
Given an item is available  
When a user clicks "Claim Item"  
Then the item status changes to "reserved" and is no longer available for others  

---

### 2. Concurrency Protection
Given two users try to claim the same item  
When both attempt to claim at the same time  
Then only one claim succeeds and the other user receives an error  

---

### 3. Expiration Handling
Given an item is reserved  
When the reservation time expires without confirmation  
Then the item becomes available again automatically   