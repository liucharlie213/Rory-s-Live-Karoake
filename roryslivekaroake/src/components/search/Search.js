import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import "./Search.css"

const Search = () => {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("None");

  useEffect(() => {
    Papa.parse("/Karaoke 2022.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setData(result.data)
      } 
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const filteredData = searchTerm ? 
    data.filter(item =>
      item.Title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.Artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Tags.toLowerCase().includes(searchTerm.toLowerCase())
  ) : data;

  // const handleSortChange = (e) => {
  //   setSortOrder(e.target.value);
  // }

  const sortedData = [...filteredData].sort((a,b) => {
    switch(sortOrder) {
      case "Title":
        return a.Title.localeCompare(b.Title);
      case "Artist":
        return a.Artist.localeCompare(b.Artist);
      case "Tags":
        return a.Tags.localeCompare(b.Tags);
      default:
        return 0;
    }
  })

  const handdleToggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  }

  const handleSelect = (option) => {
    setSelectedOption(option);
    setSortOrder(option);
    setDropdownOpen(false);
  }

  return (
    <section id="search">
    <div className="search__container">
      <p className="search__title"><span className="search__span">Search Songs</span></p>
      <div className="search__and__sort">
        <input 
          type="text"
          placeholder="Find the perfect song"
          value = {searchTerm}
          onChange={handleSearchChange}
          className="search__input"
        />
        <div className="sort__section">
          <p>Sort By:</p>
          <div className="sort__dropdown">
            <div className="selected__sort" onClick={handdleToggleDropdown}>
              {selectedOption}
            </div>
            {isDropdownOpen && (
            <div className="dropdown__content">
              <div onClick={() => handleSelect('Title')} className="dropdown__item">Title</div>
              <div onClick={() => handleSelect('Artist')}  className="dropdown__item">Artist</div>
              <div onClick={() => handleSelect('Tags')}  className="dropdown__item">Tags</div>
            </div>)}
          </div>
        </div>
        
      </div>
      <div className="table__container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map(item => (
              <tr key={item.Title + item.Artist}>
                <td>{item.Title}</td>
                <td>{item.Artist}</td>
                <td>{item.Tags}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </section>
  )
}

export default Search