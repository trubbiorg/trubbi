FROM node:16.15.0-alpine

COPY src /usr/aplication/src
COPY package.json tsconfig.json nest-cli.json .eslintrc.js .prettierrc tsconfig.build.json /usr/aplication/
WORKDIR /usr/aplication

RUN npm install -g @nestjs/cli @mikro-orm/cli
RUN npm install
RUN npm run build
CMD ["npm", "run", "start:dev"]
