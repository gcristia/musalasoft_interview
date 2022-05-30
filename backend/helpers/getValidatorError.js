const getValidatorError = (error) => {
    const errors = Object.values(error)[0]
    const message = 'Error, contact Admin'
    if (errors) {
        return Object.values(errors)[0]?.message || message
    } else {
        return message
    }
}

export default getValidatorError
