import { http } from "msw"
import { getCompanyResolver } from "../resolvers/companyResolvers"

export const companyHandlers = [
  http.get("https://api.plan.com/company/1", withAuth(getCompanyResolver))
]
