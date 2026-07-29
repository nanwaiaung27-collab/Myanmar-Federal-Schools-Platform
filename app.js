import schoolsData from "./schoolsData.js";

// ကျောင်းစာရင်းများကို HTML သို့ Loop ပတ်၍ ထည့်သွင်းခြင်း
function renderSchools() {
    const schoolListContainer = document.getElementById("schoolList");
    schoolListContainer.innerHTML = "";

    schoolsData.forEach((school, index) => {

        // condition ? expressionIfTrue : expressionIfFalse
        let youtubeLinkHtml = school.youtube
            ? `<a href="${school.youtube}" target="_blank" class="contact-link"><i class="fab fa-youtube" style="color: #FF0000;"></i> YouTube</a>`
            : "";

        let websiteLinkHtml =
            school.website !== "#" && school.website !== "javascript:void(0);"
                ? `<a href="${school.website}" target="_blank" class="contact-link"><i class="fas fa-globe" style="color: var(--website-gray);"></i> Website</a>`
                : `<a href="javascript:void(0);" class="contact-link"><i class="fas fa-globe" style="color: var(--website-gray);"></i> Website</a>`;

        let toolsHtml = school.tools
            .map(tool => `<span class="tool-tag">${tool}</span>`)
            .join("");


        // HTML details summary = toggle on off by user event, always show header only
        let cardHTML = `
            <details class="school-card reveal" data-name="${school.name}">
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
}

renderSchools();


// Scroll-triggered reveal animation for ANY element with class "reveal", "reveal-left", or "reveal-right"
// Re-triggers every time the element enters or leaves the viewport (both scroll directions)
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            entry.target.classList.toggle("visible", entry.isIntersecting);     // true false
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach(el => {
        observer.observe(el);
    });
}

initScrollReveal();


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
    const searchInput = document.getElementById("schoolSearch");
    const inputVal = searchInput.value.toLowerCase().trim();
    console.log(inputVal);

    const suggestionsList = document.getElementById("suggestionsList");
    suggestionsList.innerHTML = "";

    let matchCount = 0;
    const schoolCards = document.querySelectorAll(".school-card");

    // Looping all school cards
    schoolCards.forEach(card => {
        let name = card.getAttribute("data-name") || "";
        let nameLower = name.toLowerCase();

        if (inputVal === "" || nameLower.includes(inputVal)) {
            card.style.display = "block";   // show matching card on screen

            // Creating autosuggestion box
            if (inputVal !== "") {
                let div = document.createElement("div");

                div.className = "suggestion-item";
                div.innerHTML = `
                    <i class="fa-solid fa-school" style="margin-right: 8px; color: var(--primary-blue);"></i>
                    ${name}
                `;

                // Handle suggestion click
                div.onclick = function () {
                    searchInput.value = name;   // adding school name to inputVal result
                    suggestionsList.style.display = "none";
                    filterSchools();    // Re-run filter for the selected school
                };

                suggestionsList.appendChild(div);
                matchCount++;
            }
        } else {
            card.style.display = "none";    // hide card on screen
        }
    });

    // Toggle suggestions dropdown visibility
    if (inputVal !== "" && matchCount > 0) {
        suggestionsList.style.display = "block";
    } else {
        suggestionsList.style.display = "none";
    }

}

filterSchools();
document.getElementById("schoolSearch").addEventListener("keyup", filterSchools);

// close suggestion box after clicking outside the search-container
document.addEventListener("click", function (e) {
    if (!e.target.closest(".search-container")) {
        document.getElementById("suggestionsList").style.display = "none";
    }
});