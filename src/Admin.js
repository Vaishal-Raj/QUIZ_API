import {useState,useEffect} from "react";
export default function Admin(){
    const [data, setData] = useState([]);

    useEffect(()=>{
        fetch("http://localhost:3001/getAllUsers",{method:'GET',headers:{'Content-Type':'application/json'}})
        .then((promise)=>{
            if(!promise.ok) throw new Error("No users found!!");
            return promise.json();
        }).then(data=>{
            setData(data);
        }).catch(err=>{
            console.log(err);
        })

    },[])
    return (
        <div className="Admin">
            <h1>WELCOME ADMIN</h1>
            <center>
                <table>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Score</th>
                    </tr>
                {
                    data.map((user)=>{
                        return (
                            <tr>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.score}</td>
                            </tr>
                        )
                    })
                }
                </table>
            </center>
        </div>
    );
}