// @ts-nocheck
import React, { useState, useEffect } from "react";
import { UserView, getMe, editUser } from "../../services/user.service";
import EditPage from "./EditPage";

export interface EditPageContainerProps {}

export default function EditPageContainer(props: EditPageContainerProps) {
  const [userView, setUserView] = useState<UserView | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchUser ");
      const userView = await getMe();
      setUserView(userView);
    };
    fetchData();
  }, []);
  if (!!userView) {
    return <EditPage editUser={editUser} />;
  }
  return <div></div>;
}
