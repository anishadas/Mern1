import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store, persistor } from "./store/store";
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
// import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(

    <GoogleOAuthProvider clientId="959818041316-5ovvcs1klpkcm8uiq895jk3uvmorblpn.apps.googleusercontent.com">
        <Provider store={store}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
                <App />
            {/* </PersistGate> */}
        </Provider>
    </GoogleOAuthProvider>



);
