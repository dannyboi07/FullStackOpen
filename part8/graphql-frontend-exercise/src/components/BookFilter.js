import React from "react";

import * as Select from "@radix-ui/react-select";
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
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";

function BookFilter({ genres, curGenre, handleGenreChange }) {
	return (
		<div>
			<Select.Root
				value={curGenre}
				onValueChange={(genre) => handleGenreChange(genre)}
			>
				<SelectTrigger aria-label="Select genre of book">
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
							<SelectLabel>Genres</SelectLabel>

							{genres.map((genre, i) => (
								<SelectItem
                                    key={genre} // genre is guaranteed to be unique
									value={genre}
								>
									<SelectItemText>{genre}</SelectItemText>

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
		</div>
	);
}

export default BookFilter;
