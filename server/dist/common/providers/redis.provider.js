"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redis = void 0;
const redis_1 = require("redis");
exports.redis = (0, redis_1.createClient)({
    url: 'redis://localhost:6379',
});
exports.redis.connect();
//# sourceMappingURL=redis.provider.js.map