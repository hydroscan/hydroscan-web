# HydroScan Client

[![CircleCI](https://circleci.com/gh/hydroscan/hydroscan-web.svg?style=svg)](https://circleci.com/gh/hydroscan/hydroscan-web)
[![Docker Cloud Automated build](https://img.shields.io/docker/cloud/automated/hydroscanio/hydroscan-web.svg)](https://hub.docker.com/r/hydroscanio/hydroscan-web)
[![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/hydroscanio/hydroscan-web.svg)](https://hub.docker.com/r/hydroscanio/hydroscan-web)
[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m782290063-a639e34e5ff926b9e1f73e90.svg)](https://hydroscan.io)

> A server-rendering single page client application built with React and Typescript. Connects to the HydroScan API for data.

## Requirements

- [Node.js](https://nodejs.org/en/)

## Getting Started

Simply install the dependencies and start the server. The .env file should point to a running instance of the [HydroScan API](https://github.com/hydroscan/hydroscan-api).

```
$ cp .env.sample .env
$ npm install
$ npm run start
```

## Contributing

1. Fork it (<https://github.com/hydroscan/hydroscan-web/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
