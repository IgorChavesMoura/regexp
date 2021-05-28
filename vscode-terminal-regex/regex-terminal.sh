#!/bin/bash 

target_folder=target-project

# find $target_folder -name *.test.js -not -path '*node_modules**'
# find $target_folder -name *.js -not -path '*node_modules**'


CONTENT="'use strict';"

find $target_folder -name *.js -not -path '*node_modules**' \
| ipt -o \
| xargs -I '{file}' sed -i -e '1s/^/\"use strict";\n/g' {file}

#1s -> first line
#^ -> first column (beginning of the line)
# Replace with $CONTENT
# Break line to add an implicit \n