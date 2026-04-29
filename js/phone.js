(function () {
    const GOAL = 2500;
    const LOG_AMT = 250;

    // Persistent storage
    let totalLogged = parseInt(localStorage.getItem('ripple_total')) || 0;
    let history = JSON.parse(localStorage.getItem('ripple_history')) || [];

    function updateUI() {
        const pct = Math.min(Math.round((totalLogged / GOAL) * 100), 100);
        const rem = Math.max(GOAL - totalLogged, 0);

        // Update Wave
        const fill = document.getElementById('waveFill');
        if (fill) fill.style.height = pct + '%';

        // Update Text
        document.getElementById('pctText').textContent = pct + '%';
        document.getElementById('mlText').textContent = totalLogged.toLocaleString() + ' ml';
        document.getElementById('remStat').textContent = rem > 0 ? rem.toLocaleString() + ' ml' : 'Goal Met!';
        document.getElementById('glassStat').textContent = Math.floor(totalLogged / LOG_AMT);

        localStorage.setItem('ripple_total', totalLogged);
        localStorage.setItem('ripple_history', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const list = document.getElementById('logList');
        if (!list) return;
        list.innerHTML = history.slice(0, 5).map(item => `
            <div class="log-entry">
                <span style="color: #00B4D8;">+ ${item.amount} ml</span>
                <span style="color: #8892A4;">${item.time}</span>
            </div>
        `).join('');
    }

    function logWater() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        totalLogged += LOG_AMT;
        history.unshift({ amount: LOG_AMT, time: timeStr });
        
        if (window.navigator.vibrate) window.navigator.vibrate(15);
        updateUI();
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('logBtn').addEventListener('click', logWater);
        updateUI();
    });
})();