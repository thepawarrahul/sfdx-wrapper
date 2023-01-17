#!/usr/bin/env node
import { exec } from 'child_process';

import minimist from 'minimist';

const orgList = () => {
    const argv = minimist(process.argv.slice(2));
    const ORG_LIST = 'list';

    if (argv._[0] === ORG_LIST) {
        exec('sfdx force:org:list', (err, stdout, stderr) => {
          if (err) {
            console.error(stderr);
            return;
          }
          console.log(stdout);
        });
    }
}

const orgPush = () => {
  const argv = minimist(process.argv.slice(2));
  const ORG_PUSH = 'push';

  const orgUserNameArgument = argv._[1];

  if (argv._[0] === ORG_PUSH && orgUserNameArgument === undefined) {
    exec('sfdx force:source:push -f', (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        return;
      }
      console.log(stdout);
    })
  }

  if (argv._[0] === ORG_PUSH && orgUserNameArgument !== undefined) {
    let orgPushCommand = 'sfdx force:source:push -f '+'-u '+orgUserNameArgument;

    console.log(orgPushCommand);
    
    exec(orgPushCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(stderr);
        return;
      }
      console.log(stdout);
    })
  }
}

orgList();
orgPush();

export default orgList;
