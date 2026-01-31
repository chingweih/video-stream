FROM oven/bun:1-alpine AS base
WORKDIR /app

FROM base AS builder

COPY package.json bun.lock ./
COPY packages/api/package.json ./packages/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/worker/package.json ./packages/worker/package.json

RUN bun install --filter '@video-stream/api' --frozen-lockfile

COPY . .

RUN cd packages/api && bun run build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/packages/api/out/server server

ENV NODE_ENV=production

CMD ["./server"]

EXPOSE 3000
