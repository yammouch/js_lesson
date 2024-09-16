import wasmtime
import numpy as np
import os

os.system('$CXX -O2 -nostartfiles -Wl,--no-entry -Wl,--strip-all -Wl,--export-dynamic -o n007.wasm n007.cc')

store = wasmtime.Store()
module = wasmtime.Module.from_file(store.engine, "n007.wasm")
instance = wasmtime.Instance(store, module, [])

p1 = np.array([1, 2], dtype=np.float64)
p2 = np.array([3, 4, 5], dtype=np.float64)
b1 = p1.tobytes()
b2 = p2.tobytes()

buf_dbg = instance.exports(store)["buf_dbg"].value(store)
memory = instance.exports(store)["memory"]
memory.write(store, b1, buf_dbg)
memory.write(store, b2, buf_dbg+len(b1))
convolve = instance.exports(store)["_Z8convolvemPKdmS0_Pd"]
convolve(store, len(p1)-1, buf_dbg, len(p2)-1, buf_dbg+len(b1), buf_dbg+len(b1))
result_raw = memory.read(store, buf_dbg+len(b1), buf_dbg+len(b1)+8*(len(p1)+len(p2)+1))
result = np.frombuffer(result_raw, dtype=np.float64)
expc = np.convolve([1, 2], [3, 4, 5])
print(result, expc)
