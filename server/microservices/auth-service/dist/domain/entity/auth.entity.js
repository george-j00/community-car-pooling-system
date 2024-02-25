"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthEntity = void 0;
class AuthEntity {
    constructor(id, name, email, password, otp) {
        this.id = id;
        this.username = name;
        this.email = email;
        this.password = password;
        this.otp = otp;
    }
}
exports.AuthEntity = AuthEntity;
