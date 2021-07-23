help:
	@echo "Please use 'make <target>' where <target> is one of:"
	@echo "  lint    to run content style checks"

lint:
	@echo "Running content style checks"
	bash scripts/nb_lint.sh
	python3 scripts/goals.py
