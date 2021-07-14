// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import menuStyle from "./menuPage.module.scss";

export interface MenuProps {
  // handleSubmit(request: MenuRequest): Promise<void>;
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
    height: "100%",
  },
}));

export default function MenuPage(props: MenuProps) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const nickName = "송병근";
  const point = 1700;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <p>{nickName}</p>
        <p>{point} point</p>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>

          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="displayName"
              label="닉네임 수정"
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
              label="비밀번호 수정"
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
              label="비밀번호 수정 확인"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={register}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          s
          className={classes.submit}
        >
          포인트 충전샵
        </Button>
      </div>
    </Container>
  );
}
