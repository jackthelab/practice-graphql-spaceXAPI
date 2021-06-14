const LaunchItem = ({ launch }) => {

  const handleClick = (launch) => {
    alert(`The user selected details for ${ launch.name }`);
  }

  return(
    <div className={`launch-card ${ launch.success ? "successful-launch " : "failed-launch" }`}>
      <p>Name: { launch.name }</p>
      <p>Date: { launch.date_utc }</p>
      <button onClick={ () => { handleClick(launch) } } className="launch-details-btn">Show Details</button>
    </div>
  )

}

export default LaunchItem