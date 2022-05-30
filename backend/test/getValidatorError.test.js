import getValidatorError from '../helpers/getValidatorError.js'

const serverError = {
    errors: {
        serial: {
            name: 'ValidatorError',
            message: 'Error, expected `serial` to be unique. Value: `8788686786`',
            properties: {
                message: 'Error, expected `serial` to be unique. Value: `8788686786`',
                type: 'unique',
                path: 'serial',
                value: '8788686786',
            },
            kind: 'unique',
            path: 'serial',
            value: '8788686786',
        },
    },
    _message: 'Gateway validation failed',
    name: 'ValidationError',
    message: 'Gateway validation failed: serial: Error, expected `serial` to be unique. Value: `8788686786`',
}

const serverErrorWithoutMessage = {
    errors: {
        serial: {
            name: 'ValidatorError',
            properties: {
                message: 'Error, expected `serial` to be unique. Value: `8788686786`',
                type: 'unique',
                path: 'serial',
                value: '8788686786',
            },
            kind: 'unique',
            path: 'serial',
            value: '8788686786',
        },
    },
    _message: 'Gateway validation failed',
    name: 'ValidationError',
    message: 'Gateway validation failed: serial: Error, expected `serial` to be unique. Value: `8788686786`',
}

test('getValidatorError -> * message * form Object Error Server', () => {
    const result = getValidatorError(serverError)

    expect(result).toEqual('Error, expected `serial` to be unique. Value: `8788686786`')
})

test('getValidatorError -> Object Error Server without * message *', () => {
    const result = getValidatorError(serverErrorWithoutMessage)

    expect(result).toEqual('Error, contact Admin')
})
