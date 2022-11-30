export default function episodeInfo(props) {
  const data = props.data; //data is array of episodes
  const id = props.episodeId;
  const episode = data.find((item) => item.id == id);

  //fix the episode summary as the api returns the episode summary as a weird <p> element that doesnt really work
  function fixSummary(summary) {
    let tempSummary = summary.replace("<p>", ""); //create a temp var as just using "summary" doesnt work for some reason
    tempSummary = tempSummary.replace("</p>", "");
    return tempSummary;
  }

  return (
    <div className="extra-info-wrapper">
      <div className="extra-info">
        <h1 className="info-name">{episode.name}</h1>
        {episode.image && (
          <img
            src={episode.image.medium}
            alt=""
            className="info-episode-image"
          />
        )}
        {!episode.image && (
          <img
            src="https://static.tvmaze.com/images/no-img/no-img-landscape-text.png"
            alt=""
            className="info-episode-image"
          />
        )}
        {episode.rating.average && (
          <p className="info-rating">Rating: {episode.rating.average}/10</p>
        )}
        {!episode.rating.average && <p className="info-rating">Rating: ?/10</p>}
        <p className="info-runtime">Runtime: {episode.runtime} minutes</p>
        <p className="info-aired">First aired: {episode.airdate}</p>
        {episode.summary && (
          <p className="info-summary">{fixSummary(episode.summary)}</p>
        )}
        {!episode.summary && (
          <p className="info-summary">Could not find summary</p>
        )}
      </div>
    </div>
  );
}
