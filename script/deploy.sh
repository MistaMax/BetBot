#!/bin/sh
ssh ${NODESERVERUSER}@${NODESERVERIP} <<EOF
 cd ~/git/BetBot
 git pull
 npm install
 npm run web-deploy
 exit
EOF