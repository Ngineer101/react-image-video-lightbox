# React image & video lightbox

Demo can be found <a href="https://ngineer101.github.io/react-image-video-lightbox">here</a>. It is best viewed on a mobile browser.

## Installation: 
```npm
npm install react-image-video-lightbox
```

## Usage:
```javascript
    <ReactImageVideoLightbox
        data={[
            { url: 'https://placekitten.com/450/300', type: 'photo', altTag: 'some image' },
            { url: 'https://www.youtube.com/embed/dZH897lF0_c', type: 'video', altTag: 'some video' },
            { url: 'https://placekitten.com/550/500', type: 'photo', altTag: 'some other image' },
            { url: 'https://www.youtube.com/embed/dZH897lF0_c', type: 'video', altTag: 'some other video' }
        ]}
        startIndex={0}
        showResourceCount={true}
        onCloseCallback={this.callbackFunction} />
```

## Properties:

|Property|Type|Description|
|--------|----|-----------|
|data|Array of resources|an array of resource objects (see resource object below)|
|startIndex|number|index of image/video where the lightbox should open|
|showResourceCount|boolean|show resource count in left upper corner|
|onCloseCallback|Function => void|callback function called when the lightbox is closed|

### Resource Object
|Property|Type|Description|
|--------|----|-----------|
|url|string|url of the image/video|
|type|string|only two types are supported at this stage - images & videos (Youtube videos are recommended)|
|altTag|string|alt tag for image/video|

More properties to follow...



## Want to contribute?
Fork repo, submit pull request.
