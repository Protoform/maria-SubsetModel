.PHONY: clean

SRCS       = src/header.js                 \
             src/SubsetModel.js            \
             src/SubsetModel.subclass.js

build: $(SRCS)
	mkdir -p build
	cat $(SRCS) >build/maria-SubsetModel.js
	jsmin <build/maria-SubsetModel.js >build/maria-SubsetModel-tmp.js
	cat src/header.js build/maria-SubsetModel-tmp.js >build/maria-SubsetModel-min.js
	rm build/maria-SubsetModel-tmp.js

clean:
	rm -rf build
