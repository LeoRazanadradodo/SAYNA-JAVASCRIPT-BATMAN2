let quizData;

const introQuiz = document.getElementById('introjeu');
const quiz = document.getElementById('quiz');
const startBtn = document.getElementById('start');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const submitBtn = document.getElementById('submit');
const questionCounterEl = document.getElementById('questionCounter');

let currentQuiz = 0;
let score = 0;

startBtn.addEventListener('click', startQuiz);

function startQuiz() {
    introQuiz.style.display = 'none';
    quiz.style.display = 'block';

    // Chargez le fichier JSON depuis le serveur
    fetch('../assets/js/questions.json')
        .then(response => response.json())
        .then(data => {
            quizData = data;
            loadQuiz();
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
}

function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    // Supprimer tous les spans précédents
    const quizImgDiv = document.querySelector('.quiz-img');
    while (quizImgDiv.firstChild) {
        quizImgDiv.removeChild(quizImgDiv.firstChild);
    }

    // Ajouter le span avec le numéro de la question en cours
    const questionNumberSpan = document.createElement('span');
    questionNumberSpan.className = 'quest-' + (currentQuiz + 1);
    quizImgDiv.appendChild(questionNumberSpan);

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.response[0].text;
    b_text.innerText = currentQuizData.response[1].text;
    c_text.innerText = currentQuizData.response[2].text;

    // Assigne les valeurs aux éléments radio
    answerEls[0].value = currentQuizData.response[0].text.toLowerCase().replace(" ", "");
    answerEls[1].value = currentQuizData.response[1].text.toLowerCase().replace(" ", "");
    answerEls[2].value = currentQuizData.response[2].text.toLowerCase().replace(" ", "");

    // Mettre à jour le compteur de question
    questionCounterEl.innerText = `${currentQuiz + 1}/${quizData.length}`;

    // Vérifier si la question actuelle est la dernière question
    if (currentQuiz === quizData.length - 1) {
        submitBtn.innerText = 'Voir mon résultat';
    } else {
        submitBtn.innerText = 'Question suivante';
    }
}



function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl;
        }
    });
    return answer;
}

function showPopup() {
    // Afficher la popup avec le score
    const popup = document.getElementById('popup');
    const popupScore = document.getElementById('popup-score');
    popupScore.innerText = `${score}/${quizData.length} bravo !`;
    popup.style.display = 'block';
    // Cacher le compteur de question
    questionCounterEl.style.display = 'none';
}

function closePopup() {
    // Fermer la popup
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    // Recharger la page pour revenir à l'état initial
    window.location.reload();
}


function restartQuiz() {
    // Cacher la popup de résultat si elle est affichée
    const popup = document.getElementById('popup');
    popup.style.display = 'none';

    // Réinitialiser le compteur de question et le score
    currentQuiz = 0;
    score = 0;

    // Recharger la première question pour recommencer le quiz
    loadQuiz();

    // Afficher à nouveau le div du quiz et cacher le div d'introduction
    document.getElementById('introjeu').style.display = 'none';
    quiz.style.display = 'block';

    // Réinitialiser l'affichage du compteur de question
    questionCounterEl.style.display = 'block';
    questionCounterEl.innerText = `${currentQuiz + 1}/${quizData.length}`;
}



submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if (answer) {
        if (answer.value === quizData[currentQuiz].response.find(res => res.isGood).text.toLowerCase().replace(" ", "")) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showPopup();
            quiz.style.display = 'none';
        }
    }
});