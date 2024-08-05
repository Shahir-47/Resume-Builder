import { useState } from "react";
import Form from "./Form";

function List({ items, onSave, data, onAdd, onDelete }) {
	const [activeIndex, setActiveIndex] = useState(-1);
	const [isAdding, setIsAdding] = useState(false);

	const handleItemClick = (index) => {
		if (isAdding) {
			setIsAdding(false); // Close add form when an existing item is clicked
		}
		setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const handleAddNew = () => {
		setIsAdding(true);
		setActiveIndex(-1); // Close all items when adding a new one
	};

	const handleSaveNew = (newData) => {
		onAdd(newData);
		setIsAdding(false);
	};

	const handleCancelAdd = () => {
		setIsAdding(false);
	};

	const handleCancelEdit = () => {
		setActiveIndex(-1);
	};

	const handleDelete = (index) => {
		onDelete(index); // Call the onDelete prop with the index to delete the item
		setActiveIndex(-1); // Close the form after deleting an item
	};

	const handleMoveItem = (index, direction) => {
		const updatedData = [...data];
		let newIndex = index;

		if (direction === "up" && index > 0) {
			[updatedData[index], updatedData[index - 1]] = [
				updatedData[index - 1],
				updatedData[index],
			];
			newIndex = index - 1;
		} else if (direction === "down" && index < updatedData.length - 1) {
			[updatedData[index], updatedData[index + 1]] = [
				updatedData[index + 1],
				updatedData[index],
			];
			newIndex = index + 1;
		}

		// Ensure the active item stays active when moved
		setActiveIndex((prevIndex) =>
			prevIndex === index
				? newIndex
				: prevIndex === newIndex
				? index
				: prevIndex
		);

		onSave(null, updatedData); // Save updated data
	};

	return (
		<div>
			{data.map((item, index) => (
				<div
					key={index}
					className={`item ${activeIndex === index ? "active" : ""}`}
				>
					<div className="item-header">
						<h2 onClick={() => handleItemClick(index)}>{item.title}</h2>
						<div className="item-controls">
							<button
								type="button"
								className="move-up-button"
								onClick={() => handleMoveItem(index, "up")}
								disabled={index === 0} // Disable if at the top
							>
								Up
							</button>
							<button
								type="button"
								className="move-down-button"
								onClick={() => handleMoveItem(index, "down")}
								disabled={index === data.length - 1} // Disable if at the bottom
							>
								Down
							</button>
							<button
								type="button"
								className="delete-button"
								onClick={() => handleDelete(index)}
							>
								Delete
							</button>
						</div>
					</div>
					{activeIndex === index && (
						<div className="item-content">
							<Form
								form={items.form}
								initialValues={item.content}
								onSave={(formData) => onSave(index, formData)}
								onCancel={handleCancelEdit} // Close form on cancel
							/>
						</div>
					)}
				</div>
			))}
			{isAdding && (
				<div className="item new-item">
					<Form
						form={items.form}
						initialValues={{}}
						onSave={handleSaveNew}
						onCancel={handleCancelAdd} // Close form on cancel
					/>
				</div>
			)}
			{!isAdding && ( // Only show "Add New" button when not adding
				<button type="button" onClick={handleAddNew}>
					Add New
				</button>
			)}
		</div>
	);
}

export default List;
