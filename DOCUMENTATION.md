# Documentation

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
│ Clock in       │ 09:15                  │
├────────────────┼────────────────────────┤
│ Clock out      │ 17:15                  │
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
