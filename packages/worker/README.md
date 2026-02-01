# @video-stream/worker

This is a worker process that handles FFMPEG transcoding process.

## Setup

You'll need to install [FFMPEG](https://www.ffmpeg.org/download.html) for this service to run. Then install all project dependencies by running:

```bash
bun install
```

## Start Dev Process

```bash
bun run dev
```

## Deploy

```bash
bun run build
```

This command will compile this project into a single-file executable in `./out/server`. To run the server, simply run the binary. Your process will start listening event queues in the Redis instance.

```bash
./out/server
```
