#!/usr/bin/env sh
for file in $JSFOLDER;
do
  echo "Injecting vars in file $file"
  cp $file "${file}.bkp"
  envsubst '$API_URL' < "${file}.bkp" > $file
done
nginx -g 'daemon off;'