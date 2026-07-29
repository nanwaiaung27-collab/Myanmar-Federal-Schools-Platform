import schoolsData from "./schoolsData.js";

// ကျောင်းစာရင်းများကို HTML သို့ Loop ပတ်၍ ထည့်သွင်းခြင်း
function renderSchools() {
    const schoolListContainer = document.getElementById("schoolList");
    schoolListContainer.innerHTML = "";

    schoolsData.forEach((school, index) => {

        // condition ? expressionIfTrue : expressionIfFalse
        let youtubeLinkHtml = school.youtube
            ? <a href="${school.youtube}" target="_blank" rel="noopener noreferrer" class="contact-link"><i class="fab fa-youtube" style="color: #FF0000;"></i> YouTube</a>
            : "";

        let websiteLinkHtml =
            school.website !== "#" && school.website !== "javascript:void(0);"
                ? <a href="${school.website}" target="_blank" rel="noopener noreferrer" class="contact-link"><i class="fas fa-globe" style="color: var(--website-gray);"></i> Website</a>
                : <a href="javascript:void(0);" class="contact-link"><i class="fas fa-globe" style="color: var(--website-gray);"></i> Website</a>;

        let toolsHtml = school.tools
            .map(tool => <span class="tool-tag">${tool}</span>)
            .join("");


        // HTML details summary = toggle on off by user event, always show header only
        let cardHTML = `
            <details class="school-card" data-name="${school.name}">
                <summary>
                    <span>
                        <i class="fa-solid fa-school" style="margin-right: 10px;"></i>
                        ${school.name}
                    </span>
                </summary>
                
                <div class="school-section">
                    <div class="info-note">
                        <h3 class="note-heading">
                            📋 ကျောင်း၏ အသေးစိတ်အချက်အလက်များကို အောက်တွင် လေ့လာနိုင်ပါသည်
                        </h3>

                        <div class="moe-badge">
                            ${school.badgeContent}
                        </div>
                    </div>

                    <div class="info-grid">
                        <div class="info-box">
                            <span class="label">📅 စတင်ဖွင့်လှစ်ခဲ့သောနှစ်</span>
                            <span class="value">${school.established}</span>
                        </div>

                        <div class="info-box">
                            <span class="label">🎓 လက်ရှိကျောင်းသားဦးရေ</span>
                            <span class="value">${school.students}</span>
                        </div>

                        <div class="info-box">
                            <span class="label">👨‍🏫 ဆရာအင်အား</span>
                            <span class="value">${school.teachers}</span>
                        </div>

                        <div class="info-box">
                            <span class="label">⏰ အတန်းချိန်များ</span>
                            <span class="value">${school.time}</span>
                        </div>
                    </div>

                    <div class="info-box" style="margin-top:15px;">
                        <span class="label">🌐 ဆက်သွယ်ရန်</span>

                        <div class="contact-links">
                            <a href="${school.telegram}" target="_blank" class="contact-link">
                                <i class="fab fa-telegram" style="color: var(--telegram-blue);"></i>
                                Telegram
                            </a>

                            <a href="${school.facebook}" target="_blank" class="contact-link">
                                <i class="fab fa-facebook" style="color: var(--facebook-blue);"></i>
                                Facebook Page
                            </a>

                            ${websiteLinkHtml}
                            ${youtubeLinkHtml}
                        </div>
                    </div>

                    <div style="margin-top: 15px;">
                        <span class="label">🛠 Online Tools</span><br>
                        ${toolsHtml}
                    </div>
                </div>
            </details>
        `;

        schoolListContainer.innerHTML += cardHTML;
    });

    document.querySelectorAll(".school-card").forEach((card, i) => {
        card.style.animationDelay = `${i * 0.08}s`;
    });
}

renderSchools();

// Cap Animation
function createCap() {
    const cap = document.createElement("div");
    cap.innerHTML = "🎓";
    cap.className = "cap";
    cap.style.left = Math.random() * 100 + "vw";
    cap.style.animationDuration = Math.random() * 3 + 5 + "s";

    document.body.appendChild(cap);

    setTimeout(() => cap.remove(), 8000);
}

setInterval(createCap, 5000);



// Search Filter & Suggestions Function
function filterSchools() {
    let inputVal = document
        .getElementById("schoolSearch")
        .value.toLowerCase()
        .trim();
    console.log(inputVal);

    let suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";

    let matchCount = 0;

    const schoolCards = document.querySelectorAll(".school-card");

    schoolCards.forEach(card => {
        let name = card.getAttribute("data-name");
        let nameLower = name.toLowerCase();

        if (nameLower.includes(inputVal)) {
            card.style.display = "block";

            if (inputVal !== "") {
                let div = document.createElement("div");

                div.className = "suggestion-item";
                div.innerHTML = `
                    <i class="fa-solid fa-school" style="margin-right: 8px; color: var(--primary-blue);"></i>
                    ${name}
                `;

                div.onclick = function () {
                    document.getElementById("schoolSearch").value = name;
                    suggestionsList.style.display = "none";
                    filterSchools();
                };

                suggestionsList.appendChild(div);
                matchCount++;
            }
        } else {
            card.style.display = "none";
        }
    })
    if (inputVal !== "" && matchCount > 0) {
        suggestionsList.style.display = "block";
    } else {
        suggestionsList.style.display = "none";
    }

    if (inputVal === "") {
        schoolCards.forEach(card => {
            card.style.display = "block";
        });
    }
}

document.getElementById("schoolSearch").addEventListener("keyup", filterSchools);

document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-container")) {
        document.getElementById("suggestionsList").style.display = "none";
    }
});