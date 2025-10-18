import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Setup the mock server
export const server = setupServer(...handlers);
