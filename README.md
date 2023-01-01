# Semantic Release Coralogix Plugin

> When releasing with semantic release, automatically tag releases in Coralogix, so that release-related errors can be found faster

[Coralogix has a great tags feature](https://coralogix.com/docs/software-builds-display/) that allows you to flag the time when a particular service has been deployed (which might impact its likelihood of causing errors or other changed behavior). If you are using [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) to automate releases, then this plugin can tag releases for you automatically.

| Step               | Description                                                                                                                        |
|--------------------|------------------------------------------------------------------------------------------------------------------------------|
| `verifyConditions` | Verify that the `CORALOGIX_TAGGER_API_KEY` environment variable has been set and that it is able to access the Coralogix API |
| `publish`          | Add a release tag to Coralogix, supporting the configured `applications`, `subsystems`, and `iconUrl`                        |

## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/semantic-release-coralogix.svg)](https://codecov.io/gh/adobe/semantic-release-coralogix)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/semantic-release-coralogix.svg)](https://circleci.com/gh/adobe/semantic-release-coralogix)
[![GitHub license](https://img.shields.io/github/license/adobe/semantic-release-coralogix.svg)](https://github.com/adobe/semantic-release-coralogix/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/semantic-release-coralogix.svg)](https://github.com/adobe/semantic-release-coralogix/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/semantic-release-coralogix.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/semantic-release-coralogix)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```bash
$ npm install -D @adobe/semantic-release-coralogix
```

## Usage

## Usage

The plugin can be configured in the [**semantic-release** configuration file](https://github.com/semantic-release/semantic-release/blob/master/docs/usage/configuration.md#configuration):

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@adobe/semantic-release-coralogix", {
      "iconUrl": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/ship_1f6a2.png",
      "applications": [
        "my-app"
      ]
    }],
  ]
}
```

## Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `CORALOGIX_TAGGER_API_KEY` | The API key should be copied from Data Flow –> API Keys –> "Alerts, Rules and Tags API Key" |

### Options

| Parameter            | Type       | Description |
|----------------------|------------|-------------|
| `application`        | `string[]` | The applications this release will affect. If empty, all applications will be affected |
| `subsystem`          | `string[]` | The subsystems this release will affect. If empty, all subsystems will be affected     |
| `hostname`           | `string`   | The base hostname you use to access Coralogix. Omit for `coralogix.com`                |
| `iconUrl`            | `string`   | URL of a small image to use as the icon for the release.                               |

## Development

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```
test
