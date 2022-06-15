#!/bin/sh

echo "Running NPM Install"
npm install

npx mikro-orm migration:fresh

npm run build

npm run start:dev
