import React from 'react';
import Navbar from './components/navbar';
import Routes from './routes';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import history from './history';

toast.configure();
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  const getUserName = async () => {
    return await fetch("http://localhost:9999/userinfo", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
      credentials: "include",
    })
    .then(r => r.json())
    .then((r) =>{
      if(r.auth) {
        setLoggedIn(true);
        setUserName(r.userName);
        return true;
      } else {
        history.push('/');
        toast.error("Please Login to Continue", { 
          autoClose: 2500, 
          closeButton: false, 
          hideProgressBar: true 
        });
        return false;
      }
    });
  }

  useEffect(() => {
    getUserName();
  },[]);

  const signupHandler = (fname, lname, email, password) => {
    fetch("http://localhost:9999/signup", {
      method: "POST",
      body: JSON.stringify({ firstName: fname, lastName: lname, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => {
        if(r.ok) { //true when response code is 2xx (b/w 200 - 299)
          return { success: true };
        } else {
          return r.json();
        }
      })
        .then((r) => {
          if(r.success === true) {
            alert("signed up successfully, please login to continue");
            history.push('/login');
          } else {
            setError(r.err);
            toast.error(r.err, { 
              autoClose: 2500, 
              closeButton: false, 
              hideProgressBar: true 
            });
          }
        });
  };

  const loginHandler = (email, password) => {
    fetch("http://localhost:9999/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
          if(r.auth === true) {
            localStorage.setItem("token", r.token);
            if(getUserName()) {
              history.push('/dashboard');
            }
          } else {
            setError(r.err);
            toast.error(r.err, { 
              autoClose: 2500, 
              closeButton: false, 
              hideProgressBar: true 
            });
          }
        });
  };

  const postQuestionHandler = (title, quesBody, tags,) => {
    title = title.trim();
    quesBody = quesBody.trim();
    if (title.length !== 0 && quesBody.length !== 0) {
      fetch("http://localhost:9999/post-question", {
        method: "POST",
        body: JSON.stringify({ title, quesBody, tags, userName }),
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        credentials: "include",
      })
        .then((r) => {
          if (r.ok) {
            toast.success("Question posted successfully", { 
              autoClose: 2500, 
              closeButton: false, 
              hideProgressBar: true 
            });
            history.push('/dashboard');
          } else {
            alert(r.err);
          }
        });
    } else {
      alert("Fields cannot be blank");
    }
  };

  const solveQuestionHandler = (ansBody, reqUrl) => {
    ansBody = ansBody.trim();
    if(ansBody.length !== 0) {
      fetch("http://localhost:9999/solve-question?" + reqUrl, {
        method: "POST",
        body: JSON.stringify({ ansBody, userName }),
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
        },
        credentials: "include",
      })
        .then((r) => {
          if(r.ok) {
            toast.success("Answer submitted successfully", { 
              autoClose: 2500, 
              closeButton: false, 
              hideProgressBar: true 
            });
          } else {
              alert(r.err);
          }
        });
    } else {
      alert("Cannot post empty answer");
    }
  };

  const votesHandler = (quesId, ansId, vote) => {
    fetch(`http://localhost:9999/update-votes?qid=${quesId}&aid=${ansId}&vote=${vote}`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
      },
      credentials: "include",
    })
      .then((r) => {
        if(r.ok) {
          toast.success("Votes updated", { 
            autoClose: 2500, 
            closeButton: false, 
            hideProgressBar: true 
          });
        } else {
            alert(r.err);
        }
      });
  };

  const logoutHandler = () => {
    fetch("http://localhost:9999/logout", {})
    .then(r => {
      if(r.ok) {
        setLoggedIn(false);
        setUserName(undefined);
        localStorage.removeItem("token");
        history.push('/');
      }
    })
  };
  
  return (
    <>
      {loggedIn ? <Navbar userName={userName} logoutHandler={logoutHandler} /> : null}
      <div className="auth-wrapper">
        <Routes
          loginHandler={loginHandler}
          signupHandler={signupHandler}
          postQuestionHandler={postQuestionHandler}
          solveQuestionHandler={solveQuestionHandler}
          votesHandler={votesHandler}
          error={error}
        />
      </div>
    </>
  );
}

export default App;