"use client";

import { useEffect } from "react";

export default function TawkChat() {
    useEffect(() => {
        // Initialize Tawk.to
        var Tawk_API = (window as any).Tawk_API || {};
        var Tawk_LoadStart = new Date();

        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];

        s1.async = true;
        s1.src = 'https://embed.tawk.to/65b64ad60ff6374032c5c606/1hl818m9o';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');

        if (s0 && s0.parentNode) {
            s0.parentNode.insertBefore(s1, s0);
        }
    }, []); // Run only once when component mounts

    return null; // This component doesn't render anything
}