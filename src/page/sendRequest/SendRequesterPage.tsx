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
import { SendRequesterData } from "../../services/user.service";

export interface SendRequesterProps {
  handleSubmit(request: SendRequesterData): Promise<void>;
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

export default function SendRequesterPage(props: SendRequesterProps) {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
        <Typography component="h1" variant="h5">
          몰래 메세지 보내기
        </Typography>
        <form
          onSubmit={handleSubmit(props.handleSubmit)}
          className={classes.form}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <p>ㅇㅇㅇ님의 남은 포인트 잔액 : 1300p</p>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="charge"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.certButton}
              >
                충전하기
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="displayName"
                name="displayName"
                variant="outlined"
                required
                fullWidth
                id="displayName"
                label="노출될 별명"
                autoFocus
                inputRef={register}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="counterPhoneNumber"
                name="counterPhoneNumber"
                variant="outlined"
                required
                type="number"
                fullWidth
                id="counterPhoneNumber"
                label="핸드폰 번호"
                autoFocus
                inputRef={register}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="point"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.certButton}
              >
                포인트 사용
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="coupon"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.certButton}
              >
                쿠폰 사용
              </Button>
            </Grid>
            <Grid item xs={12}>
              <p>
                회원가입되지 않은 상대방의 핸드폰 번호로 문자 메세지가
                날아갑니다. 회원가입 된 상대방에게는 요청 알림이 전송됩니다.
                노출될 별명은 상대방과 대화시에 사용할 별명입니다. 상대방은
                회원님이 누군지 알 수 없습니다!
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
