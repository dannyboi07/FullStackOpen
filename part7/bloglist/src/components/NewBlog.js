import React, { useState } from 'react';

function NewBlog({ createBlog }) {
    const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });

    function addBlog(e) {
        e.preventDefault();

        createBlog(newBlog);
        setNewBlog({ title: "", author: "", url: "" });

    }

    return (
        <div className="createBlog">
            <h3>Create new blog</h3>
            <form  onSubmit={ addBlog } >
                Title: <input className="newTitle" type="text" value={ newBlog.title } 
                    onChange={e => setNewBlog({ ...newBlog, title: e.target.value })}/>
                
                Author: <input className="newAuthor" type="text" value={ newBlog.author }
                    onChange={e => setNewBlog({ ...newBlog, author: e.target.value}) } />
                
                URL: <input className="newURL" type="url" placeholder="https://google.com" value={ newBlog.url }
                    onChange={e => setNewBlog({ ...newBlog, url: e.target.value })} />
                
                <button id="submit-new-blog" type="submit" disabled={ newBlog.title === "" 
                    ||  newBlog.author === "" ||  newBlog.url === "" }>Create</button>
            </form>
        </div>
    );
};

export default NewBlog;

// const [visibility, setVisibility] = useState(false);

// const visiblityStyle = { display: visibility ? "" : "none" };
// const createBlogLabel = visibility ? "Cancel" : "Create new blog";

// function toggleVisibility() {
//     setVisibility(!visibility);
// }

// useImperativeHandle(ref, () => {
//     return {toggleVisibility};
// });