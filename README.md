# Splitify — group expense splitter

A browser prototype for friends, flatmates, or trip groups to record shared expenses and see a suggested settlement plan.

[Try the demo](https://splitify1.netlify.app/)

## What it does

- Adds named participants and expenses with a payer, description, amount, and category.
- Splits every expense equally across all current participants.
- Calculates each participant's net balance.
- Uses a greedy algorithm to match the largest debtor with the largest creditor, then repeats.
- Displays suggested transfers in a list and an SVG graph, with a light/dark theme.

The algorithm produces a settlement suggestion; it does **not** guarantee the mathematically minimum number of transfers. No payments are processed.

## Run locally

Requires a modern web browser. There are no npm dependencies, build step, environment variables, API keys, or backend.

```sh
git clone https://github.com/Aditya030207/Splitify.git
cd Splitify
python3 -m http.server 8000
```

Open `http://localhost:8000`. Alternatively, open `index.html` directly in a browser. Deploy the three static files to a static host such as Netlify.

## Example

Add Alex and Sam before recording expenses. Record a dinner costing 600, paid by Alex. The equal split gives Alex a positive balance of 300 and Sam a negative balance of 300. Run the settlement algorithm to suggest a transfer of 300 from Sam to Alex.

## Source and engineering decisions

- `index.html`: page structure, controls, and inline event bindings.
- `style.css`: responsive layout and appearance.
- `script.js`: in-memory state, balance calculations, greedy settlement logic, DOM updates, and SVG rendering.

This is HTML, CSS, and vanilla JavaScript running entirely in the browser. The graph is generated with SVG; there is no database or server-side application.

## Limitations and next improvements

- Data is session-only and is lost on reload; there are no accounts, cloud sync, export, or payment integrations.
- Add all participants before entering expenses. Expenses do not store their own participant snapshot; changing group membership can change later recalculations.
- Money uses floating-point arithmetic with rounding and a 0.01 threshold. This is a learning prototype, not a financial ledger.
- User-provided names and descriptions are inserted into HTML strings. Use trusted sample input only until DOM rendering is hardened with text nodes and safe attributes.
- Some interface labels describe transfers as minimal. Treat those as UI wording to correct, not a proven guarantee.
- Next improvements: safe DOM rendering, integer-based money handling, participant snapshots, and meaningful calculation tests.

No license file is currently supplied. This README does not grant additional reuse rights.
