import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import { prettyDOM } from "@testing-library/dom";
import NewBlog from "../components/NewBlog";

test("Testing creation of a new blog", () => {
    
    const createBlog = jest.fn();
    // blog = {
    //     title: "Test blog",
    //     author: "Jest",
    //     url: "http://localhost.com"
    // }

    const component = render(
        <NewBlog createBlog={ createBlog }/>
    );

    const showCreateButton = component.getByText("Create new blog");
    fireEvent.click(showCreateButton);

    const title = component.container.querySelector(".newTitle");
    fireEvent.change(title, { target: { value: "Testing blog" }});
    expect(title).toHaveValue("Testing blog");

    const author = component.container.querySelector(".newAuthor");
    fireEvent.change(author, { target: { value: "Jest" }});
    expect(author).toHaveValue("Jest");

    const url = component.container.querySelector(".newURL");
    fireEvent.change(url, { target: { value: "http://localhost.com" }});
    expect(url).toHaveValue("http://localhost.com");

    const submitButton = component.getByText("Create");
    fireEvent.click(submitButton);
    expect(createBlog.mock.calls).toHaveLength(1);
});