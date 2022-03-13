import {
    Card,
    Box,
    Container,
    Button,
    CardContent,
    
} from "@mui/material"

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import ApiService from "../services/api"
import { useAuthContext } from "../services/auth"
import { useEffect, useState } from "react";

function createData(id, name, password, encoding) {
    return { id, name, password, encoding  };
}

const Home = () => {
    const [passwords, setPasswords] = useState([
        createData(1, 'Nazwa strony', null, 'hmac'),
        createData(2, 'Nazwa strony1', null, 'sha'),
      ])
    const { accessToken } = useAuthContext()
    const api = ApiService(accessToken)

    const enc_types = {"hmac": "HMAC", 'sha': 'SHA-256 + SALT'}
    
    const getPasswords = async () => {
        const res = await api.getPasswords()
        console.log({ passwords: res.data })
    }

    const updateCourse = (id, decryptedPass) => {
        const pass = passwords
        setPasswords(
            pass.map( e => {
                if ( e.id == id) {
                    e.password = decryptedPass
                }
                return e
            })
        )
    }

    const handleDecode = async (id) => {
        console.log("Decode " + id)
        // todo connect api
        const res = await api.getDecryptedPassword(id)
        console.log(res.data)
        updateCourse(res.data.decryptedPass)
    }
    
    useEffect( () => {
        getPasswords()
    }, [])

    return (
        <Box
            display="inline-block"
            style={{
                width: "100%",
            }}
        >
            <Container sx={{ width: 1000, marginTop: 10 }}>
                <Card variant="outlined">
                    <CardContent>
                        <h1>Password wallet</h1>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Nazwa</TableCell>
                                    <TableCell align="right">Haslo</TableCell>
                                    <TableCell align="right">Typ szyfrowania</TableCell>
                                    
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {passwords.map((row) => (
                                    <TableRow
                                    key={row.id}
                                    >
                                        <TableCell >
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{enc_types[row.encoding]}</TableCell>
                                    <TableCell align="right">
                                        {row.password || <Button variant="text" onClick={() => { handleDecode(row.id) }}>Decode</Button>}
                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </TableContainer>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default Home
