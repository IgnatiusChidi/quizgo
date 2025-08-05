'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Quiz() {

  const router = useRouter()
  const searchParams = useSearchParams();

  var scoreCount = 0

  function incrementCount (){
    scoreCount++
  }
  
  useEffect(() =>{
    const receivedValue = searchParams.get('apiUrl')
    decodeURIComponent(receivedValue)

    const quizMain = document.getElementById("quiz-main");
    const loadingText = document.getElementById("loading");

      fetch(receivedValue)
      .then(response =>{
          if (!response.ok) {
              console.log("An error occured")
          }
          return response.json()
      })
      .then(data =>{
        
      const level = data.results[0].difficulty
      const category = data.results[0].category
      console.log(category)

        for (let i = 0; i < data.results.length; i++) {
          var question = data.results[i].question
          let correctAnswer = data.results[i].correct_answer

          var incorrectAnswer1 = data.results[i].incorrect_answers[0]
          var incorrectAnswer2 = data.results[i].incorrect_answers[1]
          var incorrectAnswer3 = data.results[i].incorrect_answers[2]

          const answers = [correctAnswer, incorrectAnswer1, incorrectAnswer2, incorrectAnswer3]

          
          const shuffleAnswers = (array) =>{
            for (let i = array.length - 1; i > 0 ; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
              
            }
          }

          shuffleAnswers(answers)

          const quizCard = document.createElement('div');
          quizCard.id = "quiz-card"
          quizCard.innerHTML = `
            <h2>Question<span class="green"> ${i + 1}</span></h2>

            <p>${question}</p>
            
            <div class="options-container">
            ${answers.map((answer) => `
              <label class="options">
                <input type="radio" name="question-${i}" value="${answer}" class="radio-btn">
                ${answer}
              </label>
            `).join("")}
            </div>
          `

          quizMain.appendChild(quizCard);
          loadingText.remove()
          //if (quizMain.contains(quizCard)) {
          //  quizMain.innerHTML = `<h1 id="loading">Loading...</h1>`
          //}


          const submitBtn = document.getElementById("submit-btn");

          submitBtn.addEventListener("click", () => {
            const selectedOption = quizCard.querySelector('input[name="question-' + i + '"]:checked');
            if (selectedOption) {
              const selectedValue = selectedOption.value;
              if (selectedValue === correctAnswer) {
                incrementCount();
              }
            } else {
              console.log("No option selected.");
            }
            router.push(`/results?no=${data.results.length}&category=${category}&level=${level}&score=${scoreCount}`)

          });
        }

      })
      .catch(error =>{
          console.log(error)
      })

  },[searchParams])
    return (
      <div id="quiz-page">
        <div id="quiz-main">
          <h1 id="loading">Loading...</h1>
        </div>

        <div>
          <button id="submit-btn" className="button">Submit</button>
        </div>
      </div>
    )
  }