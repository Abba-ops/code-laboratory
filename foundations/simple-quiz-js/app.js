const form = document.querySelector("#quizForm");
const totalScore = document.querySelector("#quizTotalScore");
const result = document.querySelector("#quizResult");
const correctAnswers = ["B", "B", "A", "A"];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let score = 0;
  const userAnswers = [
    form.questionOne.value,
    form.questionTwo.value,
    form.questionThree.value,
    form.questionFour.value,
  ];

  userAnswers.forEach((answer, index) => {
    if (answer === correctAnswers[index]) {
      score += 25;
    }
  });

  scrollTo(0, 0);
  result.classList.remove("d-none");

  let output = 0;
  const timer = setInterval(() => {
    totalScore.textContent = `${output}%`;
    if (output === score) {
      clearInterval(timer);
    } else {
      output++;
    }
  }, 10);
});
