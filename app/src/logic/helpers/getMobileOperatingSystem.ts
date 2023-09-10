import { context } from "../context"

export default function getMobileOperatingSystem() {
    //@ts-ignore
    var userAgent = navigator.userAgent || navigator.vendor || window.opera

    if (/windows phone/i.test(userAgent)) {
        context.os = "windows"
        return "Windows Phone"
    }

    if (/android/i.test(userAgent)) {
        context.os = "android"
        return "Android"
    }
    //@ts-ignore
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        context.os = "ios"
        return "iOS"
    }

    context.os = "ios"
}