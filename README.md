# moro
CLI tool for simple time tracking, very simple.

## install

```bash
npm install -g moro

# or
yarn global add moro
```
It works best for 9 to 5 jobs, as there's no start/stop task feature.

## How it works?

```bash
# when you com to work you say moro:
$: moro
your start of the day is set at 9:00

#When you are about to leave work you say moro:
$ moro
your end of the day is set to 17:00

# Just say moro one more time to see how much you have worked:
$ moro
You have worked 7 Hours and 30 Minutes today

# moro removes half an hour for the lunch time.
```


### What if you forgot to say moro?

```bash
# use hi to add or edit your start of the day
$ moro hi 10:45

# use bye to add or edit the end of your day
$ moro bye 15:56

# use break to add the total minutes of break
# default break is 30 minutes. If you notice you had 45, do this to fix it
$ moro break 45

# to see all your registered hours:
$ moro report --all
```

## Contributing
Yes please!

## what does moro mean?
In Tampere, Finland I hear moro a lot. I suppose it means hello in Finnish
