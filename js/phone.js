(function () {
  const GOAL = 2500;
  const LOG_AMT = 250;

  // Load saved data from localStorage
  let totalLogged = parseInt(localStorage.getItem("ripple_total")) || 0;
  let history = JSON.parse(localStorage.getItem("ripple_history")) || [];

  function updateUI() {
    const pct = Math.min(Math.round((totalLogged / GOAL) * 100), 100);
    const rem = Math.max(GOAL - totalLogged, 0);

    // Update Wave height
    const fill = document.getElementById("waveFill");
    if (fill) fill.style.height = pct + "%";

    // Update labels
    document.getElementById("pctText").textContent = pct + "%";
    document.getElementById("mlText").textContent =
      totalLogged.toLocaleString() + " ml";
    document.getElementById("remStat").textContent =
      rem > 0 ? rem.toLocaleString() + " ml" : "Goal Met!";
    document.getElementById("glassStat").textContent = Math.floor(
      totalLogged / LOG_AMT,
    );

    // Save to device
    localStorage.setItem("ripple_total", totalLogged);
    localStorage.setItem("ripple_history", JSON.stringify(history));
    renderHistory();
  }

  function renderHistory() {
    const list = document.getElementById("logList");
    if (!list) return;
    list.innerHTML = history
      .slice(0, 4)
      .map(
        (item) => `
            <div class="history-entry">
                <span class="h-amt">+ ${item.amount} ml</span>
                <span class="h-time">${item.time}</span>
            </div>
        `,
      )
      .join("");
  }

  function logWater() {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    totalLogged += LOG_AMT;
    history.unshift({ amount: LOG_AMT, time: timeStr });

    // Haptic feedback for supported mobile devices
    if (window.navigator.vibrate) window.navigator.vibrate(15);
    updateUI();
  }

  document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("logBtn");
    if (btn) btn.addEventListener("click", logWater);
    updateUI();
  });
})();
