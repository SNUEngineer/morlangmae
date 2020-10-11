import React, { useState, Fragment, useEffect } from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
  useTheme,
} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
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
import Popover from "@material-ui/core/Popover";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib //1.3.13버전 사용
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Dialog from "@material-ui/core/Dialog";
import classNames from "classnames";

//const [passwordActive, setPasswordActive] = useState(false);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {},
    paper: {
      padding: "0px",
    },
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    draftButton: {
      height: "40px",
      width: "95px",
      fontFamily: "Noto Sans CJK KR Medium",
      fontSize: "13px",
      borderRadius: "1px",
      color: "#4D4F5C",
      backgroundColor: "#F8F8F8",
      borderColor: "#E0E0E0",
      borderStyle: "solid",
      letterSpacing: "-0.65px",
      padding: "0px",
      boxShadow: "none",
      "&:hover": {
        backgroundColor: "#F0F0F0",
        boxShadow: "none",
      },
    },

    step: {
      fontFamily: "Noto Sans CJK KR Bold",
      padding: "0px",
      backgroundColor: "transparent",
      "& .MuiStepLabel-label": {
        marginTop: "4px",
      },
      "&&:active": {},
      "&&:completed": {},
    },
    stepper: {
      paddingTop: "0px",
      paddingBottom: "0px",
      paddingRight: "0px",
      paddingLeft: "119px",
      marginLeft: "-16%",
      backgroundColor: "transparent",
    },
    label: {
      fontFamily: "Noto Sans CJK KR Medium",
      fontSize: "14px",
      letterSpacing: "-0.7px",
      "&&:active": {
        //color: "red",
      },
      "&&:completed": {
        color: "#A2A2A2",
      },
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
    show_list_button: {
      minHeight: "0px",
      minWidth: "0px",
      padding: "0px",
      margin: "-2px 0 0 0",
      backgroundColor: "transparent",
      boxShadow: "none",
      "&:active": {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
      "&:hover": {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
    },
    delete_button: {
      minHeight: "0px",
      minWidth: "0px",
    },
    nextButton: {
      cursor: "pointer",
      height: "40px",
      width: "95px",
      color: "#105710",
      fontFamily: "Noto Sans CJK KR Medium",
      fontSize: "12px",
      letterSpacing: "-0.6px",
      borderRadius: "36px",
      borderColor: "#105710",
      borderWidth: "0.5px",
      borderStyle: "solid",
      backgroundColor: "transparent",
      boxShadow: "none",
      "&:hover": {
        boxShadow: "none",
        backgroundColor: "transparent",
      },
    },
    imageCard: {
      width: "100%",
      height: "546px",
      // backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundImage:
        "url(https://cdn.civitatis.com/francia/paris/galeria/arco-triunfo-paris.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    secondStepImageCard: {
      width: "100%",
      height: "auto",
      minHeight: "289px",
      backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    thirdStepImageCard: {
      width: "100%",
      height: "auto",
      minHeight: "280px",
      backgroundImage: (props: any) => `url('${props.imageUrl}')`,
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    passwordTextField: {
      marginBottom: "0px",
      height: "40px",
      padding: "0px",
      borderRadius: "5px",
      borderColor: "#e0e0e0",
      borderStyle: "solid",
      borderWidth: "0.5px",
      "& .MuiInput-underline.Mui-disabled:before": {
        borderBottomColor: "transparent",
        borderBottomWidth: "0px",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "transparent",
        borderBottomWidth: "0px",
      },
      ".MuiInput-underline:after": {
        borderBottomColor: "transparent",
        borderBottomWidth: "0px",
        backgroundColor: "red",
      },
    },
    picker: {
      //backgroundColor: "red",
      width: "100%",
      margin: "0 0 0 0",
      padding: "0 30px 0 30px",
      boxSizing: "border-box",
      "& div": {
        borderBottom: "none",
        fontSize: "14px",
        fontFamily: "Noto Sans CJK KR Regular",
        "&&::before": {
          borderBottomColor: "transparent",
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

//const [open, setOpen] = useState(false);

export const getStepContent = (
  stepIndex: number,
  collection: any,
  setCollection: any,
  passwordActive: boolean,
  setPasswordActive,
  popoverOpen: boolean,
  setPopoverOpen,
  popOverAnchorEl,
  setPopOverAnchorEl,
  requestMember,
  setRequestMember: UserView[],
  popOpen: boolean,
  setPopOpen,
  anchorEl,
  setAnchorEl,
  props: EditCollectionPageProps,
  handleNext
) => {
  const styleClasses = contentStyles(collection);
  //const classes = useInputStyles();
  const id = popoverOpen ? "simple-popover-search" : undefined;

  const handleClickOpen = (event) => {
    setPopoverOpen(true);
    setPopOverAnchorEl(event.currentTarget);
  };
  console.log("popOpen " + popOpen);
  // setPasswordActive(false);
  // setPopOpen(false);

  const handleClose = (value) => {
    setPopoverOpen(false);
    setSelectedValue(value);
    setAnchorEl(null);
  };
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
        {!checking && (
          <div className={editStyle.count_text}>
            {!!collection.members[0] &&
              collection.members[0].displayName +
                " 외 " +
                (collection.members.length - 1) +
                " 명 (참여자 리스트)"}
          </div>
        )}

        {!checking && (
          <div className={editStyle.count_text}>
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
                        className={styleClasses.delete_button}
                        onClick={() => {
                          setCollection({
                            ...collection,
                            members: collection.members.filter(
                              (it: UserView) => it.id !== user.id
                            ),
                          });
                        }}
                      >
                        <div className={editStyle.minus_container}>
                          <div className={editStyle.minus}></div>
                        </div>
                      </Button>
                    )}
                  </div>
                ))}
              <div className={editStyle.list_container_padding_top} />
            </div>
          </div>
        )}
        {checking && (
          <div className={editStyle.count_text_check_container}>
            <div className={editStyle.text}>리스트 보기</div>
            <Button
              aria-describedby={id}
              variant="contained"
              onClick={handleClickOpen}
              className={styleClasses.show_list_button}
              endIcon={<img className={editStyle.go_to_icon} alt={"icon"} />}
              // endIcon={
              //   <div>
              //     <MoreHorizIcon />
              //   </div>
              // }
            >
              <div className={editStyle.count_text_check}>
                {!!collection.members[0] &&
                  collection.members[0].displayName +
                    " 외 " +
                    (collection.members.length - 1) +
                    " 명"}
              </div>
            </Button>

            <Popover
              onClose={handleClose}
              id={id}
              open={popoverOpen}
              //open={false}
              anchorEl={popOverAnchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              PaperProps={{
                style: {
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  overflow: "visible",
                },
              }}
              className={styleClasses.popover}
            >
              <div className={editStyle.attend_popover}>
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
                            className={styleClasses.delete_button}
                            onClick={() => {
                              setCollection({
                                ...collection,
                                members: collection.members.filter(
                                  (it: UserView) => it.id !== user.id
                                ),
                              });
                            }}
                          >
                            <div className={editStyle.minus_container}>
                              <div className={editStyle.minus}></div>
                            </div>
                          </Button>
                        )}
                      </div>
                    ))}
                  <div className={editStyle.list_container_padding_top} />
                </div>
              </div>
            </Popover>
          </div>
        )}
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
              {collection.title}
            </div>
          </div>
          <Card
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={styleClasses.imageCard}
          >
            <CardHeader title={collection.title} style={{ color: "white" }} />
          </Card>
          <div className={editStyle.setting_container}>
            <div className={editStyle.set_title_container}>
              <div className={editStyle.setting_stage_container}>
                <div className={editStyle.number}>1</div>
                <div className={editStyle.text}>제목 설정</div>
              </div>
              <TextArea
                inline
                width="100%"
                height="165px"
                maxHeight="165px"
                textSize={15}
                fontColor={"#4B4B4B"}
                letterSpacing={"-0.75px"}
                padding={"24px 30px 24px 30px"}
                onChange={handleChange}
                defaultValue={collection.title}
                fontFamily={"Noto Sans CJK KR Regular"}
                border={{ width: 0.5, color: "#E0E0E0", radius: "5px" }}
                backgroundColor={"transparent"}
              />
            </div>
            <div className={editStyle.set_date_container}>
              <div className={editStyle.set_date}>
                <div className={editStyle.setting_stage_container}>
                  <div className={editStyle.number}>2</div>
                  <div className={editStyle.text}>기한 설정</div>
                </div>
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
                <div className={editStyle.picker_container}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      className={classNames({
                        [editStyle.picker_start]: true,
                        [styleClasses.picker]: true,
                      })}
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
                      className={classNames({
                        [editStyle.picker_end]: true,
                        [styleClasses.picker]: true,
                      })}
                      value={collection.endDate}
                      name="endDate"
                      onChange={handleChange}
                    />
                  </MuiPickersUtilsProvider>
                </div>
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
                [styleClasses.nextButton]: true,
                [editStyle.next_button]: true,
              })}
            >
              다음 단계
            </Button>
          </div>
        </div>
      );
    case 1:
      console.log("collection.members " + JSON.stringify(collection.members));
      console.log("props.users " + JSON.stringify(collection.members));

      return (
        <div className={editStyle.second_step_container}>
          <Grid container spacing={1}>
            <Grid item xs>
              <div className={editStyle.attend_text}> 참여 인원</div>
              <div className={editStyle.setting_box}>
                <Autocomplete
                  id="users-search"
                  style={{ width: "100%" }}
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
                        placeholder={"ID 또는 이름으로 참여 인원 추가"}
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
                  <div className={editStyle.text_field_container}>
                    <TextField
                      margin="normal"
                      // variant="none"
                      disableUnderline
                      required
                      fullWidth
                      name="password"
                      placeholder="암호"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      disabled={!passwordActive}
                      className={styleClasses.passwordTextField}
                      InputProps={{
                        underline: {
                          "&&&:before": {
                            borderBottom: "none",
                          },
                          "&&:after": {
                            borderBottom: "none",
                          },
                        },
                      }}
                      //inputRef={register}
                    />
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div className={editStyle.image_check_container}>
                <Card className={styleClasses.secondStepImageCard}>
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
                      [styleClasses.nextButton]: true,
                      [editStyle.next_button]: true,
                    })}
                  >
                    다음 단계
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
                <div className={editStyle.title_container}>
                  <div className={editStyle.stage_title}>컬렉션</div>
                  <div className={editStyle.collection_title}>
                    {collection.title}
                  </div>
                </div>
                <div className={editStyle.collection_info_container}>
                  <div className={editStyle.collection_type}>
                    <div className={editStyle.type}>컬렉션 타입</div>
                    <div className={editStyle.text}>
                      {collection.collectionType}
                    </div>
                  </div>
                  <div className={editStyle.service_type}>
                    <div className={editStyle.type}>서비스 종류</div>
                    <div className={editStyle.text}>
                      {collection.serviceType}
                    </div>
                  </div>
                </div>

                <div
                  className={classNames({
                    [editStyle.attended_user_container]: true,
                    [editStyle.attended_user_container_check]: true,
                  })}
                >
                  <div
                    className={classNames({
                      [editStyle.stage_title]: true,
                      [editStyle.attend_check_text]: true,
                    })}
                  >
                    참여 인원
                  </div>
                  {attendedUser(true)}
                </div>

                <div className={editStyle.request_container}>
                  <div
                    className={classNames({
                      [editStyle.stage_title]: true,
                      [editStyle.authority_request_text]: true,
                    })}
                  >
                    생성 요청
                  </div>
                  <Autocomplete
                    id="users-search"
                    style={{ width: "100%" }}
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
                          placeholder={"ID 또는 이름으로 생성 권한자 설정"}
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

                  {/* <div className={editStyle.request_member_container}>
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
                  </div> */}
                </div>
              </div>
            </Grid>
            <Grid item xs>
              <div className={editStyle.title_image_check}>
                <Card className={styleClasses.thirdStepImageCard}>
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
                      [styleClasses.nextButton]: true,
                      [editStyle.finish_button]: true,
                    })}
                  >
                    완료
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
};

export interface EditCollectionPageProps {
  collectionDetail: CollectionDetail;
  users: UserView[];
  uploadImage(file: File): Promise<{ uri: string }>;
  editCollection(collection: any): Promise<void>;
  serviceTypes: string[];
}

export default function EditCollectionPage(props: EditCollectionPageProps) {
  const styleClasses = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [popOpen, setPopOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [popOverAnchorEl, setPopOverAnchorEl] = useState(null);
  const [passwordActive, setPasswordActive] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const steps = getSteps();
  const collectionDetail = props.collectionDetail;
  const [requestMember, setRequestMember] = useState<UserView[]>();
  const Theme = useTheme();
  const fullScreen = useMediaQuery(Theme.breakpoints.down("sm"));
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
      position: "relative",
      cursor: "pointer",
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
    icon: {
      position: "absolute",
      left: "50%",
      top: "50%",
    },
  });

  function ColorlibStepIcon(props) {
    const styleClasses = useColorlibStepIconStyles();
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
        className={clsx(styleClasses.root, {
          [styleClasses.active]: active,
          [styleClasses.completed]: completed,
        })}
      >
        {!completed && icons[String(props.icon)]}
        {completed && (
          <img alt={"icon"} className={styleClasses.complete_icon} />
        )}
      </div>
    );
  }

  ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      disableEnforceFocus
      fullWidth
      maxWidth="xl"
      open
      PaperComponent={PaperComponent}
      onClose={props.onClose}
      className={styleClasses.paper}
    >
      <div className={editStyle.root}>
        <div className={editStyle.header_container}>
          <div className={editStyle.stepper_container}>
            <div className={editStyle.stepper}>
              <Stepper
                activeStep={activeStep}
                connector={<ColorlibConnector />}
                alternativeLabel
                className={styleClasses.stepper}
              >
                {steps.map((label, index) => (
                  <Step key={label} onClick={() => handleStepClick(index)}>
                    <StepLabel
                      StepIconComponent={ColorlibStepIcon}
                      className={styleClasses.step}
                    >
                      <div className={styleClasses.label}> {label} </div>
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
                  [styleClasses.draftButton]: true,
                  [editStyle.next_button]: false,
                })}
              >
                초안으로 저장
              </Button>
            </div>
          </div>
        </div>
        <div className={editStyle.header_divider}></div>
        <div className={editStyle.step_container}>
          {getStepContent(
            activeStep,
            collection,
            setCollection,
            passwordActive,
            setPasswordActive,
            popoverOpen,
            setPopoverOpen,
            popOverAnchorEl,
            setPopOverAnchorEl,
            requestMember,
            setRequestMember,
            handleNext,
            popOpen,
            setPopOpen,
            anchorEl,
            setAnchorEl,
            props
          )}
          <div></div>
        </div>
      </div>
    </Dialog>
  );
}

const paperStyles = makeStyles(() =>
  createStyles({
    paper: {
      backgroundColor: "transparent",
      padding: "0px",
      margin: "0px",
      maxWidth: "1000px",
      height: "100%",
      //maxHeight: "756px",
      boxShadow: "none",
    },
  })
);
export function PaperComponent(props: PaperProps) {
  const inherited = props.className;
  const styleClasses = paperStyles();
  return <Paper {...props} className={clsx(inherited, styleClasses.paper)} />;
}
