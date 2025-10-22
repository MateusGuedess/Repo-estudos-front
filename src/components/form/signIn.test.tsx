import { render, screen } from "@testing-library/react"
import { SignIn } from "./signIn.form"

describe("Test Form Component", () => {

  beforeEach(() => {
    render(<SignIn />)
  })


  test("should render form", () => {
    const emailInput = screen.getByPlaceholderText("example@example.com")

    expect(emailInput).toBeInTheDocument()
  })
})
