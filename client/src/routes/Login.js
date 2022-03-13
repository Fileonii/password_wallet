import { useState } from "react"
import {
    Card,
    Box,
    Container,
    Button,
    CardContent,
    CardActions,
    TextField,
    Typography,
    Grid,
} from "@mui/material"
import { authMethods, useAuthContext } from "../services/auth"

import { Link, useNavigate, Navigate } from "react-router-dom"

const Login = () => {
    const { accessToken, setContext } = useAuthContext()

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    let navigate = useNavigate()

    const handleLogin = async () => {
        const res = await authMethods.login({ login, password })
        if (res.status == 201) {
            console.log("Navigate!!")
            setContext({
                user: {},
                accessToken: res.data.accessToken,
            })

            navigate("../", { replace: true })
        }
    }

    const onLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    if (accessToken) {
        return <Navigate to="/" />
    }

    return (
        <Box
            display="inline-block"
            style={{
                width: "100%",
            }}
        >
            <Container sx={{ width: 500, marginTop: 10 }}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography sx={{ fontSize: 24 }} gutterBottom>
                            Login
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Login"
                                    focused
                                    fullWidth
                                    value={login}
                                    onChange={onLoginChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Password"
                                    type="password"
                                    focused
                                    fullWidth
                                    value={password}
                                    onChange={onPasswordChange}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={handleLogin}>
                            Login
                        </Button>

                        <Link to="/register">
                            <Button variant="text">
                                Don't have an account?
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    )
}

export default Login
