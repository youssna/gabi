// ==========================================
// 1. CONFIGURATION DES RÉPONSES
// ==========================================
// IMPORTANT : Tout en minuscules, sans accents si possible.
const correctAnswers = {
    1: "2023-02-18", // La date au format ANNEE-MOIS-JOUR
    2: "paris",
    3: "egypte",    // Exemple film
    4: "gros porc"      // Exemple surnom
    // L'étape 5 est le jeu, pas besoin de réponse ici.
};


// ==========================================
// 2. LOGIQUE DES QUESTIONS (Étapes 1 à 4)
// ==========================================
function checkAnswer(stepNumber) {
    const input = document.getElementById('answer-' + stepNumber);
    const errorMsg = document.getElementById('error-' + stepNumber);
    const currentStepDiv = document.getElementById('step-' + stepNumber);

    if (!input) return;

    let userAnswer = input.value.trim().toLowerCase();

    if (userAnswer === correctAnswers[stepNumber]) {
        errorMsg.textContent = "";
        changeStep(stepNumber, stepNumber + 1);
    } else {
        errorMsg.innerHTML = "Ah non ! Réessaie... 🤨";
        input.style.border = "2px solid red";
        shakeElement(input);
    }
}


// ==========================================
// 3. LOGIQUE DU JEU DE CLIC (Étape 5)
// ==========================================
let loveScore = 0;
let isGameRunning = false;
let gameInterval;

function mashButton() {
    if (!isGameRunning) {
        isGameRunning = true;
        startGameLoop();
    }
    // Difficulté : +7% par clic
    loveScore += 7; 
    updateBar();
    if (loveScore >= 100) winGame();
}

function startGameLoop() {
    gameInterval = setInterval(() => {
        // Difficulté : -3% toutes les 0.1s
        if (loveScore > 0) loveScore -= 3;
        updateBar();
    }, 100);
}

function updateBar() {
    if (loveScore < 0) loveScore = 0;
    if (loveScore > 100) loveScore = 100;
    const bar = document.getElementById('love-bar');
    if (bar) bar.style.width = loveScore + "%";
}

function winGame() {
    clearInterval(gameInterval);
    loveScore = 100;
    updateBar();
    // Le jeu est gagné, on va à l'étape de la question finale
    setTimeout(() => {
        changeStep(5, 'question');
    }, 500);
}


// ==========================================
// 4. GESTION DES BOUTONS FINAUX (OUI / NON)
// ==========================================

// Si elle clique sur OUI
document.getElementById('btn-oui').addEventListener('click', function() {
    changeStep('question', null); // On cache la question
    document.getElementById('result-oui').style.display = 'block'; // On affiche le résultat OUI
    launchBigConfetti(); // Boum !
});

// Si elle clique sur NON
document.getElementById('btn-non').addEventListener('click', function() {
    changeStep('question', null); // On cache la question
    document.getElementById('result-non').style.display = 'block'; // On affiche le résultat NON (Meme)
});


// ==========================================
// 5. FONCTIONS UTILITAIRES
// ==========================================

// Fonction pour passer d'une étape à une autre proprement
function changeStep(currentIdSuffix, nextIdSuffix) {
    const current = document.getElementById('step-' + currentIdSuffix);
    if(current) {
        current.style.display = 'none';
        current.classList.remove('active');
    }

    if(nextIdSuffix) {
        const next = document.getElementById('step-' + nextIdSuffix);
        if(next) {
            next.style.display = 'block';
            next.classList.add('active');
        }
    }
}

// Petite animation quand ça tremble
function shakeElement(element) {
    element.style.transform = "translateX(5px)";
    setTimeout(() => { element.style.transform = "translateX(-5px)"; }, 50);
    setTimeout(() => { element.style.transform = "translateX(5px)"; }, 100);
    setTimeout(() => { element.style.transform = "translateX(0)"; }, 150);
}

// Fonction de confettis (nécessite le script dans le HTML)
function launchBigConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) { return clearInterval(interval); }
      var particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}