import { http } from "msw";
import { withAuth } from "../middleware/middleware";
import { signInMutation } from "../mutations/userMutations";
import { getUserResolver } from "../resolvers/userResolver";

export const userHandlers = [
  http.get("https://api.plan.com/company/1/user/1", withAuth(getUserResolver)),
  http.post("https://api.plan.com/sign-in", signInMutation)
]
