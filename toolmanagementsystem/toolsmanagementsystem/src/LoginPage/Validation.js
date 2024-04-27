// Validation.js
const Validation = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username = "Email Required";
    } else {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(values.username)) {
            errors.username = "Invalid email format";
        }
    }

    if (!values.password) {
        errors.password = "Password Required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    return errors;
}

export default Validation;
