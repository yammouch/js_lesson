double __attribute__((export_name("x2"))) x2(double x) {
  return 2*x;
}
//$CXX -O2 -nostartfiles -Wl,--no-entry -Wl,--strip-all -o p01.wasm p01.cc
