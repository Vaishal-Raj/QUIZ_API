import { Link,useParams } from "react-router-dom";

export default function Score(props){
    const {username,email,score}=useParams();
    return(
        <div className="score">
            <center>
                <h1>{username}</h1>
                <h1>Your Score is : <b>{score}</b></h1>
                <Link to="/"><button>Redirect to Login Page😊😊</button></Link>
            </center>
        </div>
    );
}