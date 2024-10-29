CXX=em++
CXXFLAGS = -O2
SIDEFLAGS = -nostartfiles \
 -Wl,--no-entry \
 -Wl,--strip-all \
 -Wl,--export-dynamic \
 -sINITIAL_HEAP=64kb \
 -sALLOW_MEMORY_GROWTH=1


%.wasm : %.cc
	$(CXX) $(CXXFLAGS) $(SIDEFLAGS) -o $@ $^

n007.wasm: n007.cc
