# ChatGPT Service 

An interactive service that integrates with ChatGPT using Next.js and Prisma, offering a chat-style interface.

## Setup
1. Clone the repository.
2. Set up the environment variables.
   - Rename the `.env.example` file to `.env`
   - Fill in the `.env` file with the appropriate values for each variable. 
       - `GITHUB_SECRET`
       - `GITHUB_ID`
       - `NEXTAUTH_SECRET`
       - `NEXTAUTH_URL`
       - `DATABASE_URL`
       - `OPENAI_API_KEY`
3. Run `yarn install` to install the dependencies.
4. Apply the database migrations using `yarn dlx prisma migrate dev`.
5. Generate Prisma client using `yarn dlx prisma generate`.
6. Start your server by running `yarn dev`.

## Features
- Authentication via GitHub.
- Supports multiple chat sessions.
- Allows the selection of the model (GPT-4 or GPT-3.5-Turbo).
- Calculates token usage and the corresponding cost in USD.