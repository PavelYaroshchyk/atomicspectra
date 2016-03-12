#!/bin/bash

file_from=$1
element=$2
ion=$3

cat ../raw/$file_from | sed '1,4d'| sed 's/[^e][-]/|/g' | sed 's/E2/  /g' | sed 's/|    |/|/g' | sed 's/[ *]//g' | sed '/^[|]/d' | sed 's/,$//g' | sed 's/\[\]//g' | sed "s/^/$element|$ion|/g" | sed 's/|$//g' | sed 's/\[//g' | sed 's/\]//g' | sed 's/bl//g' | sed 's/[()]//g' | sed 's/|M[1-9]|/|/g'> ../formatted/$1
