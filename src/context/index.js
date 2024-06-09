import React from 'react'

const UserContext = React.createContext({
  username: '',
  changeusername: () => {},
})
export default UserContext
