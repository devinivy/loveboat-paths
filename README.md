# loveboat-paths
support listing multiple paths in hapi route config

(a transform written for [**loveboat**](https://github.com/devinivy/loveboat))

[![Build Status](https://travis-ci.org/devinivy/loveboat-paths.svg?branch=master)](https://travis-ci.org/devinivy/loveboat-paths) [![Coverage Status](https://coveralls.io/repos/devinivy/loveboat-paths/badge.svg?branch=master&service=github)](https://coveralls.io/github/devinivy/loveboat-paths?branch=master)

## Usage

This loveboat transform allows you to pass an array of route paths in your hapi route configuration, whereas hapi on its own only supports a single path.

```js
// Ever wish this worked?
server.loveboat({
    method: 'get',
    path: ['/dogs', '/cats'], // Now it does!
    handler: function (request, reply) {
        reply('You four-legged animal!');
    }
});
```

To use this transform,

1. Make sure the [loveboat]((https://github.com/devinivy/loveboat) hapi plugin is registered to your server.
2. Tell loveboat that you'd like to use this transform by calling `server.routeTransforms([require('loveboat-paths')])`, possibly listing any other transforms you'd like to use.*
3. Register your routes using `server.loveboat()` rather than `server.route()`.

<sup>* There are other ways to tell loveboat which transforms to use too!  Just check-out the [readme](https://github.com/devinivy/loveboat/blob/master/README.md).

```js
const Hapi = require('hapi');
const Loveboat = require('loveboat');

const server = new Hapi.Server();
server.connection();

// 1. Register loveboat
server.register(Loveboat, (err) => {

    // 2. Tell loveboat to use this transform
    server.routeTransforms([
        require('loveboat-paths')
    ]);

    // 3. Configure your routes!
    server.loveboat({
        method: 'get',
        path: ['/dogs', '/cats'], // This works!
        handler: function (request, reply) {
            reply('You four-legged animal!');
        }
    });

});
```
