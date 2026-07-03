const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'css', 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'js', 'delivery.js'), 'utf8');
const data = fs.readFileSync(path.join(root, 'js', 'data.js'), 'utf8');

const checks = [
  ['review modal title exists', html.includes('id="deliveryReviewProjectTitle"')],
  ['review modal review board exists', html.includes('id="deliveryReviewTypePanels"')],
  ['review modal config trigger exists', html.includes('id="deliveryReviewConfigBtn"')],
  ['review modal approve button exists', html.includes('id="deliveryReviewApproveBtn"')],
  ['review modal styles exist', css.includes('.delivery-review-modal')],
  ['review modal grouped panel styles exist', css.includes('.delivery-review-type-panel')],
  ['review modal grouped note list styles exist', css.includes('.delivery-review-type-panel-notes')],
  ['frame config guard logic exists', js.includes('if (!item.frameConfigConfigured)')],
  ['review modal render function exists', js.includes('function renderReviewModal()')],
  ['review modal grouped panel render exists', js.includes('function renderReviewTypePanels()')],
  ['review modal note lookup helper exists', js.includes('function getReviewCommentsByEpisodeAndType(episode, type)')],
  ['approve handler checks frame config', js.includes('if (!item.frameConfigConfigured)')],
  ['frame config save marks configured', js.includes('item.frameConfigConfigured = true;')],
  ['delivery data contains frame config state', data.includes('frameConfigConfigured')]
];

const failed = checks.filter(([, pass]) => !pass);

if (failed.length) {
  console.error('Delivery review/frame guard checks failed:');
  failed.forEach(([name]) => console.error(`- ${name}`));
  process.exit(1);
}

console.log('Delivery review/frame guard checks passed.');
