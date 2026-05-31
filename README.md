# Expense Tracker

A modern expense tracking application built with **Next.js**, **React**, **Prisma**, **Clerk**, and Tailwind CSS. The app allows authenticated users to add expenses, view records by month, analyze spending through charts and stats, and receive AI-powered insights.

## Features

- User authentication with Clerk
- Add and manage expense records
- Monthly filtering for expense history
- Expense charts and statistics
- AI-generated spending insights
- User-specific currency preference
- Persistent data storage with Prisma

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Prisma ORM
- Clerk Authentication
- Tailwind CSS

## Project Structure

```bash
src/
├── app/
│   ├── api/
│   │   ├── add-expenses/
│   │   └── expenses/
│   └── dashboard/
├── components/
├── utils/
├── lib/
└── prisma/
```

## How It Works

### Add a new expense

When a user submits a new expense:

1. The frontend sends a `POST` request to `/api/add-expenses`.
2. The backend validates the request data.
3. The authenticated Clerk user is checked.
4. The app creates or updates the corresponding user in the database using Prisma `upsert`.
5. A new expense record is created and stored.
6. The UI refreshes the records list.

### Fetch expenses

When the dashboard loads:

1. The frontend sends a `GET` request to `/api/expenses`.
2. The backend checks the authenticated user.
3. The app ensures the user exists in the database.
4. It fetches all user records and the saved currency.
5. The response returns:

```ts
{
  records: [],
  currency: "USD"
}
```

## Installation

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```

## Environment Variables

Create a `.env` file and add the required environment variables:

```env
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

You may also need additional Clerk variables depending on your setup.

## Run the Project

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## API Routes

### `POST /api/add-expenses`

Creates a new expense record and updates the user currency if needed.

Expected request body:

```json
{
  "description": "Groceries",
  "amount": 45.5,
  "category": "Food",
  "date": "2026-05-31",
  "currency": "USD"
}
```

### `GET /api/expenses`

Returns the authenticated user's expense records and saved currency.

Example response:

```json
{
  "records": [
    {
      "id": "...",
      "text": "Groceries",
      "amount": 45.5,
      "category": "Food",
      "date": "2026-05-31T00:00:00.000Z"
    }
  ],
  "currency": "USD"
}
```

## Notes

- Currency should be stored on the `User` model, not on each expense record.
- The dashboard should treat the selected currency as a shared state value.
- If your `Record.userId` references the Prisma user ID, make sure to use the database user ID returned from `upsert`, not directly the Clerk user ID.

## Future Improvements

- Edit and delete expenses
- Budget limits and alerts
- Export expenses to CSV or PDF
- Multi-currency conversion
- Better AI analysis and recommendations

## License

This project is open for personal learning and customization.
# ai-tracker
