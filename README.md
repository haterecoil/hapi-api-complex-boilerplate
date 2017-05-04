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


