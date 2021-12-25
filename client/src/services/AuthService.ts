const USER_LOCAL_KEY= "movielo-user" // TODO move this somewhere?

const AuthService = {
  login: () => {},
  logout: () => {
    localStorage.removeItem(USER_LOCAL_KEY)
  },
  register: () => {},
};

export default AuthService;
