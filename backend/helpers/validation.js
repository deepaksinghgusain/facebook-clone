// Import Dependencies
const User = require("../models/User");
const { removeSpaces } = require("./helpers");

// Validate Email Id
exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/);
}

// Validate Length of given string
exports.validateLength = (text, min, max) => {
    if (text.length > max || text.length < min) {
        return false;
    }

    return true;
}

// Validate Username
exports.validateUsername = async (username) => {
    let a = false;

    do {
        let check = await User.findOne({ username });

        if (check) {
            //Change Username
            username += (+new Date() * Math.random()).toString().substring(0, 1);
            a = true;
        } else {
            a = false
        }
    } while (a);

    return username;
}

