"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TheRosaryError = void 0;
class TheRosaryError extends Error {
    isTheRosaryError = true;
    sdk = 'TheRosary';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.TheRosaryError = TheRosaryError;
//# sourceMappingURL=TheRosaryError.js.map