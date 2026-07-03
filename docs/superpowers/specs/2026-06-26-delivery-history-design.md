# Delivery History Design

## Goal

Add a history record entry to the delivery center so users can view operation time, operator name, and operation type for delivery actions.

## Scope

- Add a "历史记录" action to each delivery project row.
- Reuse the existing `deliveryHistoryModal` markup in `index.html`.
- Render rows from `AppData.deliveryHistoryData`.
- Keep the current table, button, and modal visual language.

## Behavior

Clicking "历史记录" opens the history modal. The modal title includes the project name when available. Each row shows operation type, operator name, operation time, and the existing action/remark context. If no history exists, the table shows an empty state row.

## Testing

Because this project has no test runner, add a lightweight Node static regression check that verifies the new action, modal methods, and dynamic rendering hooks exist.
