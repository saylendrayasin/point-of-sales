# Point of Sales

## Overview

This project features for a Point of Sales system. It is built with React, TypeScript, Redux for the front-end, and Node.js, Express.js, Prisma, and TypeScript for the back-end. The database used is MySQL/PostgreSQL.

## Features

1. **Add Invoice**: Form with autocomplete for products, validation, and notifications.
2. **Invoice Cards**: Paginated view of invoices with basic summary details.
3. **Revenue Graph**: Time-series graph for daily, weekly, and monthly revenue projections.

## Setup

### Front-end

1. Navigate to the `frontend` directory:

   ```bash
   cd front-end
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start server:
   ```bash
   npm start
   ```

### Back-end

1. Navigate to the `backend` directory:

   ```bash
   cd back-end
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up `.env` for database URL and port.

4. Migrate the database shcema:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Start server:

   ```bash
   npm run dev
   ```

## Tech Stack

- **Front-end**: React, TypeScript, Redux
- **Back-end**: Node.js, Express.js, Prisma, TypeScript
- **Database**: MySQL/PostgreSQL
