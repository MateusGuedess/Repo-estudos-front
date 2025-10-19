type CustomInputProps = {

}

type InputProps = React.ComponentProps<'input'> & CustomInputProps

function Input({ ...props }: InputProps) {
  return <input data-testid="input" {...props} />
}


export default Input
