import wasmtime
import numpy as np
import os


class TestConvolve:
  def __init__(self, store, inst, mem, base):
    self.store = store
    self.inst = inst
    self.base = base
    self.mem = inst.exports(store)["memory"]
    self.f = inst.exports(store)["_Z8convolvemPKdmS0_Pd"]

  def test1(self, p1, p2):
    p1 = np.array(p1, dtype=np.float64)
    p2 = np.array(p2, dtype=np.float64)
    b1 = p1.tobytes()
    b2 = p2.tobytes()
    p_b1 = self.base
    p_b2 = p_b1+len(b1)
    self.mem.write(self.store, b1, p_b1)
    self.mem.write(self.store, b2, p_b2)
    self.f(self.store, len(p1)-1, p_b1, len(p2)-1, p_b2, p_b2)
    result_raw = self.mem.read(self.store, p_b2, p_b2+8*(len(p1)+len(p2)-1))
    result = np.frombuffer(result_raw, dtype=np.float64)
    expc = np.convolve(p1, p2)
    if np.isclose(result, expc).all():
      print("[OK] ", end="")
    else:
      print("[ER] ", end="")
    print("test convolve")

def main():
  store = wasmtime.Store()
  mod = wasmtime.Module.from_file(store.engine, "n007.wasm")
  inst = wasmtime.Instance(store, mod, [])
  mem = inst.exports(store)["memory"]
  base = mem.size(store)*0x10000
  mem.grow(store, 1)

  test_convolve = TestConvolve(store, inst, mem, base)
  test_convolve.test1([1, 2], [3, 4, 5])
  test_convolve.test1([-1], [0, 1, -1])
  test_convolve.test1([-2, 1, 4], [-1])

if __name__ == "__main__":
  main()
