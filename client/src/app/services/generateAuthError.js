export function generetaAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Uncorrect passord";
        case "EMAIL_NOT_FOUND":
            return "Email not found";
        case "EMAIL_EXISTS":
            return "User's email already exist";
        default:
            return "Something wrong... Please, try later.";
    }
}
