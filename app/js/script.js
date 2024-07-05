import data from '../../data.json' with { type: 'json' };

const dashboard = document.getElementById('dashboard');
const dailyBtn = document.getElementById("dailyBtn");
const weeklyBtn = document.getElementById("weeklyBtn");
const monthlyBtn = document.getElementById("monthlyBtn");

const getItemClass = (item) => {
    return item.title.toLowerCase().replace(" ", "_")
};

const appendCard = (item) => {
    const card = document.createElement('div');
    card.classList.add("card");
    card.classList.add(getItemClass(item));

    const imagePath = "/images/icon-" + item.title.toLowerCase().replace(" ", "-") + ".svg"
    card.style.backgroundImage =  "url('" + imagePath + "')";

    card.innerHTML = `
      <div class="card__content">
        <div style="display: flex; justify-content: space-between;">
            <b>${item.title}</b>
            <button class="meatball">
                <span class="dot"> </span>
                <span class="dot"> </span>
                <span class="dot"> </span>
            </button>
        </div>
        <div class="card__times">
            <h1>${item.timeframes.weekly.current}hrs</h1>
            <p class="card__previous"> Last Week - ${item.timeframes.weekly.previous}hrs</p>
        </div>
       </div>`;

    dashboard.appendChild(card);
};

const updateCard = (item, mode) => {
    const card = dashboard.querySelector("." + getItemClass(item));
    const current = card.querySelector('h1');
    const previous = card.querySelector('p');

    const previousTexts = {"daily": "Yesterday", "weekly": "Last Week", "monthly": "Last Month"};

    current.textContent = item.timeframes[mode].current + "hrs";
    previous.textContent = previousTexts[mode] + " - " + item.timeframes[mode].previous + "hrs";
};

data.forEach(appendCard)
weeklyBtn.style.opacity = "100%";

dailyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dailyBtn.style.opacity = "100%";
    weeklyBtn.style.opacity = "70%";
    monthlyBtn.style.opacity = "70%";

    data.forEach((item) => {
        updateCard(item, "daily");
    });
});

weeklyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dailyBtn.style.opacity = "70%";
    weeklyBtn.style.opacity = "100%";
    monthlyBtn.style.opacity = "70%";

    data.forEach((item) => {
        updateCard(item, "weekly");
    });
});

monthlyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dailyBtn.style.opacity = "70%";
    weeklyBtn.style.opacity = "70%";
    monthlyBtn.style.opacity = "100%";

    data.forEach((item) => {
        updateCard(item, "monthly");
    });
});