import propTypes from "prop-types";
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
import PhoneIcon from "../assets/phone.png";
import EmailIcon from "../assets/email.png";
import GitHubIcon from "../assets/github.png";
import LinkedInIcon from "../assets/linkedin.png";
import AddressIcon from "../assets/address.png";
import website from "../assets/website.png";

// Create styles for the PDF
const styles = StyleSheet.create({
	page: {
		flexDirection: "column",
		backgroundColor: "#FFFFFF",
		padding: 10,
		paddingBottom: 0,
		paddingTop: 5,
		fontFamily: "Open Sans", // Use registered font family
	},
	header: {
		marginBottom: 5,
		textAlign: "center",
	},
	linkBlack: {
		fontSize: 10,
		textDecoration: "underline",
		color: "#000000", // Black link color
	},
	link: {
		fontSize: 10, // Smaller font size for the link
		textDecoration: "underline",
		color: "#0000FF", // Link color
	},
	spaceText: {
		fontSize: 10,
		marginBottom: 1,
	},
	text: {
		fontSize: 10,
	},
	boldText: {
		fontSize: 10,
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
		columnGap: 10,
		rowGap: 2,
		marginBottom: 5,
	},
	contactItem: {
		flexDirection: "row",
		alignItems: "center",
	},
	sectionTitle: {
		fontSize: 12,
		fontWeight: 900,
	},
	separator: {
		borderBottomWidth: 1,
		marginBottom: 1,
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
		fontSize: 10,
	},
	skillItem: {
		marginBottom: 3,
		flexDirection: "row",
	},
	skillText: {
		fontSize: 10,
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
		fontSize: 10,
		fontWeight: 600,
		marginRight: 2,
		color: "#000000",
	},
	projectLink: {
		fontSize: 9,
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
	publicationItem: {
		marginBottom: 3,
	},
	publicationRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
		marginLeft: 0,
	},
	otherItem: {
		marginBottom: 3,
	},
	otherRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
		marginLeft: 0,
	},
	specialCase: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 0,
		marginLeft: 5,
	},
	publicationHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	otherHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	subtextRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 0,
		marginBottom: 0,
	},
});

// Utility function to extract username from URL
const extractUsername = (url) => {
	try {
		const parsedUrl = new URL(url.startsWith("http") ? url : `https://${url}`);
		const domain = parsedUrl.hostname.replace(/^www\./, "");
		const path = parsedUrl.pathname.startsWith("/")
			? parsedUrl.pathname.slice(1)
			: parsedUrl.pathname;
		return `${domain}/${path}`;
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

// Utility function to format language and proficiency
const formatLanguageProficiency = (language, proficiency) => {
	if (!language) return "";

	if (!proficiency) return language;

	return `${language} (${proficiency})`;
};

// Create Document Component
const MyDocument = ({ sections, title }) => (
	<Document title={title}>
		<Page size="A4" style={styles.page}>
			{/* Header Section */}
			{sections.map((section, index) => (
				<View key={index}>
					{section.type === "Personal" && (
						<View>
							<View style={styles.header}>
								<Text style={{ fontSize: 20 }}>
									{section.data?.fullName || ""}
								</Text>
							</View>

							{/* Contact Information */}
							<View style={styles.contactInfo}>
								{section.data?.phoneNumber && (
									<View style={styles.contactItem}>
										<Image style={styles.icon} src={PhoneIcon} />
										{/* Link component used for clickable phone number */}
										<Link
											style={styles.linkBlack}
											src={`tel:${section.data.phoneNumber}`}
										>
											{section.data.phoneNumber}
										</Link>
									</View>
								)}
								{section.data?.address && (
									<View style={styles.contactItem}>
										<Image style={styles.icon} src={AddressIcon} />
										{/* Link component used for clickable address */}
										<Link
											style={styles.linkBlack}
											src={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
												section.data.address
											)}`}
										>
											{section.data.address}
										</Link>
									</View>
								)}
								{section.data?.email && (
									<View style={styles.contactItem}>
										<Image style={styles.icon} src={EmailIcon} />
										<Text style={styles.linkBlack}>{section.data.email}</Text>
									</View>
								)}
								{section.data?.github && (
									<View style={styles.contactItem}>
										<Image style={styles.icon} src={GitHubIcon} />
										<Link
											style={styles.linkBlack}
											src={`https://${section.data.github}`}
										>
											{extractUsername(section.data.github)}
										</Link>
									</View>
								)}
								{section.data?.linkedin && (
									<View style={styles.contactItem}>
										<Image style={styles.icon} src={LinkedInIcon} />
										<Link
											style={styles.linkBlack}
											src={`https://${section.data.linkedin}`}
										>
											{extractUsername(section.data.linkedin)}
										</Link>
									</View>
								)}
								{section.data?.personalWebsite && (
									<View style={styles.contactItem}>
										<Image style={styles.icon} src={website} />
										<Link
											style={styles.linkBlack}
											src={`https://${section.data.personalWebsite}`}
										>
											{extractUsername(section.data.personalWebsite)}
										</Link>
									</View>
								)}
							</View>
						</View>
					)}

					{/* Dynamically Render Sections Based on Title */}
					{section.data.length > 0 && (
						<View>
							<Text
								style={[
									styles.sectionTitle,
									index === 0 ? { marginTop: 0 } : { marginTop: 2 },
								]}
							>
								{section.title.toUpperCase()}
							</Text>
							<View style={styles.separator} />

							{/* Render Different Sections Dynamically */}
							{section.type === "Education" &&
								section.data.map((education, index) => (
									<View key={index} style={styles.educationItem}>
										{/* University Name and Graduation Date */}
										<View style={styles.universityRow}>
											<View style={styles.certificationHeader}>
												<Text style={styles.boldText}>
													{education?.content?.universityName + " " || ""}
												</Text>
												{education?.content?.universityLink && (
													<Text style={styles.boldText}>
														[
														<Link
															style={styles.projectLink}
															src={education.content.universityLink}
														>
															{education.content.universityLink}
														</Link>
														]
													</Text>
												)}
											</View>
											<Text style={styles.boldText}>
												{education?.content?.graduationDate
													? new Date(education.content.graduationDate) >
													  new Date()
														? `Expected ${formatDate(
																education.content.graduationDate
														  )}`
														: formatDate(education.content.graduationDate)
													: ""}
											</Text>
										</View>

										{/* Degree and GPA */}
										<View style={styles.degreeRow}>
											<Text style={styles.boldText}>
												{education?.content?.degree || ""}
											</Text>
											<Text style={styles.text}>
												{education?.content?.gpa
													? `GPA: ${education.content.gpa}`
													: ""}
											</Text>
										</View>

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

							{section.type === "Skill" &&
								section.data.map((skill, index) => (
									<View key={index} style={styles.skillItem}>
										<Text style={styles.boldText}>
											{skill?.content?.skill || ""}
										</Text>
										<Text style={styles.skillText}>
											: {skill?.content?.specifics || ""}
										</Text>
									</View>
								))}

							{section.type === "Work Experience" &&
								section.data.map((work, index) => (
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
											<View style={styles.certificationHeader}>
												<Text style={styles.boldText}>
													{work?.content?.companyName + " " || ""}
												</Text>
												{work?.content?.link && (
													<Text style={styles.boldText}>
														[
														<Link
															style={styles.projectLink}
															src={work.content.link}
														>
															{work.content.link}
														</Link>
														]
													</Text>
												)}
											</View>
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

							{section.type === "Project" &&
								section.data.map((project, index) => (
									<View key={index} style={styles.projectItem}>
										<View style={styles.projectHeader}>
											<Text style={styles.projectName}>
												{project?.content?.projectName || ""}
											</Text>
											{project?.content?.projectUrl && (
												<Text style={styles.projectName}>
													[
													<Link
														style={styles.projectLink}
														src={project.content.projectUrl}
													>
														{project.content.projectUrl}
													</Link>
													]
												</Text>
											)}
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

							{section.type === "Achievement" &&
								section.data.map((achievement, index) => (
									<View key={index} style={styles.achievementItem}>
										{/* Achievement Name and Date */}
										<View style={styles.achievementRow}>
											<View style={styles.certificationHeader}>
												<Text style={styles.boldText}>
													{achievement?.content?.achievement + " " || ""}
												</Text>
												{achievement?.content?.achievementLink && (
													<Text style={styles.boldText}>
														[
														<Link
															style={styles.projectLink}
															src={achievement.content.achievementLink}
														>
															{achievement.content.achievementLink}
														</Link>
														]
													</Text>
												)}
											</View>
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

							{section.type === "Publication" &&
								section.data.map((publication, index) => (
									<View key={index} style={styles.publicationItem}>
										{/* Title, Link and Location */}
										<View style={styles.publicationRow}>
											<View style={styles.publicationHeader}>
												<Text style={styles.boldText}>
													{publication?.content?.title + " " || ""}
												</Text>
												{publication?.content?.link && (
													<Text style={styles.boldText}>
														[
														<Link
															style={styles.projectLink}
															src={publication.content.link}
														>
															{publication.content.link}
														</Link>
														]
													</Text>
												)}
											</View>
											<Text style={styles.boldText}>
												{publication?.content?.location || ""}
											</Text>
										</View>

										{/* Subtext and Date or Description and Date */}
										{publication?.content?.subtext ? (
											<View style={styles.subtextRow}>
												<Text style={styles.boldText}>
													{publication.content.subtext}
												</Text>
												<Text style={styles.text}>
													{formatDate(publication?.content?.date) || ""}
												</Text>
											</View>
										) : (
											<View style={styles.specialCase}>
												{publication?.content?.description?.[0] && (
													<Text style={styles.bulletText}>
														• {publication.content.description[0]}
													</Text>
												)}
												<Text style={styles.text}>
													{formatDate(publication?.content?.date) || ""}
												</Text>
											</View>
										)}

										{/* Additional Descriptions */}
										{publication?.content?.description
											?.slice(publication.content.subtext ? 0 : 1)
											.map((desc, idx) => (
												<View key={idx} style={styles.bulletPoints}>
													<Text style={styles.bulletText}>• {desc}</Text>
												</View>
											))}
									</View>
								))}

							{section.type === "Certification" &&
								section.data.map((certification, index) => (
									<View key={index} style={styles.certificationItem}>
										<View style={styles.certificationRow}>
											{/* Certification Name and URL */}
											<View style={styles.certificationHeader}>
												<Text style={styles.boldText}>
													{certification?.content?.certification + " " || ""}
												</Text>
												{certification?.content?.certificationLink && (
													<Text style={styles.boldText}>
														[
														<Link
															style={styles.projectLink}
															src={certification.content.certificationLink}
														>
															{certification.content.certificationLink}
														</Link>
														]
													</Text>
												)}
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

							{section.type === "Language" && (
								<Text style={styles.spaceText}>
									{/* Comma-separated list of languages and proficiency */}
									{section.data
										?.map((language) =>
											formatLanguageProficiency(
												language.content.language,
												language.content.proficiency
											)
										)
										.join(", ")}
								</Text>
							)}

							{section.type === "Hobby" && (
								<Text style={styles.spaceText}>
									{/* Comma-separated list of hobbies */}
									{section.data?.map((hobby) => hobby.content.hobby).join(", ")}
								</Text>
							)}

							{section.type === "Interest" && (
								<Text style={styles.spaceText}>
									{/* Comma-separated list of interests */}
									{section.data
										?.map((interest) => interest.content.interest)
										.join(", ")}
								</Text>
							)}

							{section.type === "Other" &&
								section.data.map((other, index) => (
									<View key={index} style={styles.otherItem}>
										{/* Title, Link and Location */}
										<View style={styles.otherRow}>
											<View style={styles.otherHeader}>
												<Text style={styles.boldText}>
													{other?.content?.title + " " || ""}
												</Text>
												{other?.content?.link && (
													<Text style={styles.boldText}>
														[
														<Link
															style={styles.projectLink}
															src={other.content.link}
														>
															{other.content.link}
														</Link>
														]
													</Text>
												)}
											</View>
											<Text style={styles.boldText}>
												{other?.content?.location || ""}
											</Text>
										</View>

										{/* Subtext and Date or Description and Date */}
										{other?.content?.subtext ? (
											<View style={styles.subtextRow}>
												<Text style={styles.boldText}>
													{other.content.subtext}
												</Text>
												<Text style={styles.text}>
													{formatDate(other?.content?.date) || ""}
												</Text>
											</View>
										) : (
											<View style={styles.specialCase}>
												{other?.content?.description?.[0] && (
													<Text style={styles.bulletText}>
														• {other.content.description[0]}
													</Text>
												)}
												<Text style={styles.text}>
													{formatDate(other?.content?.date) || ""}
												</Text>
											</View>
										)}

										{/* Additional Descriptions */}
										{other?.content?.description
											?.slice(other.content.subtext ? 0 : 1)
											.map((desc, idx) => (
												<View key={idx} style={styles.bulletPoints}>
													<Text style={styles.bulletText}>• {desc}</Text>
												</View>
											))}
									</View>
								))}
						</View>
					)}
				</View>
			))}
		</Page>
	</Document>
);

MyDocument.propTypes = {
	sections: propTypes.array.isRequired,
	title: propTypes.string.isRequired,
};

export default MyDocument;
