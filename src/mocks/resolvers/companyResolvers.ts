import { HttpResponse } from "msw";

export function getCompanyResolver() {
  return HttpResponse.json({
    name: "UOL",
    contracts: [
      {
        id: 1,
        name: "Mateus Guedes da Conceicao",
        email: "example@example",
        role: "admin"
      }
    ],
  })
}


