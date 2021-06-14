import './App.css';
import logo from './SpaceX-Logo.png';
import Launches from './components/Launches'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

function App() { 

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <img className="logo" src={logo} alt="Space X Logo"/>
        <Launches />
      </div>
    </ApolloProvider>
  );
}

export default App;
