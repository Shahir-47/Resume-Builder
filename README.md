# Resume Builder Application

![image](https://github.com/user-attachments/assets/bf735d2b-8779-429b-a47d-5575ad218610)


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Components](#components)
- [Styling](#styling)
- [License](#license)

## Introduction

The Resume Builder Application is a web application designed to help users create, edit, and preview resumes in a structured format. Users can add various sections such as Personal Details, Education, Work Experience, Projects, Achievements, Certifications, Skills, Languages, Hobbies, Interests, and Others. The application also supports PDF preview of the generated resume.

**Live Demo:** [Resume Builder](https://resume-maker-template.netlify.app/)

**Source Code:** [GitHub Repository](https://github.com/Shahir-47/CV-Application)

## Features

- Add, edit, and delete various resume sections.
- Reorder sections.
- Preview the resume in PDF format.
- Responsive design.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shahir-47/CV-Application.git
   cd CV-Application
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open the application in your browser:

   ```bash
   http://localhost:5173/
   ```

2. Use the interface to add, edit, and delete resume sections.

3. Preview the resume using the PDF viewer embedded in the application.

## Project Structure

```
CV-APPLICATION/
├── public/
│ ├── resume.svg
├── src/
│ ├── assets/
│ │ ├── add.svg
│ │ ├── ascend.svg
│ │ ├── delete.svg
│ │ ├── descend.svg
| | ├── down-arrow.svg
│ │ ├── rename.svg
│ │ ├── resume.svg
│ │ ├── up-arrow.svg
│ │ ├── email.png
│ │ ├── github.png
│ │ ├── linkedin.png
│ │ ├── phone.png
│ │ ├── address.png
│ ├── components/
│ │ ├── Accordion.jsx
│ │ ├── Form.jsx
│ │ ├── Header.jsx
│ │ ├── InputField.jsx
│ │ ├── InputForm.jsx
│ │ ├── List.jsx
│ │ ├── Modal.jsx
│ │ ├── MyDocument.jsx
│ │ ├── PDFViewer.jsx
│ │ ├── Toaster.jsx
│ ├── styles/
│ │ ├── Accordion.css
│ │ ├── Form.css
│ │ ├── Header.css
│ │ ├── InputForm.css
│ │ ├── Modal.css
│ │ ├── PDFViewerComponent.css
│ │ ├── SelectionTab.css
│ │ ├── Toaster.css
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ ├── main.jsx
│ ├── data.js
├── .eslintrc.cjs
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
```

## Components

### Accordion

Renders collapsible sections for the resume.

### Form

Handles form input for various resume sections.

### Header

Displays the application header with a link to the GitHub repository.

### InputField

Renders input fields used in forms.

### InputForm

Main component that manages the overall form and section logic.

### List

Handles the display and management of items within each section.

### Modal

Confirmation modal for delete actions.

### MyDocument

Generates the PDF document for resume preview.

### PDFViewer

Embeds the PDF viewer in the application.

### Toaster

Displays success and error messages.

## Styling

The application uses CSS modules for styling. The styles are located in the `src/styles` directory and are imported into the respective components.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
