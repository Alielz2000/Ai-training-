# Beirut Neighborhoods Poll

A quick, informal Next.js poll: pick the Beirut neighborhood you live in and watch a
live map fill in by vote count. Data is stored in Supabase (Postgres).

## Setup

### 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and create a new project (free tier is fine).
2. Once it's provisioned, open the **SQL Editor** and run:

   ```sql
   create table votes (
     id bigint generated always as identity primary key,
     neighborhood text not null,
     created_at timestamptz not null default now()
   );
   ```

3. Go to **Settings → API** and copy:
   - **Project URL**
   - **service_role** key (under "Project API keys" — keep this secret, it bypasses Row Level Security)

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in the values from step 1:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

`.env.local` is gitignored — never commit real credentials.

### 3. Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), cast a vote, and the map/results
table will update on refresh.

### 4. Deploy

Deploy to [Vercel](https://vercel.com/new) (or any Next.js host) and add the same two
environment variables in the project's settings.
