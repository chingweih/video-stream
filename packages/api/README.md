# @video-stream/api

This is a full-stack Bun project that uses Hono api and React frontend bundled by Bun.

## Setup

```bash
bun install
```

### Run Dev Server

```bash
bun run dev
```

### Create and Migrate the Database

This project uses SQLite using Bun's built-in client and Drizzle ORM. To create and migrate a new database, run:

```bash
bun run db:migrate
```

This will create a `./data/sqlite.db` file in your project.

## Deploy

```bash
bun run build
```

This command will compile this project into a single-file executable in `./out/server`. To run the server, simply run the binary. Your server will be ready on `http://localhost:3000`

```bash
./out/server
```

Alternatively, you can run:

```bash
bun run start
```
