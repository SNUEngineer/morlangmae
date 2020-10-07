import React, { useState, Fragment } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
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
import StepConnector from "@material-ui/core/StepConnector";
import PropTypes from "prop-types";
import clsx from "clsx";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import classNames from "classnames";

//const [passwordActive, setPasswordActive] = useState(false);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    draftButton: {
      height: "40px",
      width: "145px",
      color: "black",
      fontFamily: "Noto Sans CJK KR Medium",
      fontSize: "13px",
      borderRadius: "10px",
      backgroundColor: "#707070",
      boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0), 0px 2px 2px 0px rgba(0,0,0,0), 0px 1px 5px 0px rgba(0,0,0,0)",
      "&:hover": {
        background: "#707070",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      },
    },

    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    step: {
      fontFamily: "Noto Sans CJK KR Bold",
      padding: "0px",
    },
    stepper: {
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingRight: "0px",
      paddingLeft: "119px",
      marginLeft: "-16%",
    },
    datePickerField: {
      backgroundColor: "red",
      width: "100%",
      fontFamily: "Noto Sans CJK KR Bold",
    },
  })
);

function getSteps() {
  return ["표지", "정보", "확인"];
}

const contentStyles = makeStyles((theme: Theme) =>
  createStyles({
    nextButton: {
      height: "40px",
      width: "145px",
      color: "black",
      fontFamily: "Noto Sans CJK KR Medium",
      fontSize: "13px",
      borderRadius: "10px",
      backgroundColor: "#707070",

      boxShadow:
        "0px 3px 1px -2px rgba(0,0,0,0), 0px 2px 2px 0px rgba(0,0,0,0), 0px 1px 5px 0px rgba(0,0,0,0)",
      "&:hover": {
        background: "#707070",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
      },
    },
    imageCard: {
      width: "100%",
      height: "546px",
      backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    secondStepImageCard: {
      width: "100%",
      height: "auto",
      minHeight: "300px",
      backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    thirdStepImageCard: {
      width: "100%",
      height: "auto",
      minHeight: "300px",
      backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    passwordTextField: {
      marginBottom: "0px",
    },
    picker: {
      //backgroundColor: "red",
      width: "100%",
      "& div": {
        borderBottom: "none",
        fontSize: "14px",
        fontFamily: "Noto Sans CJK KR Regular",
        "&&::before": {
          borderBottom: "none",
        },
        underline: {
          "&&:before": {
            borderBottom: "none",
          },
          "&&:after": {
            borderBottom: "none",
          },
        },
      },
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
          <div className={editStyle.list_container_padding_top} />
          {!!collection.members[0] &&
            collection.members.map((user: UserView) => (
              <div key={user.id} className={editStyle.user_info}>
                <div className={editStyle.user_info_text}>
                  {user.displayName}
                </div>

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
          <div className={editStyle.list_container_padding_top} />
        </div>
      </div>
    );
  };

  switch (stepIndex) {
    case 0:
      return (
        <div className={editStyle.first_step_container}>
          <div className={editStyle.type_container}>
            <div className={editStyle.collection_type}>
              {collection.collectionType}
            </div>
            <div className={editStyle.service_type}>
              {/* {collection.serviceType} */}
              서비스 종류
            </div>
          </div>
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
              <TextArea
                inline
                width="100%"
                height="165px"
                maxHeight="165px"
                textSize={18}
                onChange={handleChange}
                defaultValue={collection.title}
                fontFamily={"Noto Sans CJK KR Regular"}
                border={{ width: 1, color: "#105710", radius: "10px" }}
              />
            </div>
            <div className={editStyle.set_date_container}>
              <div className={editStyle.set_date}>
                <div className={editStyle.text}>기한 설정</div>
                {/* <TextField
                  variant="outlined"
                  type="datetime-local"
                  name="startDate"
                  onChange={handleChange}
                  value={collection.startDate}
                />
                
                <TextField
                  variant="outlined"
                  type="datetime-local"
                  name="endDate"
                  onChange={handleChange}
                  value={collection.endDate}
                /> */}
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  {/* <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    className={classes.picker}
                    value={collection.startDate}
                    name="startDate"
                    onChange={handleChange}
                    autoOk={true}
                  />
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    className={classes.picker}
                    value={collection.endDate}
                    name="endDate"
                    onChange={handleChange}
                  /> */}
                </MuiPickersUtilsProvider>
                <div></div>
              </div>
            </div>
          </div>
          <div className={editStyle.first_next_button_container}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              //className={editStyle.next_button}
              className={classNames({
                [classes.nextButton]: true,
                [editStyle.next_button]: true,
              })}
            >
              Next
            </Button>
          </div>
        </div>
      );
    case 1:
      console.log("collection.members " + JSON.stringify(collection.members));
      console.log("props.users " + JSON.stringify(collection.members));

      return (
        <div className={editStyle.second_step_container}>
          <div className={editStyle.attend_text}> 참여 인원</div>
          <Grid container spacing={1}>
            <Grid item xs>
              <div className={editStyle.setting_box}>
                <Autocomplete
                  id="users-search"
                  style={{ width: 300 }}
                  multiple
                  value={collection.members}
                  //원래는 props.users로 검색가능 대상이 나와야 함.
                  onChange={(event, newValue) => {
                    setCollection({
                      ...collection,
                      members: newValue,
                    });
                  }}
                  options={collection.members}
                  //원래는 props.users로 검색가능 대상이 나와야 함.
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
                      <div className={editStyle.search_attend_user_item}>
                        <Avatar
                          alt={option.displayName}
                          src={option.imageUrl}
                          className={editStyle.avatar}
                        />

                        <div className={editStyle.user_info}>
                          <div className={editStyle.name_text}>
                            {option.displayName}
                          </div>
                          <div className={editStyle.user_info_text}>
                            삼성전자, 과장
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )}
                />
                <div
                  className={classNames({
                    [editStyle.attended_user_container]: true,
                    [editStyle.attended_user_container_setting]: true,
                  })}
                >
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
                      className={classes.passwordTextField}
                      //inputRef={register}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div className={editStyle.image_check_container}>
                <Card className={classes.secondStepImageCard}>
                  <CardHeader
                    title={collection.title}
                    style={{ color: "white" }}
                  />
                </Card>
                <div className={editStyle.second_next_button_container}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classNames({
                      [classes.nextButton]: true,
                      [editStyle.next_button]: true,
                    })}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      );
    case 2:
      return (
        <div className={editStyle.third_step_container}>
          <Grid container spacing={1}>
            <Grid item xs>
              <div className={editStyle.setting_box}>
                <div className={editStyle.collection_title}>
                  {collection.title}
                </div>
                <div className={editStyle.collection_type}>
                  {collection.collectionType}
                </div>
                <div className={editStyle.service_type}>
                  {collection.serviceType}
                </div>

                <div
                  className={classNames({
                    [editStyle.attended_user_container]: true,
                    [editStyle.attended_user_container_check]: true,
                  })}
                >
                  <div className={editStyle.attend_check_text}>참여 인원</div>
                  {attendedUser(true)}
                </div>

                <div className={editStyle.request_container}>
                  <div className={editStyle.text}>생성 요청</div>
                  {/* <Autocomplete
                  id="users-search"
                  style={{ width: 300 }}
                  multiple
                  value={requestMember}
                  onChange={(event, newValue) => {
                    setRequestMember(requestMember.concat(newValue));
                  }}
                  options={requestMember}
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
                      <div className={editStyle.search_attend_user_item}>
                        <Avatar
                          alt={option.displayName}
                          src={option.imageUrl}
                          className={editStyle.avatar}
                        />

                        <div className={editStyle.user_info}>
                          <Typography>{option.displayName}</Typography>
                          <Typography>삼성전자, 과장</Typography>
                        </div>
                      </div>
                    </Fragment>
                  )}
                /> */}

                  <div className={editStyle.request_member_container}>
                    <div className={editStyle.user_info}>
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
                      onChange={handleChange}
                      // defaultValue={}
                      fontFamily={"Noto Sans CJK KR Regular"}
                      border={{ width: 1, color: "transparent", radius: "5px" }}
                      backgroundColor={"#a0a0a0"}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div className={editStyle.title_image_check}>
                <div className={editStyle.text}>대표 썸네일</div>
                <Card className={classes.thirdStepImageCard}>
                  <CardHeader
                    style={{ color: "white" }}
                    title={collection.title}
                  />
                </Card>
                <div className={editStyle.third_finish_button_container}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => props.editCollection(collection)}
                    className={classNames({
                      [classes.nextButton]: true,
                      [editStyle.finish_button]: true,
                    })}
                  >
                    Finish
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
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
  serviceTypes: string[];
}

export default function EditCollectionPage(props: EditCollectionPageProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [passwordActive, setPasswordActive] = useState(false);
  const steps = getSteps();
  const collectionDetail = props.collectionDetail;
  const [requestMember, setRequestMember] = useState<UserView[]>();

  const testMember1 = {
    id: 0,
    displayName: "송병근",
  };
  const testMember2 = {
    id: 1,
    displayName: "송상근",
  };
  const testMembers = [testMember1, testMember2];
  const [collection, setCollection] = useState({
    id: collectionDetail.id,
    collectionType: collectionDetail.collectionType,
    serviceType: collectionDetail.serviceType,
    imageUrl: collectionDetail.imageUrl,
    title: collectionDetail.title,
    startDate: collectionDetail.startDate,
    endDate: collectionDetail.endDate,
    // members: collectionDetail.members.map((member: UserView) => {
    //   return props.users.find((user: UserView) => user.id === member.id);
    // }),
    members: testMembers,
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
  };

  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: "19px", //원형 아이콘 높이의 반
    },
    active: {
      "& $line": {
        backgroundColor: "#a2a2a2",

        //"linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    completed: {
      "& $line": {
        backgroundColor: "#a2a2a2",
        //"linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    line: {
      height: "1px",
      border: 0,
      backgroundColor: "#eaeaf0",
      marginLeft: "8px",
      marginRight: "8px",
      borderRadius: 1,
    },
  })(StepConnector);

  const useColorlibStepIconStyles = makeStyles({
    root: {
      zIndex: 1,
      height: "38px",
      width: "38px",
      color: "#e0e0e0",
      display: "flex",
      borderRadius: "50%",
      borderWidth: "1px",
      borderColor: "#e0e0e0",
      borderStyle: "solid",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "13px",
      fontFamily: "Noto Sans CJK KR Regular",
    },
    active: {
      //backgroundImage:  "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      backgroundColor: "#105710",
      borderColor: "transparent",
      color: "#fff",
      //boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      // backgroundImage:  "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      backgroundColor: "#105710",
      borderColor: "transparent",
      color: "#fff",
    },
  });

  function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    // const icons = {
    //   1: <SettingsIcon /> <div>1</div>,
    //   2: <GroupAddIcon />,
    //   3: <VideoLabelIcon />,
    // };
    const icons = {
      1: <div>1</div>,
      2: <div>2</div>,
      3: <div>3</div>,
    };
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  return (
    <div className={editStyle.root}>
      <div className={editStyle.header_container}>
        <div className={editStyle.stepper_container}>
          <div className={editStyle.stepper}>
            <Stepper
              activeStep={activeStep}
              connector={<ColorlibConnector />}
              alternativeLabel
              className={classes.stepper}
            >
              {steps.map((label, index) => (
                <Step key={label} onClick={() => handleStepClick(index)}>
                  <StepLabel
                    StepIconComponent={ColorlibStepIcon}
                    className={classes.step}
                  >
                    <div className={editStyle.label}> {label} </div>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </div>

        <div className={editStyle.save_draft_container}>
          <div className={editStyle.button}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classNames({
                [classes.draftButton]: true,
                [editStyle.next_button]: false,
              })}
            >
              초안으로 저장
            </Button>
          </div>
        </div>
      </div>

      <div>
        <div className={editStyle.step_container}>
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
