import "./App.css";
import { Component } from "react";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";
// import { UserData } from "./components/users-data/users-data.component";
// import users from "./components/users-data/users.json";
class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    console.log(this.state);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  onSearchChange = (event) => {
    //was previously on line 52 as an anonymous function, but now updates the search field on render
    const searchField = event.target.value.toLocaleLowerCase(); // lower case all search values in the event target

    this.setState(() => {
      return { searchField }; //update state to the new array
    });
  };
  render() {
    const { monsters, searchField } = this.state; //optimization for readability, this.state & this.~ not needed lines 45, 47, 56
    const { onSearchChange } = this; //see #43

    const filteredMonsters = monsters.filter((monster) => {
      // filter out monsters that dont match the search string, filter returns an array
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <SearchBox
          className="monster-search-box"
          onChangeHandler={onSearchChange}
          placeholder="Search Monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
