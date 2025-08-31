const { spawn } = require('child_process');
const path = require('path');

const services = [
  { name: 'auth-service', dir: 'auth-service' },
  { name: 'shop-service', dir: 'shop-service' },
  { name: 'data-service', dir: 'data-service' },
  { name: 'server', dir: 'server' }
];

services.forEach(service => {
  const servicePath = path.join(__dirname, service.dir);
  const child = spawn('npm', ['run dev'], {
    cwd: servicePath,
    shell: true,
    stdio: 'inherit'
  });

  child.on('close', code => {
    console.log(`${service.name} exited with code ${code}`);
  });

  child.on('error', err => {
    console.error(`Failed to start ${service.name}:`, err);
  });
});
