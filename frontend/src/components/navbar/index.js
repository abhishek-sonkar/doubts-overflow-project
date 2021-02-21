import { BiLogOut } from "react-icons/bi";

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container">
            <a className="navbar-brand mb-0 h1" href="/dashboard">Doubts Overflow</a>
            <b className="navbar-text">LoggedIn As : {props.userName}</b>
            <button className="btn btn-warning" onClick={() => props.logoutHandler()}><BiLogOut/> LogOut</button>
          </div>
        </nav>
    );
}