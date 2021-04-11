// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid"; 
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { SignUpRequest } from "../../services/user.service";

export interface SignUpProps {
  handleSubmit(request: SignUpRequest): Promise<void>;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  certButton: {
    margin: "0",
    height: "100%"

  },
}));

export default function SignUpPage(props: SignUpProps) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          onSubmit={handleSubmit(props.handleSubmit)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="아이디"
                autoFocus
                inputRef={register}
              />
            </Grid>
           
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="닉네임"
                name="displayName"
                autoComplete="displayName"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="check-password"
                label="비밀번호 확인"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="핸드폰 번호"
                name="displayName"
                autoComplete="displayName"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.certButton}
          >
            인증번호 전송
          </Button>
          </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="인증번호"
                name="displayName"
                autoComplete="displayName"
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
            <Button
            type="submit"
            fullWidth
            
            variant="contained"
            color="primary"
            className={classes.certButton}
          >
            인증하기
          </Button>
          </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/sign-in">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
