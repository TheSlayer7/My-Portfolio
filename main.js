document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(evt) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      evt.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  scrollTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const themeToggle = document.getElementById('themeToggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDark)) {
  document.body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

document.querySelectorAll('.details-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const details = card.querySelector('.project-details');
    const isOpen = !details.hasAttribute('hidden');

    document.querySelectorAll('.project-details:not([hidden])').forEach(open => {
      if (open !== details) {
        open.style.maxHeight = '0';
        setTimeout(() => open.setAttribute('hidden', ''), 300);
        open.closest('.project-card')
          .querySelector('.details-toggle')
          .textContent = '▶ View project details';
      }
    });

    if (!isOpen) {
      details.removeAttribute('hidden');
      details.style.maxHeight = details.scrollHeight + 'px';
      button.textContent = '▼ Hide project details';
    } else {
      details.style.maxHeight = '0';
      setTimeout(() => details.setAttribute('hidden', ''), 300);
      button.textContent = '▶ View project details';
    }

    button.setAttribute('aria-expanded', String(!isOpen));
  });
});

document.querySelectorAll('section, .project-card, #education li, #experience div, #achievements li, #positions li').forEach(el => {
  el.classList.add('reveal');
});

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

document.querySelectorAll('.reveal').forEach(el => {
  revealOnScroll.observe(el);
});

const typingSpan = document.querySelector('.typing-text');
const phrases = ["build AI Models.", "develop Web Apps.", "explore Space Tech.", "create digital art."];
let phraseIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function type() {
  if (!typingSpan) return;
  
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typingSpan.textContent = currentPhrase.substring(0, letterIndex - 1);
    letterIndex--;
  } else {
    typingSpan.textContent = currentPhrase.substring(0, letterIndex + 1);
    letterIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && letterIndex === currentPhrase.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && letterIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

setTimeout(type, 1000);
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("scroll-progress").style.width = scrolled + "%";
});
