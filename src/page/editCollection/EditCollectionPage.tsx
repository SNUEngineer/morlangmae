import React, { useState, Fragment } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import InputBase from "@material-ui/core/InputBase";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { CollectionDetail } from "../../services/collection.service";
import { UserView } from "../../services/user.service";
import editStyle from "./editCollectionPage.module.scss";
import { TextArea } from "../../components/customizedComponent/TextArea";

//const [passwordActive, setPasswordActive] = useState(false);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "80%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ["표지", "정보", "본문"];
}

const contentStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageCard: {
      width: "100%",
      paddingBottom: "56.25%",
      backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
  })
);

function getStepContent(
  stepIndex: number,
  collection: any,
  setCollection: any,
  passwordActive: boolean,
  setPasswordActive,
  requestMember,
  setRequestMember: UserView[],
  props: EditCollectionPageProps,
  handleNext
) {
  const classes = contentStyles(collection);

  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setCollection({
      ...collection,
      [name]: value,
    });
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files.length !== 1) {
      console.error("Unexpected file number", e.dataTransfer.files);
    } else {
      const res = await props.uploadImage(e.dataTransfer.files[0]);
      setCollection({
        ...collection,
        imageUrl: res.uri,
      });
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const attendedUser = (checking: boolean) => {
    return (
      <div>
        <div className={editStyle.count_text}>
          {!!collection.members[0] &&
            collection.members[0].displayName +
              " 외 " +
              (collection.members.length - 1) +
              " 명 (참여자 리스트)"}
        </div>
        <div className={editStyle.list_container}>
          {collection.members.map((user: UserView) => (
            <div key={user.id} className={editStyle.writer_info_container}>
              {user.displayName}

              {!checking && (
                <Button
                  onClick={() => {
                    setCollection({
                      ...collection,
                      members: collection.members.filter(
                        (it: UserView) => it.id !== user.id
                      ),
                    });
                  }}
                >
                  X
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  switch (stepIndex) {
    case 0:
      return (
        <Paper>
          <Typography>{collection.collectionType}</Typography>
          <Typography>{collection.serviceType}</Typography>
          <Card
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={classes.imageCard}
          >
            <CardHeader title={collection.title} style={{ color: "white" }} />
          </Card>
          <div className={editStyle.setting_container}>
            <div className={editStyle.set_title_container}>
              <div className={editStyle.text}>제목 설정</div>
              <TextField
                variant="outlined"
                name="title"
                onChange={handleChange}
                value={collection.title}
              />
            </div>
            <div className={editStyle.set_date_container}>
              <div className={editStyle.set_date}>
                <div className={editStyle.text}>기한 설정</div>
                <TextField
                  variant="outlined"
                  type="datetime-local"
                  name="startDate"
                  onChange={handleChange}
                  value={collection.startDate}
                />
                <p />
                <TextField
                  variant="outlined"
                  type="datetime-local"
                  name="endDate"
                  onChange={handleChange}
                  value={collection.endDate}
                />
                <div></div>
              </div>
            </div>
          </div>
          <div className={editStyle.first_next_button_container}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={editStyle.next_button}
            >
              Next
            </Button>
          </div>
        </Paper>
      );
    case 1:
      return (
        <Paper>
          <div>참여인원</div>
          <div className={editStyle.input_option_container}>asdf</div>
          <Grid container spacing={1}>
            <Grid item xs>
              <Autocomplete
                id="users-search"
                style={{ width: 300 }}
                multiple
                value={collection.members}
                onChange={(event, newValue) => {
                  setCollection({
                    ...collection,
                    members: newValue,
                  });
                }}
                options={props.users}
                renderInput={(params) => {
                  return (
                    <InputBase
                      className={editStyle.input_option_container}
                      ref={params.InputProps.ref}
                      inputProps={params.inputProps}
                      autoFocus
                    />
                  );
                }}
                getOptionLabel={(option) => option.displayName}
                renderOption={(option: UserView) => (
                  <Fragment>
                    <div className={editStyle.writer_container}>
                      <Avatar
                        alt={option.displayName}
                        src={option.imageUrl}
                        className={editStyle.avatar}
                      />

                      <div className={editStyle.writer_info_container}>
                        <Typography>{option.displayName}</Typography>
                        <Typography>삼성전자, 과장</Typography>
                      </div>
                    </div>
                  </Fragment>
                )}
              />
              <div className={editStyle.attended_user_container}>
                {attendedUser(false)}
              </div>
              <div className={editStyle.password_container}>
                <div
                  className={editStyle.is_password_container}
                  onClick={(event: object) => {}}
                >
                  <Checkbox
                    className={editStyle.check_box}
                    onChange={(event: object) => {
                      setPasswordActive(event.target.checked);
                    }}
                  ></Checkbox>
                  <div className={editStyle.text}>암호요구</div>
                </div>
                <div>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    disabled={!passwordActive}
                    //inputRef={register}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <Card className={classes.imageCard}>
                <CardHeader
                  title={collection.title}
                  style={{ color: "white" }}
                />
              </Card>
              <div className={editStyle.first_next_button_container}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={editStyle.next_button}
                >
                  Next
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      );
    case 2:
      return (
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs>
              <Typography variant="h3">{collection.title}</Typography>
              <Typography>{collection.collectionType}</Typography>
              <Typography>{collection.serviceType}</Typography>

              <div className={editStyle.attended_user_check_container}>
                <Typography className={editStyle.text}>참여 인원</Typography>
                {attendedUser(true)}
              </div>

              <div className={editStyle.request_container}>
                <Typography className={editStyle.text}>생성 요청</Typography>
                <Autocomplete
                  id="users-search"
                  style={{ width: 300 }}
                  multiple
                  value={requestMember}
                  onChange={(event, newValue) => {
                    setRequestMember(requestMember.concat(newValue));
                  }}
                  options={props.users}
                  renderInput={(params) => {
                    return (
                      <InputBase
                        className={editStyle.input_option_container}
                        ref={params.InputProps.ref}
                        inputProps={params.inputProps}
                        autoFocus
                      />
                    );
                  }}
                  getOptionLabel={(option) => option.displayName}
                  renderOption={(option: UserView) => (
                    <Fragment>
                      <div className={editStyle.writer_container}>
                        <Avatar
                          alt={option.displayName}
                          src={option.imageUrl}
                          className={editStyle.avatar}
                        />

                        <div className={editStyle.writer_info_container}>
                          <Typography>{option.displayName}</Typography>
                          <Typography>삼성전자, 과장</Typography>
                        </div>
                      </div>
                    </Fragment>
                  )}
                />

                <div className={editStyle.request_member_container}>
                  <div className={editStyle.writer_info_container}>
                    {!!requestMember && requestMember.displayName}
                  </div>
                </div>
                <div className={editStyle.request_comment_container}>
                  <TextArea
                    inline
                    width="100%"
                    height="100px"
                    maxHeight="100px"
                    textSize={14}
                  />
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div className={editStyle.title_image_check}>
                <div className={editStyle.text}>대표 썸네일</div>

                <Card className={classes.imageCard}>
                  <CardHeader
                    style={{ color: "white" }}
                    title={collection.title}
                  />
                </Card>
              </div>
              <div className={editStyle.first_next_button_container}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => props.editCollection(collection)}
                  className={editStyle.next_button}
                >
                  Finish
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      );
    default:
      return "Unknown stepIndex";
  }
}

export interface EditCollectionPageProps {
  collectionDetail: CollectionDetail;
  users: UserView[];
  uploadImage(file: File): Promise<{ uri: string }>;
  editCollection(collection: any): Promise<void>;
}

export default function EditCollectionPage(props: EditCollectionPageProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [passwordActive, setPasswordActive] = useState(false);
  const steps = getSteps();
  const collectionDetail = props.collectionDetail;
  const [requestMember, setRequestMember] = useState<UserView[]>();
  const [collection, setCollection] = useState({
    id: collectionDetail.id,
    collectionType: collectionDetail.collectionType,
    serviceType: collectionDetail.serviceType,
    imageUrl: collectionDetail.imageUrl,
    title: collectionDetail.title,
    startDate: collectionDetail.startDate,
    endDate: collectionDetail.endDate,
    members: collectionDetail.memberIds.map((id: number) => {
      return true;
    }),
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} onClick={() => handleStepClick(index)}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          {getStepContent(
            activeStep,
            collection,
            setCollection,
            passwordActive,
            setPasswordActive,
            requestMember,
            setRequestMember,
            handleNext,
            props
          )}
          <div></div>
        </div>
      </div>
    </div>
  );
}
