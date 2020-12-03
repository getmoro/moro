# Moro



A command line tool for tracking work hours, as simple as it can get.

[![Backers on Open Collective](https://opencollective.com/moro/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/moro/sponsors/badge.svg)](#sponsors)  [![Downloads](https://img.shields.io/npm/dt/moro.svg)](https://npmjs.org/moro)
[![Greenkeeper badge](https://badges.greenkeeper.io/albacoretuna/moro.svg)](https://greenkeeper.io/) 
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)

## Demo
![alt tag](https://user-images.githubusercontent.com/7697632/29446360-80950010-83f4-11e7-945f-9212fa6738ce.gif)


## Install

### If you have node and npm

You need node version 10 or higher (we haven't tested lower versions)

To install just type this into command line:

```bash
npm install -g moro

# or if you are using yarn, it works too
yarn global add  moro
```

You are done installing Moro!

### (alternative install method) Download the compiled binary file
We recommend installing moro using npm but if you don't have node and npm on your machine, you can download the executable files from [releases page](https://github.com/albacoretuna/moro/releases) for Linux, Mac and Windows.

Remember to copy ./lib/config.json to your home directory and rename it to

```
~/.moro-config.json
```

Then you can copy the downloaded executable file to your path, for example to /bin and start using moro just like the nomral installation. 


## Update
```bash
npm update -g moro
```

## Usage

1. Run `moro hi` when starting your working day. Moro registers that time as your clock in time.
2. Run `moro bye` when ending your working day. Moro Registers that time as your clock out time.

That's it! Moro prints on the screen how many hours you have worked.

Invoke `$:moro report` at any time to see how long you have worked on the current day.

To see the full report of previous days run `moro report --all`.


#### Learn more:
Those two steps above should be all you need to know about Moro, but there are 3 ways to learn more:

  * `$: moro --help`
  * See the documentation: [link](https://github.com/albacoretuna/moro/blob/master/DOCUMENTATION.md)
  * Or check this screen recording: [link](https://asciinema.org/a/106792)

## Frequently Asked Questions (FAQ)

<details>
<summary>Click to open FAQ</summary>

Q: I forgot to run moro in the morning, so my clock in time is not saved. Can I adjust it now?
A: yes!  for example, if you started work at 09:30 run `$: moro hi 09:30`

</details>

## What does moro mean?
Moro means hello in Finnish.

## Contributing
Open an issue, or make a pull request. We love contributions.

### Development
Clone this repo, and then inside the folder run:

```
npm link
```

This will install moro globally but using the files inside the project folder. You can now change the files and run moro in your command line to see the effects.

### To run tests

```
npm test
```


## Code of conduct
Code is important but people are more important. If you like to contribute to Moro please read and follow our code of conduct found in this file: CODE_OF_CONDUCT.md


## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars2.githubusercontent.com/u/7697632?v=3" width="100px;"/><br /><sub><b>Nick Okapi</b></sub>](http://omid.fi)<br />[💬](#question-albacoretuna "Answering Questions") [🐛](https://github.com/albacoretuna/moro/issues?q=author%3Aalbacoretuna "Bug reports") [💻](https://github.com/albacoretuna/moro/commits?author=albacoretuna "Code") [📖](https://github.com/albacoretuna/moro/commits?author=albacoretuna "Documentation") [👀](#review-albacoretuna "Reviewed Pull Requests") [⚠️](https://github.com/albacoretuna/moro/commits?author=albacoretuna "Tests") | [<img src="https://avatars2.githubusercontent.com/u/4089975?v=3" width="100px;"/><br /><sub><b>Mario</b></sub>](https://github.com/mario-s)<br />[💻](https://github.com/albacoretuna/moro/commits?author=mario-s "Code") [📖](https://github.com/albacoretuna/moro/commits?author=mario-s "Documentation") [⚠️](https://github.com/albacoretuna/moro/commits?author=mario-s "Tests") | [<img src="https://avatars2.githubusercontent.com/u/2211050?v=3" width="100px;"/><br /><sub><b>Karl Fleischmann</b></sub>](https://twitter.com/fleischie28)<br />[💻](https://github.com/albacoretuna/moro/commits?author=fleischie "Code") [📖](https://github.com/albacoretuna/moro/commits?author=fleischie "Documentation") [⚠️](https://github.com/albacoretuna/moro/commits?author=fleischie "Tests") | [<img src="https://avatars0.githubusercontent.com/u/12087554?v=3" width="100px;"/><br /><sub><b>Niloofar Motamed</b></sub>](https://niloofarmotamed.com)<br />[📖](https://github.com/albacoretuna/moro/commits?author=niloomotita "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/5592940?v=3" width="100px;"/><br /><sub><b>Wolf-Rost</b></sub>](https://github.com/Wolf-Rost)<br />[📖](https://github.com/albacoretuna/moro/commits?author=Wolf-Rost "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/2776719?v=3" width="100px;"/><br /><sub><b>Henri Koski</b></sub>](https://github.com/heppu)<br />[📖](https://github.com/albacoretuna/moro/commits?author=heppu "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/6113341?v=3" width="100px;"/><br /><sub><b>Olavi Haapala</b></sub>](https://twitter.com/0lpeh)<br />[📖](https://github.com/albacoretuna/moro/commits?author=olpeh "Documentation") [🐛](https://github.com/albacoretuna/moro/issues?q=author%3Aolpeh "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/15911342?v=4" width="100px;"/><br /><sub><b>Walid Mani</b></sub>](https://github.com/Flouss)<br />[💻](https://github.com/albacoretuna/moro/commits?author=Flouss "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/moro/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/moro#backer)]

<a href="https://opencollective.com/moro#backers" target="_blank"><img src="https://opencollective.com/moro/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/moro#sponsor)]

<a href="https://opencollective.com/moro/sponsor/0/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/1/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/2/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/3/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/4/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/5/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/6/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/7/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/8/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/moro/sponsor/9/website" target="_blank"><img src="https://opencollective.com/moro/sponsor/9/avatar.svg"></a>


