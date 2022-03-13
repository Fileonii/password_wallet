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

import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"

import { Link, useNavigate, Navigate } from "react-router-dom"

const Register = () => {
    const { accessToken } = useAuthContext()

    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const [encMethod, setEncMethod] = useState("HMAC")

    let navigate = useNavigate()

    const handleRegister = async () => {
        // TODO: login in api
        const res = await authMethods.register({ login, password, encMethod })
        if (res.status == 201) {
            navigate("../login", { replace: true })
        }
    }

    const onLoginChange = (e) => {
        setLogin(e.target.value)
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const onEncChange = (e) => {
        setEncMethod(e.target.value)
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
                            Register
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    label="Register"
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

                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">
                                        Password encryption method
                                    </FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={encMethod}
                                        onChange={onEncChange}
                                    >
                                        <FormControlLabel
                                            value="SHA512"
                                            control={<Radio />}
                                            label="SHA512 with salt"
                                        />
                                        <FormControlLabel
                                            value="HMAC"
                                            control={<Radio />}
                                            label="HMAC"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={handleRegister}>
                            Register
                        </Button>

                        <Link to="/login">
                            <Button variant="text">
                                Already have an account?
                            </Button>
                        </Link>
                    </CardActions>
                </Card>
            </Container>
        </Box>
    )
}

export default Register
