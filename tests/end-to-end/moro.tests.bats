#!/usr/bin/env bats
# Check bats testing framework for testing bash apps

load ../../node_modules/bats-assert/all

# set test mode, to protect the actual database
export MORO_TEST_MODE='true'

@test "Check that moro report works" {
  run moro report
  assert_success
}

@test "moro clear --yes works" {
  run moro clear --yes
  assert_success
}

@test "moro with no argument, first time should register clock in, and calculate clock out accordingly" {
  run faketime '2020-01-01 08:00:00' moro
  assert_success
  assert_output_contains 'You clocked in at: 08:00'
  assert_output_contains 'Working until 16:00 will make it a full (7.5 hours) day'
}

@test "moro with no argument, second time should register clock out" {
  run faketime '2020-01-01 16:00:00' moro
  assert_success
  assert_output_contains 'You clocked out at: 16:00'
}

@test "moro hi 09:00 should adjust clock in at 09:00" {
  run moro hi 09:00
  assert_success
  assert_output_contains 'You clocked in at: 09:00'
}

@test "moro bye 17:00 should adjust clock out at 17:00" {
  run moro bye 17:00
  assert_success
  assert_output_contains 'You clocked out at: 17:00'
}

@test "moro break 45 should set break to 45 minutes" {
  run moro break 45
  assert_success
  assert_output_contains 'Break duration   │ 45 minutes'
}

@test "moro note should save a note with correct time" {
  run faketime '2020-01-01 16:00:00' moro note Talk about Kathrine Johnson, NASA mathematician
  assert_success
  assert_output_contains ' Note [16:00]     │ Talk about Kathrine Johnson, NASA mathematician'
}

@test "moro search should find the note" {
  run moro search Kathrine
  assert_success
  assert_output_contains ' There are 1 search result:'
}

# Done! let Moro continue a normal life
export MORO_TEST_MODE='false'
