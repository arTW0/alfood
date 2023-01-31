import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IRestaurante from "../../../interfaces/IRestaurante"

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    http.delete<IRestaurante>(`/restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
        setRestaurantes([...listaRestaurante])
      })
  }

  useEffect(() => {
    http.get<IRestaurante[]>('/restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, [])

  return <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Nome
          </TableCell>
          <TableCell>
            Editar
          </TableCell>
          <TableCell>
            Excluir
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {restaurantes.map(restaurante => <TableRow key={restaurante.id}>
          <TableCell>
            {restaurante.nome}
          </TableCell>
          <TableCell>
            [<Link to={`/admin/restaurantes/${restaurante.id}`}>editar</Link>]
          </TableCell>
          <TableCell>
            <Button
              onClick={() => excluir(restaurante)}
              color='error'
              variant='outlined'
            >
              Excluir
            </Button>
          </TableCell>
        </TableRow>
        )}
      </TableBody>
    </Table>
  </TableContainer>
}

export default AdministracaoRestaurantes