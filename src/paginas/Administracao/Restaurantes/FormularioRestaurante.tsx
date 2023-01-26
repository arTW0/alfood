import { Button, TextField } from "@mui/material"
import React, { useState } from "react"

const FormularioRestaurante = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('')
  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('preciso enviar dados para a api')
    console.log(nomeRestaurante)
  }

  return <form onSubmit={aoSubmeterForm}>
    <TextField
      value={nomeRestaurante}
      onChange={event => setNomeRestaurante(event.target.value)}
      id='standard-basic'
      label='Standard'
      variant='standard'
    />
    <Button variant='outlined'>Oulined</Button>
  </form>
}

export default FormularioRestaurante