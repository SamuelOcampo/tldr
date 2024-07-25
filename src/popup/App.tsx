import logo from "../images/icon256.png";

export const App = () => {
    const handleClick = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["content/index.js"],
            });
        });
    }

    return (
        <>
            <img src={logo} alt="Logo" />
            <h1>Popup Window</h1>
            <button onClick={handleClick}>Inject Content Script</button>

            <div>{chrome.runtime.getManifest().version}</div>
        </>
    );
};

