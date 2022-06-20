#!/bin/sh
rm -rf migrations/
npx mikro-orm schema:drop
npx mikro-orm schema:drop --drop-migrations-table -r
npx mikro-orm migration:create -i
npx mikro-orm migration:up
rm -rf dist/
npm run build