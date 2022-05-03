import React from "react";

import * as Select from "@radix-ui/react-select";
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";
import {
	SelectTrigger,
	SelectIcon,
	SelectLabel,
	SelectContent,
	SelectViewport,
	SelectItem,
	SelectItemText,
	SelectItemIndicator,
	SelectScrollUpButton,
	SelectScrollDownButton,
} from "./styledComponents/SelectMenu";
import { Button, Input } from "./styledComponents/Form";

function AuthorYearForm({
	authors,
	curAuthor,
	authorYear,
	handleAuthorYearChange,
	handleAuthorChange,
	handleAuthorYearSubmit,
}) {
	return (
		<div>
			<h2>Edit Author's Birth</h2>

			<form onSubmit={handleAuthorYearSubmit}>
				<Select.Root
					value={curAuthor}
					onValueChange={(author) => handleAuthorChange(author)}
				>
					<SelectTrigger aria-label="Select Author name">
						<Select.Value />
						<SelectIcon>
							<ChevronDownIcon />
						</SelectIcon>
					</SelectTrigger>

					<SelectContent>
						<SelectScrollUpButton>
							<ChevronUpIcon />
						</SelectScrollUpButton>

						<SelectViewport>
							<Select.Group>
								<SelectLabel>Author Names</SelectLabel>

								{authors.map((author) => (
									<SelectItem
										key={author.id}
										value={author.name}
									>
										<SelectItemText>
											{author.name}
										</SelectItemText>

										<SelectItemIndicator>
											<CheckIcon />
										</SelectItemIndicator>
									</SelectItem>
								))}
							</Select.Group>
						</SelectViewport>

						<SelectScrollDownButton>
							<ChevronDownIcon />
						</SelectScrollDownButton>
					</SelectContent>
				</Select.Root>

				<div
					style={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<Input
						type="number"
						value={authorYear}
						onChange={(e) => handleAuthorYearChange(e)}
					/>

					<Button
						type="submit"
						css={{
							padding: "0.55em 0.75em",
							marginLeft: "0.5em",
						}}
					>
						Change
					</Button>
				</div>
			</form>
		</div>
	);
}

export default AuthorYearForm;
