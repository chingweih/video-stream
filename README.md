# video-stream

A video transcoding and streaming project powered by Bun runtime and bundler full-stack capability.

## Packages

- `packages/api`: A Hono backend api with React frontend bundled by Bun.
- `packages/shared`: Shared packages including Redis queue data contracts.
- `packages/worker`: A Bun worker that takes in job data from Redis queue and using `ffmpeg` to transcode videos into streamable files.

## How it works?

```mermaid
flowchart LR
    A(api) -->|1. Serve React frontend| G
    G[User] -->|2. POST /videos| A
    A -->|3. Upload video| E["Object Store
    (Minio, R2, etc...)"]
    A -->|4. Save record| H[SQLite DB]
    A -->|5. Send job| B[Redis Queue]
    B -->|6. Receive job| C(worker)
    E -->|7. Download original video| C
    C -->|"8. Process video (Bun.spawn)"| D[FFMPEG]
    D -->|9. Return procesed video| C
    C -->|10. Upload processed video| E
    E -->|11. Stream video chunks| G
```

## Run

You can use the [docker compose](./docker-compose.yaml) file to run this project with Redis and Minio.

```bash
docker compose up
```

This will build the local packages (`api` and `worker`) along side with Redis and Minio instance for queues and object store respectively.
