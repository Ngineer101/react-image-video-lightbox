import React, { Component } from 'react';
// import ReactMobileLightbox from '../../';
import ReactMobileLightbox from './lightbox/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactMobileLightbox
          width={window.innerWidth}
          height={window.innerHeight}
          imageUrls={['https://placekitten.com/300/300', 'https://placekitten.com/320/300', 'https://placekitten.com/350/300']}
          startIndex={0} />
      </div>
    );
  }
}

export default App;
