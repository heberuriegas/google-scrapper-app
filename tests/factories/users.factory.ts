import { faker } from "@faker-js/faker";
import * as Factory from "factory.ts";
import { User } from "../../src/features/auth/types/user.types";

export const usersFactory = Factory.Sync.makeFactory<User>({
  id: Number(Factory.each((i) => i)),
  email: faker.internet.email(),
});
