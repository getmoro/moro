#!/bin/bash
echo 'Moro tester! \O/ starts'
echo 'I set MORO_TEST_MODE on so that your original database stays untouched'
export MORO_TEST_MODE='true'

echo 'Let us clear the database if it exists'
moro clear --yes
echo 'ended'

# run moro
echo 'Now testing: Running moro with no argument'
moro

echo 'Now testing: Running moro with no argument ended'

echo ''
echo 'Now testing: moro hi 09:00'
moro hi 09:00
echo 'ended'

echo ''
echo 'Now testing: moro status'
moro status
echo 'ended'

echo 'Now testing: moro bye 17:00'
moro bye 17:00
echo 'ended'

echo 'Now testing: moro break 45'
moro break 45

echo 'ended'
echo 'Now testing: moro config --day 8'
moro config --day 8
echo 'ended'

echo 'Now testing: moro report'
moro report
echo 'ended'

echo 'Now testing: moro config --day 7.5'
moro config --day 7.5
echo 'ended'

echo 'Now testing: moro config --break 45'
moro config --break 45
echo 'ended'

echo 'Report after default break changed'
moro report
echo 'ended'

echo 'Now returning default break to 30: moro config --break 30'
moro config --break 30
echo 'ended'

echo 'Report all days'
moro report --all
echo 'ended'

echo 'Take a note'
moro note "# Testing moro"
echo 'ended'

echo 'Take a hyphened note'
moro note "-5"
echo 'ended'

echo 'Searching for a note'
moro search "#"
echo 'ended'

echo 'Let us clear the database if it exists'
moro clear --yes
echo 'ended'

export MORO_TEST_MODE='false'
echo ' I set MORO_TEST_MODE off, now using your normal database again'
echo 'SUCCESS \O/ Moro tester! /O\ completed all tests'
