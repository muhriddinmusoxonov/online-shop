"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResData = void 0;
class ResData {
    constructor(statusCode, message, data, meta = {}) {
        this.data = data;
        this.meta = {
            statusCode,
            message,
            ...meta,
        };
    }
}
exports.ResData = ResData;
//# sourceMappingURL=resData.js.map