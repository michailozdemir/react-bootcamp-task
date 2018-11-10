import React from "react";
import ReactDOM from "react-dom";

import { moviesData } from "./moviesData.js";
import "./bootstrap.min.css";

class Button extends React.Component {
  constructor() {
    super();
    this.state = {
      watch: false
    };
  }

  add = () => {
    this.setState({ watch: true });
    this.props.addFilm();
  };

  remove = () => {
    this.setState({ watch: false });
    this.props.removeFilm();
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.state.watch ? this.remove : this.add}
        className={this.state.watch ? "btn btn-success" : "btn btn-secondary"}
      >
        Will Watch
      </button>
    );
  }
}

class MovieLiMovieListWillWatch extends React.Component {
  render() {
    const { moviesWillWatch } = this.props;
    return moviesWillWatch.map(movie => (
      <li key={movie.id} className="list-group-item">
        <div className="d-flex justify-content-between">
          <div>{movie.title}</div>
          <div>{movie.vote_average}</div>
        </div>
      </li>
    ));
  }
}

class MovieItem extends React.Component {
  render() {
    const {
      backdrop_path,
      title,
      vote_average,
      addFilm,
      removeFilm
    } = this.props;
    return (
      <div className="col-4 mb-4">
        <div className="card" style={{ width: "100%" }}>
          <img
            className="card-img-top"
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
          />
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <div className="card-description">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0">Rating: {vote_average}</p>
                <Button addFilm={addFilm} removeFilm={removeFilm} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class MovieList extends React.Component {
  render() {
    const { movies, addFilm, removeFilm } = this.props;
    return movies.map(movie => (
      <MovieItem
        {...movie}
        key={movie.id}
        addFilm={() => addFilm(movie)}
        removeFilm={() => removeFilm(movie)}
      />
    ));
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    };
  }

  addFilm = movie => {
    this.setState({
      moviesWillWatch: [...this.state.moviesWillWatch, movie]
    });
  };

  removeFilm = ({ id }) => {
    const { moviesWillWatch } = this.state;
    this.setState({
      moviesWillWatch: moviesWillWatch.filter(movie => movie.id !== id)
    });
  };
  render() {
    const { movies, moviesWillWatch } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-9">
            <div className="row">
              <MovieList
                movies={movies}
                addFilm={this.addFilm}
                removeFilm={this.removeFilm}
              />
            </div>
          </div>
          <div className="col-3">
            <div style={{ position: "fixed" }}>
              <h4>{`Will Watch: ${moviesWillWatch.length} movies`}</h4>
              <MovieLiMovieListWillWatch moviesWillWatch={moviesWillWatch} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
