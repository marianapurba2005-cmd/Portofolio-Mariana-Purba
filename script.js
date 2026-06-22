/* =========================
   PRELOADER
========================= */
const texts    = document.querySelectorAll(".intro-text");
const preloader = document.getElementById("preloader");

function showText(index) {
    if (!texts[index]) return;
    texts[index].style.animation = "introPop 1.5s forwards";
    setTimeout(() => {
        texts[index].style.animation = "introOut 1s forwards";
    }, 2500);
}

showText(0);
setTimeout(() => { showText(1); }, 3500);
setTimeout(() => {
    preloader.style.opacity = "0";
    preloader.style.transition = "opacity 1s ease";
    setTimeout(() => { preloader.remove(); }, 1000);
}, 7000);


/* =========================
   TYPING EFFECT
========================= */
const typing = document.getElementById("typing");
const fullText = "Mariana Purba";
let idx = 0;
let deleting = false;

function typeEffect() {
    if (!typing) return;
    if (!deleting) {
        typing.textContent = fullText.substring(0, idx);
        idx++;
        if (idx > fullText.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        typing.textContent = fullText.substring(0, idx);
        idx--;
        if (idx < 0) { deleting = false; idx = 0; }
    }
    setTimeout(typeEffect, deleting ? 50 : 120);
}

typeEffect();


/* =========================
   DARK MODE
========================= */
function applyDarkIcon(isDark) {
    document.querySelectorAll(
        "#themeToggle i, #themeToggleSticky i, #themeToggleMobile i"
    ).forEach(icon => {
        icon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
}

function toggleDark() {
    const isDark = document.body.classList.toggle("dark-mode");
    applyDarkIcon(isDark);
}

document.getElementById("themeToggle")       ?.addEventListener("click", toggleDark);
document.getElementById("themeToggleSticky") ?.addEventListener("click", toggleDark);
document.getElementById("themeToggleMobile") ?.addEventListener("click", toggleDark);


/* =========================
   MOBILE MENU
========================= */
const menuToggleMobile = document.getElementById("menuToggleMobile");
const mobileMenu       = document.getElementById("mobileMenu");

function closeMobileMenu() {
    mobileMenu?.classList.remove("open");
}

// expose globally so inline onclick works
window.closeMobileMenu = closeMobileMenu;

menuToggleMobile?.addEventListener("click", (e) => {
    e.stopPropagation();
    mobileMenu?.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (
        mobileMenu?.classList.contains("open") &&
        !mobileMenu.contains(e.target) &&
        !menuToggleMobile.contains(e.target)
    ) { closeMobileMenu(); }
});


/* =========================
   SCROLL — STICKY NAV + MOBILE BAR
========================= */
const stickyNav       = document.getElementById("stickyNav");
const mobileBar       = document.getElementById("mobileBar");
const parallaxSection = document.getElementById("parallax");

function handleNavScroll() {
    const scrollY   = window.scrollY;
    const threshold = parallaxSection
        ? parallaxSection.offsetHeight * 0.6
        : 200;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        if (scrollY > threshold) {
            mobileBar?.classList.add("visible");
        } else {
            mobileBar?.classList.remove("visible");
            closeMobileMenu();
        }
        stickyNav?.classList.remove("visible");
    } else {
        if (scrollY > threshold) {
            stickyNav?.classList.add("visible");
        } else {
            stickyNav?.classList.remove("visible");
        }
        mobileBar?.classList.remove("visible");
    }
}

window.addEventListener("scroll", handleNavScroll);
handleNavScroll();


/* =========================
   SCROLL REVEAL
========================= */
const revealEls = document.querySelectorAll(
    ".reveal, .slide-left, .slide-right, .reveal-left, .reveal-right"
);

function revealOnScroll() {
    const trigger = window.innerHeight * 0.88;
    revealEls.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < trigger) {
            el.classList.add("active-reveal");
        } else {
            el.classList.remove("active-reveal");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();


/* =========================
   EDUCATION CARD TOGGLE
========================= */
const timelineCard    = document.getElementById("timelineCard");
const certificateCard = document.getElementById("certificateCard");

function openEduCard(toOpen, toClose) {
    toOpen.classList.add("open");
    toOpen.classList.remove("closed");
    toClose.classList.add("closed");
    toClose.classList.remove("open");
}

function resetEduCards() {
    [timelineCard, certificateCard].forEach(c => c?.classList.remove("open","closed"));
}

if (timelineCard && certificateCard) {
    timelineCard.addEventListener("click", () => {
        if (timelineCard.classList.contains("open")) resetEduCards();
        else openEduCard(timelineCard, certificateCard);
    });

    certificateCard.addEventListener("click", () => {
        if (certificateCard.classList.contains("open")) resetEduCards();
        else openEduCard(certificateCard, timelineCard);
    });
}


/* =========================
   ACTIVE NAVBAR (parallax nav)
========================= */
document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        document.querySelectorAll(".navbar a").forEach(a => a.classList.remove("active"));
        link.classList.add("active");
    });
});


/* =========================
   PARALLAX SCROLL
========================= */
const cloudLeftFront  = document.querySelector(".cloud-left-front");
const cloudRightFront = document.querySelector(".cloud-right-front");
const cloudLeftBack   = document.querySelector(".cloud-left-back");
const cloudRightBack  = document.querySelector(".cloud-right-back");
const unicorn         = document.querySelector(".unicorn");
const stars           = document.querySelectorAll(".star");

window.addEventListener("scroll", () => {
    const y = window.scrollY;

    cloudLeftFront?.style  && (cloudLeftFront.style.transform  = `translateX(${-y * 0.35}px)`);
    cloudRightFront?.style && (cloudRightFront.style.transform = `translateX(${y * 0.35}px)`);
    cloudLeftBack?.style   && (cloudLeftBack.style.transform   = `translateX(${-y * 0.18}px)`);
    cloudRightBack?.style  && (cloudRightBack.style.transform  = `translateX(${y * 0.18}px)`);

    if (unicorn) {
        unicorn.style.transform = `translate(${-180 + y * 1.2}px, ${Math.sin(y / 90) * 50}px) rotate(${Math.sin(y / 70) * 12}deg)`;
    }

    stars.forEach((star, i) => {
        star.style.transform = `translateY(${y * (0.1 + i * 0.05)}px) scale(${1 - y / 2500})`;
    });
});


/* =========================
   BUTTON HOVER BOUNCE
========================= */
document.querySelectorAll(".navbar a, .btn").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.animate(
            [{ transform: "translateY(0)" }, { transform: "translateY(-8px)" }, { transform: "translateY(0)" }],
            { duration: 350 }
        );
    });
});


/* =========================
   SKILL BARS ANIMATE
========================= */
const skillBars = document.querySelectorAll(".skill-bar-fill");

function animateSkillBars() {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.9) {
            const target = bar.dataset.width;
            if (target && bar.style.width !== target + "%") {
                bar.style.width = target + "%";
            }
        }
    });
}

window.addEventListener("scroll", animateSkillBars);
window.addEventListener("load", animateSkillBars);
document.addEventListener("DOMContentLoaded", () => setTimeout(animateSkillBars, 600));
setTimeout(animateSkillBars, 800);


/* =========================
   PROJECT MODAL
========================= */
const projectModal      = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalImg   = document.getElementById("projectModalImg");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalDesc  = document.getElementById("projectModalDesc");
const projectModalTags  = document.getElementById("projectModalTags");
const projectModalGit   = document.getElementById("projectModalGithub");
const projectModalDemo  = document.getElementById("projectModalDemo");

document.querySelectorAll(".project-card").forEach(card => {
    // Open modal when clicking the overlay or thumb — not the buttons
    card.addEventListener("click", (e) => {
        // If clicking a project-btn link, let it navigate normally
        if (e.target.closest(".project-btn")) return;

        const title  = card.dataset.title  || "";
        const img    = card.dataset.img    || "";
        const desc   = card.dataset.desc   || "";
        const tags   = card.dataset.tags   || "";
        const github = card.dataset.github || "#";
        const demo   = card.dataset.demo   || "#";

        projectModalImg.src    = img;
        projectModalImg.alt    = title;
        projectModalTitle.textContent = title;
        projectModalDesc.textContent  = desc;

        // Render tag badges
        projectModalTags.innerHTML = tags
            .split(",")
            .map(t => `<span class="project-tag">${t.trim()}</span>`)
            .join("");

        projectModalGit.href  = github;
        projectModalDemo.href = demo;

        projectModal.classList.add("open");
        document.body.style.overflow = "hidden";
    });
});

function closeProjectModal() {
    projectModal?.classList.remove("open");
    document.body.style.overflow = "";
}

projectModalClose?.addEventListener("click", closeProjectModal);
projectModal?.addEventListener("click", (e) => {
    if (e.target === projectModal) closeProjectModal();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeProjectModal();
        closeCertLightbox();
    }
});


/* =========================
   CERTIFICATE LIGHTBOX
========================= */
const certLightbox      = document.getElementById("certLightbox");
const certLightboxImg   = document.getElementById("certLightboxImg");
const certLightboxTitle = document.getElementById("certLightboxTitle");
const certLightboxIssuer= document.getElementById("certLightboxIssuer");
const certCloseBtn      = document.getElementById("certClose");

function openCertLightbox(src, title, issuer) {
    if (!certLightbox || !certLightboxImg) return;
    certLightboxImg.src = src;
    certLightboxImg.alt = title;
    if (certLightboxTitle)  certLightboxTitle.textContent  = title  || "";
    if (certLightboxIssuer) certLightboxIssuer.textContent = issuer || "";
    certLightboxImg.classList.remove("zoomed");
    certLightbox.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeCertLightbox() {
    certLightbox?.classList.remove("open");
    certLightboxImg?.classList.remove("zoomed");
    document.body.style.overflow = "";
}

// Attach to certificate cards — but only when education card is open
document.querySelectorAll(".certificate-card").forEach(card => {
    card.addEventListener("click", (e) => {
        // Don't trigger if edu card is being toggled (closed state)
        if (!certificateCard?.classList.contains("open")) return;

        const img    = card.querySelector("img");
        const title  = card.dataset.title  || card.querySelector("h4")?.textContent || "";
        const issuer = card.dataset.issuer || card.querySelector("p")?.textContent  || "";

        if (img) openCertLightbox(img.src, title, issuer);
    });
});

certLightboxImg?.addEventListener("click", () => {
    certLightboxImg.classList.toggle("zoomed");
});

certCloseBtn?.addEventListener("click", closeCertLightbox);

certLightbox?.addEventListener("click", (e) => {
    if (e.target === certLightbox) closeCertLightbox();
});


/* =========================
   CONTACT FORM (EmailJS)
========================= */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Basic visual feedback — integrate EmailJS service ID here if available
        const btn = contactForm.querySelector("button[type='submit']");
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check me-2"></i>Terkirim!';
        btn.disabled = true;
        btn.style.background = "linear-gradient(135deg, #a8e6cf, #6dd5a5)";

        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            btn.style.background = "";
            contactForm.reset();
        }, 3000);
    });
}