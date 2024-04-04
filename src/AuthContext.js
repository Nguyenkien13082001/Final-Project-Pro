// import React, { createContext, useState } from "react";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = () => {
//     // Thực hiện logic đăng nhập thành công
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     // Thực hiện logic đăng xuất
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export { AuthContext, AuthProvider };
