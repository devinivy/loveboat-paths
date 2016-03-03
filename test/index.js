'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');
const Loveboat = require('loveboat');
const LoveboatPaths = require('..');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const internals = {};

describe('loveboat-paths', () => {

    it('supports passing multiple paths in a hapi route config.', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(Loveboat, (err) => {

            expect(err).to.not.exist();

            server.routeTransforms(LoveboatPaths);

            server.loveboat({
                method: 'get',
                path: ['/dogs', '/cats'],
                handler: function (request, reply) {

                    reply('You four-legged animal!');
                }
            });

            expect(server.table()[0].table).to.have.length(2);
            expect(server.match('get', '/dogs')).to.be.an.object();
            expect(server.match('get', '/cats')).to.be.an.object();

            done();
        });

    });

    it('ignores routes that do not have multiple paths specified.', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(Loveboat, (err) => {

            expect(err).to.not.exist();

            server.routeTransforms(LoveboatPaths);

            const routeConfig = {
                method: 'get',
                path: '/dogs',
                handler: function (request, reply) {

                    reply('You four-legged animal!');
                }
            };

            let called = 0;
            const origRoute = server.route;
            server.route = function (routes) {

                called++;
                expect(routes).to.be.an.array();
                expect(routes).to.have.length(1);
                expect(routes[0]).to.equal(routeConfig);

                origRoute.apply(this, arguments);
            };

            server.loveboat(routeConfig);

            server.route = origRoute;
            expect(called).to.equal(1);

            done();
        });

    });

});
