import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillLock, AiOutlineMail } from "react-icons/ai";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div className="auth-inner">
			<form>
				<h3>LogIn</h3>
				<div className="form-group">
					
					<label><AiOutlineMail/> Email Address</label>
					<input 
					type="email" 
					className="form-control" 
					placeholder="Enter email" 
					value={email} 
					onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-group">
					<label><AiFillLock/> Password</label>
					<input 
					type="password" 
					className="form-control" 
					placeholder="Enter password" 
					value={password} 
					onChange={(e) => setPassword(e.target.value)} />
				</div>
				<div className="form-group">
					<div className="custom-control custom-checkbox">
						<input type="checkbox" className="custom-control-input" id="customCheck1" />
						<label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
					</div>
				</div>
				{ props.error ? <div className="error">{props.error}</div> : null }
				<button 
				type="submit" 
				className="btn btn-primary btn-block" 
				onClick={ (e) => { e.preventDefault(); props.loginHandler(email, password) }}>Login</button>
				<p className="footer text-right">
					Not registered? <Link to="/signup">SignUp</Link>
				</p>
			</form>
			</div>
	);
}