CREATE TABLE IF NOT EXISTS "allowed_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	CONSTRAINT "allowed_users_email_unique" UNIQUE("email")
);
