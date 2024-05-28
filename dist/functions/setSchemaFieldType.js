"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const API_ENDPOINT_1 = __importDefault(require("../constants/API_ENDPOINT"));
async function setSchemaFieldType(schemaID, fieldID, fieldType) {
    const endpoint = `${API_ENDPOINT_1.default}/schemas/${schemaID}/fields/${fieldID}/type`;
    const res = await fetch(endpoint, {
        method: "PUT",
        body: JSON.stringify(fieldType),
    });
    if (!res.ok) {
        const body = await res.text();
        const err = `${res.status}: ${body}`;
        throw new Error(err);
    }
    return res.json();
}
exports.default = setSchemaFieldType;
