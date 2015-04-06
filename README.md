# rss-maker
make an rss feed out of something

# Environments variables
NODE_ENV, should either be production or development. If it's !production a .env file will be read from the root of the folder, otherwise it will error. If it's in production, this package will expect the environment to be properly set.

PORT, running port for the server

DEBUG, variable used by the [debug](https://github.com/visionmedia/debug) package.

# License
rss-maker is [WTFPL licensed](./LICENSE)
