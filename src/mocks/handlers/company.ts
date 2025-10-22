import { http } from "msw"
import { getCompanyResolver } from "../resolvers/companyResolvers"
import { withAuth } from "../middleware/middleware"

export const companyHandlers = [
  http.get("https://api.plan.com/company/1", withAuth(getCompanyResolver))
]
