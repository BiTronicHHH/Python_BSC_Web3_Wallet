import configuration from "./";

const setAuthToken = (token: string | null) => {
  if (token) {
    configuration.api.defaults.headers.common["x-auth-token"] = token;
    configuration.apiFile.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete configuration.api.defaults.headers.common["x-auth-token"];
    delete configuration.apiFile.defaults.headers.common["x-auth-token"];
  }
};

export default setAuthToken;
