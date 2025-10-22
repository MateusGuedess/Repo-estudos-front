import { HttpResponse } from "msw"

const FAKE_TOKEN = "Bearer FAKE_AUTH_TOKEN"

export async function signInMutation({ request }) {
  const { email } = await request.json()

  if (email === "mxteusgued@example.com") {
    return HttpResponse.json({
      token: FAKE_TOKEN,
      user: {
        name: 'Mateus'
      }
    })
  }



  return HttpResponse.json(null, { status: 401 })
}

