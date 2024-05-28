"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_ENDPOINT_1 = __importDefault(require("../constants/API_ENDPOINT"));
async function logout(phone, token) {
    const endpoint = `${API_ENDPOINT_1.default}/auth/logout`;
    const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
            phone,
            token,
        }),
    });
    if (!res.ok) {
        const body = await res.text();
        const err = `${res.status}: ${body}`;
        throw new Error(err);
    }
    return res.json();
}
exports.default = logout;
