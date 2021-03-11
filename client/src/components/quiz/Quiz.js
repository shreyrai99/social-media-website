import React, { useState } from 'react';
import { Link,withRouter } from 'react-router-dom';
function Quiz(){
    const questions = [
		{
			questionText: 'Process of inserting an element in stack is called',
			answerOptions: [
				{ answerText: 'Pop', isCorrect: false },
				{ answerText: 'Create', isCorrect: false },
				{ answerText: 'Push', isCorrect: true },
				{ answerText: 'Down', isCorrect: false },
			],
		},

		{
			questionText: 'Process of Removing an element from stack is called',
			answerOptions: [
				{ answerText: 'Pop', isCorrect: true },
				{ answerText: 'Create', isCorrect: false },
				{ answerText: 'Push', isCorrect: false },
				{ answerText: 'Down', isCorrect: false },
			],
		},
		
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many wonders are there in World?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},

		{
			questionText: 'What is the full form of HTML?',
			answerOptions: [
				{ answerText: 'Hyper Text Mark Up Language', isCorrect: true },
				{ answerText: 'Hollow Target Mark Up Language', isCorrect: false },
				{ answerText: 'Hyper Text Money Up Language', isCorrect: false },
				{ answerText: 'Hyperlink Transfer Mark Up Language', isCorrect: false },
			],
		},

		{
			questionText: 'A linear collection of data elements where the linear node is given by means of pointer is called?',
			answerOptions: [
				{ answerText: 'Node list', isCorrect: false },
				{ answerText: 'Linked list', isCorrect: true },
				{ answerText: 'Stack', isCorrect: false },
				{ answerText: 'Array', isCorrect: false },
			],
		},

		{
			questionText: 'Which is the most electronegative element in periodic table?',
			answerOptions: [
				{ answerText: 'Flourine', isCorrect: true },
				{ answerText: 'Chlorine', isCorrect: false },
				{ answerText: 'Oxygen', isCorrect: false },
				{ answerText: 'Sodium', isCorrect: false },
			],
		},

		{
			questionText: 'Where is the Taj Mahal located?',
			answerOptions: [
				{ answerText: 'Delhi', isCorrect: false },
				{ answerText: 'Patna', isCorrect: false },
				{ answerText: 'Jaipur', isCorrect: false },
				{ answerText: 'Agra', isCorrect: true },
			],
		},
		
	];
	const [currentQuestion,setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score,setScore] = useState(0);
	const handleAnswerClick = (isCorrect) =>{
		if(isCorrect)
		{
			setScore(score+1);
		}
		const nextQuestion = currentQuestion+1;
		if(nextQuestion<questions.length){
			setCurrentQuestion(nextQuestion);
		}
		else{
			setShowScore(true);
		}
	}

    return(
		<div>
			{showScore?
			(
				<div className="container">
					<Link to="/dashboard" className="btn btn-primary">
                        Go Back
                    </Link>
					<br /><br /><br />
					 <h1 className="display-4 text-center">You scored {score} out of {questions.length}</h1>
				</div>
			):
			(
				<div className="create-profile">
                	<div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
						<h1 className="display-4 text-center">Quiz Zone</h1>
						<p className="lead text-center">Mock quiz to test your knowledge and brush up your skills. Only you can see how you performed in the test.</p>
						<br/>
					 <div className="question-section">
						<span>Question {currentQuestion+1} of {questions.length}</span> 
						<br/>
						<div className="question-text">
							<h2>{questions[currentQuestion].questionText}</h2>
							<br/>
						</div>
						<div className="answer-section">
							{questions[currentQuestion].answerOptions.map((answerOption,keyA)=>(
								<div key={keyA}>								
								 {/*<button onClick={()=>{handleAnswerClick(answerOption.isCorrect)}}>Option {keyA+1}</button>
								  <p>{answerOption.answerText}</p>*/}	 

								  <button 
                                        type="button"
                                        className="btn btn-primary" onClick={()=>{handleAnswerClick(answerOption.isCorrect)}}>
                                        {answerOption.answerText}
                                  </button>

								 <br/> <br /> <br/>
								</div>
							))}
						</div>
					 </div>
					 </div>
					 </div>
					 </div>
				</div>
			)
			}
		</div>	
        
    )
}

export default Quiz;