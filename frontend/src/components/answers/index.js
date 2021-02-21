import { useState } from 'react';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

export default function Answers(props) {
    const [disUp, setDisUp] = useState(false);
    const [disDown, setDisDown] = useState(false);

    return (
        <>
            <td width="30%">
                <button
                    className="btn btn-success"
                    onClick={() => {
                        props.handleVotes(props.quesId, props.currAns._id, "up");
                        setDisUp(true); setDisDown(false);
                    }}
                    disabled={disUp}><AiOutlineLike />
                </button>

                <b>&nbsp;&nbsp;{props.currAns.votes}&nbsp;&nbsp;</b>

                <button
                    className="btn btn-danger"
                    onClick={() => {
                        props.handleVotes(props.quesId, props.currAns._id, "down");
                        setDisDown(true); setDisUp(false);
                    }}
                    disabled={disDown}><AiOutlineDislike />
                </button>
                <p style={{ paddingTop: "5px" }}>
                    <b>Solved By: </b>{props.currAns.answeredBy}
                    <br /><b>On: </b>{props.currAns.answeredOnDate}
                </p>
            </td>
            <td><p>{props.currAns.ans}</p></td>
        </>
    );
}