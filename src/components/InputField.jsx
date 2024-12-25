import PropTypes from "prop-types";

function InputField({ label, type, name, value, onChange, required, error }) {
	return (
		<div className="input-field">
			<label htmlFor={name}>
				{label + ":"} {required && <span className="required-asterisk">*</span>}
			</label>
			{type === "month" && name === "endDate" ? (
				<select name={name} value={value || "Present"} onChange={onChange}>
					<option value="">Select End Date</option>
					<option value="Present">Present</option>
					{/* Populate with past dates */}
					{Array.from({ length: new Date().getFullYear() - 1999 }, (_, i) => (
						<option
							key={i}
							value={`${2000 + i}-${("0" + (new Date().getMonth() + 1)).slice(
								-2
							)}`}
						>
							{`${2000 + i}-${("0" + (new Date().getMonth() + 1)).slice(-2)}`}
						</option>
					))}
				</select>
			) : type === "textarea" ? (
				<textarea id={name} name={name} value={value} onChange={onChange} />
			) : (
				<input
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
				/>
			)}
			{error && <span className="error-message">{error}</span>}
		</div>
	);
}

InputField.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	required: PropTypes.bool,
	error: PropTypes.string,
};

export default InputField;
