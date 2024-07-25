import { useEffect } from "react";
import logo from "../images/icon256.png";

export const App = () => {
    useEffect(() => {
        (async () => {
            const tab = await chrome.tabs.getCurrent();
            const response = await chrome.tabs.sendMessage(tab.id, { type: "START" });
            // do something with response here, not outside the function
            console.log(response);
        })();
    }, []);

    return (
        <>
            <img src={logo} alt="Logo" />
            <h1>Popup Window</h1>
            <button>Hello from iframe 12</button>

            <div>{chrome.runtime.getManifest().version}</div>
        </>
    );
};

