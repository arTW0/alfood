import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"
import ITag from "../../../interfaces/ITag"

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState('')
  const [descricao, setDescricao] = useState('')
  const [valorTag, setValorTag] = useState('')
  const [restaurante, setRestaurante] = useState('')
  const [tags, setTags] = useState<ITag[]>([])
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [imagem, setImagem] = useState<File | null>(null)

  useEffect(() => {
    http.get<{ tags: ITag[] }>('tags/')
      .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData()

    formData.append('nome', nomePrato)
    formData.append('descricao', descricao)
    formData.append('tag', valorTag)
    formData.append('restaurante', restaurante)

    if (imagem) {
      formData.append('imagem', imagem)
    }

    http.request({
      url: 'pratos/',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
    })
      .then(() => alert("Prato cadastrado com sucesso!"))
      .catch(erro => console.log(erro))
  }

  return <Box>
    <Container sx={{ mt: 1 }} maxWidth='lg'>
      <Paper sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}
        >
          <Typography variant="h6" component="h1">
            Formulário de Pratos
          </Typography>
          <Box sx={{ width: '50%' }} component="form" onSubmit={aoSubmeterForm}>
            <TextField
              value={nomePrato}
              onChange={event => setNomePrato(event.target.value)}
              label='Nome do Prato'
              variant='standard'
              margin="dense"
              fullWidth
              required
            />
            <TextField
              value={descricao}
              onChange={event => setDescricao(event.target.value)}
              label='Descrição do Prato'
              variant='standard'
              margin="dense"
              fullWidth
              required
            />

            <FormControl margin="dense" fullWidth>
              <InputLabel id="select-tag">Tag</InputLabel>
              <Select
                labelId="select-tag"
                value={valorTag}
                onChange={event =>
                  setValorTag(event.target.value)}
              >
                {tags.map(tag => <MenuItem key={tag.id} value={tag.value}>
                  {tag.value}
                </MenuItem>)}
              </Select>
            </FormControl>

            <FormControl margin="dense" fullWidth>
              <InputLabel id="select-restaurante">Restaurante</InputLabel>
              <Select
                labelId="select-restaurante"
                value={restaurante}
                onChange={event =>
                  setRestaurante(event.target.value)}
              >
                {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                  {restaurante.nome}
                </MenuItem>)}
              </Select>
            </FormControl>

            <input type="file" onChange={event => event.target.files ? setImagem(event.target.files[0]) : null} />

            <Button sx={{ marginTop: 1 }} type="submit" variant='outlined' fullWidth>
              Salvar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  </Box>
}

export default FormularioPrato