// Validation.js
const Validation = (values) => {
    let errors = {};

    if (!values.username) {
        errors.username = "Username is required";
    // } else if (values.username.length < 3) {
    //     errors.username = "Username must be at least 3 characters long";
    // } else if (values.username.length > 20) {
    //     errors.username = "Username must not exceed 20 characters";
    }
    

    if (!values.password) {
        errors.password = "Password Required";
    } else if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    return errors;
}

export default Validation;
