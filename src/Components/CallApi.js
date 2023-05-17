import React from "react";
import PokeCard from "./PokeCard";
import axios from "axios";

export default class CallApi extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      input: "",
    };
  }

  componentDidMount() {
    // Fetch
    /*fetch("https://pokeapi.co/api/v2/pokemon/geodude")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemon: [...this.state.pokemon, data] });
      });*/

    // Axios
    axios.get("https://pokeapi.co/api/v2/pokemon/geodude").then((data) => {
      console.log(data);
      const unpackedData = data.data;
      console.log(unpackedData);
      this.setState({ pokemon: [...this.state.pokemon, unpackedData] });
    });
  }

  componentDidUpdate() {
    console.log(this.state.pokemon);
  }

  handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ input: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.input}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ pokemon: [...this.state.pokemon, data] });
      });
  };

  render() {
    return (
      <div>
        <p>Pokemon Incoming!</p>

        <input
          type="text"
          value={this.state.input}
          placeholder="Pokemon Name"
          onChange={(e) => this.handleChange(e)}
        />
        <input type="submit" value="submit" onClick={this.handleSubmit} />

        {this.state.pokemon && this.state.pokemon.length > 0 ? (
          this.state.pokemon.map((avatar) => (
            <div>
              <PokeCard {...avatar} />
            </div>
          ))
        ) : (
          <p>No Pokemon here</p>
        )}
      </div>
    );
  }
}
