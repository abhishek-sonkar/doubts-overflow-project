import { useState } from "react";
import { Link } from 'react-router-dom';
import { AiFillLock, AiOutlineMail } from "react-icons/ai"; 
import { BiRename } from "react-icons/bi";

export default function Login(props) {
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<div className="auth-inner">
			<form>
				<h3>SignUp</h3>
				<div className="form-group">
					<label><BiRename/> First Name</label>
					<input 
					type="text" 
					className="form-control" 
					placeholder="Enter first name" 
					value={fname} 
					onChange={(e) => setFname(e.target.value)} />
				</div>
				<div className="form-group">
					<label><BiRename/> Last Name</label>
					<input 
					type="text" 
					className="form-control" 
					placeholder="Enter last name" 
					value={lname} 
					onChange={(e) => setLname(e.target.value)} />
				</div>
				<div className="form-group">
					<label><AiOutlineMail/> Email Address</label>
					<input 
					type="email" 
					className="form-control" 
					placeholder="Enter your email" 
					value={email} 
					onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-group">
					<label><AiFillLock/> Password</label>
					<input 
					type="password" 
					className="form-control" 
					placeholder="Setup your password" 
					value={password} 
					onChange={(e) => setPassword(e.target.value)} />
				</div>
				{ props.error ? <div className="error">{props.error}</div> : null }
				<button 
				type="submit" 
				className="btn btn-primary btn-block"
				onClick={(e) => {e.preventDefault(); props.signupHandler(fname, lname, email, password)}} >Sign Up</button>
				<p className="footer text-right">
					Already registered <Link to="/login">LogIn</Link>
				</p>
			</form>
		</div>
	);
}