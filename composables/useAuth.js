export const useAuth = () => {
  const isLoggedIn = useState('auth', () => false);
  const login = (username, password) => {
    console.log('имитация логина', username, password);
    if (username && password) {
      isLoggedIn.value = true;
    }
  };
  const logout = () => {
    isLoggedIn.value = false;
  };

  return {isLoggedIn, login, logout};
};