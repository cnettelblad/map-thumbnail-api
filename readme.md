# Thumbnail Generator
Generate a map thumbnail based on longitude and latitude.

## Built with
* Node v20.11.1 (Iron LTS)
* Typescript
* [Hapi](https://hapi.dev/)
* [Google Maps Static API](https://developers.google.com/maps/documentation/maps-static/)

## Installation
### Mac/Windows/Linux
1. Set up environment variables, note that a Google Maps API key is requried for the project to work.
2. Install dependencies (requires Node >v20)
```
yarn install
```
3. You can compile the project using
```
yarn build
```

### Docker
1. Set up environment variables, note that a Google Maps API key is requried for the project to work.
2. Build the docker image:
```sh
docker build -t thumbnail-generator .
```
3. The docker image will install dependencies and build the project for you, so now all you have to do is run the docker image.
```sh
docker run -p 3000:3000 thumbnail-generator
```

## Usage
There is currently only two endpoints:
* POST /v1/thumbnail
* GET /v1/thumbnail/{id}

The payload to create a thumbnail is a set of longitude and latitude coordinates, constraints are dec(8,11) and normal coordinate limits.
### Example
```
POST /v1/thumbnail
{
    longitude: 12.1234,
    latitude: 51.4321
}
```