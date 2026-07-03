const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const launchPath = path.join(root, '.vscode', 'launch.json');
const tasksPath = path.join(root, '.vscode', 'tasks.json');

function readJsonWithComments(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw.replace(/^\s*\/\/.*$/gm, ''));
}

const launch = readJsonWithComments(launchPath);
const tasks = readJsonWithComments(tasksPath);

const config = (launch.configurations || []).find((item) => item.name === 'Launch Chrome against localhost');
const task = (tasks.tasks || []).find((item) => item.label === 'Start preview server');

const checks = [
  ['launch config exists', !!config],
  ['launch config points at localhost:8080', config && config.url === 'http://localhost:8080'],
  ['launch config has preLaunchTask', config && config.preLaunchTask === 'Start preview server'],
  ['preview task exists', !!task],
  ['preview task runs python http server', task && task.command && task.command.includes('python -m http.server 8080')],
  ['preview task is background', task && task.isBackground === true]
];

const failed = checks.filter(([, pass]) => !pass);

if (failed.length) {
  console.error('Preview launch checks failed:');
  failed.forEach(([name]) => console.error(`- ${name}`));
  process.exit(1);
}

console.log('Preview launch checks passed.');
