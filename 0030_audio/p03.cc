double __attribute__((visibility("default"))) x2(double x) {
  return 2*x;
}
//$CXX -O2 -nostartfiles -Wl,--no-entry -Wl,--strip-all -Wl,--export-dynamic -o p03.wasm p03.cc
