# liri-node-app

This project builds LIRI, a "virtual assistant" that is accessed through the terminal. With several input commands, information is delivered via APIs. This includes band tour info (via Bands In Town), song info (via Spotify), and movie info (via OMDB). It also reads these commands, whichever one is present, from an assigned text document and executes it. Every executed command is logged into a text file immediately after execution. 

A demonstration of the app can be see here [https://drive.google.com/file/d/1hSEBk0WCOUTYR0Uu4FtR5kYvvq9gLe5D/view].

Getting started with the project involves sourcing the various APIs, setting up a JSON package, and updating the modules. Here, Axios, dotenv, moment.js, node spotify API, and chalk are used. Keys are hidden a [keys.js file](keys.js), as well as an (.env) by way of (keys.js). 

A great deal of help with the project comes by way of the npm.com pages specific to each package, especially when it comes to extracting JSON data. This project is maintained by michelletm, and currently  