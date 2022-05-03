import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { styled } from "@stitches/react";
import { purple } from "@radix-ui/colors";

const StyledNavMenu = styled(NavigationMenuPrimitive.Root, {
    borderBottom: `1px solid ${purple.purple11}`,
    height: "50px",

    "& > div": {
        height: "100%",
        display: "flex",
        alignItems: "center",
    }
});

const StyledNavMenuList = styled(NavigationMenuPrimitive.List, {
    all: "unset",
    display: "flex",
    padding: "0 0.5em",
    listStyle: "none"
});

const StyledNavMenuItem = styled(NavigationMenuPrimitive.Item, {
    height: "2em",
    margin: "0 0.5em",
    border: "1px solid white",
    borderRadius: "0.25em",
    backgroundColor: `${purple.purple9}`,
    transition: "background-color 0.25s",
    // border: "1px solid black",

    "&": {
        "& > *": {
            marginTop: "-1px",
            height: "100%",
            padding: "0 0.5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textDecoration: "none",
            transition: "color 0.25s",
            // border: "1px solid black"
        },

        "&:hover": {
            backgroundColor: "white",
            border: `1px solid ${purple.purple9}`,

            "& > *": {
                color: `${purple.purple9}`,

                "&:not(a)": {
                    cursor: "pointer"
                }
            }
        }
    }
});

export {
    StyledNavMenu as NavMenu,
    StyledNavMenuList as NavMenuList,
    StyledNavMenuItem as NavMenuItem
}