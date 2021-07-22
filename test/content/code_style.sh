echo "Need BASH > 4.0, you have: ${BASH_VERSION}"
readarray -t files < ./test/content/notebook_paths.txt

cd notebooks
for file in ${files[@]}; do
	echo "${file}.ipynb"
	nbqa pylint ${file}.ipynb
done
