import { AppBar, Box, Button, Container, Link, Paper, TextField, Toolbar, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useParams, Link as RouterLink } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const FormularioRestaurante = () => {
  const parametros = useParams()
  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`/restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
    }
  }, [parametros])
  const [nomeRestaurante, setNomeRestaurante] = useState('')
  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (parametros.id) {
      http.put(`/restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso!')
        })
    } else {
      http.post('/restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => {
          alert('Restaurante cadastrado com sucesso!')
        })
    }
  }

  return <>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6">
            Administração
          </Typography>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Link component={RouterLink} to='/admin/restaurantes'>
              <Button sx={{ my: 2, color: 'white' }}>
                Restaurantes
              </Button>
            </Link>
            <Link component={RouterLink} to='/admin/restaurantes/novo'>
              <Button sx={{ my: 2, color: 'white' }}>
                Novo Restaurante
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <Box>
      <Container sx={{ mt: 1 }} maxWidth='lg'>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}
          >
            <Typography
              variant="h6"
              component="h1"
            >
              Formulário de Restaurantes
            </Typography>
            <Box
              component="form"
              sx={{ width: '50%' }}
              onSubmit={aoSubmeterForm}>
              <TextField
                value={nomeRestaurante}
                onChange={event => setNomeRestaurante(event.target.value)}
                label='Nome do Restaurante'
                variant='standard'
                fullWidth
                required
              />
              <Button sx={{
                marginTop: 1
              }}
                type="submit"
                variant='outlined'
                fullWidth
              >
                Salvar
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>

  </>
}

export default FormularioRestaurante