import React, { createContext, useState } from 'react';

interface AppContextType {
  isDark: boolean,
  isTranslated: boolean,
  valueLang: string,
  setIsDark: (value: boolean) => void,
  setIsTranslated: (value: boolean) => void,
  setValue: (value: string) => void,
};

export const AppContext = createContext<AppContextType>({
  isDark: true,
  isTranslated: false,
  valueLang: 'fr',
  setIsDark: () => {},
  setIsTranslated: () => {},
  setValue: () => {},
});

// AppContext.js ou AppContext.ts
// import React, { createContext, useContext } from 'react';

// interface AppContextProps {
//   isDark: boolean,
//   isTranslated: boolean,
//   valueLang: string,
//   setIsDark: (value: boolean) => void,
//   setIsTranslated: (value: boolean) => void,
//   setValue: (value: string) => void,
// }

// export const AppContext = createContext<AppContextProps | undefined>(undefined);

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (!context) {
//     throw new Error('useAppContext must be used within an AppProvider');
//   }
//   return context;
// };

// export default AppContext;

