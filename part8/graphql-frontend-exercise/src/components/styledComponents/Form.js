import * as LabelPrimitive from "@radix-ui/react-label";
import { styled } from "@stitches/react";
import { blackA, purple } from "@radix-ui/colors";

export const InputDiv = styled("div", {
    display: "flex",
    flexDirection: "column"
})

const StyledLabel = styled(LabelPrimitive.Root, {
    fontSize: "1.125rem",
    margin: "0.10em 0.5em",
});

export const Input = styled("input", {
    all: "unset",
    fontSize: "1rem",
    height: "1.5em",
    margin: "2px 0",
    padding: "0.25em 0.5em",

    backgroundColor: `${blackA.blackA2}`,
    caretColor: `${purple.purple9}`,
    boxShadow: `0 0 0 1px ${blackA.blackA9}`,
    borderRadius: "0.25em",

    "&:focus": {
        outline: "none",
        boxShadow: `0 0 0 2px ${purple.purple9}`
    }
});

export const Button = styled("button", {
    fontSize: "0.925rem",
    padding: "0 0.5em",
    border: `1px solid ${purple.purple9}`,
    borderRadius: "0.25em",

    backgroundColor: `${purple.purple9}`,
    color: "white",
    transition: "background-color 0.25s, color 0.25s",

    "&:hover": {
        backgroundColor: `white`,
        color: `${purple.purple9}`
    }
});

export {
    StyledLabel as Label
};