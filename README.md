# Splitify: Group Expense Splitter

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

Same result, fewer transactions. With larger groups, the reduction is even bigger.
---

## Tech Stack

| | |
|---|---|
| **Frontend** | React + TypeScript |
| **Backend** | Node.js + Express.js + Next.js |
| **Database** | MongoDB |
| **Hosting** | Netlify |

---

## Architecture

```
User → React + TypeScript Frontend → MongoDB
                              ↓
                    Settlement Algorithm
                              ↓
                    Optimized payments → UI
```


### Data Model

- **Group** — has members
- **Expense** — who paid, how much, which group, split between whom
- **Payment** — records settlements between two or more people

---

**What's not built yet:**
- Mobile-friendly UI
- Implimitation of Tech Stack
- Code Creation

---

## Limitations

- The greedy algorithm is near-optimal but not always mathematically perfect (doesn't matter in practice for small groups)
- No bank/UPI integration — just tells you who to pay, you handle the actual transfer
- Handeling of situations where one or more accounts refuse/fail to make payment.

---
