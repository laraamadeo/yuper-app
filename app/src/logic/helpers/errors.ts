class DuplicityError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return DuplicityError.name }
}

class ContentError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return ContentError.name }
}

class ExistanceError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return ExistanceError.name }
}

class AuthError extends Error {
    constructor(message: string) {
        super(message)
    }

    get name() { return AuthError.name }
}

export default {
    DuplicityError,
    ContentError,
    ExistanceError,
    AuthError
}