#include <cstdint>
#include <cstdlib>

void __attribute__((visibility("default"))) convolve(
 size_t o1,
 const double *p1,
 size_t o2,
 const double *p2,
 double *dst) {
  int i = o1 + o2;
  for (; o1 < i; i--) {
    double acc = 0.0;
    for (int j = o1, k = i - o1; 0 <= j && k <= o2; j--, k++) {
       acc += p1[j]*p2[k];
    }
    dst[i] = acc;
  }
  for (; 0 <= i; i--) {
    double acc = 0.0;
    for (int j = i, k = 0; 0 <= j && k <= o2; j--, k++) {
      acc += p1[j]*p2[k];
    }
    dst[i] = acc;
  }
  return;
}
