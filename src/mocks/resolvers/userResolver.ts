import { HttpResponse } from "msw";

export function getUserResolver() {
  return HttpResponse.json({
    name: "Mateus",
    email: "mxteugued@example.com",
  })
}
