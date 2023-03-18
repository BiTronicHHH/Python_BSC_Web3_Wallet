import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "./tailwind-output.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//redux
import { Store } from "./store/store";
import { Provider } from "react-redux";
// Import CSS files for SurveyJS (survey-core) and Survey Creator
import "survey-core/defaultV2.min.css";
import "survey-creator-core/survey-creator-core.min.css";

import { WalletSelectorContextProvider } from "./contexts/WalletSelectorContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// root.render(
//   <Provider store={Store}>
//     {/*@ts-ignore */}
//   <React.StrictMode>
//     <WalletSelectorContextProvider>
//     <App />
//     </WalletSelectorContextProvider>
//    </React.StrictMode>
//   </Provider>
// );

root.render(
  <Provider store={Store}>
    {/*@ts-ignore */}
    <WalletSelectorContextProvider>
      <App />
    </WalletSelectorContextProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
