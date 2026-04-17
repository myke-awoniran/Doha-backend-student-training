# Travelbase Backend (Intern Training Project)

Welcome to the Travelbase Backend training project.

This repository is designed to help you get familiar with:
- Fastify (backend framework)
- API design
- Request/response lifecycle
- Writing clean, structured backend code
- Understanding how production APIs are built

This is **not a full production system**, but a simplified environment to help you ramp up.

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

---

### 2. Start Development Server

```bash
npm run dev
```

The server will start at:

```
http://localhost:3000
```

---

### 3. Run Tests

```bash
npm run test
```

---

## 🧠 What You Are Expected To Learn

Over the next few weeks, focus on understanding:

### 1. Fastify Basics
- What is Fastify?
- How routes are defined
- How requests are handled
- How responses are returned

### 2. API Structure
- Routes vs Services
- Separation of concerns
- Clean code organization

### 3. Request Lifecycle
- Incoming request
- Validation
- Processing logic
- Response

### 4. Debugging
- Reading logs
- Fixing errors
- Understanding stack traces

---

## 📁 Project Structure

```
src/
├── routes/      # Defines API endpoints
├── services/    # Business logic (what the app actually does)
├── plugins/     # Fastify plugins
├── utils/       # Helper functions
└── server.ts    # Entry point
```

---

## 🧪 Your First Tasks

Start with these:

### Task 1: Run the Project
- Install dependencies
- Start the server
- Confirm it works in the browser

---

### Task 2: Understand a Route
- Open `routes/`
- Pick any route
- Trace:
  - What URL it listens to
  - What it returns

---

### Task 3: Modify a Response
- Change a response message
- Restart the server
- Verify the change

---

### Task 4: Create a New Route

Example:

```ts
fastify.get('/hello', async (request, reply) => {
  return { message: 'Hello World' }
})
```

---

## ⚠️ Important Rules

- Do NOT copy code blindly — understand it
- Ask questions early
- Break things and fix them (this is how you learn)
- Keep your code clean and readable

---

## 📚 Resources

- Fastify Docs: https://fastify.dev/docs/latest/
- Node.js Docs: https://nodejs.org/en/docs

---

## 🎯 Goal

By the end of this training, you should be able to:

- Build simple APIs
- Understand backend flow
- Read and modify real-world backend code

---

## 👨‍💻 Maintained By

Michael Awoniran  
Backend & Distributed Systems Engineer
