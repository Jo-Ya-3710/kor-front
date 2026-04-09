import {useEffect} from "react";
import {sendVisitLog} from "../api/visitApi";
import {getOrCreateVisitorId} from "../utils/visitor";

export default function useVisitLogger({
                                           postId = null,
                                           pageType,
                                           pagePath,
                                           pageTitle = "",
                                       }) {
    useEffect(() => {
        const logVisit = async () => {
            try {
                const visitorId = getOrCreateVisitorId();

                const payload = {
                    postId,
                    pageType,
                    pagePath,
                    pageTitle,
                    visitorId,
                    refererUrl: document.referrer || "",
                    languageCode: navigator.language || "ko",
                };

                const result = await sendVisitLog(payload);
                console.log("visit log result:", result);
            } catch (error) {
                console.error(
                    "visit log failed:",
                    error.response?.data || error.message
                );
            }
        };

        if (!pageType || !pagePath) return;

        logVisit();
    }, [postId, pageType, pagePath, pageTitle]);
}