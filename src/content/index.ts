import css from "bundle-text:./content.css";

const IFRAME_ID = "tldr-iframe";

function inject() {
    const newDiv = document.createElement("div");
    newDiv.id = IFRAME_ID + "-container";
    newDiv.innerHTML = `
    <div data-dialog-backdrop="dialog" data-dialog-backdrop-close="true"
      class="pointer-events-none fixed inset-0 z-[999999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300">
      <div data-dialog="dialog"
        class="w-full flex min-h-full h-full items-end justify-center text-center sm:items-center p-0 lg:p-4">
        <div class="w-full relative transform overflow-hidden text-left shadow-xl transition-all sm:my-8 sm:w-full sm:p-0 w-full h-full max-w-screen-xl max-h-max p-0">
        <div class="h-full w-full">
                  <iframe
                    id="${IFRAME_ID}"
                    src="${chrome.runtime.getURL("iframe/index.html")}"
                    class="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowfullscreen
                  ></iframe>
                  </div>
                </div>
        </div>
      </div>
    </div>
    `;
    document.body.appendChild(newDiv);

    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
}

function init() {
    const el = document.getElementById(IFRAME_ID);

    if (Boolean(el)) {
        return;
    }

    inject();

    const iframe = document.getElementById(IFRAME_ID) as HTMLIFrameElement;

    if (!iframe) {
        throw new Error("Something went wrong");
    }

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.type === "START") sendResponse({ type: "START", payload: "start confirmed" });
    });
}

if (document.readyState === "complete") {
    init();
    // @ts-ignore
} else if (window.attachEvent) {
    // @ts-ignore
    window.attachEvent("onload", init);
} else {
    window.addEventListener("load", init, false);
}

