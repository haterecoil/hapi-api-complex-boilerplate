# Node Task

image resizing, json patching and JWT authentification

[![Coverage Status](https://coveralls.io/repos/haterecoil/hapi-api-complex-boilerplate/badge.svg?branch=master)](https://coveralls.io/r/haterecoil/hapi-api-complex-boilerplate?branch=master)

On my way of learning modern NodeJS I crawled LOADS of websites and started
an architecture draft.

A microservice handling :
- authentification
- JWT creation and validation
- image resizing
- JSON patching

## API

Routes

|verb|route|payload|comment|
|----|-----|-------|-------|
|GET  |/documentation        | |         documentation
|POST |/image/thumbnail      | {imageUrl: string} |         Resizes an image at 50px
|POST |/json/patch           | {jsonToPathc: object, patches: array \|\| object} |         Patches a JSON
|GET  |/swagger.json         | |
|GET  |/swaggerui/{path*}    | |
|GET  |/swaggerui/extend.js  | |
|POST |/token                | {username:string, password:string}|         Provides a JWT

## Setup

```
npm install
npm run
```

Now browse to (127.0.0.1:1337/documentation) and enjoy!


## Architecture

I hadn't code in NodeJs for a year before I started this technical test and the whole environment changes a lot.
 My main stack is Django and Ionic2 because of some side project [some detail here](http://lorem.ovh).

 Thus my first reflex was to browse the web to 1. find a framework and 2. find a project structure and workflow... And I was quite surprised
 by this Node ecosystem, which is very wide and has few standards. Loads of articles but few are high quality.

 This structure is a mix between several readings and my past experiences. As a trial, I would not do exactly the same if I should redo it.

 If you are a corrector, I hope that you appreciate my efforts. If you are a curious reader, I hope this project will help you build
 a better structure.

### Project organisation

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

### Node Modules

Modules were carefully chosen :

- jsonwebtoken and hapi-auth-jwt2 are both very well maintained and supported
- sharp is the fastest image library [http://sharp.dimens.io/en/stable/performance/]
- fast-json-patch seems to be the fastest too [https://github.com/Starcounter-Jack/JSON-Patch]
- good to log requests and server events
- chai for assertions fot the expressiveness
- glue is a bit overkilled... Well it does not hold me back so why not...
- hapi-swagger to read route files and generate swagging doc

### What I would do differently

- maybe move /middlewares in /api
- use a better config management

### What I wonder about

Is a component approach a good approach with Hapi ? Maybe most of applications will stay small
so a lighter organization would be enough.

Even though this approach enables me to easily reuse modules I code, there are some drawbacks... For example,
handling all logging with good would suppose I can access server object from everywhere but I cannot
from my handler classes.

**I welcome every feedback on my code <3 !**

### Ranting !

Would you give me a hand?

This ***** istanbul tells me tests fail,
because of a `The following leaks were detected:$$cov_1494036842273$$` error **which does not appear** if
I run tests with Lab. You can try `npm test` versus `npm run-script testDev` to observe the difference.








