// @ts-nocheck
import React, { useState, useEffect, Fragment, useCallback } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory,
} from "react-router-dom";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import AppBar from "./layout/AppBar";
import Drawer from "./layout/Drawer";
import { Toolbar, Typography } from "@material-ui/core";
import AuthRoute from "./common/auth/AuthRoute";
import UnauthRoute from "./common/auth/UnauthRoute";
import SignInPage from "./page/signin/SignInPage";
import {
  signIn,
  signUp,
  SignInRequest,
  SignUpRequest,
} from "./services/user.service";
import { testdb } from "./services/database.service";
import SignUpPage from "./page/signup/SignUpPage";
import Error from "./common/error";
import CreateCollectionPageContainer from "./page/createCollection/CreateCollectionPageContainer";
import EditCollectionPageContainer from "./page/editCollection/EditCollectionPageContainer";
import PersonaPageContainer from "./page/persona/PersonaPageContainer";
import {
  COLLECTION_LIST_TAB,
  COLLECTION_CREATE,
  ROOT,
  SIGN_IN,
  SIGN_UP,
  PROFILE,
  COLLECTION_EDIT,
  COLLECTION_LIST,
  COLLECTION_LIST_COMPANY,
  NOTIFICATION,
  MEMO_HOME,
  MEMO_LIST,
  MEMO_BINGE,
  MEMO_IN_COLLECTION,
  MEMO_LIST_TAB,
  MEMO_WORK_STATION,
  COLLECTION_LIST_PAGE,
} from "./common/paths";
import CollectionTab from "./page/listCollection/CollectionTab";
import CreateCollectionTabContainer from "./page/listCollection/CreateCollectionTabContainer";
import MyCollectionTabContainer from "./page/listCollection/MyCollectionTabContainer";
import SearchCollectionTabContainer from "./page/listCollection/SearchCollectionTabContainer";
import CollectionListPageContainer from "./page/listCollection/CollectionListPageContainer";
import BingeMemoTab from "./page/listMemo/BingeMemoTab";
import MemoHomeTabContainer from "./page/listMemo/MemoHomeTabContainer";
import MemoListTab from "./page/listMemo/MemoListTab";
import MemoTab from "./page/listMemo/MemoTab";
import MemoListInCollectionContainer from "./page/listMemo/MemoListInCollectionContainer";
import MemoWorkstationContainer from "./page/memoWorkstation/MemoWorkstationContainer";
import MemoWorkstationTest from "./page/memoWorkstation/MemoWorkstationTest";
import queryString from "query-string";
import CompanyCollectionPageContainer from "./page/listCollection/CompanyCollectionPageContainer";
import { verify } from "./services/account.service";
import { resetToken, expireToken } from "./common/axios";
import NotificationPageContainer from "./page/notification/NotificationPageContainer";
import BasicMenuBar from "./components/layout/basicMenuBar/BasicMenuBar";
import appStyle from "./App.module.scss";
import ModalManager from "./page/modalManager/ModelManager";
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    body: {
      height: "100%",
      width: "100%",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function App() {
  const { pathname, search } = useLocation();
  const { history } = useHistory();
  const classes = useStyles();
  const token = localStorage.getItem("Authorization");
  const [authenticated, setAuthenticated] = useState(token != null);

  //const [currentCategories, setCurrentCategories] = useState("collection");

  async function validateToken() {
    const token = localStorage.getItem("Authorization");
    try {
      await verify();
    } catch (e) {
      expireToken();
    }
    setAuthenticated(token != null);
  }
  validateToken();

  async function handleSignIn(request: SignInRequest) {
    await signIn(request);
    await validateToken();
  }

  async function handleSignUp(request: SignUpRequest) {
    await signUp(request);
    await validateToken();
  }

  return (
    <div>
      <BasicMenuBar>
        <div className={classes.body}>
          <Switch>
            <Redirect from="/:url*(/+)" to={pathname.slice(0, -1)} />

            <UnauthRoute
              exact
              authenticated={authenticated}
              path={SIGN_IN}
              render={() => <SignInPage handleSubmit={handleSignIn} />}
            />
            <UnauthRoute
              exact
              authenticated={authenticated}
              path={SIGN_UP}
              render={() => <SignUpPage handleSubmit={handleSignUp} />}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={PROFILE}
              render={() => <PersonaView />}
            />
            <AuthRoute
              hasDrawer
              authenticated={authenticated}
              path={[
                "/collections",
                "/memos",
                "/persona",
                "/notifications",
                "/collections-all",
                "/memos-in-collection",
              ]}
              render={(props: any) => (
                <MainPage pathname={pathname} search={search}></MainPage>
              )}
            />
            {/* <AuthRoute
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_LIST_PAGE}
              render={(props: any) => (
                <CollectionListPageContainer
                  {...queryString.parse(props.location.search)}
                />
              )}
            /> */}

            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_CREATE}
              render={() => (
                <CreateCollectionPageContainer currentPath={pathname} />
              )}
            />
            <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={COLLECTION_LIST_COMPANY}
              render={(props: any) => (
                <CompanyCollectionPageContainer
                  {...queryString.parse(props.location.search)}
                />
              )}
            />
            <AuthRoute
              exact
              authenticated={authenticated}
              path={"/memo/test"}
              render={(props: any) => (
                <MemoWorkstationTest
                  {...queryString.parse(props.location.search)}
                />
              )}
            />

            {/* <AuthRoute
              exact
              authenticated={authenticated}
              hasDrawer
              path={MEMO_IN_COLLECTION}
              render={(props: any) => (
                <MemoListInCollection
                  {...props}
                  collectionId={props.match.params.id}
                />
              )}
            /> */}

            {/* <AuthRoute
              exact
              hasDrawer
              authenticated={authenticated}
              path={NOTIFICATION}
              render={(props: any) => (
                <NotificationPageContainer isPage={true} />
              )}
            /> */}
            <AuthRoute
              exact
              authenticated={authenticated}
              path={ROOT}
              render={(props: any) => <ProjectView {...props} />}
            />
            <Route>
              <Error />
            </Route>
          </Switch>
        </div>
      </BasicMenuBar>
    </div>
  );
}

function PersonaView() {
  const classes = useStyles();

  return (
    <Fragment>
      {/* <Drawer /> */}
      <main className={classes.content}>
        <Toolbar />
        <PersonaPageContainer />
      </main>
    </Fragment>
  );
}

function ProjectView(props: any) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const getData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        console.log("responseresponseresponse " + response);
        return response.json();
      })
      .then(function (myJson) {
        console.log("myJsonmyJsonmyJsonmyJson " + JSON.stringify(myJson));

        setData(myJson);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  console.log("testdb()testdb()testdb()testdb()    " + testdb());
  console.log("testdb()testdb()testdb()testdb()    " + testdb());
  return (
    <Fragment>
      {/* <Drawer /> */}
      <div>
        {data && data.length > 0 && data.map((item) => <p>{item.about}</p>)}
      </div>
      <main className={classes.content}>
        <Toolbar />
        <Projects {...props} />
      </main>
    </Fragment>
  );
}

function MainPage(props: any) {
  //main page들은 텝 전환 시 그 전 상태가 유지되어야 하기 때문에
  //route가 아니라, pathname과 opacity를 이용하여 화면을 전환하고 보여주게 구성되어있음.

  const { pathname, search } = props;
  console.log("pathnamepathname " + pathname + search);
  const mainPages = useCallback(() => {
    const query = queryString.parse(search);
    const editModal = () => {
      if (search.includes("editingId")) {
        return <EditCollectionPageContainer collectionId={query.editingId} />;
      }
    };
    const memoWorkstation = () => {
      if (search.includes("memoId")) {
        return <MemoWorkstationContainer memoId={query.editingId} />;
      }
    };
    const collectionModal = () => {
      if (search.includes("collectionId") || search.includes("platterId")) {
        return (
          <ModalManager
            collectionId={query.collectionId}
            platterId={query.platterId}
          />
        );
      }
    };

    const memoList = () => {
      if (pathname.includes("home")) {
        return <MemoHomeTabContainer {...queryString.parse(search)} />;
      }
      if (pathname.includes("list")) {
        return <MemoListTab {...queryString.parse(search)} />;
      }
      if (pathname.includes("binge")) {
        return <BingeMemoTab {...queryString.parse(search)} />;
      }
    };
    const collectionList = () => {
      if (pathname.includes("/my")) {
        return <MyCollectionTabContainer {...queryString.parse(search)} />;
      }
      if (pathname.includes("/discover")) {
        return <SearchCollectionTabContainer {...queryString.parse(search)} />;
      }
      if (pathname.includes("/created")) {
        return <CreateCollectionTabContainer {...queryString.parse(search)} />;
      }
    };
    const collectionExtraPage = () => {
      if (pathname.includes("/collections-all")) {
        return <CollectionListPageContainer {...queryString.parse(search)} />;
      }
    };
    const memoExtraPage = () => {
      if (pathname.includes("/memos-in-collection")) {
        return (
          <MemoListInCollectionContainer
            {...props}
            // collectionId={props.match.params.id}
            collectionId={1}
          />
        );
      }
    };
    const memoStyle = {
      opacity: pathname.startsWith("/memos/") ? 1 : 0,
      zIndex: pathname.startsWith("/memos/") ? 800 : -1,
    };
    const collectionSytle = {
      opacity: pathname.startsWith("/collections/") ? 1 : 0,
      zIndex: pathname.startsWith("/collections/") ? 800 : -1,
    };
    const notificationStyle = {
      opacity: pathname.startsWith("/notifications") ? 1 : 0,
      zIndex: pathname.startsWith("/notifications") ? 800 : -1,
    };
    const collectionExtraSytle = {
      opacity: pathname.startsWith("/collections-all") ? 1 : 0,
      zIndex: pathname.startsWith("/collections-all") ? 800 : -1,
    };
    const memoExtraSytle = {
      opacity: pathname.startsWith("/memos-in-collection") ? 1 : 0,
      zIndex: pathname.startsWith("/memos-in-collection") ? 800 : -1,
    };
    return (
      <div className={appStyle.main_container}>
        {editModal()}
        {memoWorkstation()}
        {collectionModal()}
        <div
          style={notificationStyle}
          className={appStyle.main_page}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <NotificationPageContainer isPage={true} />
        </div>
        <div
          style={memoStyle}
          className={appStyle.main_page}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <div>
            <MemoTab />
          </div>
          <div
            style={{ minHeight: "800px" }}
            // 부드러운 전환을 위한
          >
            {memoList()}
          </div>
        </div>
        <div
          style={collectionSytle}
          className={appStyle.main_page}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <div>
            <CollectionTab />
          </div>
          <div
            style={{ minHeight: "800px" }}
            // 부드러운 전환을 위한
          >
            {collectionList()}
          </div>
        </div>

        <div
          style={collectionExtraSytle}
          className={appStyle.main_page}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <div
            style={{ minHeight: "800px" }}
            // 부드러운 전환을 위한
          >
            {collectionExtraPage()}
          </div>
        </div>
        <div
          style={memoExtraSytle}
          className={appStyle.main_page}
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
        >
          <div
            style={{ minHeight: "800px" }}
            // 부드러운 전환을 위한
          >
            {memoExtraPage()}
          </div>
        </div>
      </div>
    );
  }, [props, pathname, search]);

  return mainPages();
}

function Projects() {
  return <h2>Projects</h2>;
}

export default App;
