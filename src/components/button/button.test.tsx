import { render, screen } from "@testing-library/react"
import Button from "./button.component"
import { userEvent } from "@testing-library/user-event"

describe("Button component", () => {
  let mockedOnClick: () => void

  beforeEach(() => {
    mockedOnClick = vi.fn()
    render(<Button onClick={mockedOnClick}>Test Button</Button>)
  })

  test('Should render the button', () => {
    expect(screen.getByText("Test Button")).toBeInTheDocument()
  })

  test('Should call onClick', async () => {
    const button = screen.getByText("Test Button")

    await userEvent.click(button)
    expect(mockedOnClick).toBeCalled()
  })
})



















































































































  


  

