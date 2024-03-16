import { ReactNode, useState } from "react";
import { meta } from "../stores";
import { appWindow } from "@tauri-apps/api/window";

function ControlBar(props: {
    os: string
    className?: string
    children?: ReactNode
}) {
    const [isMaximize, setMaximize] = useState(false)

    function onClose() {
        appWindow.close()
    }
    
    function onMinimize() {
        appWindow.minimize()
    }
    
    function onMaximize() {
        if (!isMaximize){
            document.getElementById("fullscreen-svg")?.classList.add("hidden")
            appWindow.setFullscreen(true)
            document.getElementById("unfullscreen-svg")?.classList.remove("hidden")
            setMaximize(true)
        } else {
            document.getElementById("fullscreen-svg")?.classList.remove("hidden")
            appWindow.setFullscreen(false)
            document.getElementById("unfullscreen-svg")?.classList.add("hidden")
            setMaximize(false)
        }
    }
    return (
        <div>
            {props.os === "darwin" && 
                <div className={props.className+" titlebar-stoplight grow-0 inline-flex after:content-['_'] group after:table after:clear-both"}>
                    <div className="titlebar-close w-3 h-3 leading-[0] mx-1 my-1.5 rounded-[50%] border bg-[#ff5f57] ml-1.5 border-solid border-[#e2463f] active:bg-[#bf4943] active:border-[#ad3934]" onClick={() => onClose()}>
                        <svg className="w-1.5 h-1.5 opacity-0 ml-0.5 mt-0.5 group-hover:opacity-100" x="0px" y="0px" viewBox="0 0 6.4 6.4">
                            <polygon fill="#4d0000" points="6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2"></polygon>
                        </svg>
                    </div>
                    <div className="titlebar-minimize w-3 h-3 leading-[0] mx-1 my-1.5 rounded-[50%] border bg-[#ffbd2e] border-solid border-[#e1a116] active:border-[#ad7d15] active:bg-[#bf9123]" onClick={() => onMinimize()}>
                        <svg className="w-2 h-2 opacity-0 ml-px mt-px group-hover:opacity-100" x="0px" y="0px" viewBox="0 0 8 1.1">
                            <rect fill="#995700" width="8" height="1.1"></rect>
                        </svg>
                    </div>
                    <div id="titlebar-fullscreen" className="w-3 h-3 leading-[0] mx-1 my-1.5 rounded-[50%] border rotate-90 bg-[#28c940] border-solid border-[#00000030] active:border-[#128622] active:bg-[#1f9a31]" onClick={() => onMaximize()}>
                        <svg id="fullscreen-svg" className="w-1.5 h-1.5 opacity-0 ml-0.5 mt-0.5 group-hover:opacity-100" x="0px" y="0px" viewBox="0 0 6 6">
                            <path fill="#006400" d="M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z"></path>
                            <path fill="#006400" d="M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z"></path>
                        </svg>
                        <svg id="unfullscreen-svg" className="w-2.5 h-2.5 opacity-0 ml-0 mt-0 group-hover:opacity-100 hidden" x="0px" y="0px" viewBox="0 0 6 6">
                            <path fill="#006400" d="M2.6,3h-2.4L3,5.8V3.4C2.8,3.6,2.7,3.5,2.6,3z"></path>
                            <path fill="#006400" d="M3.4,3h2.4L3,0.2V2.6C3.24,2.688 3.16,2.836 3.4,3z"></path>
                        </svg>
                    </div>
                    <div className="text-slate-950 px-2 dark:text-slate-50">
                        {props.children}
                    </div>
                </div>
            }
            {props.os != "darwin" &&
                <div className="inline-flex">
                    <div className="text-slate-950 px-2 dark:text-slate-50">
                        {props.children}
                    </div>
                    <div className="fixed top-0 right-0">
                        <button className="w-12 h-8 hover:bg-slate-500" onClick={() => onMinimize()}>
                            <svg x="0px" y="0px" viewBox="0 0 15 15" className="w-6 h-5 m-auto py-2.5 px-1">
                                <rect fill="#ffffff" width="15" height="1"/>
                            </svg>
                        </button>
                        <button className="w-12 h-8 hover:bg-slate-500" onClick={() => onMaximize()}>
                            <svg id="fullscreen-svg" x="0px" y="0px" viewBox="0 0 10.2 10.1" className="w-6 h-5 m-auto p-1">
                                <path
                                    fill="#ffffff"
                                    d="M0,0v10.1h10.2V0H0z M9.2,9.2H1.1V1h8.1V9.2z"
                                />
                            </svg>
                            <svg id="unfullscreen-svg" x="0px" y="0px" viewBox="0 0 10.2 10.2" className="w-6 h-5 m-auto p-1 hidden">
                                <path
                                    fill="#ffffff"
                                    d="M2.1,0v2H0v8.1h8.2v-2h2V0H2.1z M7.2,9.2H1.1V3h6.1V9.2z M9.2,7.1h-1V2H3.1V1h6.1V7.1z"
                                />
                            </svg>
                        </button>
                        <button className="w-12 h-8 rounded-tr-[10px] hover:bg-red-600" onClick={() => onClose()}>
                            <svg x="0px" y="0px" viewBox="0 0 15.15 15.3" className="w-6 h-5 m-auto p-1">
                                <polygon
                                    fill="#ffffff"
                                    points="15,1.05 14.25,0 7.5,6.75 1.05,0 0,1.05 6.75,7.5 0,14.25 1.05,15 7.5,8.25 14.25,15 15,14.25 8.25,7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default function TitleBar(props: {
    className?: string
    children?: ReactNode
}) {
    return (
        <div className={props.className+" px-1 py-0 flex select-none items-center h-16 w-screen after:content-['_'] after:table after:clear-both bg-slate-100 rounded-t-[12px] cursor-default dark:bg-slate-900"} data-tauri-drag-region>
            <ControlBar os={meta.osPlatform} />
            <div className="text-slate-950 font-bold dark:text-slate-50">
                {props.children}
            </div>
        </div>
    )
}