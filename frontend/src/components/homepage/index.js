import { Link } from 'react-router-dom';
export default function HomePage() {
    return(
        <div className="homepage">
            <h1>Welcome to Doubts Overflow</h1>
            <h3>Get solution for all your doubts</h3>
            <div className="links">
                <Link to="/login"><span>Login</span></Link>
                &nbsp;&nbsp;
                <Link to="/signup"><span>Signup</span></Link>
            </div>
            <p>Designed by: Abhishek Kr. Sonkar</p>
        </div>
    );

}