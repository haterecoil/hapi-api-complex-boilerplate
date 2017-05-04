# SocialCops Node Task

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

/!\ The configuration management is clumsy, there are lots of improvements to do,
maybe with `node-config`.



