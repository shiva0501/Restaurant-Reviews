import React, { useState } from "react";

export default function Login(props){
    const initialUserState = {
        name: "",
        id: "",
    }

    const [ user, setUser ] = useState(initialUserState);

    const login = () => {
        props.login(user);
        props.history.push('/');
    }
    
    return(
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Username</label>
                    <input type="text" className="form-control" id="name" required vlaue={user.name} onChange={(e) => setUser({ ...user, name: e.target.value})} name="name" />
                </div>
                <div className="form=group">
                    <label htmlFor="id">ID</label>
                    <input type="text" className="form-control" id="id" value={user.id} onChange={(e) => setUser({ ...user, id: e.target.value })} name="id" />
                </div>
                <button onClick={login} className="btn btn-success">Login</button>
            </div>
        </div>
    )
}