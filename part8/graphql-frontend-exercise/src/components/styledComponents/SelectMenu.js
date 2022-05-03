import * as Select from "@radix-ui/react-select";
// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { styled } from "@stitches/react";
import { purple, mauve } from "@radix-ui/colors";

const StyledTrigger = styled(Select.SelectTrigger, {
	all: "unset",
	padding: "0.5em 0.75em",
	borderRadius: "3px",
	border: `1px solid ${purple.purple9}`,
	color: `${purple.purple9}`,
    textTransform: "capitalize",
	transition: "background-color 0.25s, color 0.25s",

	"&:hover": {
		backgroundColor: `${purple.purple9}`,
		color: "white",
	},

	"&:focus": {
		boxShadow: "0 0 0 1px black",
	},
});

const StyledIcon = styled(Select.Icon, {
	marginLeft: "50",
});

const StyledLabel = styled(Select.Label, {
	color: `${mauve.mauve11}`,
    padding: "2px 25px"
});

const StyledContent = styled(Select.Content, {
	overflow: "hidden",
	backgroundColor: `white`,
	borderRadius: "3px",
	border: `1px solid ${purple.purple9}`,
	marginLeft: -10,
});

const StyledViewport = styled(Select.Viewport, {
	padding: "5px",
});

const StyledItem = styled(Select.Item, {
	position: "relative",
	display: "flex",
	// justifyContent: "center",
	alignItems: "center",
	padding: "5px 25px",

	// backgroundColor: `${purple.purple9}`,
	// color: "white",
	color: `${purple.purple9}`,
    textTransform: "capitalize",

	borderRadius: "3px",
	transition: "background-color 0.25s, color 0.25s",

	"&:focus": {
		outline: "none",
		// backgroundColor: "white",
		// color: `${purple.purple9}`,
		backgroundColor: `${purple.purple9}`,
		color: "white",
	},
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
	position: "absolute",
	left: 0,
	width: 25,
	height: 25,
	display: "inline-flex",
	justifyContent: "center",
	alignItems: "center",
});

const ScrollButtonStyles = {
	height: "25",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: "white",
	color: `${purple.purple9}`,
};

const StyledItemText = styled(Select.ItemText, {
	border: "1px solid black",
});

const StyledScrollUpButton = styled(Select.ScrollUpButton, ScrollButtonStyles);
const StyledScrollDownButton = styled(
	Select.ScrollDownButton,
	ScrollButtonStyles,
);

export {
	StyledTrigger as SelectTrigger,
    StyledIcon as SelectIcon,
	StyledLabel as SelectLabel,
	StyledContent as SelectContent,
	StyledViewport as SelectViewport,
	StyledItem as SelectItem,
	StyledItemText as SelectItemText,
	StyledItemIndicator as SelectItemIndicator,
	StyledScrollUpButton as SelectScrollUpButton,
	StyledScrollDownButton as SelectScrollDownButton,
};
