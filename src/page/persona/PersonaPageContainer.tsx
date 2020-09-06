import React, { useState, useEffect } from 'react';
import { UserView, getMe, editUser } from '../../services/user.service';
import PersonaPage from './PersonaPage';

export interface PersonaPageContainerProps {

}

export default function PersonaPageContainer(props: PersonaPageContainerProps) {
  const [userView, setUserView] = useState<UserView | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const userView = await getMe();
      setUserView(userView)
    }
    fetchUser()
  }, []);
  if (!!userView) {
    return (
      <PersonaPage
        editUser={editUser}
        persona={userView}
      />
    )
  }
  return (
    <div></div>
  )
}
