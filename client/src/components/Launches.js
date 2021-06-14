import { gql, useQuery } from '@apollo/client';

// components
import LaunchItem from './LaunchItem'

const LAUNCHES_QUERY = gql`
  query RootQueryType {
    launches {
      name
      date_utc
      success
      rocket {
        name
      }
    }
  }
`;

function Launches() {

  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  return (
    <>
      <h1>Launches</h1>
      { loading ? <p>Loading...</p> : null }
      { error ? <p>Error :(</p> : null }
      { data ? data.launches.map( (launch, idx) => <LaunchItem key={ idx } launch={ launch } />) : null }
    </>
  )

}
export default Launches