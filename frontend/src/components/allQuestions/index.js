import { useState, useEffect } from 'react';
import history from '../../history';

export default function Questions() {
    const [quesArray, setQuesArray] = useState([]);
    
    useEffect(() => {
        const temp = [];
        fetch("http://localhost:9999/all-questions", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .then((r) => {
            r.forEach((element) => {
                temp.push({
                    title: element.question.title,
                    id: element._id,
                    askedBy: element.question.postedBy,
                    date: element.question.postedOnDate,
                    totalAnswers: element.answers.length,
                });
            });
            setQuesArray([...temp]);
        });
      }, []);
    
    const tableData = (currQues, idx) => {
        return (
            <tr key={idx}>
                <td onClick={() => history.push('/solve-question?id=' + currQues.id)}>
                    <h4>{currQues.title}</h4><br/>
                    <p><b>Asked By: </b>{currQues.askedBy} <b>On: </b>{currQues.date}</p>
                    <p><b>Total answers: </b>{currQues.totalAnswers}</p>
                </td>
            </tr>);
    };
    return (
        <div className="auth-inner" style={{ overflow: 'auto', width: '98%' }}>
            <table className="table table-hover">
                <tbody>{quesArray.map(tableData)}</tbody>
            </table>
        </div>
    );
}