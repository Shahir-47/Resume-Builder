/* eslint-disable no-mixed-spaces-and-tabs */
import { useState, useEffect } from "react";
import Accordion from "./Accordion";
import List from "./List";
import Form from "./Form";
import ascendLogo from "../assets/ascend.svg";
import descendLogo from "../assets/descend.svg";
import deleteLogo from "../assets/delete.svg";
import renameLogo from "../assets/rename.svg";
import add from "../assets/add.svg";
import PDFViewerComponent from "./PDFViewer";
import Modal from "./Modal";
import Toaster from "./Toaster";
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
	publicationForm,
	otherForm,
} from "../data.js";
import "../styles/InputForm.css";

function InputForm() {
	const [activeAccordionId, setActiveAccordionId] = useState(null);
	const [sections, setSections] = useState(() => {
		const savedSections = localStorage.getItem("sectionsData");
		const defaultSections = sectionsData.map((section, index) => ({
			...section,
			id: `${section.title}-${index}`,
		}));

		if (savedSections) {
			// Merge old data with new data
			const parsedSavedSections = JSON.parse(savedSections);
			const mergedSections = defaultSections.map((defaultSection) => {
				const savedSection = parsedSavedSections.find(
					(saved) => saved.title === defaultSection.title
				);
				return savedSection
					? { ...defaultSection, ...savedSection }
					: defaultSection;
			});
			return mergedSections;
		}

		return defaultSections;
	});

	const [isAddingSection, setIsAddingSection] = useState(false);
	const [newSectionName, setNewSectionName] = useState("");
	const [newSectionType, setNewSectionType] = useState("Education");
	const [editingIndex, setEditingIndex] = useState(-1);
	const [editTitle, setEditTitle] = useState("");
	const [showModal, setShowModal] = useState(false); // State for controlling modal visibility
	const [deleteSectionId, setDeleteSectionId] = useState(null); // State to track the section to be deleted
	const [toastMessage, setToastMessage] = useState(""); // State for toaster message
	const [toastType, setToastType] = useState("success"); // State for toaster type
	const [isToastVisible, setIsToastVisible] = useState(false); // State for toaster visibility

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
		Publication: publicationForm,
		Other: otherForm,
	};

	const handleAccordionClick = (id) => {
		// Disable toggle action if in edit mode
		if (editingIndex !== -1) return;

		setIsAddingSection(false); // Collapse new section form
		setActiveAccordionId((prevId) => (prevId === id ? null : id));
	};

	const handleSaveDetails = (id, itemIndex, data) => {
		const updatedSections = sections.map((section) => {
			if (section.id === id) {
				if (itemIndex === null) {
					section.data = data;
				} else if (section.type === "Personal") {
					section.data = data;
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
									: "title"
							],
						content: { ...data },
					};
				}
			}
			return section;
		});

		setSections(updatedSections);
		setToastMessage("Saved successfully!");
		setToastType("success");
		setIsToastVisible(true);

		// Save updated sections to local storage
		localStorage.setItem("sectionsData", JSON.stringify(updatedSections));
	};

	const handleAddEntry = (id, data) => {
		const updatedSections = sections.map((section) => {
			if (section.id === id) {
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
								: "title"
						],
					content: { ...data },
					position: section.data.length,
				};

				section.data.push(newEntry);
			}
			return section;
		});

		setSections(updatedSections);
		setToastMessage("Entry added successfully!");
		setToastType("success");
		setIsToastVisible(true);

		// Save updated sections to local storage
		localStorage.setItem("sectionsData", JSON.stringify(updatedSections));
	};

	const handleDeleteEntry = (sectionId, itemIndex) => {
		const updatedSections = sections.map((section) => {
			if (section.id === sectionId) {
				section.data = section.data.filter((_, i) => i !== itemIndex);
			}
			return section;
		});

		setSections(updatedSections);
		setToastMessage("Entry deleted successfully!");
		setToastType("success");
		setIsToastVisible(true);

		// Save updated sections to local storage
		localStorage.setItem("sectionsData", JSON.stringify(updatedSections));
	};

	const handleAddSection = () => {
		setIsAddingSection(true);
		setActiveAccordionId(null); // Collapse all existing accordions
	};

	const handleCancelAddSection = () => {
		setIsAddingSection(false);
		setNewSectionName("");
		setNewSectionType("Education");
	};

	const handleSaveNewSection = () => {
		if (!newSectionName.trim()) {
			setToastMessage("Section name cannot be empty.");
			setToastType("error");
			setIsToastVisible(true);
			return;
		}

		const newSection = {
			title: newSectionName,
			type: newSectionType,
			data: [],
			form: formTypes[newSectionType],
			id: `${newSectionName}-${sections.length}`, // Assign a unique ID to the new section
		};
		const updatedSections = [...sections, newSection];
		setSections(updatedSections);
		handleCancelAddSection();
		setToastMessage("Section added successfully!");
		setToastType("success");
		setIsToastVisible(true);

		// Save updated sections to local storage
		localStorage.setItem("sectionsData", JSON.stringify(updatedSections));
	};

	const handleDeleteSection = (id) => {
		// Set the section ID to be deleted and show the confirmation modal
		setDeleteSectionId(id);
		setShowModal(true); // Open the modal
	};

	const confirmDeleteSection = () => {
		const updatedSections = sections.filter(
			(section) => section.id !== deleteSectionId
		);
		setSections(updatedSections);
		setActiveAccordionId(null); // Collapse active accordion after deleting
		setShowModal(false); // Close the modal
		setToastMessage("Section deleted successfully!");
		setToastType("success");
		setIsToastVisible(true);

		// Save updated sections to local storage
		localStorage.setItem("sectionsData", JSON.stringify(updatedSections));
	};

	const handleMoveSection = (index, direction) => {
		const updatedSections = [...sections];
		let newIndex = index;

		if (direction === "up" && index > 0) {
			[updatedSections[index], updatedSections[index - 1]] = [
				updatedSections[index - 1],
				updatedSections[index],
			];
			newIndex = index - 1;
		} else if (direction === "down" && index < updatedSections.length - 1) {
			[updatedSections[index], updatedSections[index + 1]] = [
				updatedSections[index + 1],
				updatedSections[index],
			];
			newIndex = index + 1;
		}

		setSections(updatedSections);

		// Ensure the active section remains active
		setActiveAccordionId((prevId) => {
			if (prevId === sections[index].id) {
				// If the active section is the one being moved, it should remain active
				return updatedSections[newIndex].id;
			} else {
				// Otherwise, keep the current active section
				return prevId;
			}
		});

		setEditingIndex((prevIndex) =>
			prevIndex === index
				? newIndex
				: prevIndex === newIndex
				? index
				: prevIndex
		);

		// Save updated sections to local storage
		localStorage.setItem("sectionsData", JSON.stringify(updatedSections));
	};

	// Handle rename action
	const handleRenameSection = (index) => {
		setEditingIndex(index);
		setEditTitle(sections[index].title);
	};

	// Save the new name
	const handleSaveRename = (index) => {
		if (!editTitle.trim()) {
			setToastMessage("Section title cannot be empty.");
			setToastType("error");
			setIsToastVisible(true);
			return;
		}

		const updatedSections = [...sections];
		updatedSections[index].title = editTitle;
		setSections(updatedSections);
		setEditingIndex(-1);
		setToastMessage("Section renamed successfully!");
		setToastType("success");
		setIsToastVisible(true);

		// Save updated sections to local storage
		localStorage.setItem("sectionsData", JSON.stringify(updatedSections));
	};

	// Cancel the rename action
	const handleCancelRename = () => {
		setEditingIndex(-1);
	};

	// Effect to automatically hide the toaster after a few seconds
	useEffect(() => {
		if (isToastVisible) {
			const timer = setTimeout(() => {
				setIsToastVisible(false);
			}, 3000); // Hide after 3 seconds

			return () => clearTimeout(timer);
		}
	}, [isToastVisible]);

	return (
		<div className="content">
			<div className="input-form">
				{sections.map((section, index) => (
					<Accordion
						key={section.id} // Use the unique ID as the key
						title={section.title}
						isActive={activeAccordionId === section.id}
						onClick={() => handleAccordionClick(section.id)}
						editing={editingIndex === index}
						editTitle={editTitle}
						onTitleChange={setEditTitle}
						controls={
							editingIndex === index ? (
								<div className="section-controls">
									<button
										type="button"
										onClick={() => handleSaveRename(index)}
										className="save-btn"
										disabled={!editTitle.trim()}
										style={{
											borderRadius: "7px",
											padding: "0.25rem 0.5rem",
											marginLeft: "1.5rem",
											fontSize: "0.75rem",
										}}
									>
										Save
									</button>
									<button
										type="button"
										onClick={handleCancelRename}
										className="cancel-btn"
										style={{
											borderRadius: "7px",
											padding: "0.5rem",
											fontSize: "0.75rem",
										}}
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
										disabled={index === 0}
									>
										<img src={ascendLogo} alt="Move Up" />
									</button>
									<button
										type="button"
										onClick={() => handleMoveSection(index, "down")}
										className="move-down-button"
										disabled={index === sections.length - 1}
									>
										<img src={descendLogo} alt="Move Down" />
									</button>
									<button
										type="button"
										onClick={() => handleDeleteSection(section.id)}
										className="delete-section-button"
									>
										<img src={deleteLogo} alt="Delete" />
									</button>
									<button
										type="button"
										onClick={() => handleRenameSection(index)}
										className="rename-button"
									>
										<img src={renameLogo} alt="Rename" />
									</button>
								</div>
							)
						}
					>
						{section.type === "Personal" ? (
							<Form
								form={section.form}
								initialValues={section.data || {}}
								onSave={(data) => handleSaveDetails(section.id, null, data)}
								onCancel={() => setActiveAccordionId(null)}
							/>
						) : (
							<List
								items={{ form: section.form }}
								onSave={(itemIndex, formData) =>
									handleSaveDetails(section.id, itemIndex, formData)
								}
								data={section.data}
								onAdd={(data) => handleAddEntry(section.id, data)}
								onDelete={(itemIndex) =>
									handleDeleteEntry(section.id, itemIndex)
								}
							/>
						)}
					</Accordion>
				))}

				{!isAddingSection && (
					<button
						className="add-section-btn"
						type="button"
						onClick={handleAddSection}
					>
						<img src={add} alt="Add" />
					</button>
				)}

				{isAddingSection && (
					<div className="new-section-form">
						<h3>New Section</h3>
						<div className="new-section-input">
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
						</div>
						<div className="new-section-actions">
							<button
								type="button"
								onClick={handleSaveNewSection}
								disabled={!newSectionName.trim()}
								className="save-sec-btn"
							>
								Save Section
							</button>
							<button
								type="button"
								className="cancel-sec-btn"
								onClick={handleCancelAddSection}
							>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>
			<PDFViewerComponent sections={sections} />
			<Modal
				isOpen={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={confirmDeleteSection}
				message="Are you sure you want to delete this section?"
			/>
			<Toaster
				message={toastMessage}
				type={toastType}
				isVisible={isToastVisible}
			/>
		</div>
	);
}

export default InputForm;
