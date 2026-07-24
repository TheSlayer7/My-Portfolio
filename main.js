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
const progressCircle = document.querySelector('.progress-ring__circle');
let radius = 22;
let circumference = radius * 2 * Math.PI;

if (progressCircle) {
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  if(themeToggle) themeToggle.textContent = '☀️';
}

if(themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
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

  // Update ring
  if (progressCircle) {
    const offset = circumference - scrolled * circumference;
    progressCircle.style.strokeDashoffset = offset;
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

// Tic Tac Toe Logic
const tictactoeCells = document.querySelectorAll('.tictactoe-board .cell');
const resetBtn = document.getElementById('resetGameBtn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreTieEl = document.getElementById('scoreTie');

let tttBoard = ['', '', '', '', '', '', '', '', ''];
let tttGameActive = true;
let tttScores = { X: 0, O: 0, Tie: 0 };
const WIN_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

if (tictactoeCells.length > 0) {
  tictactoeCells.forEach(cell => cell.addEventListener('click', handleCellClick));
  resetBtn.addEventListener('click', resetBoard);
}

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute('data-index'));

  if (tttBoard[index] !== '' || !tttGameActive) return;

  // Player move
  makeMove(index, 'X');
  
  if (checkWin('X')) {
    endGame('X');
    return;
  }
  if (checkDraw()) {
    endGame('Tie');
    return;
  }

  // AI move
  setTimeout(() => {
    let emptyCells = tttBoard.map((val, i) => val === '' ? i : null).filter(val => val !== null);
    if (emptyCells.length > 0 && tttGameActive) {
      const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      makeMove(randomMove, 'O');
      if (checkWin('O')) endGame('O');
      else if (checkDraw()) endGame('Tie');
    }
  }, 400);
}

function makeMove(index, player) {
  tttBoard[index] = player;
  const cell = document.querySelector(`.cell[data-index="${index}"]`);
  cell.textContent = player;
  cell.classList.add(player.toLowerCase());
}

function checkWin(player) {
  return WIN_CONDITIONS.some(condition => {
    return condition.every(index => tttBoard[index] === player);
  });
}

function checkDraw() {
  return tttBoard.every(cell => cell !== '');
}

function endGame(winner) {
  tttGameActive = false;
  if (winner === 'X') tttScores.X++;
  else if (winner === 'O') tttScores.O++;
  else tttScores.Tie++;
  
  scoreXEl.textContent = tttScores.X;
  scoreOEl.textContent = tttScores.O;
  scoreTieEl.textContent = tttScores.Tie;
}

function resetBoard() {
  tttBoard = ['', '', '', '', '', '', '', '', ''];
  tttGameActive = true;
  tictactoeCells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('x', 'o');
  });
}

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
  if (heroVisual) {
    const scrolled = window.scrollY;
    // Move the visual slightly slower than the scroll speed
    heroVisual.style.transform = `translateY(${scrolled * 0.25}px)`;
  }
});
