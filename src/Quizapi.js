import { useParams } from "react-router-dom"
import {useState,useEffect} from "react";
export default function Quiz(){
    const {username,email}=useParams();
    const [questions,setQuestions]=useState([]);
    const [qindex,setQindex]=useState(0);
    const [score,setscore]=useState(0);
    const [completed,setCompleted]=useState(false)
    const [timer,setTimer]=useState(15);
    const [selectedOption,setSelectedOption]=useState(null);

    console.log(email)
    useEffect(()=>{
        fetch("http://localhost:3001/getQs",{method:'GET',headers:{'Content-Type':'application/json'}})
        .then(promise=>{
            console.log("promise = ",promise);
            if(!promise.ok) throw new Error("questions not found!!");
            return promise.json();
        }).then((data)=>{

            const shuffledQuestions = shuffleArray(data);
            setQuestions(shuffledQuestions);
        }).catch(err=>console.log(err));
    },[])
    
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    
    // timer---------------------------------
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000);
        // Clear interval when component unmounts or when timer reaches 0
        if (timer === 0 || completed) {
            clearInterval(timerInterval);

        }
        //Set next question when timer reaches 0
        if (timer === 0 && qindex < questions.length - 1) {
            handleNextQuestion();
        }

        return () => clearInterval(timerInterval);
    }, [timer, qindex, questions, completed]);


    // check answer---------------------------------
    const checkAns = (e, selectedOption) => {
        const correctAnswer = questions[qindex].answer;
        setSelectedOption(selectedOption);       

        // Logic for checking the correct answer
        if (selectedOption === correctAnswer) {   
            setscore(score + 1);
            console.log('Correct answer!');
        } else {
            console.log('Incorrect answer!');
        }
    };

    const handleNextQuestion=()=>{
        setSelectedOption(null);
        setTimer(15);
        if(qindex===questions.length-1){
            // submit the quiz
            setCompleted(true);
        }
        if(qindex<questions.length-1){
            setQindex(qindex+1);
        }
    }
    //For updating score!!!
    const updateScore=()=>{
        const obj={email:email,score:score};
        fetch("http://localhost:3001/updateScore",{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)})
        .then((promise)=>{
            if(!promise.ok) throw new Error("Unable to update details!!");
            return promise.json();
        }).then((result)=>{
            console.log(result);
        }).catch(err=>console.log(err));
    }
    useEffect(()=>{
        if(completed)
            updateScore();
    },[completed])

    if(completed){
        window.location.href=`/Quiz/${username}/${email}/${score}`;
    }
    return (
        <div className="quiz">
            {
                questions.length===0?<div>No Questions</div>:
                <div className="question">
                    {/* <h1>Hi {username} {email}</h1> */}
                    <h2>{qindex+1}.{questions[qindex].question}</h2>
                    <ul>
                        <li className={selectedOption==='A'?"Selected":""} onClick={(e) => checkAns(e, 'A')}>{questions[qindex].A}</li>
                        <li className={selectedOption==='B'?"Selected":""} onClick={(e) => checkAns(e, 'B')}>{questions[qindex].B}</li>
                        <li className={selectedOption==='C'?"Selected":""} onClick={(e) => checkAns(e, 'C')}>{questions[qindex].C}</li>
                        <li className={selectedOption==='D'?"Selected":""} onClick={(e) => checkAns(e, 'D')}>{questions[qindex].D}</li>
                    </ul>
                    <button onClick={handleNextQuestion}>{qindex===questions.length-1?"Submit":"Next"}</button>
                    <p>Time Remaining: {timer} seconds</p>
                </div>
            }
            

        </div>
        


    )
}