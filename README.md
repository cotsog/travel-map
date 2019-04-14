# Travel Map

> Interactive world map with travel history.

[![license-shield]](LICENSE.md)
[![tag-shield]][tags-link]
[![build-status](https://travis-ci.org/benjamin-guibert/travel-map.svg)](https://travis-ci.org/benjamin-guibert/travel-map)
[![website](https://img.shields.io/website/http/map.demo.bguibert.fr.svg)](http://map.demo.bguibert.fr)

## Table of Contents

* [Usage](#usage)
* [Release History](#release-history)
* [Built With](#built-with)
* [Versionning](#versionning)
* [Authors](#authors)
* [License](#license)

## Usage

[![website](https://img.shields.io/website/http/map.demo.bguibert.fr.svg)](http://map.demo.bguibert.fr)

The only thing to do is to edit the file [`public/travels.json`](public/travels.json) with the following rules:

* First travel is the home, it contains no dates ;
* Each travel is **placed in chronological order** ;
* Each travel **have non-overlapping starting and ending date** with previous/next travels ;
* A travel may be on a single day with same start and end date ;
* Last travel may contain no end date.

Please check the existing file as an example.

If the data cannot be parsed, an error is shown.

## Release History

[![tag-shield]][tags-link]

Check the [`CHANGELOG.md`](CHANGELOG.md) file for the release history.

## Built With

* [Vue.js](https://vuejs.org)
* [jQuery](https://jquery.com)
* [Lodash](https://lodash.com)
* [Sass](https://sass-lang.com)
* [BootstrapVue](https://bootstrap-vue.js.org)
* [Font Awesome](https://fontawesome.com)
* [amCharts](https://www.amcharts.com)
* [vue-flag-icon](https://www.npmjs.com/package/vue-flag-icon)

## Versionning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository][tags-link].

## Authors

* **[Benjamin Guibert](https://github.com/benjamin-guibert)** (<contact@bguibert.fr>) : Initial work

See also the list of [contributors][contributors-link] who participated in this project.

## License

[![license-shield]](LICENSE)

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details

[tags-link]: https://github.com/benjamin-guibert/travel-map/tags
[forks-link]: https://github.com/benjamin-guibert/travel-map/fork
[contributors-link]: https://github.com/benjamin-guibert/travel-map/contributors
[license-shield]: https://img.shields.io/github/license/benjamin-guibert/travel-map.svg
[tag-shield]: https://img.shields.io/github/tag/benjamin-guibert/travel-map.svg