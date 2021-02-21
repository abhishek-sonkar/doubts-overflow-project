import { useState, useEffect } from 'react';
import Answers from '../answers';

export default function Solution(props) {

    const [ques, setQues] = useState({
        questionTitle: "",
        questionBody: "",
    });
    const [solnArray, setSolnArray] = useState([]);
    const [ansBody, setAnsBody] = useState("");
    const [toggler, setToggler] = useState(false);
    
    const fullUrl = window.location.href;
    const reqUrl = fullUrl.split('?');
    const quesId = fullUrl.split('=');

    const handleVotes = (qId, aId, vote) => {
        props.votesHandler(qId, aId, vote);
        setToggler(!toggler);
    }
    
    useEffect(() => {
        const temp = [];
        fetch("http://localhost:9999/solve-question?" + reqUrl[1], {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .then((r) => {
            setQues({
                questionTitle: r.question.title,
                questionBody: r.question.quesBody,
            });
            r.answers.forEach((ansr) => {
                temp.push(ansr);
            });
            setSolnArray([...temp]);
        });
      }, [toggler]);

    const tableData = (currAns, idx) => {
        return (
            <tr key={idx}>
                <Answers 
                currAns={currAns}
                quesId={quesId[1]}
                handleVotes={handleVotes} />
            </tr>
        );
    }

    return (
        <div className="auth-inner" style={{ overflow: 'auto', width: '98%' }}>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th colSpan="3">
                            <h3 style={{textAlign: "left", padding: "15px"}}>{ques.questionTitle}</h3>
                            <p style={{textAlign: "left", padding: "15px"}}>{ques.questionBody}</p>
                        </th>
                    </tr>
                </thead>
                <tbody>{solnArray.map(tableData)}</tbody>
            </table>
            <br/>
            <br/>
            <div className="form-group">
                <label><h4>Your Answer</h4></label>
                <textarea 
                className="form-control" 
                rows="5" 
                placeholder="Write your solution here" 
                value={ansBody} 
                onChange={(e) => setAnsBody(e.target.value)} />
            </div>
            <button 
            type="submit" 
            className="btn btn-primary"
            onClick={(e) => {e.preventDefault(); 
            props.solveQuestionHandler(ansBody, reqUrl[1]);
            setToggler(!toggler);
            setAnsBody("")}}>Post Your Answer</button>
        </div>
    );
}