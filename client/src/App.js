import './App.css';
import logo from './SpaceX-Logo.png';
import Launches from './components/Launches'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

// const client = new ApolloClient({
//   uri: 'https://48p1r2roz4.sse.codesandbox.io',
//   cache: new InMemoryCache()
// })

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
})

// const EXCHANGE_RATES = gql`
//   query GetRates {
//     rates(currency: "USD") {
//       currency
//       rate
//     }
//   }
// `;

function App() {

  // const ExchangeRates = () => {
  //   const { loading, error, data } = useQuery(EXCHANGE_RATES);

  //   if(loading) {
  //     return <p>Loading...</p>
  //   }
  //   if(error) {
  //     return <p>Error :(</p>;
  //   }

  //   return data.rates.map(({ currency, rate }) => (
  //     <div key={ currency }>
  //       <p>
  //         { currency }: { rate }
  //       </p>
  //     </div>
  //   ))
  // }

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <img className="logo" src={logo} alt="Space X Logo"/>
        {/* <ExchangeRates /> */}
        <Launches />
      </div>
    </ApolloProvider>
  );
}

export default App;
