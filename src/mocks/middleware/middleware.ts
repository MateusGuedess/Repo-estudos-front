import { type DefaultBodyType, HttpResponse, type HttpResponseResolver, type PathParams } from "msw"

export const withAuth = <Params extends PathParams, Body extends DefaultBodyType>(resolver: HttpResponseResolver<Params, Body>): HttpResponseResolver<Params, Body> => {
  return (req) => {
    const FAKE_TOKEN = "Bearer FAKE_AUTH_TOKEN"

    const authHeader = req.request.headers.get("Authorization")

    if (authHeader !== FAKE_TOKEN) {
      return new HttpResponse(null, {
        status: 401,
        statusText: "Not authorized"
      })
    }

    return resolver(req)
  }
}
