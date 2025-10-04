import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        ...tsJestTransformCfg,
    },
    roots: ["<rootDir>/tests"],
    moduleFileExtensions: ["ts", "js", "json"],
    testMatch: ["**/*.test.ts"],
    clearMocks: true,
};