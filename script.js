
let people = [];
let expenses = [];
let netBalances = {};
let rawDebts = [];
let optimizedDebts = [];


function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const toggleBtn = document.getElementById('theme-toggle');

    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        toggleBtn.innerHTML = '🌙 Dark Mode';
    } else {
        body.setAttribute('data-theme', 'dark');
        toggleBtn.innerHTML = ':sunny: Light Mode';
    }

    if (optimizedDebts.length > 0) drawGraph();
}

function addPerson() {
    let name = document.getElementById('person-name').value.trim();
    if (name && !people.includes(name)) {
        people.push(name);
        document.getElementById('person-name').value = '';
        updateUI();
    }
}


function addExpense() {
    let desc = document.getElementById('exp-desc').value.trim();
    let amount = parseFloat(document.getElementById('exp-amount').value);
    let category = document.getElementById('exp-category').value; // Get category emoji
    let payer = document.getElementById('exp-payer').value;

    if (!desc || !payer || people.length < 2) {
        alert("Please fill out the description and payer, and ensure you have at least 2 participants.");
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid expense amount greater than 0.");
        return;
    }

    expenses.push({ desc, amount, category, payer });

    document.getElementById('exp-desc').value = '';
    document.getElementById('exp-amount').value = '';

    calculateBalances();

    optimizedDebts = [];
    document.getElementById('graph-container').innerHTML = '<span style="color: #94A3B8;">Graph will appear here after optimization</span>';
    document.getElementById('algorithm-metrics').style.display = 'none'; // Hide metrics on new expense
    updateUI();
}

function calculateBalances() {
    people.forEach(person => netBalances[person] = 0);
    rawDebts = [];

    expenses.forEach(exp => {
        let splitShare = exp.amount / people.length;
        people.forEach(person => {
            if (person === exp.payer) {
                netBalances[person] += (exp.amount - splitShare);
            } else {
                netBalances[person] -= splitShare;
                rawDebts.push({ from: person, to: exp.payer, amount: splitShare });
            }
        });
    });
}

function runAlgorithm() {
    if (expenses.length === 0) {
        alert("Add some expenses first!");
        return;
    }

    let creditors = [];
    let debtors = [];

    for (let person in netBalances) {
        let balance = netBalances[person];
        if (balance > 0.01) creditors.push({ name: person, amount: balance });
        else if (balance < -0.01) debtors.push({ name: person, amount: Math.abs(balance) });
    }

    optimizedDebts = [];

    while (creditors.length > 0 && debtors.length > 0) {
        creditors.sort((a, b) => b.amount - a.amount);
        debtors.sort((a, b) => b.amount - a.amount);

        let bigCreditor = creditors[0];
        let bigDebtor = debtors[0];

        let transferAmount = Math.min(bigCreditor.amount, bigDebtor.amount);
        transferAmount = Math.round(transferAmount * 100) / 100;

        optimizedDebts.push({ from: bigDebtor.name, to: bigCreditor.name, amount: transferAmount });

        bigCreditor.amount -= transferAmount;
        bigDebtor.amount -= transferAmount;

        if (bigCreditor.amount < 0.01) creditors.shift();
        if (bigDebtor.amount < 0.01) debtors.shift();
    }

    let rawCount = rawDebts.length;
    let optCount = optimizedDebts.length;

    if (rawCount > 0) {
        document.getElementById('metric-before').innerText = rawCount;
        document.getElementById('metric-after').innerText = optCount;
        let metricsBox = document.getElementById('algorithm-metrics');
        metricsBox.style.display = 'block';

        if (optCount < rawCount) {
            metricsBox.style.background = '#D1FAE5'; 
            metricsBox.style.color = '#065F46';
            metricsBox.style.borderColor = '#34D399';
        } else {
            metricsBox.style.background = '#FEF3C7'; 
            metricsBox.style.color = '#92400E';
            metricsBox.style.borderColor = '#FBBF24';
            metricsBox.innerHTML = `:sparkles: Optimization Complete! Debts are already minimal (${optCount} transactions).`;
        }
    }

    updateUI();
    drawGraph();
}


function resetApp() {
    people = []; expenses = []; netBalances = {}; rawDebts = []; optimizedDebts = [];
    document.getElementById('graph-container').innerHTML = '<span style="color: #94A3B8;">Graph will appear here after optimization</span>';
    document.getElementById('algorithm-metrics').style.display = 'none';
    updateUI();
}

function updateUI() {
    document.getElementById('people-list').innerHTML = people.map(p => `<div class="list-item" style="padding: 8px 12px;">:bust_in_silhouette: ${p}</div>`).join('');

    document.getElementById('exp-payer').innerHTML = `<option value="">Who paid?</option>` + people.map(p => `<option value="${p}">${p}</option>`).join('');

    if (expenses.length > 0) {
        document.getElementById('expenses-list').innerHTML = expenses.map(e =>
            `<div class="list-item expense-item">
                <span><span style="font-size: 16px; margin-right: 8px;">${e.category}</span><strong>${e.desc}</strong> <span style="color: #64748B; font-size: 12px; margin-left: 5px;">Paid by ${e.payer}</span></span>
                <span style="font-weight: 600;">₹${e.amount.toFixed(2)}</span>
            </div>`
        ).join('');
    } else {
        document.getElementById('expenses-list').innerHTML = `<div class="empty-state">No expenses added yet.</div>`;
    }

    let balanceHTML = '';
    let hasBalances = false;
    for (let p in netBalances) {
        let numAmt = netBalances[p];
        if (Math.abs(numAmt) > 0.01) {
            hasBalances = true;
            let color = numAmt > 0 ? 'text-green' : 'text-red';
            let sign = numAmt > 0 ? '+' : '';
            balanceHTML += `<div class="list-item"><span>${p}</span> <span class="${color}">${sign}₹${Math.abs(numAmt).toFixed(2)}</span></div>`;
        }
    }

    if (hasBalances) document.getElementById('balances-list').innerHTML = balanceHTML;
    else if (expenses.length > 0) document.getElementById('balances-list').innerHTML = `<div class="list-item" style="color: #059669; font-weight: bold;">Everyone is perfectly settled up!</div>`;
    else document.getElementById('balances-list').innerHTML = `<div class="empty-state">Add an expense to calculate balances.</div>`;

    document.getElementById('raw-debts').innerHTML = rawDebts.length > 0
        ? rawDebts.map(d => `<div class="list-item" style="font-size: 13px;"><span><strong>${d.from}</strong> ➔ <strong>${d.to}</strong></span> <span class="text-red">₹${d.amount.toFixed(2)}</span></div>`).join('')
        : `<div class="empty-state">No debts</div>`;

    document.getElementById('optimized-debts').innerHTML = optimizedDebts.length > 0
        ? optimizedDebts.map(d => `<div class="list-item" style="font-size: 13px;"><span><strong>${d.from}</strong> ➔ <strong>${d.to}</strong></span> <span class="text-red">₹${d.amount.toFixed(2)}</span></div>`).join('')
        : `<div class="empty-state">Run algorithm to see optimized debts</div>`;
}

function drawGraph() {
    let container = document.getElementById('graph-container');
    container.innerHTML = '';

    if (optimizedDebts.length === 0) {
        container.innerHTML = '<span style="color: #94A3B8;">Graph will appear here after optimization</span>';
        return;
    }

    let w = container.clientWidth, h = container.clientHeight;
    let cx = w / 2, cy = h / 2, radius = 90;
    let nodes = {};

    let isDark = document.body.getAttribute('data-theme') === 'dark';
    let textColor = isDark ? '#F8FAFC' : '#0F172A';
    let subTextColor = isDark ? '#94A3B8' : '#475569';
    let boxColor = isDark ? '#1E293B' : 'white';

    people.forEach((p, i) => {
        let angle = (i * 2 * Math.PI) / people.length - (Math.PI / 2);
        nodes[p] = { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
    });

    let svg = `<svg width="100%" height="100%">
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#E11D48" />
            </marker>
        </defs>`;

    optimizedDebts.forEach(tx => {
        let n1 = nodes[tx.from], n2 = nodes[tx.to];
        svg += `<line x1="${n1.x}" y1="${n1.y}" x2="${n2.x}" y2="${n2.y}" stroke="#E11D48" stroke-width="2" marker-end="url(#arrowhead)"/>`;

        let midX = (n1.x + n2.x) / 2;
        let midY = (n1.y + n2.y) / 2;
        svg += `<rect x="${midX - 25}" y="${midY - 10}" width="50" height="20" fill="${boxColor}" rx="4" stroke="#E2E8F0" />`;
        svg += `<text x="${midX}" y="${midY + 4}" fill="${textColor}" font-size="12" font-weight="700" text-anchor="middle">₹${tx.amount.toFixed(0)}</text>`;
    });

    for (let key in nodes) {
        svg += `<circle cx="${nodes[key].x}" cy="${nodes[key].y}" r="22" fill="#1E1B4B" stroke="#14B8A6" stroke-width="3" />`;
        svg += `<text x="${nodes[key].x}" y="${nodes[key].y + 5}" fill="white" text-anchor="middle" font-weight="700" font-size="14">${key.charAt(0)}</text>`;
        svg += `<text x="${nodes[key].x}" y="${nodes[key].y + 38}" fill="${subTextColor}" text-anchor="middle" font-weight="600" font-size="13">${key}</text>`;
    }
    svg += `</svg>`;
    container.innerHTML = svg;
}

window.onload = () => updateUI();
