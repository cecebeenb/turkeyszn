# Turkey SZN

## Installation instructions

Run the following commands in your terminal:

```bash
git clone git@github.com:cecebeenb/turkey-szn.git
cd turkey-szn
npm i
```

## Usage instructions

```bash
npm start
```

## Project goals

The goal of this project was to illustrate to new web developers how to make use of lifecycle methods in React class components (specifically `componentDidMount()` and `componentDidUpdate()`).

Images of turkeys plus a default song lyric or quote were pulled from the [Unsplash API](https://unsplash.com/documentation) and [Bars For Days, Chips With Lays API](https://andcomputers.io/bars-for-days-chips-with-lays/) within `componentDidMount()`.

The first image from the API response is set in state as `featuredTurkey`. Upon clicking a different turkey image, the state of `featuredTurkey` is updated to be the image that was selected image. The selected image is also filtered out of the turkey images gallery.

The song lyric or quote changes each time a new turkey is selected. Users can also toggle between an "Academic" or "Colloquial" song lyric or quote.

## Future updates

- Improved styling
- Integration with Instagram API
- Dynamic insertion of relevant emojis within song lyric/quote caption
- Meme-ify turkey images so that song lyric/quote text is overlayed on top of the image
- Allow users to save meme-ified turkey images
