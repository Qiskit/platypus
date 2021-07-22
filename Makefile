help:
	@echo "Please use 'make <target>' where <target> is one of:"
	@echo "  lint    to run content style checks"

lint:
	@echo "Running content style checks"
	bash test/content/code_style.sh
	python3 test/content/goals.py
