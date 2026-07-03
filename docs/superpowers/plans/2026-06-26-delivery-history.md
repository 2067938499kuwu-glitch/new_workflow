# Delivery History Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a working history record entry to the delivery center.

**Architecture:** Keep the change inside the existing static frontend. `js/delivery.js` owns row actions and modal rendering; `index.html` provides the existing modal shell; `tests/delivery-history-static.test.js` guards the expected source-level hooks.

**Tech Stack:** HTML, CSS, vanilla JavaScript, Node.js static check.

---

### Task 1: Static Regression Check

**Files:**
- Create: `tests/delivery-history-static.test.js`

- [ ] **Step 1: Write the failing test**

Create a Node script that reads `js/delivery.js` and `index.html`, then asserts the source contains the history button text, modal render functions, public close method, dynamic title hook, body element, and pagination total hook.

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/delivery-history-static.test.js`
Expected: non-zero exit while `showHistoryModal` and the history button are missing.

- [ ] **Step 3: Implement the delivery history feature**

Modify `js/delivery.js` to append a "历史记录" row action and render `AppData.deliveryHistoryData` into `#deliveryHistoryBody`. Modify `index.html` to add dynamic modal hooks where needed.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/delivery-history-static.test.js`
Expected: exit 0.

### Task 2: Browser Smoke Check

**Files:**
- Verify: `index.html`
- Verify: `js/delivery.js`

- [ ] **Step 1: Run syntax checks**

Run: `node --check js/delivery.js`
Expected: exit 0.

- [ ] **Step 2: Inspect final diff**

Run: `git diff -- index.html js/delivery.js tests/delivery-history-static.test.js docs/superpowers/specs/2026-06-26-delivery-history-design.md docs/superpowers/plans/2026-06-26-delivery-history.md`
Expected: only delivery history related changes.
