#!/usr/bin/env bash

# this script creates a `notebooks.txt` containing list of notebooks that
# are present in qiskit-community/qiskit-textbook but are not in
# Qiskit/platypus.
#
# this script is run from the `Check for Textbook notebooks` GitHub action
# which should contain a copy of the qiskit-textbook and platypus repos


# diff the notebooks directory of the two repos and add all notebooks found
# in qiskit-textbook but not found in platypus into a `notebooks.txt` file
diff -aqr platypus/notebooks qiskit-textbook/content | sort | grep 'Only in qiskit-textbook' | grep -E '\.ipynb$' > notebooks.txt

# count the number of lines (notebooks found) in qiskit-textbook but not in
# platypus
NUM_NB=$(cat notebooks.txt | wc -l)

echo 'found $NUM_NB new notebooks'

# set GitHub action variable to be checked by next step/task to determine
# if an issue should be created
echo '::set-output name=NUM_NB::$NUM_NB'

# replace all newline characters with `\n` so the list used in a JSON object
NB_LIST=$(sed -e :a -e '$!N;s/\n/\\n/;ta' notebooks.txt)

# create the JSON that will be used as payload for the create issue REST API
echo '{' > issue.txt
echo '  "title": "Missing notebooks",' >> issue.txt
echo '  "labels": ["bug"],' >> issue.txt
echo '  "assignees": ["vabarbosa", "frankharkins"],' >> issue.txt
echo '  "body": "'$NB_LIST'"' >> issue.txt
echo '}' >> issue.txt

exit 0
