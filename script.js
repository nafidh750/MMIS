const animateMetrics = () => {
  const metrics = document.querySelectorAll(".metric");
  const speed = 30;

  const animate = (metric) => {
    const target = Number(metric.dataset.target);
    let count = 0;

    const update = () => {
      count += Math.ceil(target / speed);
      if (count >= target) {
        metric.textContent = `${target}%`;
      } else {
        metric.textContent = `${count}%`;
        requestAnimationFrame(update);
      }
    };

    update();
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.7 }
  );

  metrics.forEach((metric) => observer.observe(metric));
};

const highlightNav = () => {
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".floating-nav a");

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));
};

const setYear = () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  animateMetrics();
  highlightNav();
});
