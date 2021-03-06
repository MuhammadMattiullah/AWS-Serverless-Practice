# Change Log

All notable changes to this project is documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## Unreleased

## [3.0.0]

- BREAKING CHANGE: The `mocha` dependency is updated to `^6.0.1`, also the related `nyc` and `ts-node` packages are updated to their latest version. Due to a [bug](https://github.com/mochajs/mocha/issues/3763) in mocha the `mocha.opts` files are needed to be moved to the new `yml` format.

## [2.0.0]

- BREAKING CHANGE: Dropping support for NodeJS v6, CI pipelines are running on the current LTS version (now 10.15.0) and the latest version available on the CI platform. This change enables keeping third-party dependencies up-to-date.

## [1.0.2]

- The `aws-sdk` dependency is updated to `^2.312.0`.

## [1.0.1]

- Meeting CII Best Practices ["Passing" level](https://github.com/coreinfrastructure/best-practices-badge/blob/master/doc/criteria.md) criteria.

## [1.0.0]

First public release.
