FROM ghcr.io/webassembly/wasi-sdk:wasi-sdk-24
RUN apt-get update
RUN apt-get install -y dnsutils
RUN apt-get install -y net-tools
RUN apt-get install -y x11-apps
RUN apt-get install -y vim
RUN apt-get install -y less
RUN apt-get install -y lsof
RUN apt-get install -y ncat
RUN apt-get install -y python3
RUN DEBIAN_FRONTEND=noninteractive TZ=Asia/Tokyo apt-get install -y python3-tk
RUN apt-get install -y python3-pip
RUN apt-get install -y git
RUN apt-get install -y curl
RUN pip install numpy
RUN pip install matplotlib
RUN pip install jupyterlab
RUN pip install wasmtime
RUN useradd -m -u 1000 yammouch -s /bin/bash
WORKDIR /opt
RUN git clone --recursive https://github.com/WebAssembly/wabt
WORKDIR /opt/wabt
RUN make gcc-release
WORKDIR /
ENV WASMTIME_HOME=/opt/wasmtime
RUN curl https://wasmtime.dev/install.sh -sSf | bash
RUN echo "export PATH=\${WASMTIME_HOME}/bin:\${PATH}" >> /home/yammouch/.bashrc
RUN echo "export PATH=/opt/wabt/bin:\${PATH}" >> /home/yammouch/.bashrc
RUN echo "syntax off" >> /home/yammouch/.vimrc
