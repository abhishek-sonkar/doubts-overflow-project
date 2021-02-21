import { useState, useEffect } from 'react';

export default function InputTags(props) {
    const [tags, setTags] = useState([]);
    const [currTag, setCurrTag] = useState("");

    useEffect(() => {
      props.alltagsHandler(tags);
    }, [tags]);

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    }

    const  inputKeyDown = (e) => {
        const val = currTag;
        if (e.keyCode === 13 && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
                return;
            }
            setTags([...tags, val]);
            setCurrTag("");
        } else if (e.keyCode === 8 && !val) {
            removeTag(tags.length - 1);
        }
    }

    return (
        <div className="input-tag">
        <ul className="input-tag__tags">
          { tags.map((tag, idx) => (
            <li key={tag}>
              {tag}
              <button type="button" onClick={() => removeTag(idx)}>+</button>
            </li>
          ))}
          <li className="input-tag__tags__input">
              <input 
                type="text" 
                onKeyDown={inputKeyDown} 
                value={currTag} 
                onChange={e => setCurrTag(e.target.value)}
                placeholder="Press enter key after tags to add more" />
          </li>
        </ul>
      </div>
    );
}