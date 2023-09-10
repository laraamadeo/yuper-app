export const context = {
    set token(token) {
        if (!token) {
            delete localStorage.token

            return
        }
        localStorage.token = token
    },

    get token() {
        return localStorage.token
    },

    set os(os) {
        localStorage.os = os;
    },

    get os() {
        return localStorage.os;
    }
}