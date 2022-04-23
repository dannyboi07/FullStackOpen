import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, prettyDOM, render } from "@testing-library/react";
import Blogs from "../components/Blogs";

describe("<Blogs />", () => {
    let component;

    const blog = {
        title: "Blog for jest test",
        author: "Jest",
        url: "http://localhost.com",
        likes: 69,
        user: {
            username: "danny",
        },
    };

    const blogLikes = jest.fn();

    const deleteBlog = jest.fn();

    const username = "danny";

    beforeEach(() => {
        component = render(
            <Blogs blog={ blog } blogLikes={ blogLikes } 
                deleteBlog={ deleteBlog } username={ username } />
        );    
    });

    test("renders only blog and author", () => {

        const title = component.container.querySelector(".blog-title");
        // console.log(prettyDOM(title));
        expect(title).toHaveTextContent(`${blog.title} by ${blog.author}`);
    });

    test("checks render of url and likes", () => {
        
        const button = component.getByText('View');
        fireEvent.click(button);
        
        const blogDetails = component.container.querySelector(".transitionDivClass");
        expect(blogDetails).toHaveTextContent("http://localhost.com");
        expect(blogDetails).toHaveTextContent(69);
    });

    test("double clicks like button", () => {
        const viewButton = component.getByText("View");
        fireEvent.click(viewButton);

        const likeButton = component.getByText("Like");
        fireEvent.click(likeButton);
        fireEvent.click(likeButton);
        expect(blogLikes.mock.calls).toHaveLength(2);
    });
});