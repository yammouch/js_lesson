#include <cstddef>
#include <cstdint>

struct Fir {
  double   *buf;
  uint64_t  buf_len;
  double   *coeffs;
  uint64_t  coeffs_len;
  int64_t   inow;
  double    next(double);
};

double Fir::next(double din) {
  inow--;
  if (inow < 0) {
    inow += buf_len;
  }
  buf[inow] = din;
  double acc = 0.0;
  for (int64_t i = inow-1, j = coeffs_len-1; 0 <= j; i--, j--) {
    if (i < 0) {
      i += buf_len;
    }
    acc += coeffs[j]*buf[i];
  }
  return acc;
}

double mvav2_buf[2] = {0.0, 0.0};
double mvav2_coeffs[2] = {0.5, 0.5};
double mvav4_buf[4] = {0.0, 0.0, 0.0, 0.0};
double mvav4_coeffs[4] = {0.25, 0.25, 0.25, 0.25};
Fir mvav2{mvav2_buf, 2, mvav2_coeffs, 2, 0};
Fir mvav4{mvav4_buf, 4, mvav4_coeffs, 4, 0};
