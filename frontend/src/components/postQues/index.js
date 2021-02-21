import { useState } from 'react';
import InputTags from '../inputTags';

export default function PostQuestion(props) {
	const [title, setTitle] = useState("");
	const [quesBody, setQuesBody] = useState("");
	const [alltags, setAllTags] = useState([]);

	const alltagsHandler = (tags) => {
		setAllTags(tags);
	}

	return (
        <div className="auth-inner" style={{ width: '70%' }}>
            <form>
			    <h3>Ask a Question</h3>
			    <div className="form-group">
				    <label>Title</label>
					<input 
					type="text" 
					className="form-control" 
					placeholder="Write your question here" 
					value={title} 
					onChange={(e) => setTitle(e.target.value)} />
			    </div>
			    <div className="form-group">
				    <label>Body</label>
					<textarea 
					className="form-control" 
					rows="5" 
					placeholder="Ques description, Code snippets, etc." 
					value={quesBody}
					onChange={(e) => setQuesBody(e.target.value)} />
			    </div>
			    <div className="form-group">
				    <label>Tags</label>
					<InputTags alltagsHandler={alltagsHandler}/>
			    </div>
				<button 
				type="button"
				className="btn btn-primary btn-block"
				onClick={(e) => {e.preventDefault(); 
				props.postQuestionHandler(title, quesBody, alltags);}} >Post Question</button>
		    </form>
        </div>
	);
}