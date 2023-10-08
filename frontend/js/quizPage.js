let questions = [];

async function getQuiz(){
    console.log("youmeiyou")
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');
    fetch(`/api/quizzes/id?id=${quizId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Quiz fetched successfully:', data);
      // Handle displaying the fetched quiz data on the webpage
      displayQuiz(data);
      questions = data.quiz;
    })
    .catch(error => {
      console.error('Error fetching quiz:', error);
      alert('An error occurred while fetching the quiz.');
    });
}

function displayQuiz(data) {
    const quizContainer = document.getElementById('quizContainer');
    
    // Display the quiz questions
    quizContainer.innerHTML = '';
  
    data.quiz.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.innerHTML = `
        <h3>Question ${index + 1}</h3>
        <p>${question.questionText}</p>
        ${question.options ? `<fieldset id="question${index}" class="question-fieldset">
        ${question.options.map((option, optionIndex) => `
          <label>
            <input type="radio" name="question${index}" value="${option}" id="option${optionIndex + 1}" ${optionIndex === question.correctAnswer ? 'checked' : ''}>
            ${option}
          </label>
        `).join('')}
      </fieldset>` : ''}
      ${ question.questionType === 'trueFalse' ? `    <div id="studentAnswer" class="trueOrFalse">
      <label for="studentAnswer">Your Answer:</label>
      <select id="trueFalseAnswer">
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
    </div>` : ''}
    ${ question.questionType === 'blankFilling' ? `<div id="studentAnswer" class="fillBlank">
    <label for="studentAnswer">Your Answer:</label>
    <input type="text" id="fillBlankAnswer" required>
  </div>` : ''}
        <hr>
      `;
      quizContainer.appendChild(questionDiv);
    });
  }

  function submitQuiz() {
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
  
    if (!studentId || !studentName) {
      alert('Please enter Student ID and Name.');
      return;
    }
  
    const quizResponses = [];
    questions.forEach((question, index) => {
      const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
      const studentanswer = document.getElementById('studentAnswer');
      console.log(selectedOption);
      console.log(question);
      if (selectedOption) {
        quizResponses.push({
          question: question.questionText,
          answer: question.correctAnswer,
          response: selectedOption.id
        });
      } else if (studentanswer){
        quizResponses.push({
            question: question.questionText,
            answer: question.correctAnswer,
            response: studentanswer.value
          });
      }
      else {
        quizResponses.push({
          question: question.questionText,
          response: 'Not answered'
        });
      }
    });
  
    const quizData = {
      studentId,
      studentName,
      quizResponses
    };
  
    console.log('Quiz Data:', quizData);
    // Send the quiz data to the backend (you need to implement this part)
  }
  


  getQuiz();