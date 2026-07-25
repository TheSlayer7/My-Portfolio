document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', function(evt) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      evt.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const scrollContainer = document.getElementById('scrollTopContainer');
const scrollTopBtn = document.getElementById('scrollTopBtn');
const hpFill = document.getElementById('hp-fill');

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
const profileImg = document.getElementById('profile-img');

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  if(themeToggle) themeToggle.textContent = '🌙';
  if(profileImg) profileImg.setAttribute('src', 'NightProfile.png');
} else {
  if(themeToggle) themeToggle.textContent = '☀️';
  if(profileImg) profileImg.setAttribute('src', 'MorningProfile.png');
}

if(themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    const currentProfileImg = document.getElementById('profile-img');
    if(currentProfileImg) currentProfileImg.setAttribute('src', isDark ? 'NightProfile.png' : 'MorningProfile.png');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

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
    document.querySelector('.typing-text').textContent = currentPhrase.substring(0, letterIndex);
    const spotlightText = document.querySelector('.typing-text-spotlight');
    if (spotlightText) {
      spotlightText.textContent = currentPhrase.substring(0, letterIndex);
    }
    letterIndex--;
  } else {
    document.querySelector('.typing-text').textContent = currentPhrase.substring(0, letterIndex);
    const spotlightText = document.querySelector('.typing-text-spotlight');
    if (spotlightText) {
      spotlightText.textContent = currentPhrase.substring(0, letterIndex);
    }
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
  const scrolled = (winScroll / height);

  // Update HP bar
  if (hpFill) {
    const percentage = Math.min(Math.max(scrolled * 100, 0), 100);
    hpFill.style.width = `${percentage}%`;
    
    let r, g, b;
    if (percentage < 50) {
      r = 255;
      g = Math.round(5.1 * percentage);
      b = 0;
    } else {
      r = Math.round(255 - 5.1 * (percentage - 50));
      g = 255;
      b = 0;
    }
    hpFill.style.background = `rgb(${r}, ${g}, ${b})`;
  }

  // Show hide button container
  if (scrollContainer) {
    if (winScroll > 300) {
      scrollContainer.classList.add('visible');
    } else {
      scrollContainer.classList.remove('visible');
    }
  }
});

document.querySelectorAll('.project-card, section > div').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -3;
    const rotateY = ((x - centerX) / centerX) * 3;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  });
});

// Spotlight Logic
const heroSection = document.querySelector('.hero-section');
const spotlight = document.querySelector('.hero-content-spotlight');
if (heroSection && spotlight) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.setProperty('--mouse-x', `${x}px`);
    spotlight.style.setProperty('--mouse-y', `${y}px`);
  });
}

// Old Tic Tac Toe Logic removed to prevent conflicts.

// Project Filtering Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filterValue = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// Parallax Effect for Hero Section
const heroVisual = document.querySelector('.hero-visual');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.25}px)`;
  }
});

// Email link functionality
const emailLink = document.getElementById('email-link');
if(emailLink) {
  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = 'saha92873@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      const originalText = emailLink.innerHTML;
      emailLink.innerHTML = '▶ Copied!';
      emailLink.classList.add('text-glow-breathing');
      setTimeout(() => { 
        emailLink.innerHTML = originalText; 
        emailLink.classList.remove('text-glow-breathing');
      }, 2000);
    });
  });
}

// Tic-Tac-Toe Logic
const tttCells = document.querySelectorAll('.ttt-cell');
const tttReset = document.getElementById('ttt-reset');
const scoreP1El = document.getElementById('score-p1');
const scoreCpuEl = document.getElementById('score-cpu');

let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttGameActive = true;
let scoreP1 = 0;
let scoreCpu = 0;

const tttWinningConditions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleTttClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));
  
  if (tttBoard[index] !== '' || !tttGameActive) return;
  
  // P1 Move
  makeMove(index, 'X');
  if (checkTttWin('X')) {
    scoreP1++;
    if(scoreP1El) scoreP1El.textContent = scoreP1;
    tttGameActive = false;
    return;
  }
  if (!tttBoard.includes('')) {
    tttGameActive = false;
    return;
  }

  // CPU Move
  setTimeout(() => {
    if (!tttGameActive) return;
    let emptyCells = tttBoard.map((val, i) => val === '' ? i : null).filter(val => val !== null);
    if (emptyCells.length > 0) {
      const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      makeMove(randomMove, 'O');
      if (checkTttWin('O')) {
        scoreCpu++;
        if(scoreCpuEl) scoreCpuEl.textContent = scoreCpu;
        tttGameActive = false;
      }
    }
  }, 300);
}

function makeMove(index, player) {
  tttBoard[index] = player;
  tttCells[index].textContent = player;
}

function checkTttWin(player) {
  return tttWinningConditions.some(condition => {
    return condition.every(index => tttBoard[index] === player);
  });
}

function resetTttBoard() {
  tttBoard = ['', '', '', '', '', '', '', '', ''];
  tttGameActive = true;
  tttCells.forEach(cell => cell.textContent = '');
}

function resetTttScore() {
  scoreP1 = 0;
  scoreCpu = 0;
  if(scoreP1El) scoreP1El.textContent = scoreP1;
  if(scoreCpuEl) scoreCpuEl.textContent = scoreCpu;
  resetTttBoard();
}

tttCells.forEach(cell => cell.addEventListener('click', handleTttClick));
const tttResetBoardBtn = document.getElementById('ttt-reset-board');
const tttResetScoreBtn = document.getElementById('ttt-reset-score');
if (tttResetBoardBtn) tttResetBoardBtn.addEventListener('click', resetTttBoard);
if (tttResetScoreBtn) tttResetScoreBtn.addEventListener('click', resetTttScore);
