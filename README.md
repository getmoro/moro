# moro
CLI tool for tracking work hours, with only one command. Without any arguments or stop/start buttons. No headaches. Very fast :D

[![asciicast](https://asciinema.org/a/f0vb5tlseh1aqyo5xspn4e4qs.png)](https://asciinema.org/a/f0vb5tlseh1aqyo5xspn4e4qs)

## install

```bash
npm install -g moro

# or
yarn global add moro
```
It works best for 9 to 5 jobs, as there's no start/stop task feature.

## How it works?
Short version:

It's simple. When you start your work, you run moro. And when you are leaving, run moro again. And it tells you how long you have worked.

Long version:
1. when you com to work you say moro:
```bash
$: moro
your start of the day is set at 9:00
...
```
2. When you are about to leave work you say moro once more, and you find out how long you have worked!
```
$ moro

Your end of the day registered as:  17:15

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

moro removes half an hour for the lunch time.

That's it! You know you have worked 7 hours and 30 minutes!

### What if you forgot to say moro when you start or finish your day?
If you forget to say moro in the morning, or when you're leaving, don't worry. You can do that later on the same day, but not tomorrow for example.

To specify the start and end of your workday afterwards moro has two commands: hi and bye

hi is for setting the start of the day, check the format of time HH:mm

```bash
$ moro hi 10:45
```

bye is to set the end of your work day

```bash
$ moro bye 15:56
```

You can also use break to set the total minutes of break. The default is 30 minutes. So if you just have a 30 minutes break on the day, don't touch this one.

```bash
# Imagine you notice you had 45 minutes of break instead of 30, do this to set it
$ moro break 45
```

to see all your registered hours:

```bash
$ moro report --all
```

## Contributing
Yes please!

## what does moro mean?
moro means hello in Finland and  and in some areas specially in Tampere I've heard it a lot.
