import { useEffect } from "react";
import logo from "../images/icon256.png";
import { v4 as uuidv4 } from "uuid";

let token = uuidv4();

export const App = () => {
    useEffect(() => {
        (async () => {
            const tab = await chrome.tabs.getCurrent();
            chrome.tabs.sendMessage(tab.id, { type: "REGISTER", payload: token });
        })();
    }, []);

    useEffect(() => {
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            if (request.token === token) {
                console.log(request);
            }
        });
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

