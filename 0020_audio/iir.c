#include <wasm_simd128.h>

v128_t delta;
v128_t acc;

void add(v128_t *src, v128_t *dst) {
  v128_t a = wasm_v128_load(src);
  v128_t b = wasm_v128_load(dst);
  v128_t sum = wasm_f32x4_mul(a, b);
  wasm_v128_store(dst, sum);
}
