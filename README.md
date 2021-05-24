# React image & video lightbox

## [View demo](https://ngineer101.github.io/react-image-video-lightbox)

---

## Installation

```npm
npm install react-image-video-lightbox
```

## Usage

```javascript
<ReactImageVideoLightbox
  data={[
    {
      url: "https://placekitten.com/450/300",
      type: "photo",
      altTag: "some image",
    },
    {
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      type: "video",
      title: "some video",
    },
    {
      url: "https://placekitten.com/550/500",
      type: "photo",
      altTag: "some other image",
    },
    {
      url: "https://www.youtube.com/embed/ScMzIvxBSi4",
      type: "video",
      title: "some other video",
    },
  ]}
  startIndex={0}
  showResourceCount={true}
  onCloseCallback={this.callbackFunction}
  onNavigationCallback={(currentIndex) =>
    console.log(`Current index: ${currentIndex}`)
  }
/>
```

## Properties

| Property             | Type                           | Description                                              |
| -------------------- | ------------------------------ | -------------------------------------------------------- |
| data                 | Array of resources             | An array of resource objects (see resource object below) |
| startIndex           | number                         | Index of image/video where the lightbox should open      |
| showResourceCount    | boolean                        | Show resource count in the upper left corner             |
| onCloseCallback      | Function => void               | Callback function called when the lightbox is closed     |
| onNavigationCallback | Function(currentIndex) => void | Callback function called on navigation between resources |

## Resource Object

| Property | Type   | Description                                                                                |
| -------- | ------ | ------------------------------------------------------------------------------------------ |
| url      | string | Url of the image/video                                                                     |
| type     | string | Two types are supported - 'photo' & 'video' (only YouTube videos are supported)            |
| altTag   | string | Alt tag for image                                                                          |
| title    | string | Title for iframe when rendering YouTube video                                              |

## Have a feature request or suggestion?

Create an issue on Github: [https://github.com/Ngineer101/react-image-video-lightbox/issues](https://github.com/Ngineer101/react-image-video-lightbox/issues)
