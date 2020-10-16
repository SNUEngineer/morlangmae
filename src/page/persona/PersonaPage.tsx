// @ts-nocheck
import React from "react";
import { useForm } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { UserView, EditUserRequest } from "../../services/user.service";

export interface PersonaPageProps {
  editUser(request: EditUserRequest): Promise<void>;
  persona: UserView;
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
}));

export default function PersonaPage(props: PersonaPageProps) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit(props.editUser)}
      className={classes.form}
      noValidate
    >
      <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {/* <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                inputRef={register}
              /> */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* <TextField
                variant="outlined"
                required
                defaultValue={props.companyCode}
                fullWidth
                id="companyCode"
                label="Company Code"
                name="companyCode"
                inputRef={register}
              /> */}
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="Display Name"
                name="displayName"
                autoComplete="displayName"
                inputRef={register}
              /> */}
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={register}
              /> */}
        </Grid>
      </Grid>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Edit
      </Button>
    </form>
  );
}
