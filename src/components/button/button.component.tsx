interface Button {
  onClick: () => void
  children: React.ReactNode
}

function Button({ onClick, children }: Button) {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default Button
