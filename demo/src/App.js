import React, { Component } from 'react';
import './App.css';
import ReactImageVideoLightbox from '../../';

class App extends Component {

  constructor() {
    super(...arguments);

    this.state = {
      lightboxOpen: false
    };
  }

  render() {
    return (
      <div className="container">
        <button onClick={() => { this.setState({ lightboxOpen: true }); }}>Open Lightbox</button>
        {
          this.state.lightboxOpen &&
          <ReactImageVideoLightbox
            data={[
              { url: 'https://placekitten.com/450/300', type: 'photo', altTag: 'placeholder image' },
              { url: 'https://www.youtube.com/embed/ScMzIvxBSi4?rel=0', type: 'video', altTag: 'placeholder video' },
              { url: 'https://placekitten.com/420/350', type: 'photo', altTag: 'placeholder image' },
              { url: 'https://placekitten.com/550/500', type: 'photo', altTag: 'placeholder image' },
              { url: 'https://www.youtube.com/embed/ScMzIvxBSi4?rel=0', type: 'video', altTag: 'placeholder video' }]}
            startIndex={0}
            onCloseCallback={() => { this.setState({ lightboxOpen: false }); }} />
        }
      </div>
    );
  }
}

export default App;
