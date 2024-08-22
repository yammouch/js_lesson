#include <vector>
extern "C" {
#include "mymod2.h"
}

std::vector<int> g_v;

extern "C" void push(int x) {
  g_v.push_back(x);
  return;
}

extern "C" int getlen() {
  return g_v.size();
}