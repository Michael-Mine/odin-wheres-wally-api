# Where's Wally - Backend Repo (Frontend is Separate)

A backend repo for the classic Where's Wally game.

Built with Node, Express, PostgreSQL and Prisma ORM.

It connects to a separate frontend repo using React, Vite and React Router and tested using Vitest and React Testing Library.

Link here: https://github.com/Michael-Mine/odin-wheres-wally

This game is very similar to a photo tagging app. Players need to find the characters by clicking on the image, which places a targeting box at that location and a list of characters pops up to choose.

The selection is then sent to the REST API backend to verify if correct. There is also a timer verified on the backend with a leaderboard for the top 5 times.

Live Link on Netlify: https://mrmine-wheres-wally.netlify.app/

The API only backend is hosted on Railway.

![Screenshot](./public/screenshot-wheres-wally.png)

## Tech Stack

| Layer    | Technologies                        |
| -------- | ----------------------------------- |
| Frontend | React, JavaScript, Vite, Native CSS |
| Backend  | Node, Express, JavaScript           |
| Database | PostgreSQL, Prisma ORM              |
| Testing  | Vitest, React Testing Library, Jest |

---

## System Architecture

The application is split into a 2 repos for clear separation of concerns.

- **Server**: A RESTful API focused on controller functions and middleware validation.
- **Clients**: Component-based SPAs utilizing React Router for navigation and PropTypes for type checking.

---

## Database Schema

```prisma
model Game {
  id          Int     @id @default(autoincrement())
  title       String
  characters  Character[]
  scores      Score[]
}

model Character {
  id      Int     @id @default(autoincrement())
  name    String
  xCoord  Int
  yCoord  Int

  gameId  Int
  game    Game    @relation(fields: [gameId], references: [id])
}

model Score {
  id        Int       @id @default(autoincrement())
  username  String
  time      Int       //in milliseconds
  createdAt DateTime  @default(now())

  gameId  Int
  game    Game    @relation(fields: [gameId], references: [id])
}

model Session {
  id        String  @id @default(uuid())
  gameId    Int
  startTime DateTime @default(now())
  endTime   DateTime?
}
```

---

## Local Development

### Prerequisites

- Node.js v18+
- PostgreSQL instance

### Setup

**1. Clone & Install:**

```bash
git clone https://github.com/Michael-Mine/odin-wheres-wally-api.git

npm install
```

**2. Environment Setup:**

Create a `.env` in root with your `DATABASE_URL`

**3. Initialize and View Database:**

```bash
npx prisma migrate dev
npx prisma generate
npx prisma studio
```

**4. Run:**

```bash
node --watch app.js
```

**4. Run Tests:**

```bash
npm run test
```

## Deployment on Railway

1. Link GitHub repo

2. Add a new Postgres database

3. Add the new Postgres database as `DATABASE_URL`variable in project

4. Add the following settings in project:

Custom Build Command:

```bash
npx prisma generate
```

Pre-deploy Command:

```bash
npx prisma migrate deploy
```

5. Add character coordinates in the Railway Posgres database.
