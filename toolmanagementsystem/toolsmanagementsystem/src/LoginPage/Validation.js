// Validation.js
const Validation = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username = "Username is required";
    } else {
        // Optional: You can add additional checks, like minimum length or allowed characters
        const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/; // Example pattern: alphanumeric with underscores, 3-20 characters long
        if (!usernamePattern.test(values.username)) {
            errors.username = "Invalid username format. Only alphanumeric characters and underscores are allowed, and must be 3-20 characters long.";
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
