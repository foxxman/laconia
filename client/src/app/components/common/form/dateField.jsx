import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const DateField = ({ label, name, value, onChange, error, placeholder }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Control
                onChange={handleChange}
                type="date"
                name={name}
                value={value}
                placeholder={placeholder}
                className="mb-4"
            />
            {error && <div className="invalid-feedback ">{error}</div>}
        </>
    );
};

DateField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    error: PropTypes.string
};

export default DateField;
