import { Container, FormControl, InputLabel, Input } from '@mui/material'

export const Forms = () => {
  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <FormControl>
        <InputLabel required htmlFor="name">
          Sistema
        </InputLabel>
        <Input type="name" />
      </FormControl>
    </Container>
  )
}
