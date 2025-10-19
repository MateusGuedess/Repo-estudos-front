import "@testing-library/jest-dom"
import { server } from "./mocks/node"

beforeAll(() => server.listen())
beforeEach(() => server.resetHandlers())
afterAll(() => server.close())


