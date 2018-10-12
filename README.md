# Bloody maze

This is the back-end part of the bloody maze project

This is mainly an api to provide best path between two point

## Getting Started

### Prerequisites

  * node v8.10.0
  * npm v5.5.1

### Installing and run

With local repo =>

```
npm i
```

```
npm start
```

With Docker =>

```
docker build -t user/bloody_maze . && docker run -p 8080:8080 -d user/bloody_maze
```


In both case , the server will run on => 0.0.0.0:8080 ( you can define other config in config repository)


## Running the tests

```
npm test
```

## Deployment

I deploy my app ( via docker ) on clever cloud , you can use => https://bloodymaze.cleverapps.io ( for example => https://bloodymaze.cleverapps.io/path?from=10030&to=10121 )
You can create some config files for production/preprod/.... in config directory , you just have to set an environment variable ( NODE_ENV=production ) to be redirect to relevant config file ( production.js if NODE_ENV=production )

## Contribute

- add real log management
- add redis cache


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/borel/bloodymaze/tags).

## Authors

* **pbb**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

