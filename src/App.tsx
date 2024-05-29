import React, { useState } from 'react';
import '../src/components/locales/i18n'
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import Navigation from './navigations/Navigation';
import { AppContext } from './components/Context';


const GRAPHQL_ENDPOINT = "http://192.168.111.1:4000/graphql";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  link: authLink.concat(createHttpLink({ uri: GRAPHQL_ENDPOINT })),
  cache: new InMemoryCache(),
});

const App = () => { 
  const [ isDark, setIsDark ] = useState(false);
  const [ isTranslated, setIsTranslated ] = useState(false);
  const [ valueLang, setValue ] = useState("fr");


  return (
      <AppContext.Provider value={{ isDark, isTranslated, valueLang, setIsDark, setIsTranslated, setValue }}>
        <BrowserRouter>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#3ba0e9",
              },
            }}
          >
            <Navigation/>
          </ConfigProvider>
        </BrowserRouter>
      </AppContext.Provider>
  )
}


export default () => (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
);
