import { useState, useEffect } from 'react';

const useAuth = () => {
  const [rodexAppToken, setRodexAppToken] = useState(localStorage.getItem('rodexAppToken'));
  const [firstName, setFirstName] = useState(localStorage.getItem('userFirstName'));
  const [lastName, setLastName] = useState(localStorage.getItem('userLastName'));

  useEffect(() => {
    const handleStorageChange = () => {
      setRodexAppToken(localStorage.getItem('rodexAppToken'));
      setFirstName(localStorage.getItem('userFirstName'));
      setLastName(localStorage.getItem('userLastName'));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('rodexAppToken');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');

    setRodexAppToken(null);
    setFirstName(null);
    setLastName(null);

    window.dispatchEvent(new Event('authChange'));
  };

  return { rodexAppToken, firstName, lastName, logout };
};

export default useAuth;
