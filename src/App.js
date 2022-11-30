import { useState } from "react";
import EpisodeInfo from "./EpisodeInfo";
import EpisodesList from "./EpisodesList";
import useFetch from "./useFetch";

function App() {
  const [showName, setshowName] = useState("");
  const [search, setSearch] = useState("");
  const [hasUserSearched, sethasUserSearched] = useState(false); //dont render EpisodeList component until user has searched
  const [showExtraInfo, setshowExtraInfo] = useState(false); //dont render EpisodeInfo component until user has chosen an episode
  const [episodeId, setepisodeId] = useState();
  const { data, isPending, error } = useFetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${showName}&embed=episodes`
  );

  //display EpisodeInfo component
  function showMoreInfo(e) {
    setepisodeId(e.currentTarget.id); //set an id for the EpisodeInfo component to read and display info about
    setshowExtraInfo(true); //fulfill conditions to render EpisodeInfo component
  }

  //make an api call based on search string and then render EpisodeList component
  function searchForShow() {
    setshowName(search.replaceAll(" ", "%20")); //make search-strings with spaces readable
    setshowExtraInfo(false); //stop rendering EpisodeInfo, fixes app crash when searching for another show while EpisodeInfo is rendered
    sethasUserSearched(true); //fulfill conditions to render EpisodeInfo component
  }

  return (
    <div className="content">
      {error && hasUserSearched && <div>{error}</div>}
      <div className="search-stuff">
        <input
          className="search-bar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type={"text"}
        ></input>
        <button className="button" onClick={searchForShow}>
          Search
        </button>
      </div>
      {!isPending && data != null && <h1 className="show-name">{data.name}</h1>}
      {!isPending && data != null && (
        <EpisodesList
          showMoreInfo={(e) => showMoreInfo(e)}
          data={data._embedded.episodes}
        ></EpisodesList>
      )}
      {!isPending && showExtraInfo && (
        <EpisodeInfo
          data={data._embedded.episodes}
          episodeId={episodeId}
        ></EpisodeInfo>
      )}
    </div>
  );
}

export default App;
