import { Link } from "react-router-dom";
import {useState} from "react";
export default function Login(){
    const [user,setUser] = useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [visible,setVisible]=useState(false);
    const [valid,setValid]=useState(null);
    const [action,setAction]=useState("");
    const [message,setMessage]=useState(null);

    const handleSubmit=(e)=>{
        e.preventDefault();
        n
        if(action==="signin"){
            const obj={email:email,password:password}
            console.log(obj)

            fetch("http://localhost:3001/getUser",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)})
            .then((promise)=>{
                if(!promise.ok) throw new Error("Error in fetching data!!");
                return promise.json();
            }).then((data)=>{
                console.log(data);
                if(data.message){
                    setValid(true);
                    setMessage(data.message);
                    console.log(user);
                    window.location.href=`/Quiz/${user}/${email}`;
                }
                else{
                    setMessage(data.error);
                    setValid(false);
                }
            }).catch(err=>console.log(err));
        }else{
            const obj={username:user,email:email,password:password}
            console.log(obj)
            fetch("http://localhost:3001/addUser",{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(obj)})
            .then((promise)=>{
                if(!promise.ok) throw new Error("Unable to add user");
                return promise.json();
            }).then((data)=>{
                console.log(data);
                if(data.message){
                    console.log(data.message);
                    setMessage(data.message);
                }
                else{
                    console.log(data.error);
                    setMessage(data.error);
                }
            }).catch(err=>console.log(err));
        }
        
    }
    return (
            <div id="Login-container">
                <form onSubmit={(e)=>{handleSubmit(e)}}>
                    <label for="username">UserName </label>
                    <input type="text" autoFocus id="username" onChange={(e)=>setUser(e.target.value)}/>
                    <br/>
                    <label for="email">Email </label>
                    <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)}/>
                    <br/>
                    <label for="password">Password </label>
                    <input type={visible?"text":"password"} id="password" onChange={(e)=>setPassword(e.target.value)} maxLength={8}/>
                    
                    <button onClick={()=>setVisible(!visible)}>{visible?"Hide":"Show"}</button>
                    <br/>
                    <input type="submit" value="Sign-in" onClick={()=>setAction("signin")}/> <input type="submit" value="Sign-up" onClick={()=>setAction("signup")}/> 
                </form>
                {message!==null && <p>{message}</p>}
                <Link to="/Admin"><button>Admin</button></Link>
            </div>
            
    );
}