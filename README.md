# SplitEasy — Group Expense Splitter

Split expenses with friends. Settle up with fewer payments.

---

## The Problem

When groups of people share expenses — flatmates, trips, dinners — settling up becomes a mess. If 5 people owe each other in different directions, you end up with 8-10 separate payments when you really only need 3-4.

**Why this happens:** Apps like Splitwise track balances fine, but they don't reduce the number of payments needed. They just tell you who owes whom — you still end up in payment chains like A pays B, B pays C, C pays A (when A could've just paid C directly).

**Who deals with this:**
- College flatmates splitting rent, groceries, bills
- Friend groups on trips
- Coworkers splitting lunch/team expenses

The core frustration is simple: **too many payments, too much confusion, too many "did you pay me back?" messages.**

---

## Our Solution

A web app where you:
1. Create a group, add members
2. Log expenses (who paid, who was involved)
3. Hit "Settle Up" — the app figures out the **minimum number of payments** needed to make everyone even

The key differentiator is **debt simplification**. We take the messy web of who-owes-whom and reduce it to the fewest possible transfers.

### How it works

Say you have this situation:
```
A owes B ₹100
B owes C ₹200  
A owes C ₹100
= 3 payments
```

After simplification:
```
A pays C ₹200
B pays C ₹100
= 2 payments
```

Same result, fewer transactions. With larger groups, the reduction is even bigger.

### The Algorithm

Nothing fancy — it's a well-known greedy approach:
1. Calculate net balance for each person (what they owe minus what they're owed)
2. Match the person who owes the most with the person who's owed the most
3. Settle the smaller of the two amounts
4. Repeat until all balances are zero

This is called the **Minimum Cash Flow algorithm**. It's simple, fast, and works well for groups under ~50 people (which covers every realistic use case).

---

## Tech Stack

| | |
|---|---|
| **Frontend** | Next.js + Tailwind CSS |
| **Backend** | Next.js API Routes |
| **Database** | MongoDB |
| **Graph Viz** | D3.js (for showing the before/after debt graph) |
| **Hosting** | Vercel |

We chose Next.js for both frontend and backend to keep things simple — one repo, one deploy.

---

## Architecture

```
User → Next.js Frontend → API Routes → MongoDB
                              ↓
                    Settlement Algorithm
                              ↓
                    Optimized payments → UI (with D3.js graph)
```

**That's it.** No microservices, no message queues, no over-engineering. It's a straightforward full-stack app.

### API Routes

| Method | Route | What it does |
|---|---|---|
| POST | `/api/groups` | Create a group |
| POST | `/api/expenses` | Log an expense |
| GET | `/api/groups/:id/balances` | Get everyone's balance |
| GET | `/api/groups/:id/settle` | Get simplified payments |
| POST | `/api/payments` | Record a payment |

### Data Model

- **Group** — has members
- **Expense** — who paid, how much, which group, split between whom
- **Payment** — records settlements between two people

---

## Setup

```bash
git clone https://github.com/<your-username>/split-easy.git
cd split-easy
npm install
```

Create `.env.local`:
```
MONGODB_URI=mongodb://localhost:27017/split-easy
```

Run:
```bash
npm run dev
# → http://localhost:3000
```

---

## Current Status (Proof of Concept)

**What's working:**
- Settlement algorithm — tested with groups of 3-10 people, correctly minimizes transactions every time
- Basic expense logging and balance calculation
- Before/after graph visualization showing debt reduction

**What's not built yet:**
- User auth
- Recurring expenses
- Mobile-friendly UI
- Partial payments

---

## Limitations

- The greedy algorithm is near-optimal but not always mathematically perfect (doesn't matter in practice for small groups)
- No bank/UPI integration — just tells you who to pay, you handle the actual transfer
- No auth yet — anyone with the link can access the group

---

## What's Next

- Add Google login
- Make it mobile-responsive
- Support unequal splits (percentages, exact amounts)
- Export settlement plan as image/PDF
