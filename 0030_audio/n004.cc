#include <cstdint>

struct C01 {
  uint64_t x;
  uint64_t f(uint64_t);
};

uint64_t C01::f(uint64_t y) {
  return x+2*y;
}

C01 c01{1};
C01 *p_c01;

extern "C" void init(uint64_t x) {
  p_c01 = new C01{x};
}

extern "C" void finalize() {
  delete p_c01;
}
