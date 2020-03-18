import React, { Component, Fragment } from 'react';
import apiMovie, { apiMovieMap } from "./configuration/api.moviedb";

import { Header, MovieList, MovieDetails, Loading, SearchBar } from './components';

// A décommenter pour ré-utiliser le fichier de data mais avec l'API plus besoin
// import dataMovies from "./data";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      selectedMovie: 0,
      loaded: false,
    }

    // Commenter vu qu'on simulait une base de donnée
    /*

      setTimeout(() => {
        this.setState({
          movies: dataMovies,
          loaded: true
        })
      }, 3000);

    */
  }

  updateSelectedMovie = ( index ) => {
    this.setState({
      selectedMovie: index
    });
  }

  componentDidMount() {
    
    apiMovie.get( "/discover/movie?language=fr")
    
    // 1er résultat de la promesse retourné par la méthode GET
    .then( response => {
      // découverte de la réponse
      // console.log( response );
      // Une fois la découverte OK, on peut cibler le tableau de films de l'api
      // console.log( response.data.results );
      console.log( response.data.results );
      return response.data.results;
    })

    // Une fois la le 1er then passé avec succès on pase à celui ci où l'on traite la requête.
    .then( listMoviesAPI => {

      // Je créer une constante qui fera que le tableau de film qui sera le résultat du map sera lui passé en paramètre dans la fonction updtateMovies plus bas.
      const movies = listMoviesAPI.map( apiMovieMap );
      this.updateMovies( movies );
    })
    .catch( errors => console.log( errors ) );
  }


  updateMovies = ( movies ) => {
    this.setState({
      movies,
      loaded: true
    })
  }

  render() {
    return (
      <div className="d-flex flex-column">
        <Header />
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <SearchBar updateMovies={ this.updateMovies } />
        </div>
        <div className="d-flex flex-row flex-fill pt-4">
          { this.state.loaded ? (
            <Fragment>
              <MovieList 
                movies={ this.state.movies }
                updateSelectedMovie={ this.updateSelectedMovie }
              />              
              <MovieDetails
                movie={ this.state.movies[ this.state.selectedMovie ] }
              />
            </Fragment>
          ) : (
            <Loading />
          ) }
        </div>
      </div>
    );
  }
}

export default App;
