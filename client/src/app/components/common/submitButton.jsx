import React from "react";
import PropTypes from "prop-types";

const SubmitButton = ({ isValid, text = "Submit", addClasses = [] }) => {
    return (
        <button
            type="submit"
            disabled={!isValid}
            className={`btn btn-primary w-100 mx-auto ${
                addClasses.length === 0 ? "" : addClasses.join(" ")
            }`}
        >
            {text}
        </button>
    );
};

SubmitButton.propTypes = {
    addClasses: PropTypes.arrayOf(PropTypes.string),
    text: PropTypes.string,
    isValid: PropTypes.bool
};

export default SubmitButton;
