import React from 'react';
import Blogs from './Blogs';
import NewBlog from './NewBlog';
import Notification from './Notification';
import Toggleable from './Toggleable';

function MainPage(props) {

    return (
        <>  
            { props.errorMessage && <Notification errorMessage={ props.errorMessage } /> }
            <h2>{ props.name } logged in <button onClick={ props.logOut }>Logout</button></h2>
            <Toggleable ref={ props.blogRef } buttonLabel="Create new blog" >
                <NewBlog createBlog={ props.createBlog } />
            </Toggleable>

            <h3>Blogs</h3>
            <ul className="bloglist">
                { props.blogs.map(blog => <Blogs key={ blog.id } blog={ blog }  blogLikes={ props.blogLikes } 
                    username={ props.username } deleteBlog={ props.deleteBlog }/> ) 
                }
            </ul>
        </>
    )
};

export default MainPage;

// import Toggleable from './Toggleable';


// function MainPage(props) {
//     return (
//         <>  
//             { props.errorMessage && <Notification errorMessage={ props.errorMessage } /> }
//             <h2>{ props.name } logged in <button onClick={ props.logOut }>Logout</button></h2>
//             {/* <Toggleable blogRef={ props.ref } createBlogProps={ props.createBlogProps }/> */}
//             <NewBlog ref={ props.ref } createBlogProps={ props.createBlogProps } />
//             <h3>Blogs</h3>
//             <ul className="bloglist">
//                 { props.blogs.map(blog => <Blogs key={ blog.id } blog={ blog } />) }
//             </ul>
//         </>
//     )
// });
// { <NewBlog ref={ ref } createBlogProps={ props.createBlogProps } /> }
// { <div style={ hideWhenVisible }>
//     <button onClick={toggleVisibility}>New Blog</button>
// </div>
// <div style={ showWhenVisible }>
//     { props.children }
//     <button onClick={ toggleVisibility }>Cancel</button>
// </div> }
