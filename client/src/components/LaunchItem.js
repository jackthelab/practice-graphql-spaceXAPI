const LaunchItem = ({ launch }) => {

  return(
    <div className={`launch-card ${ launch.success ? "successful-launch " : "failed-launch" }`}>
      <p>Name: { launch.name }</p>
      <p>Date: { launch.date_utc }</p>
      <button className="launch-details-btn">Show Details</button>
    </div>
  )

}

export default LaunchItem