import * as React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import "./App.css";

function App() {
	const [numbersArray, setNumbersArray] = React.useState([1, 2, 3, 4, 5]);

	const handleOnDragEnd = (result, arrayToRearrange) => {
		console.log(result);
		if (!result.destination) {
			return;
		}

		let rearrangedArray = [];

		const copyOfArray = [...arrayToRearrange];

		let draggedElement = copyOfArray[result.source.index];

		copyOfArray.forEach((number, index) => {
			if (index === result.source.index) {
				console.log(number);
			} else if (index === result.destination.index) {
				result.destination.index > result.source.index
					? rearrangedArray.push(number, draggedElement)
					: rearrangedArray.push(draggedElement, number);
			} else {
				rearrangedArray.push(number);
			}
		});

		setNumbersArray(rearrangedArray);
	};

	return (
		<DragDropContext
			onDragEnd={(result) => handleOnDragEnd(result, numbersArray)}
		>
			{/* TODO: droppableId allows the library to keep track of this specific instance between interactions */}
			<Droppable droppableId="numbers">
				{/* TODO: this provided argument includes information and references to code that the library needs to work properly */}
				{(provided) => (
					<ul
						className="app_numbers-container"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{numbersArray.map((number, index) => {
							return (
								<Draggable
									key={`number_${index}`}
									draggableId={`draggable-number_${index}`}
									index={index}
								>
									{(provided) => (
										<li
											className="app_number"
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											{number}
										</li>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</DragDropContext>
	);
}

export default App;
