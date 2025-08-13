FROM node:22

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY .env ./

RUN pnpm install

COPY tsconfig.json .
COPY tsconfig.build.json .
COPY nest-cli.json .
COPY prisma ./prisma
COPY src ./src

RUN pnpm prisma generate

CMD ["pnpm", "start:dev"]
