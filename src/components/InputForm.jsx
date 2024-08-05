import { useState } from "react";
import Accordion from "./Accordion";
import List from "./List";
import Form from "./Form";
import PDFViewerComponent from "./PDFViewer";
import {
	sectionsData,
	educationForm,
	workExperienceForm,
	projectForm,
	achievementsForm,
	certificationsForm,
	skillsForm,
	languagesForm,
	hobbiesForm,
	interestsForm,
	otherForm,
} from "../data.js"; // Import sectionsData and other forms
import "../styles/InputForm.css";

function InputForm() {
	const [activeAccordionIndex, setActiveAccordionIndex] = useState(-1);
	const [sections, setSections] = useState(sectionsData); // Use sectionsData to initialize the state
	const [isAddingSection, setIsAddingSection] = useState(false);
	const [newSectionName, setNewSectionName] = useState("");
	const [newSectionType, setNewSectionType] = useState("Education");
	const [editingIndex, setEditingIndex] = useState(-1); // Track which section is being renamed
	const [editTitle, setEditTitle] = useState(""); // Track the new title being edited

	const formTypes = {
		Education: educationForm,
		"Work Experience": workExperienceForm,
		Project: projectForm,
		Achievement: achievementsForm,
		Certification: certificationsForm,
		Skill: skillsForm,
		Language: languagesForm,
		Hobby: hobbiesForm,
		Interest: interestsForm,
		Other: otherForm,
	};

	const handleAccordionClick = (index) => {
		// Disable toggle action if in edit mode
		if (editingIndex !== -1) return;

		setIsAddingSection(false); // Collapse new section form
		setActiveAccordionIndex((prevIndex) => (prevIndex === index ? -1 : index));
	};

	const handleSaveDetails = (index, itemIndex, data) => {
		const updatedSections = [...sections];
		const section = updatedSections[index];

		// Update the entire data array within the section
		if (itemIndex === null) {
			// Update entire section data array
			section.data = data;
		} else if (section.type === "Personal") {
			section.data = data; // Update personal details
		} else {
			section.data[itemIndex] = {
				...section.data[itemIndex],
				title:
					data[
						section.type === "Education"
							? "universityName"
							: section.type === "Work Experience"
							? "position"
							: section.type === "Project"
							? "projectName"
							: section.type === "Achievement"
							? "achievement"
							: section.type === "Certification"
							? "certification"
							: section.type === "Skill"
							? "skill"
							: section.type === "Language"
							? "language"
							: section.type === "Hobby"
							? "hobby"
							: section.type === "Interest"
							? "interest"
							: "title" // Handle the "Other" form
					], // Update title based on section type
				content: { ...data },
			};
		}

		setSections(updatedSections);
	};

	const handleAddEntry = (index, data) => {
		const updatedSections = [...sections];
		const section = updatedSections[index];

		const newEntry = {
			title:
				data[
					section.type === "Education"
						? "universityName"
						: section.type === "Work Experience"
						? "position"
						: section.type === "Project"
						? "projectName"
						: section.type === "Achievement"
						? "achievement"
						: section.type === "Certification"
						? "certification"
						: section.type === "Skill"
						? "skill"
						: section.type === "Language"
						? "language"
						: section.type === "Hobby"
						? "hobby"
						: section.type === "Interest"
						? "interest"
						: "title" // Handle the "Other" form
				],
			content: { ...data },
			// Add a position field to each entry to keep track of its position
			position: section.data.length,
		};

		section.data.push(newEntry);
		setSections(updatedSections);
	};

	const handleDeleteEntry = (sectionIndex, itemIndex) => {
		const updatedSections = [...sections];
		updatedSections[sectionIndex].data = updatedSections[
			sectionIndex
		].data.filter((_, i) => i !== itemIndex);
		setSections(updatedSections);
	};

	const handleAddSection = () => {
		setIsAddingSection(true);
		setActiveAccordionIndex(-1); // Collapse all existing accordions
	};

	const handleCancelAddSection = () => {
		setIsAddingSection(false);
		setNewSectionName("");
		setNewSectionType("Education");
	};

	const handleSaveNewSection = () => {
		const newSection = {
			title: newSectionName,
			type: newSectionType,
			data: [],
			form: formTypes[newSectionType],
		};
		setSections([...sections, newSection]);
		handleCancelAddSection(); // Reset form and close
	};

	const handleDeleteSection = (index) => {
		const updatedSections = sections.filter((_, i) => i !== index);
		setSections(updatedSections);
		setActiveAccordionIndex(-1); // Collapse active accordion after deleting
	};

	const handleMoveSection = (index, direction) => {
		const updatedSections = [...sections];
		let newIndex = index;

		if (direction === "up" && index > 0) {
			// Swap the current section with the one above it
			[updatedSections[index], updatedSections[index - 1]] = [
				updatedSections[index - 1],
				updatedSections[index],
			];
			newIndex = index - 1;
		} else if (direction === "down" && index < updatedSections.length - 1) {
			// Swap the current section with the one below it
			[updatedSections[index], updatedSections[index + 1]] = [
				updatedSections[index + 1],
				updatedSections[index],
			];
			newIndex = index + 1;
		}

		setSections(updatedSections);
		setActiveAccordionIndex((prevIndex) =>
			prevIndex === index
				? newIndex
				: prevIndex === newIndex
				? index
				: prevIndex
		); // Maintain active accordion
	};

	// Handle rename action
	const handleRenameSection = (index) => {
		setEditingIndex(index); // Set the section to be edited
		setEditTitle(sections[index].title); // Set the current title as the initial edit title
	};

	// Save the new name
	const handleSaveRename = (index) => {
		const updatedSections = [...sections];
		updatedSections[index].title = editTitle; // Update the section title
		setSections(updatedSections);
		setEditingIndex(-1); // Exit edit mode
	};

	// Cancel the rename action
	const handleCancelRename = () => {
		setEditingIndex(-1); // Exit edit mode
	};

	return (
		<div className="content">
			<div className="input-form">
				{sections.map((section, index) => (
					<Accordion
						key={index}
						title={section.title}
						isActive={activeAccordionIndex === index}
						onClick={() => handleAccordionClick(index)}
						editing={editingIndex === index} // Pass editing state
						editTitle={editTitle}
						onTitleChange={setEditTitle}
						controls={
							editingIndex === index ? ( // Check if this section is being edited
								<div className="section-controls">
									<button
										type="button"
										onClick={() => handleSaveRename(index)}
										className="save-button"
										disabled={!editTitle.trim()} // Disable save button if field is empty
									>
										Save
									</button>
									<button
										type="button"
										onClick={handleCancelRename}
										className="cancel-button"
									>
										Cancel
									</button>
								</div>
							) : (
								<div className="section-controls">
									<button
										type="button"
										onClick={() => handleMoveSection(index, "up")}
										className="move-up-button"
										disabled={index === 0} // Disable if at the top
									>
										Up
									</button>
									<button
										type="button"
										onClick={() => handleMoveSection(index, "down")}
										className="move-down-button"
										disabled={index === sections.length - 1} // Disable if at the bottom
									>
										Down
									</button>
									<button
										type="button"
										onClick={() => handleDeleteSection(index)}
										className="delete-section-button"
									>
										Delete
									</button>
									<button
										type="button"
										onClick={() => handleRenameSection(index)}
										className="rename-button"
									>
										Rename
									</button>
								</div>
							)
						}
					>
						{section.type === "Personal" ? (
							<Form
								form={section.form}
								initialValues={section.data || {}}
								onSave={(data) => handleSaveDetails(index, null, data)}
								onCancel={() => setActiveAccordionIndex(-1)} // Close accordion on cancel
							/>
						) : (
							<List
								items={{ form: section.form }}
								onSave={(itemIndex, formData) =>
									handleSaveDetails(index, itemIndex, formData)
								}
								data={section.data}
								onAdd={(data) => handleAddEntry(index, data)}
								onDelete={(itemIndex) => handleDeleteEntry(index, itemIndex)}
							/>
						)}
					</Accordion>
				))}

				<button type="button" onClick={handleAddSection}>
					Add New Section
				</button>
				{isAddingSection && (
					<div className="new-section-form">
						<h3>Add New Section</h3>
						<input
							type="text"
							placeholder="Section Name"
							value={newSectionName}
							onChange={(e) => setNewSectionName(e.target.value)}
						/>
						<select
							value={newSectionType}
							onChange={(e) => setNewSectionType(e.target.value)}
						>
							{Object.keys(formTypes).map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
						<button
							type="button"
							onClick={handleSaveNewSection}
							disabled={!newSectionName.trim()}
						>
							Save Section
						</button>
						<button type="button" onClick={handleCancelAddSection}>
							Cancel
						</button>
					</div>
				)}
			</div>
			<PDFViewerComponent sections={sections} />
		</div>
	);
}

export default InputForm;
