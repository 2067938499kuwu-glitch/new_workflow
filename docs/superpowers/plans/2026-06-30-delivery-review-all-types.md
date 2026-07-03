# Delivery Review All Types Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the delivery review modal so selecting an episode shows all review content types for that episode inside the same popup.

**Architecture:** Keep the change inside the existing static delivery review popup. `index.html` will expose a new per-episode review board container, `js/delivery.js` will render grouped review sections for every review type in the active episode, and `css/style.css` will style the grouped cards without changing the popup interaction model.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node-based static regression checks

---

### Task 1: Lock the new popup behavior with a static regression test

**Files:**
- Modify: `tests/delivery-review-frame-guard-static.test.js`
- Test: `tests/delivery-review-frame-guard-static.test.js`

- [ ] **Step 1: Write the failing test**

Add source checks for the grouped review board hook, grouped section styles, and the new grouped-render functions.

- [ ] **Step 2: Run test to verify it fails**

Run: `node tests/delivery-review-frame-guard-static.test.js`
Expected: FAIL because the new hook names and render functions do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Add the modal hook and grouped-render functions, then wire them into the existing review modal render path.

- [ ] **Step 4: Run test to verify it passes**

Run: `node tests/delivery-review-frame-guard-static.test.js`
Expected: PASS

### Task 2: Render all review types for the active episode inside the popup

**Files:**
- Modify: `index.html`
- Modify: `js/delivery.js`
- Modify: `css/style.css`

- [ ] **Step 1: Add popup structure**

Replace the single comment list container with a grouped review board container that still lives inside the same modal layout.

- [ ] **Step 2: Render grouped review sections**

For the active episode, render one review card per type with its own status and editable comments.

- [ ] **Step 3: Update event handling**

Keep textarea editing and note removal working by resolving the note from both episode and type context.

- [ ] **Step 4: Style grouped sections**

Add compact card styling so multiple content types remain readable inside the popup.

- [ ] **Step 5: Run regression check**

Run: `node tests/delivery-review-frame-guard-static.test.js`
Expected: PASS
