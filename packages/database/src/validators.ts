import { createSelectSchema } from "drizzle-zod";
import { users } from "./schema";

export const userSelectSchema = createSelectSchema(users);
