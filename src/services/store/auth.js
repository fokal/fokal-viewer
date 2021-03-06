import JwtDecode from 'jwt-decode';

const GetJWT = () => localStorage.getItem('auth');

const GetUser = () => localStorage.getItem('auth-user');

const LogIn = jwt => {
  const tok = JwtDecode(jwt);
  if (tok.iss === 'fokal') {
    localStorage.setItem('auth-user', tok.sub);
  }
  localStorage.setItem('auth', jwt);
};

const LoggedIn = () => localStorage.getItem('auth') !== null;

const Logout = () => {
  localStorage.removeItem('auth');
  localStorage.removeItem('auth-user');
};

export { LoggedIn, Logout, LogIn, GetJWT, GetUser };
