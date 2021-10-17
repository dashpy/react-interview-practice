import { React, useState, useEffect } from "react";
import Highlighter from "react-highlight-words";
import getInformation from "./api.services";
import "./styles.css";

export default function App(props) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const URL = `https://api.spaceflightnewsapi.net/v3/articles?_limit=10&_start=${page}`;

  async function getData() {
    const response = await getInformation(URL);
    setData(response);
    setLoading(false);
  }

  useEffect(() => {
    let mounted = false;
    getData();

    return () => {
      mounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const updateFilterValues = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const onPrevPageClick = (event) => {
    event.preventDefault();
    setLoading(true);
    setPage(page - 1);
  };

  const onNextPageClick = (event) => {
    event.preventDefault();
    setLoading(true);
    setPage(page + 1);
  };

  const hightLightText = (title) => {
    return (
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={filter.split(" ")}
        autoEscape={true}
        textToHighlight={title}
      />
    );
  };

  const filterDataValues = (article) => {
    if (filter.length > 0 && filter !== "") {
      return filter.split(" ").some((keyword) => {
        return article.title.toUpperCase().indexOf(keyword.toUpperCase()) >= 0;
      });
    }
    return true;
  };

  return (
    <div className="external-container">
      <h1>NASA data</h1>
      <input
        name="input-search"
        className="inputSearch"
        placeholder="search content"
        onChange={updateFilterValues}
      />
      <div className="container">
        {loading && <h2>Loading data ...</h2>}
        {!loading &&
          data.filter(filterDataValues).map((article) => {
            return (
              <div className="child">
                <img
                  className="image"
                  src={article.imageUrl}
                  alt={article.title}
                />
                <p className="item" key={article.id} name={article.title}>
                  {article.id} - {hightLightText(article.title)}
                </p>
              </div>
            );
          })}
      </div>
      <div className="footer-container">
        <button name="prev-page" onClick={onPrevPageClick}>
          Prev Page
        </button>
        <button name="next-page" onClick={onNextPageClick}>
          Next Page
        </button>
      </div>
    </div>
  );
}
