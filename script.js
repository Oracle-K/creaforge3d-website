// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observer tous les éléments avec la classe fade-in
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.service-card, .product-card, .feature');
    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Filtrage des produits
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Retirer la classe active de tous les boutons
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        // Ajouter la classe active au bouton cliqué
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        productCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.classList.remove('hidden');
                card.style.display = 'block';
            } else {
                card.classList.add('hidden');
                card.style.display = 'none';
            }
        });
    });
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Récupérer les données du formulaire
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message')
    };
    
    // Simulation d'envoi (à remplacer par votre logique d'envoi)
    showNotification('Merci ! Votre demande a été envoyée. Nous vous recontacterons sous 24h.', 'success');
    
    // Réinitialiser le formulaire
    contactForm.reset();
});

// Système de notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    const notificationContent = document.createElement('div');
    notificationContent.className = 'notification-content';
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message;
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Fermer la notification');
    closeButton.textContent = '×';
    notificationContent.appendChild(messageSpan);
    notificationContent.appendChild(closeButton);
    notification.appendChild(notificationContent);
    
    // Styles pour la notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 15px 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animer l'entrée
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-fermeture après 5 secondes
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Boutons "Commander" 
document.querySelectorAll('.product-card .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = button.closest('.product-card').querySelector('h3').textContent;
        
        // Pré-remplir le formulaire de contact
        document.getElementById('name').focus();
        document.getElementById('service').value = 'personnalise';
        document.getElementById('message').value = `Bonjour, je suis intéressé(e) par le produit "${productName}". Pouvez-vous me donner plus d'informations ?`;
        
        // Scroll vers le formulaire
        document.getElementById('contact').scrollIntoView({
            behavior: 'smooth'
        });
        
        showNotification('Formulaire pré-rempli ! Complétez vos informations pour recevoir un devis.', 'info');
    });
});

// Effet parallax léger sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Stats animées
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const suffix = stat.textContent.includes('%') ? '%' : 
                      stat.textContent.includes('+') ? '+' : 
                      stat.textContent.includes('h') ? 'h' : '';
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + suffix;
        }, 40);
    });
}

// Observer pour les stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
});

// Base application capture de voitures
document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app-base');
    if (!appRoot) {
        return;
    }

    const rarityPoints = {
        common: 10,
        rare: 25,
        epic: 50,
        legendary: 100
    };

    const rarityLabel = {
        common: 'Commun',
        rare: 'Rare',
        epic: 'Épique',
        legendary: 'Légendaire'
    };

    const garageStorageKey = 'creaforge3d_garage_v1';
    let captures = JSON.parse(localStorage.getItem(garageStorageKey) || '[]');
    if (!Array.isArray(captures)) {
        captures = [];
    }

    const el = {
        form: document.getElementById('carCaptureForm'),
        player: document.getElementById('capturePlayer'),
        brand: document.getElementById('carBrand'),
        model: document.getElementById('carModel'),
        rarity: document.getElementById('captureRarity'),
        quality: document.getElementById('captureQuality'),
        photoLive: document.getElementById('capturePhotoLive'),
        gpsOk: document.getElementById('captureGpsOk'),
        timeOk: document.getElementById('captureTimeOk'),
        filter: document.getElementById('garageFilter'),
        garageList: document.getElementById('garageList'),
        totalPoints: document.getElementById('baseTotalPoints'),
        totalCaptures: document.getElementById('baseTotalCaptures'),
        uniqueCars: document.getElementById('baseUniqueCars'),
        legendaryCount: document.getElementById('baseLegendaryCount'),
        commonCount: document.getElementById('baseCommonCount'),
        rareCount: document.getElementById('baseRareCount'),
        epicCount: document.getElementById('baseEpicCount'),
        legendaryRarityCount: document.getElementById('baseLegendaryRarityCount'),
        badge: document.getElementById('baseBadge')
    };

    function normalizeText(value) {
        return value.trim().toLowerCase().replace(/\s+/g, ' ');
    }

    function saveGarage() {
        localStorage.setItem(garageStorageKey, JSON.stringify(captures));
    }

    function getBadge(totalPoints, legendaryCount) {
        if (legendaryCount >= 5 || totalPoints >= 3000) {
            return 'Chasseur légendaire';
        }
        if (totalPoints >= 1500) {
            return 'Pilote Élite';
        }
        if (totalPoints >= 700) {
            return 'Collectionneur Expert';
        }
        if (totalPoints >= 250) {
            return 'Collectionneur';
        }
        return 'Débutant';
    }

    function renderGarage() {
        const activeFilter = el.filter.value;
        const filtered = activeFilter === 'all'
            ? captures
            : captures.filter((capture) => capture.rarity === activeFilter);

        if (!filtered.length) {
            el.garageList.innerHTML = '<li>Aucune capture pour le moment.</li>';
        } else {
            el.garageList.innerHTML = filtered.slice(0, 20).map((capture) => (
                `<li><strong>${capture.brand} ${capture.model}</strong> · ${rarityLabel[capture.rarity]} · Qualité ${capture.quality}/5 · +${capture.points} pts · ${capture.player} · ${new Date(capture.date).toLocaleString('fr-FR')}</li>`
            )).join('');
        }

        const totalPoints = captures.reduce((sum, capture) => sum + capture.points, 0);
        const uniqueModels = new Set(captures.map((capture) => capture.modelKey)).size;
        const countByRarity = {
            common: captures.filter((capture) => capture.rarity === 'common').length,
            rare: captures.filter((capture) => capture.rarity === 'rare').length,
            epic: captures.filter((capture) => capture.rarity === 'epic').length,
            legendary: captures.filter((capture) => capture.rarity === 'legendary').length
        };

        el.totalPoints.textContent = totalPoints;
        el.totalCaptures.textContent = captures.length;
        el.uniqueCars.textContent = uniqueModels;
        el.legendaryCount.textContent = countByRarity.legendary;
        el.commonCount.textContent = countByRarity.common;
        el.rareCount.textContent = countByRarity.rare;
        el.epicCount.textContent = countByRarity.epic;
        el.legendaryRarityCount.textContent = countByRarity.legendary;
        el.badge.textContent = `Badge actuel: ${getBadge(totalPoints, countByRarity.legendary)}`;
    }

    function isCaptureValid() {
        return el.photoLive.checked && el.gpsOk.checked && el.timeOk.checked;
    }

    el.form.addEventListener('submit', (event) => {
        event.preventDefault();

        if (!isCaptureValid()) {
            showNotification('Capture refusée: photo live, géolocalisation et horodatage sont requis.', 'info');
            return;
        }

        const player = el.player.value.trim() || 'Joueur';
        const brand = el.brand.value.trim();
        const model = el.model.value.trim();

        if (!brand || !model) {
            showNotification('Marque et modèle sont obligatoires.', 'info');
            return;
        }

        const rarity = el.rarity.value;
        const quality = Number(el.quality.value);
        const modelKey = normalizeText(`${brand} ${model}`);
        const duplicateCount = captures.filter((capture) => capture.modelKey === modelKey).length;

        if (duplicateCount >= 3) {
            showNotification('Limite de doublons atteinte pour ce modèle (max 3 captures).', 'info');
            return;
        }

        const firstDiscovery = duplicateCount === 0;
        const qualityMultiplier = 0.8 + (quality * 0.1);
        const duplicateMultiplier = duplicateCount > 0 ? 0.6 : 1;
        const firstDiscoveryBonus = firstDiscovery ? 20 : 0;
        const points = Math.round((rarityPoints[rarity] * qualityMultiplier * duplicateMultiplier) + firstDiscoveryBonus);

        captures.unshift({
            player,
            brand,
            model,
            rarity,
            quality,
            points,
            date: new Date().toISOString(),
            modelKey
        });

        saveGarage();
        renderGarage();
        el.brand.value = '';
        el.model.value = '';
        showNotification(`Capture validée: ${brand} ${model} (+${points} pts).`, 'success');
    });

    el.filter.addEventListener('change', renderGarage);
    renderGarage();
});

// Mode course 1v1
document.addEventListener('DOMContentLoaded', () => {
    const duelRoot = document.getElementById('duels');
    if (!duelRoot) {
        return;
    }

    const rarityPoints = {
        common: 10,
        rare: 25,
        epic: 50,
        legendary: 100
    };

    const rarityLabels = {
        common: 'Commun',
        rare: 'Rare',
        epic: 'Épique',
        legendary: 'Légendaire'
    };

    const rarityRank = {
        common: 1,
        rare: 2,
        epic: 3,
        legendary: 4
    };

    const state = {
        challengeAccepted: false,
        raceActive: false,
        mode: 'time',
        timeLeft: 600,
        timer: null,
        huntTargets: [],
        players: [
            { name: 'Joueur 1', score: 0, captures: 0, bestRarity: 'common', foundTargets: new Set() },
            { name: 'Joueur 2', score: 0, captures: 0, bestRarity: 'common', foundTargets: new Set() }
        ]
    };

    const historyKey = 'creaforge3d_duel_history';
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]');

    const el = {
        challengerName: document.getElementById('challengerName'),
        opponentName: document.getElementById('opponentName'),
        sendChallengeBtn: document.getElementById('sendChallengeBtn'),
        acceptChallengeBtn: document.getElementById('acceptChallengeBtn'),
        refuseChallengeBtn: document.getElementById('refuseChallengeBtn'),
        duelStatus: document.getElementById('duelStatus'),
        raceType: document.getElementById('raceType'),
        raceDuration: document.getElementById('raceDuration'),
        scoreTarget: document.getElementById('scoreTarget'),
        huntTargets: document.getElementById('huntTargets'),
        startRaceBtn: document.getElementById('startRaceBtn'),
        stopRaceBtn: document.getElementById('stopRaceBtn'),
        timer: document.getElementById('duelTimer'),
        winner: document.getElementById('duelWinner'),
        p1Title: document.getElementById('playerOneTitle'),
        p2Title: document.getElementById('playerTwoTitle'),
        p1Score: document.getElementById('player1Score'),
        p2Score: document.getElementById('player2Score'),
        p1Captures: document.getElementById('player1Captures'),
        p2Captures: document.getElementById('player2Captures'),
        p1BestRarity: document.getElementById('player1BestRarity'),
        p2BestRarity: document.getElementById('player2BestRarity'),
        p1Rarity: document.getElementById('player1Rarity'),
        p2Rarity: document.getElementById('player2Rarity'),
        p1Quality: document.getElementById('player1Quality'),
        p2Quality: document.getElementById('player2Quality'),
        p1Model: document.getElementById('player1Model'),
        p2Model: document.getElementById('player2Model'),
        p1Bonus: document.getElementById('player1FirstCaptureBonus'),
        p2Bonus: document.getElementById('player2FirstCaptureBonus'),
        p1PhotoLive: document.getElementById('player1PhotoLive'),
        p2PhotoLive: document.getElementById('player2PhotoLive'),
        p1GpsOk: document.getElementById('player1GpsOk'),
        p2GpsOk: document.getElementById('player2GpsOk'),
        p1TimeOk: document.getElementById('player1TimeOk'),
        p2TimeOk: document.getElementById('player2TimeOk'),
        p1CaptureBtn: document.getElementById('player1CaptureBtn'),
        p2CaptureBtn: document.getElementById('player2CaptureBtn'),
        leaderboard: document.getElementById('duelLeaderboard'),
        historyList: document.getElementById('duelHistoryList')
    };

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    function updateBoard() {
        el.p1Title.textContent = state.players[0].name;
        el.p2Title.textContent = state.players[1].name;
        el.p1Score.textContent = state.players[0].score;
        el.p2Score.textContent = state.players[1].score;
        el.p1Captures.textContent = state.players[0].captures;
        el.p2Captures.textContent = state.players[1].captures;
        el.p1BestRarity.textContent = state.players[0].captures ? rarityLabels[state.players[0].bestRarity] : 'Aucune';
        el.p2BestRarity.textContent = state.players[1].captures ? rarityLabels[state.players[1].bestRarity] : 'Aucune';
        el.timer.textContent = formatTime(state.timeLeft);
    }

    function saveHistory() {
        localStorage.setItem(historyKey, JSON.stringify(history));
    }

    function renderHistoryAndLeaderboard() {
        if (!history.length) {
            el.historyList.innerHTML = '<li>Aucune course enregistrée.</li>';
            el.leaderboard.innerHTML = '';
            return;
        }

        const sorted = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
        el.historyList.innerHTML = sorted.slice(0, 10).map((item) => (
            `<li><strong>${item.winner}</strong> a gagné (${item.mode}) contre ${item.loser} - ${item.score1} / ${item.score2} · Badge: ${item.badge} · ${new Date(item.date).toLocaleString('fr-FR')}</li>`
        )).join('');

        const winTable = {};
        history.forEach((race) => {
            winTable[race.winner] = (winTable[race.winner] || 0) + 1;
        });
        const ranked = Object.entries(winTable).sort((a, b) => b[1] - a[1]);
        el.leaderboard.innerHTML = ranked.map(([name, wins]) => (
            `<span class="duel-leaderboard-item">${name}: ${wins} victoire${wins > 1 ? 's' : ''}</span>`
        )).join('');
    }

    function setRaceButtons() {
        el.startRaceBtn.disabled = !state.challengeAccepted || state.raceActive;
        el.stopRaceBtn.disabled = !state.raceActive;
    }

    function resetRaceStats() {
        state.players = state.players.map((player) => ({
            ...player,
            score: 0,
            captures: 0,
            bestRarity: 'common',
            foundTargets: new Set()
        }));
        el.p1Bonus.checked = false;
        el.p2Bonus.checked = false;
        el.p1Model.value = '';
        el.p2Model.value = '';
    }

    function getBadge(winner) {
        if (state.mode === 'time') {
            return 'Sprinteur';
        }
        if (state.mode === 'hunt') {
            return 'Tracker';
        }
        if (rarityRank[winner.bestRarity] >= rarityRank.legendary) {
            return 'Chasseur Légendaire';
        }
        return 'Dueliste';
    }

    function stopRace(reason = 'Course terminée.') {
        if (!state.raceActive) {
            return;
        }

        clearInterval(state.timer);
        state.raceActive = false;
        setRaceButtons();

        const [p1, p2] = state.players;
        let winner = null;
        let loser = null;

        if (p1.score > p2.score) {
            winner = p1;
            loser = p2;
        } else if (p2.score > p1.score) {
            winner = p2;
            loser = p1;
        } else if (rarityRank[p1.bestRarity] > rarityRank[p2.bestRarity]) {
            winner = p1;
            loser = p2;
        } else if (rarityRank[p2.bestRarity] > rarityRank[p1.bestRarity]) {
            winner = p2;
            loser = p1;
        } else {
            el.winner.textContent = `${reason} Égalité parfaite entre ${p1.name} et ${p2.name}.`;
            showNotification('Course terminée sur une égalité parfaite.', 'info');
            updateBoard();
            return;
        }

        const badge = getBadge(winner);
        el.winner.textContent = `${reason} Vainqueur: ${winner.name} (${winner.score} pts).`;
        history.push({
            date: new Date().toISOString(),
            mode: state.mode,
            winner: winner.name,
            loser: loser.name,
            score1: p1.score,
            score2: p2.score,
            badge
        });
        saveHistory();
        renderHistoryAndLeaderboard();
        showNotification(`🏁 ${winner.name} remporte la course ! Badge: ${badge}`, 'success');
        updateBoard();
    }

    function updateRaceByMode() {
        state.mode = el.raceType.value;
        if (state.mode === 'time') {
            state.timeLeft = Number(el.raceDuration.value || 10) * 60;
        }
        if (state.mode === 'hunt') {
            state.huntTargets = el.huntTargets.value
                .split(',')
                .map((item) => item.trim().toLowerCase())
                .filter(Boolean);
        }
        updateBoard();
    }

    function startRace() {
        if (!state.challengeAccepted) {
            showNotification('Acceptez un défi avant de démarrer une course.', 'info');
            return;
        }
        if (state.raceActive) {
            return;
        }

        state.players[0].name = el.challengerName.value.trim() || 'Joueur 1';
        state.players[1].name = el.opponentName.value.trim() || 'Joueur 2';
        resetRaceStats();
        updateRaceByMode();
        state.raceActive = true;
        setRaceButtons();
        el.winner.textContent = 'Course active. Capturez des voitures pour marquer !';
        showNotification('Course 1v1 démarrée !', 'success');

        if (state.mode === 'time') {
            state.timer = setInterval(() => {
                state.timeLeft -= 1;
                if (state.timeLeft <= 0) {
                    state.timeLeft = 0;
                    updateBoard();
                    stopRace('Temps écoulé.');
                    return;
                }
                updateBoard();
            }, 1000);
        }

        updateBoard();
    }

    function antiCheatValid(playerIndex) {
        const checks = playerIndex === 0
            ? [el.p1PhotoLive.checked, el.p1GpsOk.checked, el.p1TimeOk.checked]
            : [el.p2PhotoLive.checked, el.p2GpsOk.checked, el.p2TimeOk.checked];
        return checks.every(Boolean);
    }

    function handleCapture(playerIndex) {
        if (!state.raceActive) {
            showNotification('Aucune course active.', 'info');
            return;
        }
        if (!antiCheatValid(playerIndex)) {
            showNotification('Capture refusée: vérifiez photo live, géolocalisation et horodatage.', 'info');
            return;
        }

        const player = state.players[playerIndex];
        const raritySelect = playerIndex === 0 ? el.p1Rarity : el.p2Rarity;
        const qualitySelect = playerIndex === 0 ? el.p1Quality : el.p2Quality;
        const modelInput = playerIndex === 0 ? el.p1Model : el.p2Model;
        const bonusInput = playerIndex === 0 ? el.p1Bonus : el.p2Bonus;

        const rarity = raritySelect.value;
        const quality = Number(qualitySelect.value);
        const model = modelInput.value.trim().toLowerCase();
        const qualityMultiplier = 0.8 + (quality * 0.1);
        const bonus = bonusInput.checked ? 30 : 0;
        const points = Math.round((rarityPoints[rarity] * qualityMultiplier) + bonus);

        player.score += points;
        player.captures += 1;
        if (rarityRank[rarity] > rarityRank[player.bestRarity]) {
            player.bestRarity = rarity;
        }
        if (state.mode === 'hunt' && model && state.huntTargets.includes(model)) {
            player.foundTargets.add(model);
        }

        bonusInput.checked = false;
        modelInput.value = '';
        updateBoard();

        if (state.mode === 'score') {
            const target = Number(el.scoreTarget.value || 500);
            if (player.score >= target) {
                stopRace(`Objectif score atteint (${target} pts).`);
                return;
            }
        }

        if (state.mode === 'hunt' && state.huntTargets.length) {
            if (player.foundTargets.size === state.huntTargets.length) {
                stopRace('Liste de chasse complétée.');
            }
        }
    }

    el.sendChallengeBtn.addEventListener('click', () => {
        const player1 = el.challengerName.value.trim() || 'Joueur 1';
        const player2 = el.opponentName.value.trim() || 'Joueur 2';
        state.challengeAccepted = false;
        setRaceButtons();
        el.duelStatus.textContent = `Statut: ${player1} a défié ${player2}. En attente de réponse.`;
        showNotification('Défi envoyé.', 'info');
    });

    el.acceptChallengeBtn.addEventListener('click', () => {
        state.challengeAccepted = true;
        setRaceButtons();
        el.duelStatus.textContent = 'Statut: défi accepté. Vous pouvez démarrer la course.';
        showNotification('Défi accepté.', 'success');
    });

    el.refuseChallengeBtn.addEventListener('click', () => {
        state.challengeAccepted = false;
        if (state.raceActive) {
            stopRace('Course annulée.');
        }
        setRaceButtons();
        el.duelStatus.textContent = 'Statut: défi refusé.';
        showNotification('Défi refusé.', 'info');
    });

    el.startRaceBtn.addEventListener('click', startRace);
    el.stopRaceBtn.addEventListener('click', () => stopRace('Course arrêtée manuellement.'));
    el.raceType.addEventListener('change', updateRaceByMode);
    el.p1CaptureBtn.addEventListener('click', () => handleCapture(0));
    el.p2CaptureBtn.addEventListener('click', () => handleCapture(1));

    updateRaceByMode();
    updateBoard();
    renderHistoryAndLeaderboard();
    setRaceButtons();
});
