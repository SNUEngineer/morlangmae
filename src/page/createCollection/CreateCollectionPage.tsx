// @ts-nocheck
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { CreateDraftCollectionRequest } from "../../services/collection.service";
import pageStyle from "./createCollectionPage.module.scss";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import classNames from "classnames";
import ExpandMoreRoundedIcon from "@material-ui/icons/ExpandMoreRounded";

export interface CreateCollectionPageProps {
  createCollection(request: CreateDraftCollectionRequest): Promise<void>;
  serviceTypes: string[];
}

export default function CreateCollectionPage(props: CreateCollectionPageProps) {
  const { register, handleSubmit } = useForm();
  const [filter, setFilter] = useState<string>("BASIC");
  const [serviceFilter, setServiceFilter] = useState<string>("BASIC");
  const handleChange = (event: any) => {
    setFilter(event.target.value);
  };
  const handleServiceChange = (event: any) => {
    setServiceFilter(event.target.value);
  };
  const useStyles = makeStyles(() =>
    createStyles({
      underline: {
        "&&&:before": {
          borderBottom: "none",
        },
        "&&:after": {
          borderBottom: "none",
        },
      },
      select: {
        height: "33px",
        width: "150px",
        borderRadius: "5px",
        borderColor: "#e0e0e0",
        margin: "0px",
        input: {
          backgroundColor: "blue",
        },
        ul: {
          backgroundColor: "blue",
          minHeight: "1000px",
        },
      },
      root: {
        fontSize: "11.5px",
        letterSpacing: "-0.98px",
        fontFamily: "Noto Sans CJK KR Regular",
        minWidth: "86px",
        textAlign: "center",
        position: "relative",
        height: "30px",
        color: "#707070",
        margin: "0px",

        "&:hover": {
          background: "#f0f0f0",
          color: "#4BA34B",
        },
        borderBottomStyle: "solid",
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: "0.5px",
      },
      selected: {
        "&:hover": {
          color: "#4BA34B",
        },
      },
      submit: {
        height: "40px",
        width: "95px",
        color: "#4b4b4b",
        fontFamily: "Noto Sans CJK KR Regular",
        fontSize: "12px",
        borderRadius: "30px",
        backgroundColor: "#a0a0a0",
        boxShadow:
          "0px 3px 1px -2px rgba(0,0,0,0), 0px 2px 2px 0px rgba(0,0,0,0), 0px 1px 5px 0px rgba(0,0,0,0)",
        "&:hover": {
          background: "transparent",
          boxShadow:
            "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
        },
      },
    })
  );
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={pageStyle.paper}>
        <div className={pageStyle.bailey_text}>Bailey</div>
        <div className={pageStyle.create_text}>새 컬렉션 생성</div>
        <form
          onSubmit={handleSubmit(props.createCollection)}
          className={pageStyle.form}
          noValidate
        >
          <div>
            <div className={pageStyle.collection_type_container}>
              <div className={pageStyle.header}>컬렉션</div>
              <div className={pageStyle.select}>
                <Select
                  onChange={handleChange}
                  value={filter}
                  className={classNames({
                    [classes.select]: true,
                    [classes.icon]: true,
                    [pageStyle.select]: true,
                  })}
                  IconComponent={ExpandMoreRoundedIcon}
                  variant={"outlined"}
                  disableUnderline
                >
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value="BASIC"
                  >
                    <div className={pageStyle.menu_item_container}>
                      <div className={pageStyle.text_container}>
                        <div className={pageStyle.text}>설정해주세요</div>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value="TEAM"
                  >
                    <div className={pageStyle.menu_item_container}>
                      <div className={pageStyle.text_container}>
                        <div className={pageStyle.text}>팀</div>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value="PROJECT"
                  >
                    <div className={pageStyle.menu_item_container}>
                      <div className={pageStyle.text_container}>
                        <div className={pageStyle.text}>프로젝트</div>
                      </div>
                    </div>
                  </MenuItem>
                </Select>
              </div>
            </div>

            <div className={pageStyle.service_type_container}>
              <div className={pageStyle.header}>서비스</div>
              <div className={pageStyle.select}>
                <Select
                  onChange={handleServiceChange}
                  value={serviceFilter}
                  className={classNames({
                    [classes.select]: true,
                    [classes.icon]: true,
                    [pageStyle.select]: true,
                  })}
                  variant={"outlined"}
                  IconComponent={ExpandMoreRoundedIcon}
                  disableUnderline
                >
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value="BASIC"
                  >
                    <div className={pageStyle.menu_item_container}>
                      <div className={pageStyle.text_container}>
                        <div className={pageStyle.text}>설정해주세요</div>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value="디자인 마케팅"
                  >
                    <div className={pageStyle.menu_item_container}>
                      <div className={pageStyle.text_container}>
                        <div className={pageStyle.text}>디자인 마케팅</div>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value="컨설팅"
                  >
                    <div className={pageStyle.menu_item_container}>
                      <div className={pageStyle.text_container}>
                        <div className={pageStyle.text}>컨설팅</div>
                      </div>
                    </div>
                  </MenuItem>
                  <MenuItem
                    className={classNames({
                      [classes.root]: true,
                      [classes.selected]: true,
                    })}
                    value="제작"
                  >
                    <div className={pageStyle.menu_item_container}>
                      <div className={pageStyle.text_container}>
                        <div className={pageStyle.text}>제작</div>
                      </div>
                    </div>
                  </MenuItem>
                </Select>
              </div>
            </div>
          </div>
          <div className={pageStyle.text_field_container}>
            <div className={pageStyle.align_container}>
              <TextField
                className={pageStyle.title}
                margin="normal"
                required
                fullWidth
                id="title"
                name="title"
                inputRef={register}
                InputProps={{ classes }}
              />
            </div>
          </div>
          <div className={pageStyle.create_button}>
            <div className={pageStyle.align_button}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                시작하기
              </Button>
            </div>
          </div>

          <div className={pageStyle.cancel_container}>
            <div className={pageStyle.align_button}>
              <div className={pageStyle.cancel_button_container}>
                <div className={pageStyle.icon_container}>
                  <img className={pageStyle.icon} alt={"icon"} />
                </div>
                <div className={pageStyle.cancel_text}>취소</div>
              </div>
            </div>
          </div>
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
