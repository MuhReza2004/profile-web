// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
window.addEventListener("scroll", function () {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll to top button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add("visible");
  } else {
    scrollTopBtn.classList.remove("visible");
  }
});

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Observe elements for animations
document
  .querySelectorAll(".skill-category, .project-card, .contact-item")
  .forEach((el) => {
    observer.observe(el);
  });

// Language switcher
const languageBtn = document.querySelector(".language-btn");
let currentLang = "en";

function setLanguage(lang) {
  const elements = document.querySelectorAll("[data-translate]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  document.documentElement.lang = lang;
  const langSpan = languageBtn.querySelector("span");
  if (langSpan) {
    langSpan.textContent = lang.toUpperCase();
  }
}

languageBtn.addEventListener("click", function () {
  currentLang = currentLang === "en" ? "id" : "en";
  setLanguage(currentLang);
});

// Particle Animation
class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, 0, 204, ${this.opacity})`;
    this.ctx.fill();
  }
}

function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = [];
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(canvas));
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// Add loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
  setLanguage("id"); // Set initial language to Indonesian
  initParticles(); // Initialize particle animation
});

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".bg-animation");
  const speed = scrolled * 0.5;
  parallax.style.transform = `translateY(${speed}px)`;
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", function () {
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-text h1");
    const originalText = heroTitle.textContent;
    typeWriter(heroTitle, originalText, 100);
  }, 500);
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(-10px) scale(1)";
  });
});

// Mobile menu toggle (for future mobile menu implementation)
let mobileMenuOpen = false;

// Mobile Menu Functionality
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger) {
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    mobileMenuOpen = !mobileMenuOpen;
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      mobileMenuOpen = false;
    });
  });
}

// Modal Functionality
function openModal(projectId) {
  const modalOverlay = document.getElementById("modalOverlay");
  const projects = {
    bodycheck: {
      title: "Body Check - BMI Calculator",
      image: "assets/bmi.png",
      description:
        "A simple yet effective BMI calculator built with HTML, CSS, and JavaScript. This web application allows users to calculate their Body Mass Index and provides personalized activity recommendations based on their results.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://body-check-six.vercel.app/",
        },
        { text: "GitHub", url: "https://github.com/MuhReza2004/Body-Check" },
      ],
    },
    animelist: {
      title: "Anime List",
      image: "assets/website1.png",
      description:
        "A React application that implements a public API to display available anime. Built following modern React practices and responsive design.",
      technologies: ["React", "Vite", "JavaScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://reza-anime-list.vercel.app/",
        },
      ],
    },
    mentorme: {
      title: "MentorMe",
      image: "assets/mentorme1.png",
      description:
        "MentorMe is a learning platform that connects students with mentors through 1:1 sessions and real-world projects to build digital skills and industry-ready portfolios.",
      technologies: ["React", "Vite", "JavaScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://mentorme-web-mentor.vercel.app/",
        },
      ],
    },
    sikecilcerdas: {
      title: "Si Kecil Cerdas",
      image: "assets/sikecil.png",
      description:
        "A website providing child stimulation recommendations appropriate for children aged 0-24 months. Helps parents with early childhood development.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://si-kecil-cerdas.vercel.app/",
        },
      ],
    },
    howmany: {
      title: "HowMany - Water Intake Tracker",
      image: "assets/howmany.png",
      description:
        "A web application that helps users track their daily water intake and stay hydrated. Built with a user-friendly interface and responsive design.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://how-many-nine.vercel.app/calculator.html",
        },
      ],
    },
    kalkusehat: {
      title: "Kalku Sehat - Calorie Calculator",
      image: "assets/kalkusehat.png",
      description:
        "A web application that helps users calculate their daily calorie intake and provides personalized meal plans. Built with a user-friendly interface and responsive design.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://kalku-sehat.vercel.app/",
        },
      ],
    },
    healthdiet: {
      title: "Health Diet",
      image: "assets/diet.png",
      description:
        "A website providing personalized diet recommendations based on user's medical history, aimed at health-conscious individuals seeking guidance.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://healtdiet.vercel.app/",
        },
      ],
    },
    homeworkers: {
      title: "Home Workers",
      image: "assets/homeworkers.png",
      description:
        "Platform penyedia layanan service rumah tangga seperti service AC, elektronik, dan perbaikan rumah. Menghubungkan pelanggan dengan teknisi terpercaya untuk kebutuhan perbaikan dan pemeliharaan rumah.",
      technologies: ["React", "Next.js", "TypeScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://www.homeworkers.id/",
        },
      ],
    },
    sembako32: {
      title: "Sembako32 Smart ERP",
      image: "assets/stok.png",
      description:
        "Sistem RPK Sembako 32 adalah aplikasi dashboard admin berbasis web yang dikembangkan untuk mengoptimalkan pengelolaan bisnis sembako secara digital dan efisien. Sistem ini mengintegrasikan berbagai proses penting seperti manajemen produk, supplier, pelanggan, hingga kontrol stok dalam satu platform yang terpusat. Dilengkapi dengan fitur transaksi end-to-end (pembelian, penjualan, piutang, dan delivery order), aplikasi ini mampu memberikan visibilitas penuh terhadap alur bisnis. Dashboard interaktif menyajikan insight real-time terkait performa usaha mulai dari pendapatan, pengeluaran, hingga analisis keuntungan sehingga membantu pengambilan keputusan yang lebih cepat dan tepat.",
      technologies: ["React", "Next.js", "TypeScript"],
      links: [],
    },
    bungasri: {
      title: "Bunga Sri Rejeki Lestari",
      image: "assets/Bungasri.png",
      description:
        "Landing page resmi PT. Bunga Sri Rejeki Lestari, perusahaan developer properti & kontraktor yang telah berdiri sejak 2005 dengan kantor pusat di Makassar dan cabang di Kendari. Website ini menampilkan profil perusahaan, visi & misi, portofolio proyek perumahan (4000+ unit terbangun), legalitas perusahaan, serta informasi kontak lengkap dengan integrasi WhatsApp.",
      technologies: ["React", "Next.js", "TypeScript"],
      links: [
        {
          text: "Visit Project",
          url: "https://bunga-sri-rejeki-lestari.vercel.app/",
        },
      ],
    },
  };

  const project = projects[projectId];
  if (!project) return;

  document.getElementById("modalTitle").textContent = project.title;
  document.getElementById("modalImage").src = project.image;
  document.getElementById("modalDesc").textContent = project.description;

  const modalTech = document.getElementById("modalTech");
  modalTech.innerHTML = project.technologies
    .map((tech) => `<span class="tag">${tech}</span>`)
    .join("");

  const modalLinks = document.getElementById("modalLinks");
  modalLinks.innerHTML = project.links
    .map(
      (link) =>
        `<a href="${link.url}" target="_blank"><i class="fas fa-external-link-alt"></i> ${link.text}</a>`,
    )
    .join("");

  modalOverlay.classList.add("active");
}

function closeModal() {
  const modalOverlay = document.getElementById("modalOverlay");
  modalOverlay.classList.remove("active");
}

const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modalOverlay) {
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === this) {
      closeModal();
    }
  });
}

// Achievement Counter Animation
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Trigger achievement counters when section is visible
const achievementObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = "true";
        document.querySelectorAll(".achievement-number").forEach((el) => {
          const target = parseInt(el.dataset.target);
          animateCounter(el, target);
        });
        achievementObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 },
);

const achievementsSection = document.querySelector(".achievements-grid");
if (achievementsSection) {
  achievementObserver.observe(achievementsSection);
}

// Contact Form Handling
const contactForm = document.getElementById("contactForm");

// Expand Description Function
function expandDescription(btn) {
  const projectContent = btn.closest(".project-content");
  const description = projectContent.querySelector(".project-description");
  const fullDesc = projectContent.querySelector(".full-description");

  if (fullDesc.style.display === "none") {
    fullDesc.style.display = "block";
    description.style.display = "none";
    btn.textContent = "Show Less";
    btn.classList.add("active");
  } else {
    fullDesc.style.display = "none";
    description.style.display = "-webkit-box";
    btn.textContent = "Read More";
    btn.classList.remove("active");
  }
}
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const formMessage = document.getElementById("formMessage");

    // Validate form
    if (!name || !email || !subject || !message) {
      formMessage.textContent = "Please fill in all fields";
      formMessage.className = "form-message error";
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.textContent = "Please enter a valid email address";
      formMessage.className = "form-message error";
      return;
    }

    // Create mailto link
    const mailtoLink = `mailto:muh.reza2441@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=From: ${encodeURIComponent(name)} (${encodeURIComponent(
      email,
    )})%0A%0A${encodeURIComponent(message)}`;

    // Show success message
    formMessage.textContent =
      "Message prepared! Your email client will open. Send it to finalize.";
    formMessage.className = "form-message success";

    // Open email client
    window.location.href = mailtoLink;

    // Reset form after delay
    setTimeout(() => {
      contactForm.reset();
      formMessage.className = "form-message";
      formMessage.textContent = "";
    }, 2000);
  });
}

// Add click effects to buttons
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.3);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;

    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// Add CSS for ripple animation
const style = document.createElement("style");
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);
