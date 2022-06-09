const prod = {
  api: {
    url: "http://31.220.108.214:5000",
  },
  socket: {
    url: "http://31.220.108.214:8080",
  },
};

const dev = {
  api: {
    url: "http://localhost:5000",
  },
  socket: {
    url: "http://localhost:8080",
  },
};

export const CONFIG = process.env.NODE_ENV === "development" ? dev : prod;
