// email validator --------------------------------------->
const emailValidator = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isMatch = emailRegex.test(email);
    return isMatch;
};

// export modules ---------------------------------------->
export default emailValidator;
