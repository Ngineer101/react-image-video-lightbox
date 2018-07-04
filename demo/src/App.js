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
          imageUrls={['https://placekitten.com/450/300', 'https://placekitten.com/420/350', 'https://placekitten.com/550/500']}
          startIndex={0} />
      </div>
    );
  }
}

export default App;
