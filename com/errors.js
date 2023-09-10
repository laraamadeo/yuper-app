class DuplicityError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return ContentError.name }
}

class ExistanceError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return ExistanceError.name }
}

class AuthError extends Error {
    constructor(message) {
        super(message)
    }

    get name() { return AuthError.name }
}

module.exports = {
    DuplicityError,
    ContentError,
    ExistanceError,
    AuthError
}