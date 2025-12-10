async function loadItinerary() {
  try {
    const res = await fetch('itinerary.json?v=2'); // 加 ?v=2 方便避免快取
    const days = await res.json();

    const timeline = document.getElementById('timeline');
    const details = document.getElementById('details');

    function renderDay(day) {
      let eventsHtml = '';

      if (Array.isArray(day.events)) {
        eventsHtml = `
          <div class="timeline-day">
            ${day.events
              .map(
                ev => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-time">${ev.time || ''}</div>
                <div class="timeline-title">${ev.title || ''}</div>
                <p class="timeline-desc">${ev.description || ''}</p>
                ${
                  ev.mapUrl
                    ? `<a class="map-link" href="${ev.mapUrl}" target="_blank">在地圖中導航</a>`
                    : ''
                }
              </div>
            `
              )
              .join('')}
          </div>
        `;
      }

      details.innerHTML = `
        <h2>第 ${day.day} 天 – ${day.city}（${day.country}）</h2>
        <div class="meta">
          <span class="badge">日期：${day.date}</span>
          <span class="badge">主題：${day.theme}</span>
          <span class="badge">酒店：${day.hotel}</span>
        </div>
        ${eventsHtml}
        <div class="detail-block">
          <h3>預期天氣（平均氣候）</h3>
          <p>${day.weather}</p>
        </div>
      `;
    }

    // 上方日子按鈕
    days.forEach(day => {
      const btn = document.createElement('button');
      const mmdd = day.date.substring(5).replace('-', '/');
      btn.textContent = `${mmdd} ${day.city}（第 ${day.day} 天）`;
      btn.addEventListener('click', () => {
        document
          .querySelectorAll('#timeline button')
          .forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDay(day);
      });
      timeline.appendChild(btn);
    });

    if (days.length > 0) {
      const firstBtn = timeline.querySelector('button');
      if (firstBtn) firstBtn.classList.add('active');
      renderDay(days[0]);
    }
  } catch (err) {
    document.getElementById('details').innerHTML =
      '<p>行程載入失敗，請確認 itinerary.json 是否存在且格式正確。</p>';
    console.error(err);
  }
}

loadItinerary();
