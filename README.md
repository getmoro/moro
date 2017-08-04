# Moro

Command line tool for tracking work hours, as simple as it can get.

[![Build Status](https://travis-ci.org/omidfi/moro.svg?branch=master)](https://travis-ci.org/omidfi/moro) [![Downloads](https://img.shields.io/npm/dt/moro.svg)](https://npmjs.org/moro)
[![Greenkeeper badge](https://badges.greenkeeper.io/omidfi/moro.svg)](https://greenkeeper.io/) [![Sponsored](https://img.shields.io/badge/chilicorn-sponsored-brightgreen.svg?logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAMAAADjyg5GAAABqlBMVEUAAAAzmTM3pEn%2FSTGhVSY4ZD43STdOXk5lSGAyhz41iz8xkz2HUCWFFhTFFRUzZDvbIB00Zzoyfj9zlHY0ZzmMfY0ydT0zjj92l3qjeR3dNSkoZp4ykEAzjT8ylUBlgj0yiT0ymECkwKjWqAyjuqcghpUykD%2BUQCKoQyAHb%2BgylkAyl0EynkEzmkA0mUA3mj86oUg7oUo8n0k%2FS%2Bw%2Fo0xBnE5BpU9Br0ZKo1ZLmFZOjEhesGljuzllqW50tH14aS14qm17mX9%2Bx4GAgUCEx02JySqOvpSXvI%2BYvp2orqmpzeGrQh%2Bsr6yssa2ttK6v0bKxMBy01bm4zLu5yry7yb29x77BzMPCxsLEzMXFxsXGx8fI3PLJ08vKysrKy8rL2s3MzczOH8LR0dHW19bX19fZ2dna2trc3Nzd3d3d3t3f39%2FgtZTg4ODi4uLj4%2BPlGxLl5eXm5ubnRzPn5%2Bfo6Ojp6enqfmzq6urr6%2Bvt7e3t7u3uDwvugwbu7u7v6Obv8fDz8%2FP09PT2igP29vb4%2BPj6y376%2Bu%2F7%2Bfv9%2Ff39%2Fv3%2BkAH%2FAwf%2FtwD%2F9wCyh1KfAAAAKXRSTlMABQ4VGykqLjVCTVNgdXuHj5Kaq62vt77ExNPX2%2Bju8vX6%2Bvr7%2FP7%2B%2FiiUMfUAAADTSURBVAjXBcFRTsIwHAfgX%2FtvOyjdYDUsRkFjTIwkPvjiOTyX9%2FAIJt7BF570BopEdHOOstHS%2BX0s439RGwnfuB5gSFOZAgDqjQOBivtGkCc7j%2B2e8XNzefWSu%2BsZUD1QfoTq0y6mZsUSvIkRoGYnHu6Yc63pDCjiSNE2kYLdCUAWVmK4zsxzO%2BQQFxNs5b479NHXopkbWX9U3PAwWAVSY%2FpZf1udQ7rfUpQ1CzurDPpwo16Ff2cMWjuFHX9qCV0Y0Ok4Jvh63IABUNnktl%2B6sgP%2BARIxSrT%2FMhLlAAAAAElFTkSuQmCC)](http://spiceprogram.org/oss-sponsorship)
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)

## Demo
![alt tag](https://media.giphy.com/media/3og0ITIo5hWI8gfrBm/source.gif)

## Screen recorded video tutorial
Moro is really simple but you can watch this screen recording to see all the features Moro has: [link](https://asciinema.org/a/106792) in 15 minutes.

## Install
```bash

npm install -g moro

```
You need node version 4.8.0 or higher (we haven't tested lower versions)

## Update
```bash
npm update -g moro
```

## How it works?

### Short version:
When you start your work day, you run `$: moro`. And when you are leaving, you run moro again. And it tells you how many hours you have worked.

### Long version:

The formula to calculate work hours is simple: (time the work ends) - (time the work starts) - (breaks) = work time, e.g. 17 - 9 - 1 = 7. However, it gets tricky when you don't remember when you came to work this morning. Or yesterday...

Moro saves the three parameters, start, end, break, for each day and at the end of the day tells you how many hours you have worked. All data is saved on your computer and doesn't leave it.

1. When you come to work you say moro:
```bash
$: moro
your start of the day is set at 9:00
...
```
2. When you are about to leave work you say moro once more, and you find out how long you have worked!

```bash
$ moro

Your end of the day registered as 17:15

 Today looks like this:

┌────────────────┬────────────────────────┐
│ Today          │ 7 Hours and 30 Minutes │
├────────────────┼────────────────────────┤
│ Start          │ 09:15                  │
├────────────────┼────────────────────────┤
│ End            │ 17:15                  │
├────────────────┼────────────────────────┤
│ Break duration │ 30 minutes             │
├────────────────┼────────────────────────┤
│ Date           │ 2017-03-08             │
└────────────────┴────────────────────────┘

```

Moro subtracts 30 minutes for the lunch time by default.

That's it! You know you have worked 7 hours and 30 minutes!

### What if you forgot to say moro when you start or finish your day?
If you forget to say moro in the morning, or when you're leaving, don't worry. You can do that later on the same day, but not tomorrow for example.

To specify the start and end of your workday afterwards Moro has two commands: hi and bye.

Hi is for setting the start of the day, check the format of time HH:mm

```bash
$ moro hi 10:45
```

Bye is to set the end of your work day

```bash
$ moro bye 15:56
```

You can also use break to set the total minutes of break. The default is 30 minutes. So if you just have 30 minutes break on the day, don't touch this one.

```bash
# Imagine you notice you had 45 minutes of break instead of 30, do this to set it
$ moro break 45
```

To see all your registered hours:

```bash
$ moro report --all
```

## Adding a note
You can add one or more notes to your workday.
```bash
$ moro note foo
```
They'll appear in reports. You can for example use them to devide your time between different tasks.

## Search for notes
You can search for notes.
```bash
$ moro search foo
```
It will look for the search term in a case-insensitive inclusive match and format the data as a table.

## Clear data
To flush your data
```bash
$ moro clear --yes
```

## Configuration

To change the Date format for a report use a pattern

```
# This will change the output to 'Fr, 2017-03-17'
moro.js config --format 'dd, YYYY-MM-DD'
```
For more possible formats see the [Moment.js documentation](https://momentjs.com/docs/#/displaying/format/)


## Setting work day duration and break time default
In Finland a full work day is 7.5 hours, which is the default in moro. To change it use this:

```
# For example to make it 6.5 hours
moro config --day 6.5
```

Also the default break time can be changed from 30 minutes

```
# to make default break 45 minutes
moro config --break 45
```

# Backup the data
Moro uses a single database file to keep your data. Default location is in your home directory, and the file name is .moro-data.db. You can backup that file however you like.

Easy way to back up is to move the Moro database file into your DropBox folder and then use the following command to tell Moro to use that database file:

```
moro config --database-path /home/GraceHopper/Dropbox/moro-data.db

# This works on my linux machine :)
```

## Why not do it by a one liner?
Well I hear you! My colleague, Henri, gave me this:

```bash
echo 'You have worked:' $(echo 'scale=2;(' $(date -d 'now' +%s) - $(date -d "$(journalctl -t systemd-logind -b | grep 'Lid opened' | tail -n1 | awk '{print $1, $2, $3}')" +%s) ')' / 3600 | bc) 'hours'
```


## Contributing
Yes please! Open an issue, or make a pull request!

### Code of conduct
Code is important but people are more important. If you like to contribute to Moro please read and follow our code of conduct found in this file: CODE_OF_CONDUCT.md

### To run tests

```
yarn run test
```

### Automated run script

There's a shell script that runs all the features and you can see the results in terminal, to make sure things work.

```
./tests/automated-script.sh
```

## What does moro mean?
Moro means hello in Finnish.

## Supporters
I thank Futurice ([link](https://github.com/futurice/)) my employer for sponsoring this project trough its Spice program

[![Supported by the Spice Program](https://github.com/futurice/spiceprogram/raw/gh-pages/assets/img/logo/chilicorn_with_text-180.png)](https://spiceprogram.org)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars2.githubusercontent.com/u/7697632?v=3" width="100px;"/><br /><sub>Omid Hezaveh</sub>](http://omid.fi)<br />[💬](#question-omidfi "Answering Questions") [🐛](https://github.com/omidfi/moro/issues?q=author%3Aomidfi "Bug reports") [💻](https://github.com/omidfi/moro/commits?author=omidfi "Code") [📖](https://github.com/omidfi/moro/commits?author=omidfi "Documentation") [👀](#review-omidfi "Reviewed Pull Requests") [⚠️](https://github.com/omidfi/moro/commits?author=omidfi "Tests") | [<img src="https://avatars2.githubusercontent.com/u/4089975?v=3" width="100px;"/><br /><sub>Mario</sub>](https://github.com/mario-s)<br />[💻](https://github.com/omidfi/moro/commits?author=mario-s "Code") [📖](https://github.com/omidfi/moro/commits?author=mario-s "Documentation") [⚠️](https://github.com/omidfi/moro/commits?author=mario-s "Tests") | [<img src="https://avatars2.githubusercontent.com/u/2211050?v=3" width="100px;"/><br /><sub>Karl Fleischmann</sub>](https://twitter.com/fleischie28)<br />[💻](https://github.com/omidfi/moro/commits?author=fleischie "Code") | [<img src="https://avatars0.githubusercontent.com/u/12087554?v=3" width="100px;"/><br /><sub>Niloofar Motamed</sub>](https://niloofarmotamed.com)<br />[📖](https://github.com/omidfi/moro/commits?author=niloomotita "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/5592940?v=3" width="100px;"/><br /><sub>Wolf-Rost</sub>](https://github.com/Wolf-Rost)<br />[📖](https://github.com/omidfi/moro/commits?author=Wolf-Rost "Documentation") | [<img src="https://avatars0.githubusercontent.com/u/2776719?v=3" width="100px;"/><br /><sub>Henri Koski</sub>](https://github.com/heppu)<br />[📖](https://github.com/omidfi/moro/commits?author=heppu "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/6113341?v=3" width="100px;"/><br /><sub>Olavi Haapala</sub>](https://twitter.com/0lpeh)<br />[📖](https://github.com/omidfi/moro/commits?author=olpeh "Documentation") [🐛](https://github.com/omidfi/moro/issues?q=author%3Aolpeh "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
