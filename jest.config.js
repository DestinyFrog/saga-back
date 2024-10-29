/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
	rootDir: "tests",
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};