# faster-panopto

## Where to download

-   [Firefox](https://addons.mozilla.org/en-US/firefox/addon/faster-panopto/)
-   [Chrome](https://chrome.google.com/webstore/detail/faster-panopto/lbehhpicfbglgijknhemcjcmencaajid/)

## About

-   Forked from [fast-panopto](https://github.com/Relliko/fast-panopto/)
-   Cross compatibility using [webextension-polyfill](https://github.com/mozilla/webextension-polyfill/)
-   Using react with parcel V2
-   Repo boilerplate from [browser-extension-template](https://github.com/fregante/browser-extension-template/)
-   This project has been developed on with both windows 10, macos and the latest build of [manjaro i3 community edition](https://manjaro.org/downloads/community/i3/)

## Running

This project uses [pnpm](https://pnpm.io/) however packages can be installed with `yarn`\\`npm` and was written with node version 16.6.1 and npm version 7.24.1

[Node/NPM Installation Download](https://nodejs.org/dist/v16.6.1/node-v16.6.1-x64.msi) (instructions included)

-   To install dependencies run `pnpm i`
-   To build run `pnpm build`
-   The extension code will be located inside a folder called `distribution`
-   Run `make.bat` if you would like to do all this in a single step

## Downloads

-   Initially my plan was to enable downloads through the use of [wasm compiled versions](https://ffmpegwasm.netlify.app/) of [ffmpeg](https://ffmpeg.org/). This currently cannot happen due to the [`SharedArrayBuffer()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer) feature only being available in some sites and only on chrome thanks to [spectre](https://meltdownattack.com/).

-   I do not want to write features that only work on one browser, so Im currently not planning on implementing this.

-   However, if you download the [ffmpeg binaries](https://ffmpeg.org/download.html) on your local machine you can still copy paste the file url into a terminal command, the browser extension will provide the full command for you.

## Future Additions

-   Safari compatibility
-   fix the chrome `browser.webRequest.onBeforeRequest` issue
