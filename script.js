document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll untuk link navigasi
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Animasi fade-in saat scroll
  const sections = document.querySelectorAll(".section");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Hamburger menu functionality
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active");
    }
  });

  // Tambahkan event listener untuk link Home
  document.querySelector(".home-link").addEventListener("click", function (e) {
    e.preventDefault(); // Mencegah default behavior link
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Membuat scroll menjadi smooth
    });
  });

  // Tambahkan kode ini di dalam DOMContentLoaded
  let currentLang = "en";
  const languageBtn = document.getElementById("languageBtn");

  function updateLanguage(lang) {
    currentLang = lang;
    const elements = document.querySelectorAll("[data-translate]");

    elements.forEach((element) => {
      const key = element.getAttribute("data-translate");
      if (translations[lang][key]) {
        element.textContent = translations[lang][key];
      }
    });

    // Update tombol bahasa
    languageBtn.querySelector("span").textContent = lang.toUpperCase();

    // Simpan preferensi bahasa di localStorage
    localStorage.setItem("preferredLanguage", lang);
  }

  languageBtn.addEventListener("click", () => {
    const newLang = currentLang === "en" ? "id" : "en";
    updateLanguage(newLang);
  });

  // Load bahasa yang tersimpan atau default ke English
  const savedLang = localStorage.getItem("preferredLanguage") || "en";
  updateLanguage(savedLang);
});
