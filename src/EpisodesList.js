export default function EpisodesList(props) {
  const episodes = props.data;

  return (
    <div className="episodes">
      {episodes.map((episode) => (
        <div
          onClick={props.showMoreInfo}
          key={episode.id}
          id={episode.id}
          className="episode"
        >
          {episode.image && (
            <img src={episode.image.medium} alt="" className="episode-image" />
          )}
          {!episode.image && (
            <img
              src="https://static.tvmaze.com/images/no-img/no-img-landscape-text.png"
              alt=""
              className="episode-image"
            />
          )}
          <p className="episode-name">{episode.name}</p>
          <p className="episode-season">Season: {episode.season}</p>
          <p className="episode-number">Episode: {episode.number}</p>
        </div>
      ))}
    </div>
  );
}
