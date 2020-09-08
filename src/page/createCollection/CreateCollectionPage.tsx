import React from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { CreateDraftCollectionRequest } from "../../services/collection.service";
import pageStyle from "./createCollectionPage.module.scss";

export interface CreateCollectionPageProps {
  createCollection(request: CreateDraftCollectionRequest): Promise<void>;
  serviceTypes: string[];
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateCollectionPage(props: CreateCollectionPageProps) {
  const createStyle = useStyles();
  const { register, handleSubmit } = useForm();
  console.log("createStyle " + createStyle.paper);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={pageStyle.paper}>
        <Typography component="h1" variant="h5">
          Create new collection
        </Typography>
        <div className={pageStyle.bailey_text}>Bailey</div>
        <div className={pageStyle.create_text}>새 컬렉션 생성</div>
        <form
          onSubmit={handleSubmit(props.createCollection)}
          className={pageStyle.form}
          noValidate
        >
          <div>
            <div className={pageStyle.collection_type_container}>
              <select
                name="collectionType"
                ref={register}
                className={pageStyle.select}
              >
                <option aria-label="None" value="" />
                <option value="PROJECT">Project</option>
                <option value="TEAM">Team</option>
              </select>
            </div>
            <div className={pageStyle.service_type_container}>
              <select
                name="serviceType"
                ref={register}
                className={pageStyle.select}
              >
                {props.serviceTypes.map((serviceType) => {
                  return (
                    <option key={serviceType} value={serviceType}>
                      {serviceType}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Collection Title"
            name="title"
            inputRef={register}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={pageStyle.submit}
          >
            Create
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              {/* <Link to="/collections">
                Close
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
