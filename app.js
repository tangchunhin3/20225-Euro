async function loadItinerary() {
  try {
    const res = await fetch('itinerary.json');
    const days = await res.json();

    const timeline = document.getElementById('timeline');
    const details = document.getElementById('details');

    function showDetails(day) {
      details.innerHTML = `
        <h2>Day ${day.day} – ${day.city}, ${day.country}</h2>
        <div class="meta">
          <span class="badge">${day.date}</span>
          <span class="badge">${day.theme}</span>
          <span class="badge">Hotel: ${day.hotel}</span>
        </div>
        <div class="detail-block">
          <h3>Plan</h3>
          <p>${day.plan}</p>
        </div>
        <div class="detail-block">
          <h3>Transport</h3>
          <p>${day.transportTip}</p>
        </div>
        <div class="detail-block">
          <h3>Food / Restaurant idea</h3>
          <p>${day.foodTip}</p>
        </div>
        <div class="detail-block">
          <h3>Must do</h3>
          <p>${day.mustDo}</p>
        </div>
        <div class="detail-block">
          <h3>Must buy</h3>
          <p>${day.mustBuy}</p>
        </div>
        <div class="detail-block">
          <h3>Expected weather</h3>
          <p>${day.weather}</p>
        </div>
      `;
    }

    days.forEach(day => {
      const btn = document.createElement('button');
      btn.textContent = `${day.day}: ${day.city}`;
      btn.addEventListener('click', () => {
        document
          .querySelectorAll('#timeline button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        showDetails(day);
      });
      timeline.appendChild(btn);
    });

    if (days.length > 0) {
      const firstBtn = timeline.querySelector('button');
      if (firstBtn) firstBtn.classList.add('active');
      showDetails(days[0]);
    }
  } catch (err) {
    document.getElementById('details').innerHTML =
      '<p>Failed to load itinerary. Please check that itinerary.json is present.</p>';
    console.error(err);
  }
}

loadItinerary();
