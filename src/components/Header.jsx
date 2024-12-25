import resumeLogo from "../assets/resume.svg";
import githubLogo from "../assets/github.svg";
import "../styles/Header.css";

function Header() {
	const handleTitleClick = () => {
		window.location.reload();
	};

	const handleButtonClick = () => {
		window.location.href = "https://github.com/Shahir-47/Resume-Builder";
	};

	return (
		<div className="header">
			<div className="title" onClick={handleTitleClick}>
				<img src={resumeLogo} alt="resume" />
				<h1>Resume Builder</h1>
			</div>
			<button onClick={handleButtonClick}>
				<img src={githubLogo} alt="github" />
				<span>View on GitHub</span>
			</button>
		</div>
	);
}

export default Header;
