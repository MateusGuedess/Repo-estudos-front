import { render, screen } from "@testing-library/react"
import Input from "./input.component"
import userEvent from "@testing-library/user-event"

describe('Input component', () => {
  let mockedOnChangeInput: () => void
  beforeEach(() => {
    mockedOnChangeInput = vi.fn()
    render(<Input onChange={mockedOnChangeInput} type="text" placeholder="Test Input" />)
  })


  test('Should render Input', () => {
    const input = screen.getByTestId("input")
    expect(input).toBeInTheDocument()
  })

  test('Should trigger onChange', async () => {
    const input = screen.getByPlaceholderText("Test Input")
    await userEvent.type(input, "test input")
    expect(mockedOnChangeInput).toBeCalledTimes(10)
  })


  test('Should have Value', async () => {
    const input = screen.getByPlaceholderText("Test Input")
    await userEvent.type(input, "test input")

    expect(input).toHaveValue("test input")
  })
})
