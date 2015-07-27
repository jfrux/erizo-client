# Erizo Client for Bower
## Installation
```
bower install erizo-client
```

## Different Distribution Files
In the `dist` directory there are several files.
`erizo.all.js` is the uncompressed / unminified version that includes vendor files (socket.io)
`erizo.js` is the uncompressed / unminified version of the erizo client. (requires socket.io to work)


## Development
Only needs done if there are changes to the licode erizoClient repo.
```
git clone https://github.com/joshuairl/erizo-client.git #clones this repo
cd erizo-client
npm install # Installs build tools.
npm install grunt-cli -g # if you don't already have it
grunt update
```
