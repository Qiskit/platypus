#!/usr/bin/env bash

NB_ROOT="./notebooks"
NB_PATHS="./scripts/notebook_paths.txt"

while read line
do
    if [[ $line = \#* ]] ; then
        echo "Skipping: ${line}"
    else
        echo "Lint check: ${line}.ipynb"
        nbqa pylint --rcfile="${NB_ROOT}/.pylintrc" --fail-under=10 "${NB_ROOT}/${line}.ipynb" || exit 1
    fi
done < "$NB_PATHS"
