import { render, screen } from "@testing-library/react"
import App from "./App"

test('Should render app', () => {
  render(<App />)

  expect(screen.getByText("App")).toBeInTheDocument()
})
