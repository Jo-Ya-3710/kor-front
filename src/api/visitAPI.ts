import { getVisitorId } from "../utils/visitor";
import axios from "axios";
import {config} from "../config";

const apiHost = "http://localhost:4000";

type VisitPayload = {
    postId?: number | null;
    pageType: string;
    pagePath: string;
    pageTitle?: string | null;
};

const apiHost = config.apiHost;

export async function sendVisitLog(payload: VisitPayload): Promise<void> {
    try {
        const visitorId = getVisitorId();

        await fetch(`${apiHost}/api/visit`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                postId: payload.postId ?? null,
                pageType: payload.pageType,
                pagePath: payload.pagePath,
                pageTitle: payload.pageTitle ?? document.title,
                visitorId,
                refererUrl: document.referrer || null,
                languageCode: navigator.language || null,
            }),
        });
    } catch (error) {
        console.error("visit log send failed:", error);
    }
}

export const sendVisitLog = async (payload) => {
    const response = await axios.post(`${apiHost}/api/visits`, payload);
    return response.data;
};
