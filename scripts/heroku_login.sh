#!/bin/bash

# This script logs into heroku
set timeout -1
spawn heroku login -i
expect {
  "Email*" { send -- "${::env(HEROKU_EMAIL)}\r" }
  "Password*" {send -- "${::env(HEROKU_PASSWORD)}\r"}
}
expect eof
