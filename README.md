# Node Task

image resizing, json patching and JWT authentification

[![Coverage Status](https://coveralls.io/repos/haterecoil/hapi-api-complex-boilerplate/badge.svg?branch=master)](https://coveralls.io/r/haterecoil/hapi-api-complex-boilerplate?branch=master)

On my way of learning modern NodeJS I crawled LOADS of websites and started
an architecture draft.

A microservice handling :
- authentification
- JWT creation and validation (todo)
- image resizing (todo)
- JSON patching (todo)

## API

Routes

|verb|route|payload|comment|
|----|-----|-------|-------|
|POST  | /token | {username: string, password: string} | returns a JWT|

## Install

`npm install`

## Run

`npm start`

## Architecture

Inspired by Django. Uses Hapi plugins to organize endpoints.

`/server.js` reads `config/manifest` and composes a server with Glue.

The manifest registers the application's fragments contained in `/api`.

Each fragment casts its own routing, but you can add a route prefix in the `manifest`
and provide options to customize plugins behaviours.

Such fragments have several advantages :
- Readability : when you work on a feature, everything is on the same folder
- Portability : you can copy/paste it in another Hapi project based on the same structure and it
should work without modification

/!\ The configuration management is clumsy, there are lots of improvements to do,
maybe with `node-config`.



