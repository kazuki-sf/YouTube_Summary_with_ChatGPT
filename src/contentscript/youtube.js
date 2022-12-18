"use strict";

import { getLangOptionsWithLink, getTranscriptHTML } from "./transcript";
import { getSearchParam } from "./searchParam";
import { getSummaryPrompt } from "./prompt";
import { copyTextToClipboard } from "./copy";


export function insertSummaryBtn() {

    // Sanitize Transcript Div
    if (document.querySelector("#yt_ai_summary_lang_select")) { document.querySelector("#yt_ai_summary_lang_select").innerHTML = ""; }
    if (document.querySelector("#yt_ai_summary_summary")) { document.querySelector("#yt_ai_summary_summary").innerHTML = ""; }
    Array.from(document.getElementsByClassName("yt_ai_summary_container")).forEach(el => { el.remove(); });

    if (!getSearchParam(window.location.href).v) { return; }

    waitForElm('#secondary.style-scope.ytd-watch-flexy').then(() => {

        // Sanitize
        Array.from(document.getElementsByClassName("yt_ai_summary_container")).forEach(el => { el.remove(); });

        // Place Script Div
        document.querySelector("#secondary.style-scope.ytd-watch-flexy").insertAdjacentHTML("afterbegin", `
        <div class="yt_ai_summary_container">
            <div id="yt_ai_summary_header" class="yt_ai_summary_header">
                <a href="https://glasp.co/youtube-summary" target="_blank" style="width: 24px;height: 24px;">
                    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.40123 27.3686C-0.44103 25.5284 -0.441033 22.5449 1.4012 20.7047L16.5971 5.52573L24.0098 12.9301L5.47818 31.4409L1.40123 27.3686Z" fill="#FF4E74"/>
                        <path d="M35.1286 24.0367L16.5972 5.5258L20.6741 1.45341C22.5164 -0.386772 25.5033 -0.386775 27.3455 1.45341L42.5415 16.6323L35.1286 24.0367Z" fill="#FFF85E"/>
                        <path d="M24.0099 35.143L42.5416 16.6323L46.6183 20.7046C48.4606 22.5448 48.4606 25.5284 46.6183 27.3686L31.4224 42.5476L24.0099 35.143Z" fill="#76FF54"/>
                        <path d="M27.3454 46.6198C25.5032 48.4601 22.5163 48.4601 20.674 46.6198L5.47815 31.4409L12.8908 24.0366L31.4223 42.5476L27.3454 46.6198Z" fill="#5C94FF"/>
                    </svg>
                </a>
                <p class="yt_ai_summary_header_text">Transcript & Summary</p>
                <div class="yt_ai_summary_header_actions">
                    <div id="yt_ai_summary_header_summary" class="yt_ai_summary_header_action_btn yt-summary-hover-el yt_ai_summary_icon" data-hover-label="View AI Summary\n(Open → Cmd + V)">
                        <svg style="filter: brightness(0.8);" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.4316 10.1814C20.7051 9.33773 20.7519 8.43698 20.5673 7.56952C20.3828 6.70206 19.9732 5.89841 19.3799 5.23923C18.7866 4.58005 18.0303 4.08853 17.187 3.81399C16.3437 3.53945 15.443 3.49156 14.5753 3.67512C13.9828 3.01454 13.2267 2.52175 12.3831 2.24638C11.5396 1.97101 10.6383 1.92278 9.7702 2.10655C8.90206 2.29031 8.09768 2.69959 7.43805 3.29315C6.77842 3.88672 6.28684 4.64361 6.01282 5.48762C5.14377 5.66999 4.33818 6.07829 3.67728 6.67133C3.01638 7.26438 2.52354 8.0212 2.24845 8.86549C1.97336 9.70978 1.92575 10.6117 2.11042 11.4802C2.2951 12.3488 2.70552 13.1533 3.30032 13.8126C3.07846 14.4869 3.00273 15.2008 3.07816 15.9066C3.1536 16.6125 3.37847 17.2942 3.73782 17.9064C4.27089 18.8322 5.08384 19.5651 6.05977 19.9997C7.03569 20.4343 8.12431 20.5483 9.16907 20.3251C9.6399 20.8539 10.2177 21.2767 10.8641 21.5654C11.5106 21.8542 12.211 22.0023 12.9191 22.0001C13.989 22.0001 15.0314 21.6606 15.8962 21.0305C16.7609 20.4005 17.4036 19.5123 17.7316 18.4939C18.4262 18.351 19.0824 18.062 19.6567 17.646C20.2311 17.2301 20.7104 16.6967 21.0628 16.0814C21.5927 15.1569 21.817 14.0886 21.7037 13.029C21.5903 11.9695 21.1451 10.9728 20.4316 10.1814V10.1814ZM12.9316 20.6939C12.0546 20.6938 11.2054 20.3864 10.5316 19.8251L10.6503 19.7564L14.6316 17.4564C14.7342 17.4018 14.8196 17.3196 14.8781 17.2191C14.9366 17.1187 14.966 17.0038 14.9628 16.8876V11.2626L16.6441 12.2376C16.6529 12.2412 16.6605 12.2472 16.6661 12.2549C16.6716 12.2627 16.6748 12.2719 16.6753 12.2814V16.9314C16.677 17.4259 16.5808 17.9159 16.3923 18.3732C16.2038 18.8304 15.9267 19.2458 15.577 19.5955C15.2273 19.9452 14.8118 20.2223 14.3546 20.4108C13.8974 20.5993 13.4074 20.6955 12.9128 20.6939H12.9316ZM4.86282 17.2564C4.4287 16.5 4.27178 15.6159 4.41907 14.7564L4.53782 14.8251L8.51907 17.1251C8.61408 17.18 8.72186 17.2089 8.83157 17.2089C8.94128 17.2089 9.04905 17.18 9.14407 17.1251L14.0128 14.3189V16.2501C14.0167 16.2579 14.0187 16.2664 14.0187 16.2751C14.0187 16.2838 14.0167 16.2923 14.0128 16.3001L9.98782 18.6251C9.56146 18.8719 9.09067 19.0322 8.60233 19.097C8.11399 19.1617 7.61767 19.1297 7.14174 19.0025C6.66581 18.8754 6.21958 18.6558 5.82855 18.3562C5.43753 18.0566 5.10937 17.6828 4.86282 17.2564V17.2564ZM3.81282 8.58137C4.25703 7.81796 4.95645 7.23585 5.78782 6.93762V11.6689C5.78462 11.7828 5.81263 11.8954 5.86881 11.9945C5.92499 12.0937 6.0072 12.1756 6.10657 12.2314L10.9503 15.0251L9.26907 16.0001C9.25083 16.0063 9.23106 16.0063 9.21282 16.0001L5.18782 13.6751C4.32883 13.1783 3.70178 12.3612 3.44406 11.4029C3.18633 10.4447 3.31893 9.42331 3.81282 8.56262V8.58137ZM17.6441 11.7939L12.7816 8.96887L14.4628 8.00012C14.4711 7.99448 14.4809 7.99146 14.4909 7.99146C14.501 7.99146 14.5108 7.99448 14.5191 8.00012L18.5441 10.3251C19.1587 10.6811 19.6596 11.2043 19.9885 11.8339C20.3174 12.4635 20.4607 13.1735 20.4018 13.8813C20.3428 14.5892 20.0841 15.2657 19.6556 15.8322C19.2272 16.3988 18.6466 16.8319 17.9816 17.0814V12.3501C17.9779 12.2362 17.9449 12.1252 17.8858 12.0277C17.8267 11.9303 17.7434 11.8497 17.6441 11.7939V11.7939ZM19.3191 9.29387L19.2003 9.21887L15.2253 6.90637C15.1267 6.84553 15.0131 6.81331 14.8972 6.81331C14.7813 6.81331 14.6677 6.84553 14.5691 6.90637L9.70657 9.71262V7.75012C9.70163 7.74157 9.69903 7.73187 9.69903 7.72199C9.69903 7.71212 9.70163 7.70242 9.70657 7.69387L13.7378 5.37512C14.3547 5.01964 15.0599 4.8471 15.7712 4.87766C16.4825 4.90822 17.1704 5.14063 17.7545 5.54771C18.3385 5.95479 18.7947 6.51972 19.0695 7.17646C19.3444 7.83321 19.4266 8.55462 19.3066 9.25637L19.3191 9.29387ZM8.78782 12.7189L7.10032 11.7501C7.08443 11.7376 7.07339 11.7199 7.06907 11.7001V7.06262C7.0691 6.34996 7.2722 5.65206 7.65458 5.05068C8.03697 4.44929 8.5828 3.96931 9.22815 3.66697C9.87349 3.36463 10.5916 3.25244 11.2984 3.34354C12.0053 3.43464 12.6715 3.72527 13.2191 4.18137L13.1128 4.25012L9.11907 6.55012C9.01641 6.60472 8.93103 6.68688 8.87251 6.78736C8.81399 6.88783 8.78466 7.00264 8.78782 7.11887V12.7189ZM9.70032 10.7501L11.8628 9.50012L14.0316 10.7501V13.2501L11.8628 14.5001L9.69407 13.2501L9.70032 10.7501Z" fill="#828282"/>
                        </svg>
                    </div>
                    <div id="yt_ai_summary_header_track" class="yt_ai_summary_header_action_btn yt-summary-hover-el" data-hover-label="Jump to Current Time">
                        <svg style="filter: brightness(0.9);" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="6.25" stroke="#828282" stroke-width="1.5"/>
                            <rect x="3.19995" y="11.3999" width="5" height="1.2" rx="0.6" fill="#828282"/>
                            <rect x="15.7" y="11.3999" width="5" height="1.2" rx="0.6" fill="#828282"/>
                            <rect x="11.3999" y="8" width="5" height="1.2" rx="0.6" transform="rotate(-90 11.3999 8)" fill="#828282"/>
                            <rect x="11.3999" y="21" width="5" height="1.2" rx="0.6" transform="rotate(-90 11.3999 21)" fill="#828282"/>
                        </svg>
                    </div>
                    <div id="yt_ai_summary_header_copy" class="yt_ai_summary_header_action_btn yt-summary-hover-el" data-hover-label="Copy Transcript">
                        <svg style="filter: brightness(0.95);" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 6.6V5C7 4.44772 7.44772 4 8 4H18C18.5523 4 19 4.44772 19 5V16C19 16.5523 18.5523 17 18 17H16.2308" stroke="#828282" stroke-width="1.5"/>
                            <rect x="4.75" y="6.75" width="11.5" height="13.5" rx="1.25" stroke="#828282" stroke-width="1.5"/>
                        </svg>
                    </div>
                    <div style="filter: brightness(0.9);" id="yt_ai_summary_header_toggle" class="yt_ai_summary_header_action_btn">
                        <svg width="24" height="24" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.2447 9.9588C16.5376 9.6659 16.5376 9.19103 16.2447 8.89814C15.9518 8.60524 15.4769 8.60524 15.184 8.89814L16.2447 9.9588ZM6.81611 8.89814C6.52322 8.60524 6.04835 8.60524 5.75545 8.89814C5.46256 9.19103 5.46256 9.6659 5.75545 9.9588L6.81611 8.89814ZM11.7425 14.461L16.2447 9.9588L15.184 8.89814L10.6819 13.4003L11.7425 14.461ZM11.3183 13.4003L6.81611 8.89814L5.75545 9.9588L10.2576 14.461L11.3183 13.4003ZM10.6819 13.4003C10.8576 13.2246 11.1425 13.2246 11.3183 13.4003L10.2576 14.461C10.6677 14.871 11.3325 14.871 11.7425 14.461L10.6819 13.4003Z" fill="#8B8B8B"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div id="yt_ai_summary_body" class="yt_ai_summary_body">
                <div id="yt_ai_summary_lang_select" class="yt_ai_summary_lang_select"></div>
                <div id="yt_ai_summary_text" class="yt_ai_summary_text"></div>
            </div>
        </div>`);

        // Event Listener: Hover Label
        Array.from(document.getElementsByClassName("yt-summary-hover-el")).forEach(el => {
            const label = el.getAttribute("data-hover-label");
            if (!label) { return; }
            el.addEventListener("mouseenter", (e) => {
                e.stopPropagation();
                e.preventDefault();
                Array.from(document.getElementsByClassName("yt_ai_summary_header_hover_label")).forEach(el => { el.remove(); })
                el.insertAdjacentHTML("beforeend", `<div class="yt_ai_summary_header_hover_label">${label.replace(/\n+/g, `<br />`)}</div>`);
            })
            el.addEventListener("mouseleave", (e) => {
                e.stopPropagation();
                e.preventDefault();
                Array.from(document.getElementsByClassName("yt_ai_summary_header_hover_label")).forEach(el => { el.remove(); })
            })
        })

        // Event Listener: Copy Transcript
        document.querySelector("#yt_ai_summary_header_copy").addEventListener("click", (e) => {
            e.stopPropagation();
            const videoId = getSearchParam(window.location.href).v;
            copyTranscript(videoId);
        })

        // Event Listener: AI Summary
        document.querySelector("#yt_ai_summary_header_summary").addEventListener("click", (e) => {
            e.stopPropagation();
            copyTranscriptAndPrompt();
            setTimeout(() => {
                window.open("https://chat.openai.com/chat", "_blank");
            }, 500);
        })

        // Event Listener: Jump to Current Timestamp
        document.querySelector("#yt_ai_summary_header_track").addEventListener("click", (e) => {
            e.stopPropagation();
            scrollIntoCurrTimeDiv();
        })

        // Event Listener: Toggle Transcript Body
        document.querySelector("#yt_ai_summary_header").addEventListener("click", async (e) => {

            const videoId = getSearchParam(window.location.href).v;
            sanitizeWidget();

            if (!isWidgetOpen()) { return; }

            // Get Transcript Language Options & Create Language Select Btns
            const langOptionsWithLink = await getLangOptionsWithLink(videoId);
            if (!langOptionsWithLink) {
                noTranscriptionAlert();
                return;
            }
            createLangSelectBtns(langOptionsWithLink);

            // Create Transcript HTML & Add Event Listener
            const transcriptHTML = await getTranscriptHTML(langOptionsWithLink[0].link, videoId);
            document.querySelector("#yt_ai_summary_text").innerHTML = transcriptHTML;
            evtListenerOnTimestamp();

            // Event Listener: Language Select Btn Click
            evtListenerOnLangBtns(langOptionsWithLink, videoId);

        })

    });

}

function sanitizeWidget() {
    // Sanitize Transcript Div
    document.querySelector("#yt_ai_summary_lang_select").innerHTML = "";
    document.querySelector("#yt_ai_summary_text").innerHTML = "";

    // Height Adjust
    document.querySelector("#yt_ai_summary_body").style.maxHeight = window.innerHeight - 160 + "px";
    document.querySelector("#yt_ai_summary_text").innerHTML = `
    <svg class="yt_ai_summary_loading" style="display: block;width: 48px;margin: 40px auto;" width="48" height="48" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 36C59.9995 36 37 66 37 99C37 132 61.9995 163.5 100 163.5C138 163.5 164 132 164 99" stroke="#5C94FF" stroke-width="6"/>
    </svg>`;

    // Toggle Class List
    document.querySelector("#yt_ai_summary_body").classList.toggle("yt_ai_summary_body_show");
    document.querySelector("#yt_ai_summary_header_copy").classList.toggle("yt_ai_summary_header_icon_show");
    document.querySelector("#yt_ai_summary_header_summary").classList.toggle("yt_ai_summary_header_icon_show");
    document.querySelector("#yt_ai_summary_header_track").classList.toggle("yt_ai_summary_header_icon_show");
    document.querySelector("#yt_ai_summary_header_toggle").classList.toggle("yt_ai_summary_header_toggle_rotate");
}

function isWidgetOpen() {
    return document.querySelector("#yt_ai_summary_body").classList.contains("yt_ai_summary_body_show");
}

function noTranscriptionAlert() {
    document.querySelector("#yt_ai_summary_text").innerHTML = `
        <div style="margin: 40px auto;text-align: center;">
            <p>No Transcription Available... 😢</p>
            <p>Try <a href="https://huggingface.co/spaces/jeffistyping/Youtube-Whisperer" target="_blank">Huggingface Youtube Whisperer</a> to transcribe!</p>
        </div>
    `;
}

function createLangSelectBtns(langOptionsWithLink) {
    document.querySelector("#yt_ai_summary_lang_select").innerHTML = Array.from(langOptionsWithLink).map((langOption, index) => {
        return `<button class="yt_ai_summary_lang ${(index == 0) ? "yt_ai_summary_lange_selected" : ""}" data-yt-transcript-lang="${langOption.language}">${langOption.language}</button>`;
    }).join("");
}

function evtListenerOnLangBtns(langOptionsWithLink, videoId) {
    Array.from(document.getElementsByClassName("yt_ai_summary_lang")).forEach((langBtn) => {
        langBtn.addEventListener("click", async (e) => {
            const lang = e.target.getAttribute("data-yt-transcript-lang");
            const targetBtn = document.querySelector(`.yt_ai_summary_lang[data-yt-transcript-lang="${lang}"]`);
            const link = langOptionsWithLink.find((langOption) => langOption.language === lang).link;
            // Create Transcript HTML & Event Listener
            const transcriptHTML = await getTranscriptHTML(link, videoId);
            document.querySelector("#yt_ai_summary_text").innerHTML = transcriptHTML;
            evtListenerOnTimestamp()
            targetBtn.classList.add("yt_ai_summary_lange_selected");
            Array.from(document.getElementsByClassName("yt_ai_summary_lang")).forEach((langBtn) => {
                if (langBtn !== targetBtn) { langBtn.classList.remove("yt_ai_summary_lange_selected"); }
            })
        })
    })
}

function getTYCurrentTime() {
    return document.querySelector("#movie_player > div.html5-video-container > video").currentTime ?? 0;
}

function getTYEndTime() {
    return document.querySelector("#movie_player > div.html5-video-container > video").duration ?? 0;
}

function scrollIntoCurrTimeDiv() {
    const currTime = getTYCurrentTime();
    Array.from(document.getElementsByClassName("yt_ai_summary_transcript_text_timestamp")).forEach((el, i, arr) => {
        const startTimeOfEl = el.getAttribute("data-start-time");
        const startTimeOfNextEl = (i === arr.length-1) ? getTYEndTime() : arr[i+1].getAttribute("data-start-time") ?? 0;
        if (currTime >= startTimeOfEl && currTime < startTimeOfNextEl) {
            el.scrollIntoView({ behavior: 'auto', block: 'start' });
            document.querySelector("#secondary > div.yt_ai_summary_container").scrollIntoView({ behavior: 'auto', block: 'end' });
        }
    })
}

function evtListenerOnTimestamp() {
    Array.from(document.getElementsByClassName("yt_ai_summary_transcript_text_timestamp")).forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const starttime = el.getAttribute("data-start-time");
            const ytVideoEl = document.querySelector("#movie_player > div.html5-video-container > video");
            ytVideoEl.currentTime = starttime;
            ytVideoEl.play();
        })
    })
}

function copyTranscript(videoId) {
    let contentBody = "";
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    contentBody += `# ${document.title}\n`;
    contentBody += `${url}\n`;
    contentBody += `![](${url})\n`;
    contentBody += `## Transcript:\n`;
    Array.from(document.getElementById("yt_ai_summary_text").children).forEach(el => {
        if (!el) { return; }
        if (el.children.length < 2) { return; }
        const timestamp = el.querySelector(".yt_ai_summary_transcript_text_timestamp").innerText;
        const timestampHref = el.querySelector(".yt_ai_summary_transcript_text_timestamp").getAttribute("data-timestamp-href");
        const text = el.querySelector(".yt_ai_summary_transcript_text").innerText;
        contentBody += `- ([${timestamp}](${`https://www.youtube.com${timestampHref}`})) ${text}\n`;
    })
    copyTextToClipboard(contentBody);
}

function copyTranscriptAndPrompt() {
    const textEls = document.getElementsByClassName("yt_ai_summary_transcript_text");
    const text = Array.from(textEls).map((textEl) => { return textEl.textContent.trim(); }).join(" ");
    const prompt = getSummaryPrompt(text);
    copyTextToClipboard(prompt);
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}