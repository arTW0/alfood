import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import http from "../../../http"
import IPrato from "../../../interfaces/IPrato"

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([])
  const excluir = (pratoAhSerExcluido: IPrato) => {
    http.delete<IPrato>(`/restaurantes/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPrato = pratos.filter(prato => prato.id !== pratoAhSerExcluido.id)
        setPratos([...listaPrato])
      })
  }

  useEffect(() => {
    http.get<IPrato[]>('/pratos/')
      .then(resposta => setPratos(resposta.data))
  }, [])

  return <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            Nome
          </TableCell>
          <TableCell>
            Tag
          </TableCell>
          <TableCell>
            Imagem
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
        {pratos.map(prato => <TableRow key={prato.id}>
          <TableCell>
            {prato.nome}
          </TableCell>
          <TableCell>
            {prato.tag}
          </TableCell>
          <TableCell>
            {
              prato.imagem ?
                [<a href={prato.imagem}>ver imagem</a>] :
                <a>Não há imagem</a>
            }
          </TableCell>
          <TableCell>
            [<Link to={`/admin/pratos/${prato.id}`}>editar</Link>]
          </TableCell>
          <TableCell>
            <Button
              onClick={() => excluir(prato)}
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

export default AdministracaoPratos