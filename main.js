const progressBar = document.createElement('div');
progressBar.id = 'progress-bar';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  progressBar.style.width = progress + '%';
});



const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (cursor) {
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }
});

(function animateRing() {
  ringX += (mouseX - ringX) * 0.1;
  ringY += (mouseY - ringY) * 0.1;

  if (cursorRing) {
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
  }

  requestAnimationFrame(animateRing);
})();



document.querySelectorAll('a, button, .glass-card, .tag, .skill-card, .project-card')
  .forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1.5)';
    });

    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursorRing.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  });



const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 60);
});



const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.45 });

sections.forEach(section => sectionObserver.observe(section));


/* ================= MOBILE MENU ================= */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger?.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close mobile menu when a link is tapped
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav?.classList.remove('open');
    hamburger?.classList.remove('open');
  });
});


/* ================= TYPEWRITER ================= */
const roles = [
  'Full Stack MERN Developer',
  'Frontend Developer',
  'Backend API Developer',
  'AI Integeration Developer'
];

let roleIndex = 0, charIndex = 0, isDeleting = false;
const typeEl = document.getElementById('typewriter');

function typeWriter() {
  if (!typeEl) return;

  const current = roles[roleIndex];

  if (!isDeleting) {
    typeEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      isDeleting = true;
      return setTimeout(typeWriter, 1500);
    }
  } else {
    typeEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? 50 : 90);
}
typeWriter();


/* ================= SCROLL REVEAL ================= */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
});

revealElements.forEach(el => revealObserver.observe(el));



document.querySelectorAll('.level-fill').forEach(bar => {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      bar.style.width = bar.dataset.w + '%';
    }
  }).observe(bar);
});



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});


/* ================= ANIMATED STAT COUNTERS ================= */
const statNumbers = document.querySelectorAll('.stat-number');

function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimal || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = target * eased;
    el.textContent = value.toFixed(decimals) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target.toFixed(decimals) + suffix;
  }
  requestAnimationFrame(tick);
}

const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.6 });

statNumbers.forEach(el => statObserver.observe(el));


/* ================= EXPERIENCE TIMELINE FILL ================= */
const timeline = document.querySelector('.timeline');
const timelineFill = document.getElementById('timeline-fill');

function updateTimelineFill() {
  if (!timeline || !timelineFill) return;
  const rect = timeline.getBoundingClientRect();
  const viewportH = window.innerHeight;

  // How far the viewport has scrolled through the timeline, 0 to 1
  const start = viewportH * 0.85;
  const total = rect.height + viewportH * 0.3;
  const scrolled = start - rect.top;
  const percent = Math.max(0, Math.min(1, scrolled / total));

  timelineFill.style.height = (percent * 100) + '%';
}

window.addEventListener('scroll', updateTimelineFill);
window.addEventListener('resize', updateTimelineFill);
updateTimelineFill();


/* ================= RESUME PREVIEW MODAL ================= */
const resumeModal = document.getElementById('resume-modal');
const resumeModalBackdrop = document.getElementById('resume-modal-backdrop');
const resumeModalClose = document.getElementById('resume-modal-close');
const resumeModalFrame = document.getElementById('resume-modal-frame');
const resumePreviewBtn = document.getElementById('resume-preview-btn');
const RESUME_PATH = './assets/Balaji _1 Resume.pdf';

function openResumeModal() {
  if (!resumeModal) return;
  if (resumeModalFrame && !resumeModalFrame.src) {
    resumeModalFrame.src = RESUME_PATH;
  }
  resumeModal.classList.add('open');
  resumeModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  if (!resumeModal) return;
  resumeModal.classList.remove('open');
  resumeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

resumePreviewBtn?.addEventListener('click', openResumeModal);
resumeModalClose?.addEventListener('click', closeResumeModal);
resumeModalBackdrop?.addEventListener('click', closeResumeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && resumeModal?.classList.contains('open')) closeResumeModal();
});


/* ================= CONTACT FORM (WORKING) ================= */

// Add EmailJS script in HTML:
// <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>

const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form?.addEventListener('submit', function (e) {
  e.preventDefault();

  const name    = form.querySelector('[name="user_name"]').value.trim();
  const email   = form.querySelector('[name="user_email"]').value.trim();
  const subject = form.querySelector('[name="subject"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  // Build mailto link — opens user's email client
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailtoLink =
    `mailto:balajireddy.m6@gmail.com` +
    `?subject=${encodeURIComponent(subject || 'Portfolio Enquiry')}` +
    `&body=${encodeURIComponent(body)}`;

  window.open(mailtoLink, '_blank');

  // Show success message
  if (successMsg) {
    successMsg.textContent = '✅ Your email client is opening!';
    successMsg.classList.add('show');
    successMsg.style.display = 'block';
  }

  form.reset();

  // Hide success after 5 seconds
  setTimeout(() => {
    if (successMsg) {
      successMsg.classList.remove('show');
      successMsg.style.display = 'none';
    }
  }, 5000);
});


/* ================= CLICK SPARK EFFECT ================= */
document.addEventListener('click', (e) => {
  for (let i = 0; i < 6; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';

    spark.style.left = e.clientX + 'px';
    spark.style.top = e.clientY + 'px';

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 600);
  }
});


/* ================= CONSOLE BRANDING ================= */
console.log('%c👨‍💻 Balaji Murugan Reddy', 'color:#c77dff;font-size:18px;font-weight:bold;');
console.log('%c🚀 MERN Stack Developer', 'color:#6bcb77;');
console.log('%c📧 balajireddy.m6@gmail.com', 'color:#4d96ff;');