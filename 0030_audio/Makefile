CXXFLAGS = -O2
SIDEFLAGS = -nostartfiles -Wl,--no-entry -Wl,--strip-all -Wl,--export-dynamic

%.wasm : %.cc
	$(CXX) $(CXXFLAGS) $(SIDEFLAGS) -o $@ $^

n007.wasm: n007.cc
