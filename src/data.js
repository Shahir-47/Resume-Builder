// data.js
export const workExperienceForm = {
	id: "work-experience-details",
	fields: [
		{ label: "Company Name", type: "text", name: "companyName" },
		{ label: "Position", type: "text", name: "position", required: true },
		{ label: "Link", type: "url", name: "link" },
		{ label: "Location", type: "text", name: "location" },
		{ label: "Start Date", type: "month", name: "startDate" },
		{
			label: "End Date",
			type: "select",
			name: "endDate",
			options: [
				{ label: "Select End Date", value: "" },
				// Past dates will be added dynamically in the Form component
				{ label: "Present", value: "Present" },
			],
		},
	],
};

export const projectForm = {
	id: "project-details",
	fields: [
		{
			label: "Project Name",
			type: "text",
			name: "projectName",
			required: true,
		},
		{ label: "Technologies Used", type: "text", name: "technologies" },
		{ label: "Link", type: "url", name: "projectUrl" },
	],
};

export const achievementsForm = {
	id: "achievements-details",
	fields: [
		{ label: "Achievement", type: "text", name: "achievement", required: true },
		{ label: "link", type: "url", name: "achievementLink" },
		{ label: "Date", type: "month", name: "date" },
	],
};

export const achievementsItems = {
	form: achievementsForm,
	data: [
		{
			title: "Achievement 1",
			content: {
				achievement: "Achievement 1",
				date: "2021-06",
				achievementLink: "https://achievement1.com",
				description: ["Won first place in competition", "Received award"],
			},
		},
		{
			title: "Achievement 2",
			content: {
				achievement: "Achievement 2",
				date: "2020-12",
				description: ["Published research paper", "Presented at conference"],
			},
		},
	],
};

export const certificationsForm = {
	id: "certifications-details",
	fields: [
		{
			label: "Certification",
			type: "text",
			name: "certification",
			required: true,
		},
		{ label: "Date", type: "month", name: "date" },
		{ label: "Link", type: "url", name: "certificationLink" },
	],
};

export const certificationsItems = {
	form: certificationsForm,
	data: [
		{
			title: "Certification 1",
			content: {
				certification: "Certification 1",
				date: "2021-06",
				certificationLink: "https://certification1.com",
			},
		},
		{
			title: "Certification 2",
			content: {
				certification: "Certification 2",
				date: "2020-12",
				certificationLink: "https://certification2.com",
			},
		},
	],
};

export const skillsForm = {
	id: "skills-details",
	fields: [
		{ label: "Skill", type: "text", name: "skill", required: true },
		{ label: "Specifics", type: "text", name: "specifics", required: true },
	],
};

export const skillsItems = {
	form: skillsForm,
	data: [
		{
			title: "Skill 1",
			content: {
				skill: "Skill 1",
				specifics: "Specifics 1, Specifics 2",
			},
		},
		{
			title: "Skill 2",
			content: {
				skill: "Skill 2",
				specifics: "Specifics 3, Specifics 4",
			},
		},
	],
};

export const languagesForm = {
	id: "languages-details",
	fields: [
		{ label: "Language", type: "text", name: "language", required: true },
		{ label: "Proficiency", type: "text", name: "proficiency" },
	],
};

export const languagesItems = {
	form: languagesForm,
	data: [
		{
			title: "Language 1",
			content: { language: "Language 1", proficiency: "Proficient" },
		},
		{
			title: "Language 2",
			content: { language: "Language 2", proficiency: "Intermediate" },
		},
	],
};

export const hobbiesForm = {
	id: "hobbies-details",
	fields: [{ label: "Hobby", type: "text", name: "hobby", required: true }],
};

export const hobbiesItems = {
	form: hobbiesForm,
	data: [
		{
			title: "Hobby 1",
			content: {
				hobby: "Hobby 1",
			},
		},
		{
			title: "Hobby 2",
			content: {
				hobby: "Hobby 2",
			},
		},
	],
};

export const interestsForm = {
	id: "interests-details",
	fields: [
		{ label: "Interest", type: "text", name: "interest", required: true },
	],
};

export const interestsItems = {
	form: interestsForm,
	data: [
		{
			title: "Interest 1",
			content: {
				interest: "Interest 1",
			},
		},
		{
			title: "Interest 2",
			content: {
				interest: "Interest 2",
			},
		},
	],
};

export const otherForm = {
	id: "other-details",
	fields: [
		{ label: "Title", type: "text", name: "title", required: true },
		{ label: "Subtext", type: "text", name: "subtext" },
		{ label: "Date", type: "month", name: "date" },
		{ label: "Location", type: "text", name: "location" },
		{ label: "Link", type: "url", name: "link" },
	],
};

export const otherItems = {
	form: otherForm,
	data: [
		{
			title: "Other 1",
			content: {
				title: "Other 1",
				subtext: "Subtext 1",
				date: "2021-06",
				location: "Location 1",
				link: "https://other1.com",
				description: ["Description 1", "Description 2"],
			},
		},
		{
			title: "Other 2",
			content: {
				title: "Other 2",
				date: "2020-12",
				location: "Location 2",
				link: "https://other2.com",
				description: ["Description 3", "Description 4"],
			},
		},
	],
};

export const publicationForm = {
	id: "publication-details",
	fields: [
		{ label: "Title", type: "text", name: "title", required: true },
		{ label: "Subtext", type: "text", name: "subtext" },
		{ label: "Date", type: "month", name: "date" },
		{ label: "Location", type: "text", name: "location" },
		{ label: "Link", type: "url", name: "link" },
	],
};

export const publicationItems = {
	form: publicationForm,
	data: [
		{
			title: "Publication 1",
			content: {
				title: "Publication 1",
				subtext: "Subtext 1",
				date: "2021-06",
				location: "Location 1",
				link: "https://publication1.com",
				description: ["Description 1", "Description 2"],
			},
		},
		{
			title: "Publication 2",
			content: {
				title: "Publication 2",
				date: "2020-12",
				location: "Location 2",
				link: "https://publication2.com",
				description: ["Description 3", "Description 4"],
			},
		},
	],
};

export const projectItems = {
	form: projectForm,
	data: [
		{
			title: "Project 1",
			content: {
				projectName: "Project 1",
				technologies: "React, Node.js",
				projectUrl: "https://project1.com",
				description: ["Built a website", "Implemented user authentication"],
			},
		},
		{
			title: "Project 2",
			content: {
				projectName: "Project 2",
				projectUrl: "https://project2.com",
				description: [
					"Developed a mobile app",
					"Integrated with social media APIs",
				],
			},
		},
	],
};

export const workExperienceItems = {
	form: workExperienceForm,
	data: [
		{
			title: "Software Engineer",
			content: {
				companyName: "Google",
				position: "Software Engineer",
				link: "https://google.com",
				location: "Mountain View, CA",
				startDate: "2020-06",
				endDate: "2021-08",
				description: ["Worked on search algorithms", "Improved performance"],
			},
		},
		{
			title: "Product Manager",
			content: {
				companyName: "Facebook",
				position: "Product Manager",
				location: "Menlo Park, CA",
				startDate: "2018-06",
				endDate: "2020-06",
				description: ["Managed product roadmap", "Led a team of 10"],
			},
		},
		{
			title: "Data Analyst",
			content: {
				companyName: "Amazon",
				position: "Data Analyst",
				location: "Seattle, WA",
				startDate: "2016-06",
				endDate: "2018-06",
				description: ["Analyzed customer data", "Generated reports"],
			},
		},
	],
};

export const personalDetailForm = {
	id: "personal-details",
	fields: [
		{ label: "Full Name", type: "text", name: "fullName" },
		{ label: "Phone Number", type: "tel", name: "phoneNumber" },
		{ label: "Address", type: "text", name: "address" },
		{ label: "Email", type: "email", name: "email" },
		{ label: "GitHub", type: "url", name: "github" },
		{ label: "LinkedIn", type: "url", name: "linkedin" },
		{ label: "Personal Website", type: "url", name: "personalWebsite" },
	],
};

export const personalDetails = {
	fullName: "John Doe",
	phoneNumber: "123-456-7890",
	address: "City, State 12345",
	email: "johndoe@example.com",
	github: "github.com/johndoe",
	linkedin: "linkedin.com/in/johndoe",
	personalWebsite: "johndoe.com",
};

export const educationForm = {
	id: "education-details",
	fields: [
		{
			label: "University Name",
			type: "text",
			name: "universityName",
			required: true,
		},
		{ label: "Link", type: "url", name: "universityLink" },
		{ label: "Degree", type: "text", name: "degree" },
		{ label: "Graduation Month & Year", type: "month", name: "graduationDate" },
		{
			label: "GPA",
			type: "number",
			name: "gpa",
			step: "0.01",
			min: "0",
			max: "4",
		},
		{ label: "Relevant Coursework", type: "textarea", name: "coursework" },
	],
};

export const educationItems = {
	form: educationForm,
	data: [
		{
			title: "Soul Society Academy",
			content: {
				universityName: "Soul Society Academy",
				degree: "Shinigami Studies",
				location: "Seireitei",
				graduationDate: "2023-06",
				gpa: "3.95",
				coursework: "Kido Magic, Hollow Studies",
				description: [],
			},
		},
		{
			title: "Hogwarts School of Witchcraft and Wizardry",
			content: {
				universityName: "Hogwarts School",
				universityLink: "https://hogwarts.com",
				degree: "Defense Against the Dark Arts",
				location: "Scotland",
				graduationDate: "2020-05",
				gpa: "3.9",
				coursework: "Potion Brewing, Magical Defense",
				description: [],
			},
		},
		{
			title: "Xavier's School for Gifted Youngsters",
			content: {
				universityName: "Xavier's School",
				degree: "Mutant Studies",
				location: "Westchester County, New York",
				graduationDate: "2021-08",
				gpa: "4.0",
				coursework: "Telepathy, Advanced Combat",
				description: [],
			},
		},
	],
};

export const sectionsData = [
	{
		title: "Personal Details",
		data: personalDetails,
		form: personalDetailForm,
		type: "Personal",
	},
	{
		title: "Education",
		data: educationItems.data,
		form: educationForm,
		type: "Education",
	},
	{
		title: "Work Experience",
		data: workExperienceItems.data,
		form: workExperienceForm,
		type: "Work Experience",
	},
	{
		title: "Projects",
		data: projectItems.data,
		form: projectForm,
		type: "Project",
	},
	{
		title: "Achievements",
		data: achievementsItems.data,
		form: achievementsForm,
		type: "Achievement",
	},
	{
		title: "Publications",
		data: publicationItems.data,
		form: publicationForm,
		type: "Publication",
	},
	{
		title: "Certifications",
		data: certificationsItems.data,
		form: certificationsForm,
		type: "Certification",
	},
	{
		title: "Skills",
		data: skillsItems.data,
		form: skillsForm,
		type: "Skill",
	},
	{
		title: "Languages",
		data: languagesItems.data,
		form: languagesForm,
		type: "Language",
	},
	{
		title: "Hobbies",
		data: hobbiesItems.data,
		form: hobbiesForm,
		type: "Hobby",
	},
	{
		title: "Interests",
		data: interestsItems.data,
		form: interestsForm,
		type: "Interest",
	},
	{
		title: "Other",
		data: otherItems.data,
		form: otherForm,
		type: "Other",
	},
];
