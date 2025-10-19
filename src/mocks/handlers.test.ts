test('should respond with the user', async () => {
  const response = await fetch('https://api.plan.com/user')
  const data = await response.json()

  expect(data).toEqual({
    id: 1,
    firstName: "Mateus",
    fullName: "Mateus Guedes da Conceicao",
    email: "mxteusgued@gmail.com",
  })
})
