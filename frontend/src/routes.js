import { Router, Switch, Route } from 'react-router-dom';
import history from './history';
import HomePage from './components/homepage';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import Questions from './components/allQuestions';
import PostQuestion from './components/postQues';
import Solution from './components/solution';

export default function Routes(props) {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/login'>
                    <Login
                    loginHandler={props.loginHandler}
                    error={props.error} />
                </Route>
                <Route path='/signup'>
                    <Signup
                    signupHandler={props.signupHandler}
                    error={props.error} />
                </Route>
                <Route path='/dashboard'>
                    <Dashboard />
                </Route>
                <Route path='/all-questions'>
                    <Questions />
                </Route>
                <Route path='/post-question'>
                    <PostQuestion
                    postQuestionHandler={props.postQuestionHandler} />
                </Route>
                <Route path='/solve-question'>
                    <Solution
                    solveQuestionHandler={props.solveQuestionHandler}
                    votesHandler={props.votesHandler} />
                </Route>
                <Route path='/'>
                    <HomePage />
                </Route>
            </Switch>
        </Router>
    );
}