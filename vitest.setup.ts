import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./src/tests/mocks/server";
import "@testing-library/jest-dom/vitest";

// Start the server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

// Reset any request handlers that we may add during the tests
afterEach(() => server.resetHandlers());

// Close the server after all tests
afterAll(() => server.close());

import { expect } from "vitest";
import * as matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);
