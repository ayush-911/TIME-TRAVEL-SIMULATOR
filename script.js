/* ============================================================
   STARFIELD BACKGROUND
============================================================ */
function initStarfield() {
    const canvas = document.getElementById("starCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    const stars = [];
    for (let i = 0; i < 250; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width
        });
    }

    function animate() {
        ctx.fillStyle = "rgba(0,0,20,0.6)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        stars.forEach(s => {
            s.z -= 4;
            if (s.z <= 0) {
                s.x = Math.random() * canvas.width;
                s.y = Math.random() * canvas.height;
                s.z = canvas.width;
            }

            const k = 128 / s.z;
            const px = (s.x - cx) * k + cx;
            const py = (s.y - cy) * k + cy;

            ctx.fillStyle = "#00eaff";
            ctx.fillRect(px, py, 2, 2);
        });

        requestAnimationFrame(animate);
    }

    animate();
}

/* ============================================================
   CLOCK DISPLAY (HOME PAGE)
============================================================ */
function updateClock() {
    const clock = document.getElementById("systemClock");
    if (!clock) return;

    setInterval(() => {
        clock.innerText = new Date().toLocaleTimeString();
    }, 500);
}

/* ============================================================
   ENGAGE BUTTON → TRAVEL PAGE
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    updateClock();

    const jumpBtn = document.getElementById("jumpBtn");
    const yearInput = document.getElementById("yearInput");

    if (jumpBtn) {
        jumpBtn.onclick = () => {
            const y = Number(yearInput.value);
            if (!y || y < 1500 || y > 2025) {
                alert("Enter a valid year between 1500–2025");
                return;
            }

            localStorage.setItem("travelYear", y);

            const overlay = document.getElementById("warpOverlay");
            const warpText = document.getElementById("warpText");

            if (overlay) {
                warpText.innerText = `JUMPING TO YEAR ${y}…`;
                overlay.style.display = "flex";
            }

            setTimeout(() => {
                window.location.href = "travel.html";
            }, 2000);
        };
    }
});

/* ============================================================
   RENDER ERA ON era.html
============================================================ */
function renderEra() {
    const year = Number(localStorage.getItem("travelYear"));
    if (!year) {
        document.getElementById("eraTitle").innerText = "ERROR";
        document.getElementById("eraDescription").innerText = "No year received!";
        return;
    }

    const era = getEraInfo(year);

    document.getElementById("eraTitle").innerText = era.title;
    document.getElementById("eraDescription").innerText = era.description;

    // RANDOM EVENTS
    const btn = document.getElementById("randomEventBtn");
    if (btn) {
        btn.onclick = () => {
            const ev = era.events[Math.floor(Math.random() * era.events.length)];
            document.getElementById("eventText").innerText = ev;
            document.getElementById("eventPopup").style.display = "flex";
        };
    }

    document.getElementById("closeEvent").onclick = () =>
        (document.getElementById("eventPopup").style.display = "none");

    document.getElementById("returnBtn").onclick = () =>
        (window.location.href = "index.html");
}

/* ============================================================
   MAJOR YEAR DATABASE (NO ERRORS)
============================================================ */
function getEraInfo(y) {

    const major = {

        // 1500s
        1500: {
            title: "1500 — Dawn of the Early Modern Era",
            description: "A period of global exploration, growing kingdoms, and expanding trade routes.",
            events: ["Rise of powerful kingdoms", "Growing trade networks", "Exploration expands globally"]
        },
        1526: {
            title: "1526 — Mughal Empire Begins",
            description: "Babur defeats Ibrahim Lodi in the First Battle of Panipat.",
            events: ["Mughal rule begins", "New architecture spreads", "Central Asian influence rises"]
        },

        // 1600s
        1600: {
            title: "1600 — Global Trade Expands",
            description: "European and Asian powers develop massive trade networks.",
            events: ["Spice trade grows", "Shipbuilding evolves", "Cultural exchanges increase"]
        },
        1666: {
            title: "1666 — Great Fire of London",
            description: "A massive fire destroys most of central London.",
            events: ["City rebuilt", "Fire safety improves", "Plague outbreaks decline"]
        },

        // 1700s
        1750: {
            title: "1750 — Industrial Revolution Begins",
            description: "Machines begin replacing manual labor, transforming society.",
            events: ["Steam engines created", "Textile industry grows", "Urbanization increases"]
        },
        1776: {
            title: "1776 — American Independence",
            description: "The United States declares independence from Britain.",
            events: ["Declaration signed", "War breaks out", "A new nation forms"]
        },

        // 1800s
        1857: {
            title: "1857 — First War of Indian Independence",
            description: "Mass rebellion against British rule in India.",
            events: ["Sepoy revolt begins", "British rule challenged", "Major political shifts occur"]
        },
        1889: {
            title: "1889 — Eiffel Tower Completed",
            description: "France constructs the tallest structure in the world at the time.",
            events: ["World's Fair attraction", "Symbol of Paris", "Engineering breakthrough"]
        },

        // 1900s
        1914: {
            title: "1914 — World War I Begins",
            description: "A global conflict erupts following rising tensions and alliances.",
            events: ["Trench warfare begins", "Millions mobilized", "Empires collapse"]
        },
        1939: {
            title: "1939 — World War II Starts",
            description: "Germany invades Poland, triggering global war.",
            events: ["Axis powers expand", "Allies form coalition", "Massive technological warfare"]
        },
        1947: {
            title: "1947 — India Gains Independence",
            description: "India becomes a free nation after nearly 200 years of British rule.",
            events: ["Partition occurs", "Mass migration begins", "Nehru becomes PM"]
        },
        1969: {
            title: "1969 — Moon Landing",
            description: "Humans set foot on the Moon for the first time.",
            events: ["Apollo 11 mission succeeds", "Global broadcast watched", "Space Race peaks"]
        },

        // 2000s
        2001: {
            title: "2001 — 9/11 Attacks",
            description: "A major terrorist attack reshapes global politics.",
            events: ["Twin Towers destroyed", "War on terror begins", "Airport security changes forever"]
        },
        2008: {
            title: "2008 — Global Financial Crisis",
            description: "Economic collapse spreads worldwide.",
            events: ["Banks fail", "Recession hits", "Markets destabilize"]
        },

        // 2010s–2025
        2016: {
            title: "2016 — Brexit Vote",
            description: "The United Kingdom votes to leave the EU.",
            events: ["Political chaos", "Currency fluctuations", "Divided public opinion"]
        },
        2020: {
            title: "2020 — COVID-19 Pandemic",
            description: "A global health crisis shuts down the world.",
            events: ["Lockdowns enforced", "Vaccines developed", "Travel restrictions rise"]
        },
        2025: {
            title: "2025 — Modern Technological Age",
            description: "AI, robotics, and global digital systems advance rapidly.",
            events: ["AI breakthroughs", "Climate tech grows", "Space exploration expands"]
        }
    };

    if (major[y]) return major[y];

    return {
        title: `Year ${y}`,
        description: "No major recorded data for this year.",
        events: [
            "Timeline distortion detected.",
            "Unknown historical pattern.",
            "Chrono-log incomplete."
        ]
    };
}
/* ============================================================
   WARP TRAVEL SEQUENCE → GO TO ERA PAGE
============================================================ */
function startWarpSequence() {
    const year = localStorage.getItem("travelYear");

    if (!year) {
        document.getElementById("warpTitle").innerText = "ERROR";
        document.getElementById("warpPhase").innerText = "No destination year received.";
        return;
    }

    document.getElementById("warpYear").innerText = "Destination Year: " + year;

    let phase = 0;
    const phases = [
        "Charging warp engines...",
        "Stabilizing space-time tunnel...",
        "Locking coordinates...",
        "Engaging warp field...",
        "Entering hyperspace..."
    ];

    const phaseText = document.getElementById("warpPhase");

    const interval = setInterval(() => {
        phaseText.innerText = phases[phase];
        phase++;

        if (phase >= phases.length) {
            clearInterval(interval);

            // JUMP TO ERA PAGE
            window.location.href = "era.html";
        }
    }, 800);
}
