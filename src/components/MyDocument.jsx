import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
	Link,
	Font,
} from "@react-pdf/renderer";

// Register fonts
Font.register({
	family: "Open Sans",
	fonts: [
		{
			src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
		},
		{
			src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
			fontWeight: 600,
		},
	],
});

// Import PNG icons
import PhoneIcon from "../assets/phone.png"; // Ensure the path and file name are correct
import EmailIcon from "../assets/email.png";
import GitHubIcon from "../assets/github.png";
import LinkedInIcon from "../assets/linkedin.png";
import AddressIcon from "../assets/address.png";

// Create styles for the PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		padding: 10,
		paddingBottom: 0,
		fontFamily: "Open Sans", // Use registered font family
	},
	header: {
		marginBottom: 3,
		textAlign: "center",
	},
	link: {
		fontSize: 10, // Smaller font size for the link
		textDecoration: "underline",
		color: "#0000FF", // Link color
	},
	spaceText: {
		fontSize: 12,
		marginBottom: 3,
	},
	text: {
		fontSize: 12,
	},
	boldText: {
		fontSize: 12,
		fontWeight: 600, // Use the registered bold font
	},
	icon: {
		width: 16,
		height: 16,
		marginRight: 5,
	},
	contactInfo: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 10,
		marginBottom: 3,
	},
	contactItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 900,
	},
	separator: {
		borderBottomWidth: 1,
		marginBottom: 3,
	},
	educationItem: {
		marginBottom: 3,
	},
	universityRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	degreeRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	bulletPoints: {
		marginLeft: 5,
	},
	bulletText: {
		fontSize: 12,
	},
	skillItem: {
		marginBottom: 0,
		flexDirection: "row", // Make skill and specifics part of the same line
	},
	skillText: {
		fontSize: 12,
	},
	workExperienceItem: {
		marginBottom: 3,
	},
	positionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	companyRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	projectItem: {
		marginBottom: 3,
	},
	projectHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	projectName: {
		fontSize: 12,
		fontWeight: 600,
		marginRight: 2,
		color: "#000000", // Project name and brackets in black
	},
	projectLink: {
		fontSize: 10,
		color: "#0000FF",
	},
	achievementItem: {
		marginBottom: 3,
	},
	achievementRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	certificationItem: {
		marginBottom: 3,
	},
	certificationRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
	},
	certificationHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	otherItem: {
		marginBottom: 3,
	},
	otherRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
		marginLeft: 5,
	},
	otherHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
});

// Utility function to extract username from URL
const extractUsername = (url) => {
	try {
		const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
		const pathSegments = parsedUrl.pathname.split("/");
		return pathSegments[pathSegments.length - 1];
	} catch (error) {
		console.error("Invalid URL:", url);
		return url; // Return the original URL if there's an error
	}
};

// Utility function to format the date as "Month Year"
const formatDate = (dateString) => {
	if (!dateString) return "";

	if (dateString === "Present") {
		return "Present";
	}

	const [year, month] = dateString.split("-");
	const date = new Date(year, month - 1);

	return date.toLocaleString("default", { month: "long", year: "numeric" });
};

// Utility function to format date range
const formatDateRange = (startDate, endDate) => {
	if (!startDate && !endDate) return "";
	if (!endDate || endDate === "Select End Date") return formatDate(startDate);
	if (!startDate) return formatDate(endDate);

	if (endDate === "Present") {
		return `${formatDate(startDate)} - ${endDate}`;
	}

	return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

// Create Document Component
const MyDocument = ({
	personalDetails,
	educationData,
	skillsData,
	workExperienceData,
	projectData,
	achievementsData,
	certificationsData,
	languagesData,
	hobbiesData,
	interestsData,
	otherData,
}) => (
	<Document>
		<Page size="A4" style={styles.page}>
			{/* Header Section */}
			<View style={styles.header}>
				<Text style={{ fontSize: 24 }}>{personalDetails?.fullName || ""}</Text>
			</View>

			{/* Contact Information */}
			<View style={styles.contactInfo}>
				{personalDetails?.phoneNumber && (
					<View style={styles.contactItem}>
						<Image style={styles.icon} src={PhoneIcon} />
						<Text style={styles.text}>{personalDetails.phoneNumber}</Text>
					</View>
				)}
				{personalDetails?.email && (
					<View style={styles.contactItem}>
						<Image style={styles.icon} src={EmailIcon} />
						<Text style={styles.link}>{personalDetails.email}</Text>
					</View>
				)}
				{personalDetails?.github && (
					<View style={styles.contactItem}>
						<Image style={styles.icon} src={GitHubIcon} />
						<Link style={styles.link} src={`https://${personalDetails.github}`}>
							{extractUsername(personalDetails.github)}
						</Link>
					</View>
				)}
				{personalDetails?.linkedin && (
					<View style={styles.contactItem}>
						<Image style={styles.icon} src={LinkedInIcon} />
						<Link
							style={styles.link}
							src={`https://${personalDetails.linkedin}`}
						>
							{extractUsername(personalDetails.linkedin)}
						</Link>
					</View>
				)}
				{personalDetails?.address && (
					<View style={styles.contactItem}>
						<Image style={styles.icon} src={AddressIcon} />
						<Text style={styles.text}>{personalDetails.address}</Text>
					</View>
				)}
			</View>

			{/* Conditionally Render Sections if they have data */}
			{educationData && educationData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>EDUCATION</Text>
					<View style={styles.separator} />

					{educationData.map((education, index) => (
						<View key={index} style={styles.educationItem}>
							{/* University Name and Location */}
							<View style={styles.universityRow}>
								<Text style={styles.boldText}>
									{education?.content?.universityName || ""}
								</Text>
								<Text style={styles.boldText}>
									{education?.content?.location || ""}
								</Text>
							</View>

							{/* Degree and Graduation Date */}
							<View style={styles.degreeRow}>
								<Text style={styles.boldText}>
									{education?.content?.degree || ""}
								</Text>
								<Text style={styles.text}>
									{formatDate(education?.content?.graduationDate) || ""}
								</Text>
							</View>

							{/* GPA */}
							{education?.content?.gpa && (
								<View style={styles.bulletPoints}>
									<Text style={styles.bulletText}>
										• GPA: {education.content.gpa}
									</Text>
								</View>
							)}

							{/* Relevant Coursework */}
							{education?.content?.coursework && (
								<View style={styles.bulletPoints}>
									<Text style={styles.bulletText}>
										• Relevant Coursework: {education.content.coursework}
									</Text>
								</View>
							)}

							{/* Description */}
							{education?.content?.description?.length > 0 && (
								<View style={styles.bulletPoints}>
									{education.content.description.map((desc, idx) => (
										<Text key={idx} style={styles.bulletText}>
											• {desc}
										</Text>
									))}
								</View>
							)}
						</View>
					))}
				</View>
			)}

			{skillsData && skillsData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>SKILLS</Text>
					<View style={styles.separator} />
					<View style={{ marginBottom: 5 }}>
						{skillsData.map((skill, index) => (
							<View key={index} style={styles.skillItem}>
								<Text style={styles.boldText}>
									{skill?.content?.skill || ""}
								</Text>
								<Text style={styles.skillText}>
									: {skill?.content?.specifics || ""}
								</Text>
							</View>
						))}
					</View>
				</View>
			)}

			{workExperienceData && workExperienceData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>WORK EXPERIENCE</Text>
					<View style={styles.separator} />

					{workExperienceData.map((work, index) => (
						<View key={index} style={styles.workExperienceItem}>
							{/* Position and Location */}
							<View style={styles.positionRow}>
								<Text style={styles.boldText}>
									{work?.content?.position || ""}
								</Text>
								<Text style={styles.boldText}>
									{work?.content?.location || ""}
								</Text>
							</View>

							{/* Company Name and Dates */}
							<View style={styles.companyRow}>
								<Text style={styles.boldText}>
									{work?.content?.companyName || ""}
								</Text>
								<Text style={styles.text}>
									{formatDateRange(
										work?.content?.startDate,
										work?.content?.endDate
									)}
								</Text>
							</View>

							{/* Description */}
							{work?.content?.description?.length > 0 && (
								<View style={styles.bulletPoints}>
									{work.content.description.map((desc, idx) => (
										<Text key={idx} style={styles.bulletText}>
											• {desc}
										</Text>
									))}
								</View>
							)}
						</View>
					))}
				</View>
			)}

			{projectData && projectData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>PROJECTS</Text>
					<View style={styles.separator} />

					{projectData.map((project, index) => (
						<View key={index} style={styles.projectItem}>
							<View style={styles.projectHeader}>
								<Text style={styles.projectName}>
									{project?.content?.projectName || ""}
								</Text>
								<Text style={styles.projectName}>
									[
									<Link
										style={styles.projectLink}
										src={project?.content?.projectUrl || ""}
									>
										{project?.content?.projectUrl || ""}
									</Link>
									]
								</Text>
							</View>
							{/* Description */}
							{project?.content?.description?.length > 0 && (
								<View style={styles.bulletPoints}>
									{project.content.description.map((desc, idx) => (
										<Text key={idx} style={styles.bulletText}>
											• {desc}
										</Text>
									))}
								</View>
							)}
						</View>
					))}
				</View>
			)}

			{achievementsData && achievementsData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
					<View style={styles.separator} />

					{achievementsData.map((achievement, index) => (
						<View key={index} style={styles.achievementItem}>
							{/* Achievement Name and Date */}
							<View style={styles.achievementRow}>
								<Text style={styles.boldText}>
									{achievement?.content?.achievement || ""}
								</Text>
								<Text style={styles.text}>
									{formatDate(achievement?.content?.date) || ""}
								</Text>
							</View>

							{/* Description */}
							{achievement?.content?.description?.length > 0 && (
								<View style={styles.bulletPoints}>
									{achievement.content.description.map((desc, idx) => (
										<Text key={idx} style={styles.bulletText}>
											• {desc}
										</Text>
									))}
								</View>
							)}
						</View>
					))}
				</View>
			)}

			{certificationsData && certificationsData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>CERTIFICATIONS</Text>
					<View style={styles.separator} />

					{certificationsData.map((certification, index) => (
						<View key={index} style={styles.certificationItem}>
							<View style={styles.certificationRow}>
								{/* Certification Name and URL */}
								<View style={styles.certificationHeader}>
									<Text style={styles.boldText}>
										{certification?.content?.certification + " " || ""}
									</Text>
									<Text style={styles.boldText}>
										[
										<Link
											style={styles.link}
											src={certification?.content?.certificationLink || ""}
										>
											{certification?.content?.certificationLink || ""}
										</Link>
										]
									</Text>
								</View>

								{/* Certification Date */}
								<Text style={styles.text}>
									{formatDate(certification?.content?.date) || ""}
								</Text>
							</View>

							{/* Description */}
							{certification?.content?.description?.length > 0 && (
								<View style={styles.bulletPoints}>
									{certification.content.description.map((desc, idx) => (
										<Text key={idx} style={styles.bulletText}>
											• {desc}
										</Text>
									))}
								</View>
							)}
						</View>
					))}
				</View>
			)}

			{languagesData && languagesData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>LANGUAGES</Text>
					<View style={styles.separator} />

					{/* Comma-separated list of languages and proficiency */}
					<Text style={styles.spaceText}>
						{languagesData
							?.map(
								(language) =>
									`${language.content.language} (${language.content.proficiency})`
							)
							.join(", ")}
					</Text>
				</View>
			)}

			{hobbiesData && hobbiesData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>HOBBIES</Text>
					<View style={styles.separator} />

					{/* Comma-separated list of hobbies */}
					<Text style={styles.spaceText}>
						{hobbiesData?.map((hobby) => hobby.content.hobby).join(", ")}
					</Text>
				</View>
			)}

			{interestsData && interestsData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>INTERESTS</Text>
					<View style={styles.separator} />

					{/* Comma-separated list of interests */}
					<Text style={styles.spaceText}>
						{interestsData
							?.map((interest) => interest.content.interest)
							.join(", ")}
					</Text>
				</View>
			)}

			{otherData && otherData.length > 0 && (
				<View>
					<Text style={styles.sectionTitle}>OTHER</Text>
					<View style={styles.separator} />

					{otherData.map((other, index) => (
						<View key={index} style={styles.otherItem}>
							{/* Title, Link and Location */}
							<View style={styles.otherRow}>
								<View style={styles.otherHeader}>
									<Text style={styles.boldText}>
										{other?.content?.title + " " || ""}
									</Text>
									<Text style={styles.boldText}>
										[
										<Link style={styles.link} src={other?.content?.link || ""}>
											{other?.content?.link || ""}
										</Link>
										]
									</Text>
								</View>
								<Text style={styles.boldText}>
									{other?.content?.location || ""}
								</Text>
							</View>

							{/* Description and Date */}
							<View style={styles.otherRow}>
								{other?.content?.description?.[0] && (
									<Text style={styles.bulletText}>
										• {other.content.description[0]}
									</Text>
								)}
								<Text style={styles.text}>
									{formatDate(other?.content?.date) || ""}
								</Text>
							</View>

							{/* Additional Descriptions */}
							{other?.content?.description?.slice(1).map((desc, idx) => (
								<View key={idx} style={styles.bulletPoints}>
									<Text style={styles.bulletText}>• {desc}</Text>
								</View>
							))}
						</View>
					))}
				</View>
			)}
		</Page>
	</Document>
);

export default MyDocument;
