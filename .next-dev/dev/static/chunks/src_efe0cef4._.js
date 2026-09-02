(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/auth/auth-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthModal",
    ()=>AuthModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AuthModal(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "2daad267e178a0ca0def6ca7703aedeb9fe56ab50a55fb1dc77db21a76e6772a") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2daad267e178a0ca0def6ca7703aedeb9fe56ab50a55fb1dc77db21a76e6772a";
    }
    const { isOpen, onClose } = t0;
    let t1;
    let t2;
    if ($[1] !== isOpen || $[2] !== onClose) {
        t1 = ({
            "AuthModal[useEffect()]": ()=>{
                if (!isOpen) {
                    return;
                }
                const handleEscape = {
                    "AuthModal[useEffect() > handleEscape]": (event)=>{
                        if (event.key === "Escape") {
                            onClose();
                        }
                    }
                }["AuthModal[useEffect() > handleEscape]"];
                document.addEventListener("keydown", handleEscape);
                return ()=>document.removeEventListener("keydown", handleEscape);
            }
        })["AuthModal[useEffect()]"];
        t2 = [
            isOpen,
            onClose
        ];
        $[1] = isOpen;
        $[2] = onClose;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    if (!isOpen) {
        return null;
    }
    let t3;
    if ($[5] !== onClose) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Close account dialog",
            className: "absolute inset-0 bg-black/50",
            type: "button",
            onClick: onClose
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        $[5] = onClose;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative hidden min-h-[520px] sm:block",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    fill: true,
                    alt: "A complete technology workspace",
                    className: "object-cover",
                    sizes: "320px",
                    src: "/images/workspace-after-v2.webp"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/auth-modal.tsx",
                    lineNumber: 66,
                    columnNumber: 66
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute inset-0 bg-gradient-to-t from-black/65 to-black/5"
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/auth-modal.tsx",
                    lineNumber: 66,
                    columnNumber: 202
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "absolute bottom-7 left-7 right-7 text-3xl font-light uppercase leading-tight tracking-[-0.035em] text-white",
                    children: "Keep building the space where your best work happens."
                }, void 0, false, {
                    fileName: "[project]/src/components/auth/auth-modal.tsx",
                    lineNumber: 66,
                    columnNumber: 280
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            "aria-hidden": "true",
            size: 19,
            strokeWidth: 1.5
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 73,
            columnNumber: 10
        }, this);
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== onClose) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Close account dialog",
            className: "absolute right-3 top-3 flex size-11 items-center justify-center",
            type: "button",
            onClick: onClose,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 80,
            columnNumber: 10
        }, this);
        $[9] = onClose;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    let t8;
    let t9;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-warm text-[10px] font-semibold uppercase tracking-[0.18em]",
            children: "Your workspace account"
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 90,
            columnNumber: 10
        }, this);
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "mt-4 pr-10 text-4xl font-light uppercase tracking-[-0.04em]",
            id: "auth-modal-title",
            children: "Make it yours."
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 91,
            columnNumber: 10
        }, this);
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-4 text-sm leading-7 text-black/55",
            children: "Save your details, follow deliveries and return to the workspace pieces you are considering."
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[11] = t7;
        $[12] = t8;
        $[13] = t9;
    } else {
        t7 = $[11];
        t8 = $[12];
        t9 = $[13];
    }
    let t10;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
            "aria-hidden": "true",
            size: 17
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 103,
            columnNumber: 11
        }, this);
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] !== onClose) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "bg-warm flex min-h-14 items-center justify-between rounded-full px-7 text-[11px] font-semibold uppercase tracking-[0.13em] text-white transition-colors hover:bg-[#7f492d]",
            href: "/auth/login",
            onClick: onClose,
            children: [
                "Sign in",
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 110,
            columnNumber: 11
        }, this);
        $[15] = onClose;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
            "aria-hidden": "true",
            size: 17
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 118,
            columnNumber: 11
        }, this);
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    let t13;
    if ($[18] !== onClose) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "border-ink flex min-h-14 items-center justify-between rounded-full border px-7 text-[11px] font-semibold uppercase tracking-[0.13em] transition-colors hover:bg-[#f1f1f1]",
            href: "/auth/register",
            onClick: onClose,
            children: [
                "Create account",
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 125,
            columnNumber: 11
        }, this);
        $[18] = onClose;
        $[19] = t13;
    } else {
        t13 = $[19];
    }
    let t14;
    if ($[20] !== t11 || $[21] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-8 space-y-3",
            children: [
                t11,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[20] = t11;
        $[21] = t13;
        $[22] = t14;
    } else {
        t14 = $[22];
    }
    let t15;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-7 border-t border-black/15 pt-5 text-[11px] leading-5 text-black/45",
            children: "Secure account access powered by Supabase."
        }, void 0, false, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 142,
            columnNumber: 11
        }, this);
        $[23] = t15;
    } else {
        t15 = $[23];
    }
    let t16;
    if ($[24] !== t14 || $[25] !== t6) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "relative z-10 grid w-full max-w-3xl overflow-hidden bg-white sm:grid-cols-[0.9fr_1.1fr]",
            children: [
                t4,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative p-7 sm:p-10",
                    children: [
                        t6,
                        t7,
                        t8,
                        t9,
                        t14,
                        t15
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/auth/auth-modal.tsx",
                    lineNumber: 149,
                    columnNumber: 124
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 149,
            columnNumber: 11
        }, this);
        $[24] = t14;
        $[25] = t6;
        $[26] = t16;
    } else {
        t16 = $[26];
    }
    let t17;
    if ($[27] !== t16 || $[28] !== t3) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-labelledby": "auth-modal-title",
            "aria-modal": "true",
            className: "fixed inset-0 z-[90] flex items-center justify-center p-4",
            role: "dialog",
            children: [
                t3,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/auth/auth-modal.tsx",
            lineNumber: 158,
            columnNumber: 11
        }, this);
        $[27] = t16;
        $[28] = t3;
        $[29] = t17;
    } else {
        t17 = $[29];
    }
    return t17;
}
_s(AuthModal, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = AuthModal;
var _c;
__turbopack_context__.k.register(_c, "AuthModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiBaseUrl",
    ()=>apiBaseUrl
]);
const apiBaseUrl = '/api';
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient,
    "publicApiClient",
    ()=>publicApiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/config.ts [app-client] (ecmascript)");
;
;
function createClient() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].create({
        baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiBaseUrl"],
        timeout: 10_000,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
const apiClient = createClient();
const publicApiClient = createClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getApiErrorMessage",
    ()=>getApiErrorMessage
]);
function getApiErrorMessage(error, fallback) {
    const apiError = error;
    return apiError.response?.data?.message || apiError.message || fallback;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/guest-token.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ensureGuestToken",
    ()=>ensureGuestToken,
    "getGuestToken",
    ()=>getGuestToken,
    "removeGuestToken",
    ()=>removeGuestToken
]);
const GUEST_TOKEN_KEY = 'picknquicks_guest_token';
function getGuestToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem(GUEST_TOKEN_KEY);
}
function setGuestToken(token) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.setItem(GUEST_TOKEN_KEY, token);
}
function removeGuestToken() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    localStorage.removeItem(GUEST_TOKEN_KEY);
}
function ensureGuestToken() {
    const existing = getGuestToken();
    if (existing) {
        return existing;
    }
    const newToken = crypto.randomUUID();
    setGuestToken(newToken);
    return newToken;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cart/cart-helpers.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentCartRequestConfig",
    ()=>getCurrentCartRequestConfig
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$guest$2d$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/guest-token.ts [app-client] (ecmascript)");
;
function getCartRequestConfig(guestToken) {
    return guestToken ? {
        headers: {
            'X-Guest-Token': guestToken
        }
    } : {};
}
function getCurrentCartRequestConfig() {
    return getCartRequestConfig((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$guest$2d$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureGuestToken"])());
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cart/cart.queries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cartKeys",
    ()=>cartKeys,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart-helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$guest$2d$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/guest-token.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
const cartKeys = {
    all: [
        'cart'
    ],
    details: ()=>[
            ...cartKeys.all,
            'detail'
        ],
    detail: (identity)=>[
            ...cartKeys.details(),
            identity ?? 'current'
        ]
};
async function fetchCart() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get('/cart', (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentCartRequestConfig"])());
    if (!data.data) {
        throw new Error(data.message || 'Cart data was not returned');
    }
    return data.data;
}
function useCart(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "7909c4e409615675bf81535ae75cbc837888e97e007833f1a36ddc1d57628861") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7909c4e409615675bf81535ae75cbc837888e97e007833f1a36ddc1d57628861";
    }
    const enabled = t0 === undefined ? true : t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$guest$2d$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ensureGuestToken"])();
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const identity = `session:${t1}`;
    let t2;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = cartKeys.detail(identity);
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== enabled) {
        t3 = {
            queryKey: t2,
            queryFn: fetchCart,
            enabled,
            staleTime: 0,
            gcTime: 1800000,
            refetchOnWindowFocus: true,
            retry: 1
        };
        $[3] = enabled;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s(useCart, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cart/cart.mutations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAddToCart",
    ()=>useAddToCart,
    "useClearCart",
    ()=>useClearCart,
    "useRemoveFromCart",
    ()=>useRemoveFromCart,
    "useUpdateCartItem",
    ()=>useUpdateCartItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/errors.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart-helpers.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart.queries.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
function requestConfig() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2d$helpers$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCurrentCartRequestConfig"])();
}
function useCartMutationSuccess() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    let t0;
    if ($[1] !== queryClient) {
        t0 = (cart)=>{
            queryClient.setQueriesData({
                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartKeys"].details()
            }, cart);
        };
        $[1] = queryClient;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return t0;
}
_s(useCartMutationSuccess, "4R+oYVB2Uc11P7bp1KcuhpkfaTw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"]
    ];
});
function useAddToCart() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740";
    }
    const syncCart = useCartMutationSuccess();
    let t0;
    if ($[1] !== syncCart) {
        t0 = {
            mutationFn: _temp,
            onSuccess: (cart)=>{
                syncCart(cart);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Added to cart");
            },
            onError: _temp2
        };
        $[1] = syncCart;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s1(useAddToCart, "qMrx3axmvgOb/73/mf+fRXFldfE=", false, function() {
    return [
        useCartMutationSuccess,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp2(error) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiErrorMessage"])(error, "Failed to add item to cart"));
}
async function _temp(t0) {
    const { productId, quantity } = t0;
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("/cart/items", {
        productId,
        quantity
    }, requestConfig());
    if (!data.data) {
        throw new Error(data.message || "Updated cart was not returned");
    }
    return data.data;
}
function useUpdateCartItem() {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740";
    }
    const syncCart = useCartMutationSuccess();
    let t0;
    if ($[1] !== syncCart) {
        t0 = {
            mutationFn: _temp3,
            onSuccess: syncCart,
            onError: _temp4
        };
        $[1] = syncCart;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s2(useUpdateCartItem, "qMrx3axmvgOb/73/mf+fRXFldfE=", false, function() {
    return [
        useCartMutationSuccess,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp4(error) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiErrorMessage"])(error, "Failed to update cart"));
}
async function _temp3(t0) {
    const { cartItemId, quantity } = t0;
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].put(`/cart/items/${cartItemId}`, {
        quantity
    }, requestConfig());
    if (!data.data) {
        throw new Error(data.message || "Updated cart was not returned");
    }
    return data.data;
}
function useRemoveFromCart() {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740";
    }
    const syncCart = useCartMutationSuccess();
    let t0;
    if ($[1] !== syncCart) {
        t0 = {
            mutationFn: _temp5,
            onSuccess: syncCart,
            onError: _temp6
        };
        $[1] = syncCart;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s3(useRemoveFromCart, "qMrx3axmvgOb/73/mf+fRXFldfE=", false, function() {
    return [
        useCartMutationSuccess,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp6(error) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiErrorMessage"])(error, "Failed to remove item"));
}
async function _temp5(cartItemId) {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete(`/cart/items/${cartItemId}`, {
        ...requestConfig()
    });
    if (!data.data) {
        throw new Error(data.message || "Updated cart was not returned");
    }
    return data.data;
}
function useClearCart() {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "57b3bbe213e184feef72d5c5f0cced2a349d4653ef339df1bfc1e5843b1e7740";
    }
    const syncCart = useCartMutationSuccess();
    let t0;
    if ($[1] !== syncCart) {
        t0 = {
            mutationFn: _temp7,
            onSuccess: (cart)=>{
                syncCart(cart);
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success("Cart cleared");
            },
            onError: _temp8
        };
        $[1] = syncCart;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"])(t0);
}
_s4(useClearCart, "qMrx3axmvgOb/73/mf+fRXFldfE=", false, function() {
    return [
        useCartMutationSuccess,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMutation"]
    ];
});
function _temp8(error) {
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getApiErrorMessage"])(error, "Failed to clear cart"));
}
async function _temp7() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].delete("/cart", {
        ...requestConfig()
    });
    if (!data.data) {
        throw new Error(data.message || "Updated cart was not returned");
    }
    return data.data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/currency.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatPriceKsh",
    ()=>formatPriceKsh
]);
function formatPriceKsh(value) {
    return `KSh ${value.toLocaleString('en-KE', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    })}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils/media.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "resolveAvatarUrl",
    ()=>resolveAvatarUrl,
    "resolveMediaUrl",
    ()=>resolveMediaUrl
]);
function resolveMediaUrl(mediaUrl) {
    if (!mediaUrl) {
        return undefined;
    }
    if (/^https?:\/\//i.test(mediaUrl)) {
        return mediaUrl;
    }
    if (mediaUrl.startsWith('/')) {
        return mediaUrl;
    }
    const clean = mediaUrl.replace(/^\/+/, '');
    return `/${clean}`;
}
function resolveAvatarUrl(avatarUrl) {
    if (avatarUrl && /^https?:\/\//i.test(avatarUrl)) {
        return avatarUrl;
    }
    const clean = avatarUrl?.replace(/^\/+/, '');
    if (!clean) {
        return undefined;
    }
    return `/${clean}`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/cart/cart-item.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartItem",
    ()=>CartItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart.mutations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/media.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
function CartItem(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(75);
    if ($[0] !== "b446256aee34980d4639f8522857ed9ce1bf4264f4170f9c2dbdbddbd0f2ca83") {
        for(let $i = 0; $i < 75; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b446256aee34980d4639f8522857ed9ce1bf4264f4170f9c2dbdbddbd0f2ca83";
    }
    const { item } = t0;
    const updateItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateCartItem"])();
    const removeItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRemoveFromCart"])();
    let t1;
    if ($[1] !== item.productImageUrl) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMediaUrl"])(item.productImageUrl);
        $[1] = item.productImageUrl;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const imageUrl = t1;
    const isUpdating = updateItem.isPending || removeItem.isPending;
    let t2;
    if ($[3] !== item.availableStock || $[4] !== item.id || $[5] !== updateItem) {
        t2 = ({
            "CartItem[updateQuantity]": (quantity)=>{
                if (quantity >= 1 && quantity <= item.availableStock) {
                    updateItem.mutate({
                        cartItemId: item.id,
                        quantity
                    });
                }
            }
        })["CartItem[updateQuantity]"];
        $[3] = item.availableStock;
        $[4] = item.id;
        $[5] = updateItem;
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    const updateQuantity = t2;
    const t3 = `View ${item.productName}`;
    const t4 = `/products/${item.productSlug}`;
    let t5;
    if ($[7] !== imageUrl || $[8] !== item.productName) {
        t5 = imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fill: true,
            alt: item.productName,
            className: "object-cover",
            sizes: "104px",
            src: imageUrl
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 61,
            columnNumber: 21
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "flex h-full items-center justify-center text-2xl text-black/30",
            children: item.productName.charAt(0)
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 61,
            columnNumber: 122
        }, this);
        $[7] = imageUrl;
        $[8] = item.productName;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== t3 || $[11] !== t4 || $[12] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            "aria-label": t3,
            className: "bg-sand relative aspect-square overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
            href: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        $[10] = t3;
        $[11] = t4;
        $[12] = t5;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    const t7 = `/products/${item.productSlug}`;
    let t8;
    if ($[14] !== item.productName || $[15] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "line-clamp-2 text-sm font-semibold leading-5 text-black hover:underline",
            href: t7,
            children: item.productName
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[14] = item.productName;
        $[15] = t7;
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== item.productSku) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-1 truncate text-[10px] uppercase tracking-[0.08em] text-black/50",
            children: [
                "SKU ",
                item.productSku
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 90,
            columnNumber: 10
        }, this);
        $[17] = item.productSku;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] !== t8 || $[20] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-0",
            children: [
                t8,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 98,
            columnNumber: 11
        }, this);
        $[19] = t8;
        $[20] = t9;
        $[21] = t10;
    } else {
        t10 = $[21];
    }
    let t11;
    if ($[22] !== item.totalWithTax) {
        t11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(item.totalWithTax);
        $[22] = item.totalWithTax;
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    let t12;
    if ($[24] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "shrink-0 text-sm font-semibold text-black",
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 115,
            columnNumber: 11
        }, this);
        $[24] = t11;
        $[25] = t12;
    } else {
        t12 = $[25];
    }
    let t13;
    if ($[26] !== t10 || $[27] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between gap-3",
            children: [
                t10,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 123,
            columnNumber: 11
        }, this);
        $[26] = t10;
        $[27] = t12;
        $[28] = t13;
    } else {
        t13 = $[28];
    }
    let t14;
    if ($[29] !== item.currentPrice || $[30] !== item.priceChanged) {
        t14 = item.priceChanged && item.currentPrice !== undefined ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 flex items-center gap-1.5 text-xs text-[#9a5d3b]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    "aria-hidden": "true",
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/cart-item.tsx",
                    lineNumber: 132,
                    columnNumber: 135
                }, this),
                "Price is now ",
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(item.currentPrice)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 132,
            columnNumber: 66
        }, this) : null;
        $[29] = item.currentPrice;
        $[30] = item.priceChanged;
        $[31] = t14;
    } else {
        t14 = $[31];
    }
    let t15;
    if ($[32] !== item.inStock) {
        t15 = !item.inStock ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "mt-2 flex items-center gap-1.5 text-xs font-medium text-red-700",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                    "aria-hidden": "true",
                    size: 14
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/cart-item.tsx",
                    lineNumber: 141,
                    columnNumber: 106
                }, this),
                "Out of stock"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 141,
            columnNumber: 27
        }, this) : null;
        $[32] = item.inStock;
        $[33] = t15;
    } else {
        t15 = $[33];
    }
    const t16 = `Decrease ${item.productName} quantity`;
    const t17 = isUpdating || item.quantity <= 1;
    let t18;
    if ($[34] !== item.quantity || $[35] !== updateQuantity) {
        t18 = ({
            "CartItem[<button>.onClick]": ()=>updateQuantity(item.quantity - 1)
        })["CartItem[<button>.onClick]"];
        $[34] = item.quantity;
        $[35] = updateQuantity;
        $[36] = t18;
    } else {
        t18 = $[36];
    }
    let t19;
    if ($[37] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
            "aria-hidden": "true",
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[37] = t19;
    } else {
        t19 = $[37];
    }
    let t20;
    if ($[38] !== t16 || $[39] !== t17 || $[40] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": t16,
            className: "flex size-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-30",
            disabled: t17,
            type: "button",
            onClick: t18,
            children: t19
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[38] = t16;
        $[39] = t17;
        $[40] = t18;
        $[41] = t20;
    } else {
        t20 = $[41];
    }
    let t21;
    if ($[42] !== item.quantity) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            "aria-live": "polite",
            className: "min-w-8 text-center text-xs font-semibold",
            children: item.quantity
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 179,
            columnNumber: 11
        }, this);
        $[42] = item.quantity;
        $[43] = t21;
    } else {
        t21 = $[43];
    }
    const t22 = `Increase ${item.productName} quantity`;
    const t23 = isUpdating || item.quantity >= item.availableStock || !item.inStock;
    let t24;
    if ($[44] !== item.quantity || $[45] !== updateQuantity) {
        t24 = ({
            "CartItem[<button>.onClick]": ()=>updateQuantity(item.quantity + 1)
        })["CartItem[<button>.onClick]"];
        $[44] = item.quantity;
        $[45] = updateQuantity;
        $[46] = t24;
    } else {
        t24 = $[46];
    }
    let t25;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
            "aria-hidden": "true",
            size: 14
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 200,
            columnNumber: 11
        }, this);
        $[47] = t25;
    } else {
        t25 = $[47];
    }
    let t26;
    if ($[48] !== t22 || $[49] !== t23 || $[50] !== t24) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": t22,
            className: "flex size-10 items-center justify-center disabled:cursor-not-allowed disabled:opacity-30",
            disabled: t23,
            type: "button",
            onClick: t24,
            children: t25
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 207,
            columnNumber: 11
        }, this);
        $[48] = t22;
        $[49] = t23;
        $[50] = t24;
        $[51] = t26;
    } else {
        t26 = $[51];
    }
    let t27;
    if ($[52] !== t20 || $[53] !== t21 || $[54] !== t26) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-line flex h-10 items-center rounded-full border",
            children: [
                t20,
                t21,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 217,
            columnNumber: 11
        }, this);
        $[52] = t20;
        $[53] = t21;
        $[54] = t26;
        $[55] = t27;
    } else {
        t27 = $[55];
    }
    const t28 = `Remove ${item.productName} from cart`;
    let t29;
    if ($[56] !== item.id || $[57] !== removeItem) {
        t29 = ({
            "CartItem[<button>.onClick]": ()=>removeItem.mutate(item.id)
        })["CartItem[<button>.onClick]"];
        $[56] = item.id;
        $[57] = removeItem;
        $[58] = t29;
    } else {
        t29 = $[58];
    }
    let t30;
    if ($[59] === Symbol.for("react.memo_cache_sentinel")) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
            "aria-hidden": "true",
            size: 15
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 239,
            columnNumber: 11
        }, this);
        $[59] = t30;
    } else {
        t30 = $[59];
    }
    let t31;
    if ($[60] !== isUpdating || $[61] !== t28 || $[62] !== t29) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": t28,
            className: "inline-flex min-h-10 items-center gap-1.5 text-xs text-black/60 hover:text-black disabled:opacity-30",
            disabled: isUpdating,
            type: "button",
            onClick: t29,
            children: [
                t30,
                "Remove"
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 246,
            columnNumber: 11
        }, this);
        $[60] = isUpdating;
        $[61] = t28;
        $[62] = t29;
        $[63] = t31;
    } else {
        t31 = $[63];
    }
    let t32;
    if ($[64] !== t27 || $[65] !== t31) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mt-4 flex flex-wrap items-center justify-between gap-3",
            children: [
                t27,
                t31
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 256,
            columnNumber: 11
        }, this);
        $[64] = t27;
        $[65] = t31;
        $[66] = t32;
    } else {
        t32 = $[66];
    }
    let t33;
    if ($[67] !== t13 || $[68] !== t14 || $[69] !== t15 || $[70] !== t32) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-w-0",
            children: [
                t13,
                t14,
                t15,
                t32
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 265,
            columnNumber: 11
        }, this);
        $[67] = t13;
        $[68] = t14;
        $[69] = t15;
        $[70] = t32;
        $[71] = t33;
    } else {
        t33 = $[71];
    }
    let t34;
    if ($[72] !== t33 || $[73] !== t6) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
            className: "border-line grid grid-cols-[84px_minmax(0,1fr)] gap-4 border-b py-5 sm:grid-cols-[104px_minmax(0,1fr)]",
            children: [
                t6,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-item.tsx",
            lineNumber: 276,
            columnNumber: 11
        }, this);
        $[72] = t33;
        $[73] = t6;
        $[74] = t34;
    } else {
        t34 = $[74];
    }
    return t34;
}
_s(CartItem, "WDNoLwzCsZ5FOpWtQKmcHZ1GC5w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateCartItem"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRemoveFromCart"]
    ];
});
_c = CartItem;
var _c;
__turbopack_context__.k.register(_c, "CartItem");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/cart/cart-drawer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartDrawer",
    ()=>CartDrawer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart.mutations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart.queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$cart$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cart/cart-item.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
function CartDrawer(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(33);
    if ($[0] !== "386bd61abbdddd3433a82be8842aab8c3ce16dcda1b2551e3a9fb8a557c86c83") {
        for(let $i = 0; $i < 33; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "386bd61abbdddd3433a82be8842aab8c3ce16dcda1b2551e3a9fb8a557c86c83";
    }
    const { isOpen, onClose } = t0;
    const { data: cart, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])(isOpen);
    const clearCart = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearCart"])();
    let t1;
    let t2;
    if ($[1] !== isOpen || $[2] !== onClose) {
        t1 = ({
            "CartDrawer[useEffect()]": ()=>{
                if (!isOpen) {
                    return;
                }
                const handleEscape = {
                    "CartDrawer[useEffect() > handleEscape]": (event)=>{
                        if (event.key === "Escape") {
                            onClose();
                        }
                    }
                }["CartDrawer[useEffect() > handleEscape]"];
                document.body.style.overflow = "hidden";
                document.addEventListener("keydown", handleEscape);
                return ()=>{
                    document.body.style.overflow = "";
                    document.removeEventListener("keydown", handleEscape);
                };
            }
        })["CartDrawer[useEffect()]"];
        t2 = [
            isOpen,
            onClose
        ];
        $[1] = isOpen;
        $[2] = onClose;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    if (!isOpen) {
        return null;
    }
    let t3;
    if ($[5] !== clearCart) {
        t3 = ({
            "CartDrawer[clearAll]": ()=>{
                if (window.confirm("Clear every item from your cart?")) {
                    clearCart.mutate();
                }
            }
        })["CartDrawer[clearAll]"];
        $[5] = clearCart;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const clearAll = t3;
    let t4;
    if ($[7] !== onClose) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Close cart",
            className: "absolute inset-0 bg-black/45",
            type: "button",
            onClick: onClose
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 85,
            columnNumber: 10
        }, this);
        $[7] = onClose;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    let t6;
    if ($[9] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
            "aria-hidden": "true",
            size: 20,
            strokeWidth: 1.5
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "text-base font-semibold uppercase tracking-[0.12em]",
            children: "Cart"
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 95,
            columnNumber: 10
        }, this);
        $[9] = t5;
        $[10] = t6;
    } else {
        t5 = $[9];
        t6 = $[10];
    }
    let t7;
    if ($[11] !== cart) {
        t7 = cart?.totalItems ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "bg-ink rounded-full px-2 py-0.5 text-[10px] text-white",
            children: cart.totalItems
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 104,
            columnNumber: 29
        }, this) : null;
        $[11] = cart;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-3",
            children: [
                t5,
                t6,
                t7
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[13] = t7;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            "aria-hidden": "true",
            size: 20,
            strokeWidth: 1.5
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== onClose) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Close cart",
            className: "flex size-11 items-center justify-center",
            type: "button",
            onClick: onClose,
            children: t9
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 127,
            columnNumber: 11
        }, this);
        $[16] = onClose;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== t10 || $[19] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "border-line flex min-h-[76px] items-center justify-between border-b px-5 sm:px-7",
            children: [
                t8,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 135,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t8;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] !== cart || $[22] !== clearAll || $[23] !== clearCart || $[24] !== isLoading || $[25] !== onClose) {
        t12 = isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                "aria-label": "Loading cart",
                className: "animate-spin",
                size: 26
            }, void 0, false, {
                fileName: "[project]/src/components/cart/cart-drawer.tsx",
                lineNumber: 144,
                columnNumber: 80
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 144,
            columnNumber: 23
        }, this) : !cart || cart.items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 flex-col items-center justify-center px-8 text-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                    "aria-hidden": "true",
                    className: "text-black/20",
                    size: 54,
                    strokeWidth: 1
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                    lineNumber: 144,
                    columnNumber: 279
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "mt-6 text-2xl font-medium tracking-[-0.03em]",
                    children: "Your cart is empty"
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                    lineNumber: 144,
                    columnNumber: 365
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-2 max-w-xs text-sm leading-6 text-black/55",
                    children: "Explore the collection and add the pieces that fit your setup."
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                    lineNumber: 144,
                    columnNumber: 449
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "bg-ink mt-7 inline-flex min-h-12 items-center justify-center px-7 text-sm font-semibold text-white",
                    href: "/products",
                    onClick: onClose,
                    children: "Browse products"
                }, void 0, false, {
                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                    lineNumber: 144,
                    columnNumber: 576
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 144,
            columnNumber: 196
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-5 sm:px-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex min-h-14 items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-black/55",
                                    children: [
                                        cart.totalItems,
                                        " ",
                                        cart.totalItems === 1 ? "item" : "items"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                    lineNumber: 144,
                                    columnNumber: 874
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "min-h-11 text-xs text-black/55 underline-offset-4 hover:underline disabled:opacity-40",
                                    disabled: clearCart.isPending,
                                    type: "button",
                                    onClick: clearAll,
                                    children: "Clear cart"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                    lineNumber: 144,
                                    columnNumber: 975
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                            lineNumber: 144,
                            columnNumber: 814
                        }, this),
                        cart.items.map(_CartDrawerCartItemsMap)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                    lineNumber: 144,
                    columnNumber: 761
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                    className: "border-line bg-sand/45 border-t p-5 sm:p-7",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-black/60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Subtotal"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                            lineNumber: 144,
                                            columnNumber: 1367
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-black",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(cart.subtotal)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                            lineNumber: 144,
                                            columnNumber: 1388
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                    lineNumber: 144,
                                    columnNumber: 1315
                                }, this),
                                cart.tax > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between text-black/60",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Tax"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                            lineNumber: 144,
                                            columnNumber: 1529
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-black",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(cart.tax)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                            lineNumber: 144,
                                            columnNumber: 1545
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                    lineNumber: 144,
                                    columnNumber: 1477
                                }, this) : null,
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-line flex justify-between border-t pt-3 text-lg font-semibold",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Total"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                            lineNumber: 144,
                                            columnNumber: 1707
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(cart.total)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                            lineNumber: 144,
                                            columnNumber: 1725
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                                    lineNumber: 144,
                                    columnNumber: 1621
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                            lineNumber: 144,
                            columnNumber: 1280
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-[11px] text-black/50",
                            children: "Delivery is calculated at checkout."
                        }, void 0, false, {
                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                            lineNumber: 144,
                            columnNumber: 1778
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "bg-ink mt-5 flex min-h-14 w-full items-center justify-center text-sm font-semibold text-white",
                            href: "/checkout",
                            onClick: onClose,
                            children: "Checkout"
                        }, void 0, false, {
                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                            lineNumber: 144,
                            columnNumber: 1863
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            className: "border-ink mt-2 flex min-h-12 w-full items-center justify-center border text-sm font-semibold",
                            href: "/cart",
                            onClick: onClose,
                            children: "View cart"
                        }, void 0, false, {
                            fileName: "[project]/src/components/cart/cart-drawer.tsx",
                            lineNumber: 144,
                            columnNumber: 2025
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/cart/cart-drawer.tsx",
                    lineNumber: 144,
                    columnNumber: 1217
                }, this)
            ]
        }, void 0, true);
        $[21] = cart;
        $[22] = clearAll;
        $[23] = clearCart;
        $[24] = isLoading;
        $[25] = onClose;
        $[26] = t12;
    } else {
        t12 = $[26];
    }
    let t13;
    if ($[27] !== t11 || $[28] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "absolute right-0 top-0 flex h-dvh w-full max-w-[470px] flex-col bg-white shadow-2xl",
            children: [
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 156,
            columnNumber: 11
        }, this);
        $[27] = t11;
        $[28] = t12;
        $[29] = t13;
    } else {
        t13 = $[29];
    }
    let t14;
    if ($[30] !== t13 || $[31] !== t4) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-label": "Shopping cart",
            "aria-modal": "true",
            className: "fixed inset-0 z-[80]",
            role: "dialog",
            children: [
                t4,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/cart/cart-drawer.tsx",
            lineNumber: 165,
            columnNumber: 11
        }, this);
        $[30] = t13;
        $[31] = t4;
        $[32] = t14;
    } else {
        t14 = $[32];
    }
    return t14;
}
_s(CartDrawer, "eTnpoEmdUDwESdwjyXw13WRVwsk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useClearCart"]
    ];
});
_c = CartDrawer;
function _CartDrawerCartItemsMap(item) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$cart$2d$item$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartItem"], {
        item: item
    }, item.id, false, {
        fileName: "[project]/src/components/cart/cart-drawer.tsx",
        lineNumber: 175,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "CartDrawer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/site/storefront-settings-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StorefrontSettingsProvider",
    ()=>StorefrontSettingsProvider,
    "useStorefrontSettings",
    ()=>useStorefrontSettings
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const StorefrontSettingsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(null);
function StorefrontSettingsProvider(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(4);
    if ($[0] !== "17b210d864802fc3691b064e709835d66c43cef70162ccf4f5bbf513fc2d1fe0") {
        for(let $i = 0; $i < 4; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "17b210d864802fc3691b064e709835d66c43cef70162ccf4f5bbf513fc2d1fe0";
    }
    const { children, value } = t0;
    let t1;
    if ($[1] !== children || $[2] !== value) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StorefrontSettingsContext.Provider, {
            value: value,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/lib/site/storefront-settings-context.tsx",
            lineNumber: 21,
            columnNumber: 10
        }, this);
        $[1] = children;
        $[2] = value;
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    return t1;
}
_c = StorefrontSettingsProvider;
function useStorefrontSettings() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "17b210d864802fc3691b064e709835d66c43cef70162ccf4f5bbf513fc2d1fe0") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "17b210d864802fc3691b064e709835d66c43cef70162ccf4f5bbf513fc2d1fe0";
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(StorefrontSettingsContext);
}
_s(useStorefrontSettings, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "StorefrontSettingsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/common/brand-logo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BrandLogo",
    ()=>BrandLogo,
    "BrandMark",
    ()=>BrandMark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2f$storefront$2d$settings$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/site/storefront-settings-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function BrandMark(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "a646107094ccaa813868fe1b44b73ef4ff185b820e065574d43846ad8572a4aa") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a646107094ccaa813868fe1b44b73ef4ff185b820e065574d43846ad8572a4aa";
    }
    const { className: t1, inverse: t2 } = t0;
    const className = t1 === undefined ? "size-10" : t1;
    const inverse = t2 === undefined ? false : t2;
    const background = inverse ? "#ffffff" : "#1f1c17";
    const foreground = inverse ? "#1f1c17" : "#ffffff";
    let t3;
    if ($[1] !== background) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
            fill: background,
            height: "48",
            width: "48"
        }, void 0, false, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 32,
            columnNumber: 10
        }, this);
        $[1] = background;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    let t4;
    if ($[3] !== foreground) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M13 10v28M13 11h10.5C30.3 11 34 14.5 34 20s-3.7 9-10.5 9H13",
            fill: "none",
            stroke: foreground,
            strokeLinecap: "square",
            strokeWidth: "3.5"
        }, void 0, false, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[3] = foreground;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "m26 28 10 10m0 0v-7m0 7h-7",
            fill: "none",
            stroke: "#b87855",
            strokeWidth: "3"
        }, void 0, false, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 48,
            columnNumber: 10
        }, this);
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] !== className || $[7] !== t3 || $[8] !== t4) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
            "aria-hidden": "true",
            className: className,
            role: "img",
            viewBox: "0 0 48 48",
            xmlns: "http://www.w3.org/2000/svg",
            children: [
                t3,
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 55,
            columnNumber: 10
        }, this);
        $[6] = className;
        $[7] = t3;
        $[8] = t4;
        $[9] = t6;
    } else {
        t6 = $[9];
    }
    return t6;
}
_c = BrandMark;
function BrandLogo(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "a646107094ccaa813868fe1b44b73ef4ff185b820e065574d43846ad8572a4aa") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a646107094ccaa813868fe1b44b73ef4ff185b820e065574d43846ad8572a4aa";
    }
    const { className: t1, inverse: t2, markClassName: t3, subtitle, wordmarkClassName: t4 } = t0;
    const className = t1 === undefined ? "" : t1;
    const inverse = t2 === undefined ? false : t2;
    const markClassName = t3 === undefined ? "size-10" : t3;
    const wordmarkClassName = t4 === undefined ? "text-[25px]" : t4;
    const settings = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2f$storefront$2d$settings$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefrontSettings"])();
    const name = settings?.siteName || "PickNQuicks";
    const t5 = `inline-flex items-center gap-3 ${className}`;
    let t6;
    if ($[1] !== inverse || $[2] !== markClassName || $[3] !== settings) {
        t6 = settings?.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `relative block shrink-0 overflow-hidden ${markClassName}`,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                fill: true,
                alt: "",
                className: "object-contain",
                sizes: "48px",
                src: settings.logoUrl
            }, void 0, false, {
                fileName: "[project]/src/components/common/brand-logo.tsx",
                lineNumber: 89,
                columnNumber: 107
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 89,
            columnNumber: 30
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BrandMark, {
            className: `shrink-0 ${markClassName}`,
            inverse: inverse
        }, void 0, false, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 89,
            columnNumber: 208
        }, this);
        $[1] = inverse;
        $[2] = markClassName;
        $[3] = settings;
        $[4] = t6;
    } else {
        t6 = $[4];
    }
    const t7 = `block whitespace-nowrap font-sans font-semibold leading-none tracking-[-0.055em] ${inverse ? "text-white" : "text-[#1f1c17]"} ${wordmarkClassName}`;
    let t8;
    if ($[5] !== inverse || $[6] !== name) {
        t8 = name === "PickNQuicks" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                "PickN",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: inverse ? "text-[#d49a77]" : "text-[#9a5d3b]",
                    children: "Quicks"
                }, void 0, false, {
                    fileName: "[project]/src/components/common/brand-logo.tsx",
                    lineNumber: 100,
                    columnNumber: 42
                }, this)
            ]
        }, void 0, true) : name;
        $[5] = inverse;
        $[6] = name;
        $[7] = t8;
    } else {
        t8 = $[7];
    }
    let t9;
    if ($[8] !== t7 || $[9] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t7,
            children: t8
        }, void 0, false, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 109,
            columnNumber: 10
        }, this);
        $[8] = t7;
        $[9] = t8;
        $[10] = t9;
    } else {
        t9 = $[10];
    }
    let t10;
    if ($[11] !== inverse || $[12] !== subtitle) {
        t10 = subtitle ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `mt-1.5 block text-[8px] font-semibold uppercase tracking-[0.2em] ${inverse ? "text-white/65" : "text-black/48"}`,
            children: subtitle
        }, void 0, false, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 118,
            columnNumber: 22
        }, this) : null;
        $[11] = inverse;
        $[12] = subtitle;
        $[13] = t10;
    } else {
        t10 = $[13];
    }
    let t11;
    if ($[14] !== t10 || $[15] !== t9) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "min-w-0",
            children: [
                t9,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 127,
            columnNumber: 11
        }, this);
        $[14] = t10;
        $[15] = t9;
        $[16] = t11;
    } else {
        t11 = $[16];
    }
    let t12;
    if ($[17] !== t11 || $[18] !== t5 || $[19] !== t6) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: t5,
            children: [
                t6,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/common/brand-logo.tsx",
            lineNumber: 136,
            columnNumber: 11
        }, this);
        $[17] = t11;
        $[18] = t5;
        $[19] = t6;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    return t12;
}
_s(BrandLogo, "cytR8Z+RiQNXsNxn8j49M8+FLx4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$site$2f$storefront$2d$settings$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useStorefrontSettings"]
    ];
});
_c1 = BrandLogo;
var _c, _c1;
__turbopack_context__.k.register(_c, "BrandMark");
__turbopack_context__.k.register(_c1, "BrandLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/types/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "UserRole",
    ()=>UserRole
]);
var AuthProvider = /*#__PURE__*/ function(AuthProvider) {
    AuthProvider["DATABASE"] = "DATABASE";
    AuthProvider["GOOGLE"] = "GOOGLE";
    return AuthProvider;
}({});
var UserRole = /*#__PURE__*/ function(UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["CUSTOMER"] = "CUSTOMER";
    UserRole["STAFF"] = "STAFF";
    UserRole["MANAGER"] = "MANAGER";
    return UserRole;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/env.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "publicSupabaseEnv",
    ()=>publicSupabaseEnv,
    "serverSupabaseEnv",
    ()=>serverSupabaseEnv
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const required = (name, value)=>{
    if (!value) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};
function publicSupabaseEnv() {
    return {
        url: required('NEXT_PUBLIC_SUPABASE_URL', ("TURBOPACK compile-time value", "https://cxwhvstgasdmzanwwvqq.supabase.co")),
        publishableKey: required('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', ("TURBOPACK compile-time value", "sb_publishable_L6oAyEZh6NQv5jrSHGwsyg_xAQl5PxY"))
    };
}
function serverSupabaseEnv() {
    return {
        ...publicSupabaseEnv(),
        secretKey: required('SUPABASE_SECRET_KEY', __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SECRET_KEY)
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/supabase/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createBrowserClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/env.ts [app-client] (ecmascript)");
;
;
function createClient() {
    const { url, publishableKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicSupabaseEnv"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createBrowserClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createBrowserClient"])(url, publishableKey);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/auth/queries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authKeys",
    ()=>authKeys,
    "useMe",
    ()=>useMe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
;
const authKeys = {
    all: [
        'auth'
    ],
    me: ()=>[
            'auth',
            'me'
        ]
};
function useMe() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "04f4e5a7cc4a761263d3e0c50ce62ae14f912c081d23ddac2af3789986abdbb4") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "04f4e5a7cc4a761263d3e0c50ce62ae14f912c081d23ddac2af3789986abdbb4";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = {
            queryKey: authKeys.me(),
            queryFn: _temp,
            staleTime: 300000,
            retry: 1
        };
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t0);
}
_s(useMe, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
async function _temp() {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: t0, error } = await supabase.auth.getUser();
    const { user } = t0;
    if (error || !user) {
        return null;
    }
    const [t1, t2] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase.from("user_roles").select("role").eq("user_id", user.id)
    ]);
    const { data: profile } = t1;
    const { data: roleRows } = t2;
    const firstName = profile?.first_name ?? user.user_metadata.first_name ?? "";
    const lastName = profile?.last_name ?? user.user_metadata.last_name ?? "";
    return {
        id: user.id,
        email: user.email ?? "",
        firstName,
        lastName,
        fullName: `${firstName} ${lastName}`.trim() || user.email?.split("@")[0] || "Customer",
        phone: profile?.phone ?? user.phone ?? undefined,
        avatarUrl: profile?.avatar_url ?? undefined,
        enabled: profile?.enabled ?? true,
        emailVerified: Boolean(user.email_confirmed_at),
        provider: user.app_metadata.provider === "google" ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"].GOOGLE : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthProvider"].DATABASE,
        roles: roleRows?.map(_useMeAnonymousAnonymous) ?? [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].CUSTOMER
        ],
        createdAt: user.created_at,
        lastLogin: user.last_sign_in_at
    };
}
function _useMeAnonymousAnonymous(row) {
    return row.role;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/auth/hooks.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAuth",
    ()=>useAuth,
    "useRequireAuth",
    ()=>useRequireAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/queries.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
;
function useAuth() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "b312839c55e86ec7aee0b73e437b17435f569d35e6f225ca6197a76b1dab6832") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b312839c55e86ec7aee0b73e437b17435f569d35e6f225ca6197a76b1dab6832";
    }
    const { data: user, isLoading, error } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMe"])();
    const t0 = !!user;
    let t1;
    if ($[1] !== user?.roles) {
        t1 = user?.roles.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].ADMIN);
        $[1] = user?.roles;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== user?.roles) {
        t2 = user?.roles.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].CUSTOMER);
        $[3] = user?.roles;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== user?.roles) {
        t3 = user?.roles.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].STAFF);
        $[5] = user?.roles;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== user?.roles) {
        t4 = user?.roles.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].MANAGER);
        $[7] = user?.roles;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    let t6;
    if ($[9] !== user?.roles) {
        t5 = (role)=>user?.roles.includes(role) ?? false;
        t6 = (...t7)=>{
            const roles = t7;
            return roles.some({
                "useAuth[<anonymous> > roles.some()]": (role_0)=>user?.roles.includes(role_0)
            }["useAuth[<anonymous> > roles.some()]"]) ?? false;
        };
        $[9] = user?.roles;
        $[10] = t5;
        $[11] = t6;
    } else {
        t5 = $[10];
        t6 = $[11];
    }
    let t7;
    if ($[12] !== error || $[13] !== isLoading || $[14] !== t0 || $[15] !== t1 || $[16] !== t2 || $[17] !== t3 || $[18] !== t4 || $[19] !== t5 || $[20] !== t6 || $[21] !== user) {
        t7 = {
            user,
            isLoading,
            error,
            isAuthenticated: t0,
            isAdmin: t1,
            isCustomer: t2,
            isStaff: t3,
            isManager: t4,
            hasRole: t5,
            hasAnyRole: t6
        };
        $[12] = error;
        $[13] = isLoading;
        $[14] = t0;
        $[15] = t1;
        $[16] = t2;
        $[17] = t3;
        $[18] = t4;
        $[19] = t5;
        $[20] = t6;
        $[21] = user;
        $[22] = t7;
    } else {
        t7 = $[22];
    }
    return t7;
}
_s(useAuth, "18h9tggorVDl/YLgcRxR5d3DXf0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMe"]
    ];
});
function useRequireAuth(requiredRoles) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "b312839c55e86ec7aee0b73e437b17435f569d35e6f225ca6197a76b1dab6832") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b312839c55e86ec7aee0b73e437b17435f569d35e6f225ca6197a76b1dab6832";
    }
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { user, isLoading, error } = useAuth();
    const hasRedirected = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    let status;
    if ($[1] !== error || $[2] !== isLoading || $[3] !== requiredRoles || $[4] !== user) {
        status = "loading";
        if (!isLoading) {
            if (error && !user) {
                const responseStatus = error.response?.status;
                status = responseStatus === 403 ? "forbidden" : "unauthenticated";
            } else {
                if (!user) {
                    status = "unauthenticated";
                } else {
                    if (requiredRoles && requiredRoles.length > 0 && !requiredRoles.some({
                        "useRequireAuth[requiredRoles.some()]": (role)=>user.roles.includes(role)
                    }["useRequireAuth[requiredRoles.some()]"])) {
                        status = "forbidden";
                    } else {
                        status = "authenticated";
                    }
                }
            }
        }
        $[1] = error;
        $[2] = isLoading;
        $[3] = requiredRoles;
        $[4] = user;
        $[5] = status;
    } else {
        status = $[5];
    }
    let t0;
    if ($[6] !== isLoading || $[7] !== router || $[8] !== status) {
        t0 = ({
            "useRequireAuth[useEffect()]": ()=>{
                if (isLoading || hasRedirected.current) {
                    return;
                }
                if (status === "unauthenticated") {
                    hasRedirected.current = true;
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error("Please sign in to access this page");
                    router.replace("/auth/login");
                }
            }
        })["useRequireAuth[useEffect()]"];
        $[6] = isLoading;
        $[7] = router;
        $[8] = status;
        $[9] = t0;
    } else {
        t0 = $[9];
    }
    let t1;
    if ($[10] !== isLoading || $[11] !== router || $[12] !== status) {
        t1 = [
            status,
            isLoading,
            router
        ];
        $[10] = isLoading;
        $[11] = router;
        $[12] = status;
        $[13] = t1;
    } else {
        t1 = $[13];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[14] !== isLoading || $[15] !== status || $[16] !== user) {
        t2 = {
            user,
            isLoading,
            status
        };
        $[14] = isLoading;
        $[15] = status;
        $[16] = user;
        $[17] = t2;
    } else {
        t2 = $[17];
    }
    return t2;
}
_s1(useRequireAuth, "LZMkvOGijS0rYyIO/EI1jSov9Kg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        useAuth
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/cart/merge-guest-cart.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "mergeGuestCart",
    ()=>mergeGuestCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$guest$2d$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/guest-token.ts [app-client] (ecmascript)");
;
;
async function mergeGuestCart() {
    const guestToken = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$guest$2d$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getGuestToken"])();
    if (!guestToken) {
        return false;
    }
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/cart/merge', null, {
        headers: {
            'X-Guest-Token': guestToken
        }
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$guest$2d$token$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["removeGuestToken"])();
    return data.data?.merged ?? false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/category/categories.queries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "categoryKeys",
    ()=>categoryKeys,
    "useCategory",
    ()=>useCategory,
    "useCategoryBySlug",
    ()=>useCategoryBySlug,
    "useCategoryOptions",
    ()=>useCategoryOptions,
    "useCategoryTree",
    ()=>useCategoryTree,
    "useChildCategories",
    ()=>useChildCategories,
    "useRootCategories",
    ()=>useRootCategories
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
;
;
;
const categoryKeys = {
    all: [
        'categories'
    ],
    trees: ()=>[
            ...categoryKeys.all,
            'tree'
        ],
    tree: (active)=>[
            ...categoryKeys.trees(),
            {
                active
            }
        ],
    details: ()=>[
            ...categoryKeys.all,
            'detail'
        ],
    detail: (id)=>[
            ...categoryKeys.details(),
            id
        ],
    bySlug: (slug)=>[
            ...categoryKeys.all,
            'slug',
            slug
        ],
    roots: ()=>[
            ...categoryKeys.all,
            'roots'
        ],
    children: (parentId)=>[
            ...categoryKeys.all,
            'children',
            parentId
        ]
};
function useCategoryTree(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c";
    }
    const activeOnly = t0 === undefined ? false : t0;
    let t1;
    if ($[1] !== activeOnly) {
        t1 = categoryKeys.tree(activeOnly);
        $[1] = activeOnly;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] !== activeOnly) {
        t2 = async ()=>{
            const endpoint = activeOnly ? "/categories/tree/active" : "/categories/tree";
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(endpoint);
            return data.data;
        };
        $[3] = activeOnly;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== t1 || $[6] !== t2) {
        t3 = {
            queryKey: t1,
            queryFn: t2,
            staleTime: 600000
        };
        $[5] = t1;
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s(useCategoryTree, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCategoryOptions(t0) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c";
    }
    const activeOnly = t0 === undefined ? false : t0;
    const query = useCategoryTree(activeOnly);
    let t1;
    if ($[1] !== query.data) {
        const flatten = {
            "useCategoryOptions[flatten]": (nodes)=>nodes.flatMap({
                    "useCategoryOptions[flatten > nodes.flatMap()]": (node)=>[
                            node,
                            ...flatten(node.children)
                        ]
                }["useCategoryOptions[flatten > nodes.flatMap()]"])
        }["useCategoryOptions[flatten]"];
        t1 = query.data ? flatten(query.data) : undefined;
        $[1] = query.data;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const data = t1;
    let t2;
    if ($[3] !== data || $[4] !== query) {
        t2 = {
            ...query,
            data
        };
        $[3] = data;
        $[4] = query;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    return t2;
}
_s1(useCategoryOptions, "tyuWValbGNlmwqfzBbFjJILAR4g=", false, function() {
    return [
        useCategoryTree
    ];
});
function useCategory(id) {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c";
    }
    let t0;
    if ($[1] !== id) {
        t0 = categoryKeys.detail(id);
        $[1] = id;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== id) {
        t1 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/categories/${id}`);
            return data.data;
        };
        $[3] = id;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!id;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s2(useCategory, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useCategoryBySlug(slug) {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c";
    }
    let t0;
    if ($[1] !== slug) {
        t0 = categoryKeys.bySlug(slug);
        $[1] = slug;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== slug) {
        t1 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(`/categories/slug/${slug}`);
            return data.data;
        };
        $[3] = slug;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!slug;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s3(useCategoryBySlug, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useRootCategories(t0) {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c";
    }
    const activeOnly = t0 === undefined ? false : t0;
    let t1;
    if ($[1] !== activeOnly) {
        t1 = {
            queryKey: [
                ...categoryKeys.roots(),
                {
                    activeOnly
                }
            ],
            queryFn: async ()=>{
                const endpoint = activeOnly ? "/categories/roots/active" : "/categories/roots";
                const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(endpoint);
                return data.data;
            },
            staleTime: 300000
        };
        $[1] = activeOnly;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t1);
}
_s4(useRootCategories, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useChildCategories(parentId, t0) {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "75044bb04a18c056b603a05f8c5b91d4698f077d630979ecbf53c7ee4879240c";
    }
    const activeOnly = t0 === undefined ? false : t0;
    let t1;
    let t2;
    if ($[1] !== activeOnly || $[2] !== parentId) {
        let t3;
        if ($[5] !== activeOnly) {
            t3 = {
                activeOnly
            };
            $[5] = activeOnly;
            $[6] = t3;
        } else {
            t3 = $[6];
        }
        t1 = [
            ...categoryKeys.children(parentId),
            t3
        ];
        t2 = async ()=>{
            const endpoint = activeOnly ? `/categories/${parentId}/children/active` : `/categories/${parentId}/children`;
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get(endpoint);
            return data.data;
        };
        $[1] = activeOnly;
        $[2] = parentId;
        $[3] = t1;
        $[4] = t2;
    } else {
        t1 = $[3];
        t2 = $[4];
    }
    const t3 = !!parentId;
    let t4;
    if ($[7] !== t1 || $[8] !== t2 || $[9] !== t3) {
        t4 = {
            queryKey: t1,
            queryFn: t2,
            enabled: t3
        };
        $[7] = t1;
        $[8] = t2;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t4);
}
_s5(useChildCategories, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/order/claim-guest-orders.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "claimGuestOrders",
    ()=>claimGuestOrders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
;
async function claimGuestOrders() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post('/orders/claim-guest', null);
    return data.data?.claimed ?? 0;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/mobile-menu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MobileMenu",
    ()=>MobileMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/brand-logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2f$categories$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/category/categories.queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
const NAV_ITEMS = [
    {
        href: '/',
        label: 'Home'
    },
    {
        href: '/products',
        label: 'Shop all'
    },
    {
        href: '/shop/brands',
        label: 'Brands'
    },
    {
        href: '/track-order',
        label: 'Track order'
    }
];
const DRAWER_LINK = 'flex min-h-12 items-center border-b border-black/15 px-1 text-[11px] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black';
const isVisibleStorefrontCategory = (category)=>category.slug.toLowerCase() !== 'connectivity';
function MobileMenu(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(84);
    if ($[0] !== "a318998ae47b1fa47d579af9e02922eb37d10f769df424211e62a7a7b5ea612a") {
        for(let $i = 0; $i < 84; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a318998ae47b1fa47d579af9e02922eb37d10f769df424211e62a7a7b5ea612a";
    }
    const { isOpen, onClose, onSearch, onSignIn } = t0;
    const { user, isAuthenticated } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { data: navCategories } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2f$categories$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryTree"])(true);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isCategoriesExpanded, setIsCategoriesExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    if ($[1] !== onClose) {
        t1 = ({
            "MobileMenu[handleClose]": ()=>{
                setIsVisible(false);
                window.setTimeout(onClose, 180);
            }
        })["MobileMenu[handleClose]"];
        $[1] = onClose;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const handleClose = t1;
    let t2;
    if ($[3] !== onClose) {
        t2 = ({
            "MobileMenu[closeWithAction]": (action)=>{
                setIsVisible(false);
                window.setTimeout({
                    "MobileMenu[closeWithAction > window.setTimeout()]": ()=>{
                        onClose();
                        action();
                    }
                }["MobileMenu[closeWithAction > window.setTimeout()]"], 180);
            }
        })["MobileMenu[closeWithAction]"];
        $[3] = onClose;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    const closeWithAction = t2;
    let t3;
    let t4;
    if ($[5] !== handleClose || $[6] !== isOpen) {
        t3 = ({
            "MobileMenu[useEffect()]": ()=>{
                if (!isOpen) {
                    return;
                }
                const animationFrame = window.requestAnimationFrame({
                    "MobileMenu[useEffect() > window.requestAnimationFrame()]": ()=>setIsVisible(true)
                }["MobileMenu[useEffect() > window.requestAnimationFrame()]"]);
                const onEscape = {
                    "MobileMenu[useEffect() > onEscape]": (event)=>{
                        if (event.key === "Escape") {
                            handleClose();
                        }
                    }
                }["MobileMenu[useEffect() > onEscape]"];
                document.body.style.overflow = "hidden";
                document.addEventListener("keydown", onEscape);
                return ()=>{
                    window.cancelAnimationFrame(animationFrame);
                    document.removeEventListener("keydown", onEscape);
                    document.body.style.overflow = "";
                };
            }
        })["MobileMenu[useEffect()]"];
        t4 = [
            handleClose,
            isOpen
        ];
        $[5] = handleClose;
        $[6] = isOpen;
        $[7] = t3;
        $[8] = t4;
    } else {
        t3 = $[7];
        t4 = $[8];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    if (!isOpen) {
        return null;
    }
    let t5;
    if ($[9] !== user?.roles) {
        t5 = user?.roles.some(_MobileMenuAnonymous);
        $[9] = user?.roles;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    const isAdminUser = t5;
    const t6 = isVisible ? "opacity-100" : "opacity-0";
    let t7;
    if ($[11] !== t6) {
        t7 = [
            "fixed inset-0 z-[60] bg-black/45 transition-opacity duration-200 lg:hidden",
            t6
        ];
        $[11] = t6;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    const t8 = t7.join(" ");
    let t9;
    if ($[13] !== handleClose || $[14] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Close navigation",
            className: t8,
            type: "button",
            onClick: handleClose
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 153,
            columnNumber: 10
        }, this);
        $[13] = handleClose;
        $[14] = t8;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    const t10 = isVisible ? "translate-x-0" : "-translate-x-full";
    let t11;
    if ($[16] !== t10) {
        t11 = [
            "fixed left-0 top-0 z-[70] h-dvh w-[88vw] max-w-[380px] border-r border-black/20 bg-white transition-transform duration-200 ease-out lg:hidden",
            t10
        ];
        $[16] = t10;
        $[17] = t11;
    } else {
        t11 = $[17];
    }
    const t12 = t11.join(" ");
    let t13;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandLogo"], {
            markClassName: "size-8",
            wordmarkClassName: "text-[19px]"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 172,
            columnNumber: 11
        }, this);
        $[18] = t13;
    } else {
        t13 = $[18];
    }
    let t14;
    if ($[19] !== handleClose) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            "aria-label": "PickNQuicks home",
            className: "inline-flex min-h-11 items-center text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
            href: "/",
            onClick: handleClose,
            children: t13
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 179,
            columnNumber: 11
        }, this);
        $[19] = handleClose;
        $[20] = t14;
    } else {
        t14 = $[20];
    }
    let t15;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            "aria-hidden": "true",
            size: 19,
            strokeWidth: 1.5
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 187,
            columnNumber: 11
        }, this);
        $[21] = t15;
    } else {
        t15 = $[21];
    }
    let t16;
    if ($[22] !== handleClose) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Close menu",
            className: "inline-flex size-11 items-center justify-center text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
            type: "button",
            onClick: handleClose,
            children: t15
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 194,
            columnNumber: 11
        }, this);
        $[22] = handleClose;
        $[23] = t16;
    } else {
        t16 = $[23];
    }
    let t17;
    if ($[24] !== t14 || $[25] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-[72px] items-center justify-between border-b border-black/15 px-5",
            children: [
                t14,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 202,
            columnNumber: 11
        }, this);
        $[24] = t14;
        $[25] = t16;
        $[26] = t17;
    } else {
        t17 = $[26];
    }
    let t18;
    if ($[27] !== closeWithAction || $[28] !== onSearch) {
        t18 = ({
            "MobileMenu[<button>.onClick]": ()=>closeWithAction(onSearch)
        })["MobileMenu[<button>.onClick]"];
        $[27] = closeWithAction;
        $[28] = onSearch;
        $[29] = t18;
    } else {
        t18 = $[29];
    }
    let t19;
    if ($[30] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            "aria-hidden": "true",
            className: "mr-3",
            size: 17,
            strokeWidth: 1.5
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 222,
            columnNumber: 11
        }, this);
        $[30] = t19;
    } else {
        t19 = $[30];
    }
    let t20;
    if ($[31] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-b border-black/15 px-5 py-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "flex min-h-11 w-full items-center border-b border-black/35 text-left text-[12px] text-black/55 transition-colors hover:border-black hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
                type: "button",
                onClick: t18,
                children: [
                    t19,
                    "Search products"
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/mobile-menu.tsx",
                lineNumber: 229,
                columnNumber: 63
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 229,
            columnNumber: 11
        }, this);
        $[31] = t18;
        $[32] = t20;
    } else {
        t20 = $[32];
    }
    let t21;
    if ($[33] !== handleClose || $[34] !== pathname) {
        t21 = NAV_ITEMS.map({
            "MobileMenu[NAV_ITEMS.map()]": (item)=>{
                const active = pathname === item.href;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    "aria-current": active ? "page" : undefined,
                    className: [
                        DRAWER_LINK,
                        active ? "bg-black px-4 text-white" : "text-black"
                    ].join(" "),
                    href: item.href,
                    onClick: handleClose,
                    children: item.label
                }, item.href, false, {
                    fileName: "[project]/src/components/layout/mobile-menu.tsx",
                    lineNumber: 240,
                    columnNumber: 16
                }, this);
            }
        }["MobileMenu[NAV_ITEMS.map()]"]);
        $[33] = handleClose;
        $[34] = pathname;
        $[35] = t21;
    } else {
        t21 = $[35];
    }
    const t22 = pathname.startsWith("/shop/categories") ? "font-semibold" : "";
    let t23;
    if ($[36] !== t22) {
        t23 = [
            DRAWER_LINK,
            "w-full justify-between text-black",
            t22
        ];
        $[36] = t22;
        $[37] = t23;
    } else {
        t23 = $[37];
    }
    const t24 = t23.join(" ");
    let t25;
    if ($[38] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = ({
            "MobileMenu[<button>.onClick]": ()=>setIsCategoriesExpanded(_MobileMenuButtonOnClickSetIsCategoriesExpanded)
        })["MobileMenu[<button>.onClick]"];
        $[38] = t25;
    } else {
        t25 = $[38];
    }
    const t26 = isCategoriesExpanded ? "rotate-180" : "";
    let t27;
    if ($[39] !== t26) {
        t27 = [
            "h-4 w-4 transition-transform duration-200",
            t26
        ];
        $[39] = t26;
        $[40] = t27;
    } else {
        t27 = $[40];
    }
    const t28 = t27.join(" ");
    let t29;
    if ($[41] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
            "aria-hidden": "true",
            className: t28
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 280,
            columnNumber: 11
        }, this);
        $[41] = t28;
        $[42] = t29;
    } else {
        t29 = $[42];
    }
    let t30;
    if ($[43] !== isCategoriesExpanded || $[44] !== t24 || $[45] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-expanded": isCategoriesExpanded,
            className: t24,
            type: "button",
            onClick: t25,
            children: [
                "Categories",
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 288,
            columnNumber: 11
        }, this);
        $[43] = isCategoriesExpanded;
        $[44] = t24;
        $[45] = t29;
        $[46] = t30;
    } else {
        t30 = $[46];
    }
    let t31;
    if ($[47] !== handleClose || $[48] !== isCategoriesExpanded || $[49] !== navCategories) {
        t31 = isCategoriesExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-b border-black/15 bg-[#f3f3f3] px-4 py-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "flex min-h-11 items-center border-b border-black/15 text-[10px] font-semibold uppercase tracking-[0.13em] text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
                    href: "/shop/categories",
                    onClick: handleClose,
                    children: "View all categories"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/mobile-menu.tsx",
                    lineNumber: 298,
                    columnNumber: 99
                }, this),
                navCategories && navCategories.length > 0 ? navCategories.filter(isVisibleStorefrontCategory).slice(0, 8).map({
                    "MobileMenu[(anonymous)()]": (category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    className: "flex min-h-11 items-center border-b border-black/10 text-[12px] font-medium text-black/75 transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
                                    href: "/shop/categories/" + encodeURIComponent(category.slug),
                                    onClick: handleClose,
                                    children: category.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/mobile-menu.tsx",
                                    lineNumber: 299,
                                    columnNumber: 73
                                }, this),
                                (category.children?.length ?? 0) > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "border-l border-black/20 pl-4",
                                    children: (category.children ?? []).filter(isVisibleStorefrontCategory).slice(0, 3).map({
                                        "MobileMenu[(anonymous)() > (anonymous)()]": (child)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "flex min-h-11 items-center text-[11px] text-black/55 transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
                                                href: "/shop/categories/" + encodeURIComponent(child.slug),
                                                onClick: handleClose,
                                                children: child.name
                                            }, child.id, false, {
                                                fileName: "[project]/src/components/layout/mobile-menu.tsx",
                                                lineNumber: 300,
                                                columnNumber: 69
                                            }, this)
                                    }["MobileMenu[(anonymous)() > (anonymous)()]"])
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/mobile-menu.tsx",
                                    lineNumber: 299,
                                    columnNumber: 438
                                }, this) : null
                            ]
                        }, category.id, true, {
                            fileName: "[project]/src/components/layout/mobile-menu.tsx",
                            lineNumber: 299,
                            columnNumber: 50
                        }, this)
                }["MobileMenu[(anonymous)()]"]) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "flex min-h-11 items-center text-[11px] text-black/45",
                    children: "Loading categories…"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/mobile-menu.tsx",
                    lineNumber: 302,
                    columnNumber: 41
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 298,
            columnNumber: 34
        }, this) : null;
        $[47] = handleClose;
        $[48] = isCategoriesExpanded;
        $[49] = navCategories;
        $[50] = t31;
    } else {
        t31 = $[50];
    }
    let t32;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t32 = [
            DRAWER_LINK,
            "mt-4 text-black"
        ];
        $[51] = t32;
    } else {
        t32 = $[51];
    }
    let t33;
    if ($[52] !== handleClose) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: t32.join(" "),
            href: "/cart",
            onClick: handleClose,
            children: "Cart"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 319,
            columnNumber: 11
        }, this);
        $[52] = handleClose;
        $[53] = t33;
    } else {
        t33 = $[53];
    }
    let t34;
    if ($[54] !== handleClose || $[55] !== isAuthenticated) {
        t34 = isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: [
                        DRAWER_LINK,
                        "text-black"
                    ].join(" "),
                    href: "/orders",
                    onClick: handleClose,
                    children: "My orders"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/mobile-menu.tsx",
                    lineNumber: 327,
                    columnNumber: 31
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: [
                        DRAWER_LINK,
                        "text-black"
                    ].join(" "),
                    href: "/auth/profile",
                    onClick: handleClose,
                    children: "Account"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/mobile-menu.tsx",
                    lineNumber: 327,
                    columnNumber: 140
                }, this)
            ]
        }, void 0, true) : null;
        $[54] = handleClose;
        $[55] = isAuthenticated;
        $[56] = t34;
    } else {
        t34 = $[56];
    }
    let t35;
    if ($[57] !== handleClose || $[58] !== isAdminUser || $[59] !== isAuthenticated) {
        t35 = isAuthenticated && isAdminUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: [
                DRAWER_LINK,
                "text-black"
            ].join(" "),
            href: "/admin",
            onClick: handleClose,
            children: "Admin"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 336,
            columnNumber: 44
        }, this) : null;
        $[57] = handleClose;
        $[58] = isAdminUser;
        $[59] = isAuthenticated;
        $[60] = t35;
    } else {
        t35 = $[60];
    }
    let t36;
    if ($[61] !== t21 || $[62] !== t30 || $[63] !== t31 || $[64] !== t33 || $[65] !== t34 || $[66] !== t35) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            "aria-label": "Mobile primary navigation",
            className: "flex-1 overflow-y-auto px-5 py-2",
            children: [
                t21,
                t30,
                t31,
                t33,
                t34,
                t35
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 346,
            columnNumber: 11
        }, this);
        $[61] = t21;
        $[62] = t30;
        $[63] = t31;
        $[64] = t33;
        $[65] = t34;
        $[66] = t35;
        $[67] = t36;
    } else {
        t36 = $[67];
    }
    let t37;
    if ($[68] !== closeWithAction || $[69] !== isAuthenticated || $[70] !== onSignIn || $[71] !== user) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "border-t border-black/15 bg-[#f3f3f3] p-5",
            children: isAuthenticated && user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-h-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "truncate text-[12px] font-semibold uppercase tracking-[0.1em] text-black",
                        children: user.fullName
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/mobile-menu.tsx",
                        lineNumber: 359,
                        columnNumber: 123
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "mt-1 truncate text-[11px] text-black/50",
                        children: user.email
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/mobile-menu.tsx",
                        lineNumber: 359,
                        columnNumber: 230
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/mobile-menu.tsx",
                lineNumber: 359,
                columnNumber: 97
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "flex min-h-11 w-full items-center justify-center border border-black bg-black px-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black",
                type: "button",
                onClick: {
                    "MobileMenu[<button>.onClick]": ()=>closeWithAction(onSignIn)
                }["MobileMenu[<button>.onClick]"],
                children: "Account / Sign in"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/mobile-menu.tsx",
                lineNumber: 359,
                columnNumber: 310
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 359,
            columnNumber: 11
        }, this);
        $[68] = closeWithAction;
        $[69] = isAuthenticated;
        $[70] = onSignIn;
        $[71] = user;
        $[72] = t37;
    } else {
        t37 = $[72];
    }
    let t38;
    if ($[73] !== t17 || $[74] !== t20 || $[75] !== t36 || $[76] !== t37) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col",
            children: [
                t17,
                t20,
                t36,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 372,
            columnNumber: 11
        }, this);
        $[73] = t17;
        $[74] = t20;
        $[75] = t36;
        $[76] = t37;
        $[77] = t38;
    } else {
        t38 = $[77];
    }
    let t39;
    if ($[78] !== t12 || $[79] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            "aria-label": "Mobile navigation",
            "aria-modal": "true",
            className: t12,
            role: "dialog",
            children: t38
        }, void 0, false, {
            fileName: "[project]/src/components/layout/mobile-menu.tsx",
            lineNumber: 383,
            columnNumber: 11
        }, this);
        $[78] = t12;
        $[79] = t38;
        $[80] = t39;
    } else {
        t39 = $[80];
    }
    let t40;
    if ($[81] !== t39 || $[82] !== t9) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t9,
                t39
            ]
        }, void 0, true);
        $[81] = t39;
        $[82] = t9;
        $[83] = t40;
    } else {
        t40 = $[83];
    }
    return t40;
}
_s(MobileMenu, "23I0YaShkhAIpyYgDYnwdcncp7w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2f$categories$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryTree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = MobileMenu;
function _MobileMenuButtonOnClickSetIsCategoriesExpanded(previous) {
    return !previous;
}
function _MobileMenuAnonymous(role) {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].STAFF,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].MANAGER
    ].includes(role);
}
var _c;
__turbopack_context__.k.register(_c, "MobileMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/product/products.queries.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "productKeys",
    ()=>productKeys,
    "useActiveProducts",
    ()=>useActiveProducts,
    "useProduct",
    ()=>useProduct,
    "useProducts",
    ()=>useProducts,
    "useProductsByBrand",
    ()=>useProductsByBrand,
    "useProductsByCategory",
    ()=>useProductsByCategory,
    "useSearchProducts",
    ()=>useSearchProducts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useQuery.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature();
;
;
;
const productKeys = {
    all: [
        'products'
    ],
    lists: ()=>[
            ...productKeys.all,
            'list'
        ],
    list: (filters)=>[
            ...productKeys.lists(),
            filters
        ],
    details: ()=>[
            ...productKeys.all,
            'detail'
        ],
    detail: (id)=>[
            ...productKeys.details(),
            id
        ],
    active: ()=>[
            ...productKeys.all,
            'active'
        ],
    byCategory: (categoryId)=>[
            ...productKeys.all,
            'category',
            categoryId
        ],
    byBrand: (brandId)=>[
            ...productKeys.all,
            'brand',
            brandId
        ],
    search: (query)=>[
            ...productKeys.all,
            'search',
            query
        ]
};
function useProducts(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1";
    }
    let t1;
    if ($[1] !== t0) {
        t1 = t0 === undefined ? {} : t0;
        $[1] = t0;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const filters = t1;
    let t2;
    if ($[3] !== filters) {
        t2 = productKeys.list(filters);
        $[3] = filters;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== filters) {
        t3 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicApiClient"].get("/products", {
                params: filters
            });
            return data.data;
        };
        $[5] = filters;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t2 || $[8] !== t3) {
        t4 = {
            queryKey: t2,
            queryFn: t3,
            staleTime: 180000
        };
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t4);
}
_s(useProducts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useProduct(id) {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1";
    }
    let t0;
    if ($[1] !== id) {
        t0 = productKeys.detail(id);
        $[1] = id;
        $[2] = t0;
    } else {
        t0 = $[2];
    }
    let t1;
    if ($[3] !== id) {
        t1 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicApiClient"].get(`/products/${id}`);
            return data.data;
        };
        $[3] = id;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    const t2 = !!id;
    let t3;
    if ($[5] !== t0 || $[6] !== t1 || $[7] !== t2) {
        t3 = {
            queryKey: t0,
            queryFn: t1,
            enabled: t2,
            staleTime: 30000,
            gcTime: 300000
        };
        $[5] = t0;
        $[6] = t1;
        $[7] = t2;
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t3);
}
_s1(useProduct, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useActiveProducts(t0) {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1";
    }
    let t1;
    if ($[1] !== t0) {
        t1 = t0 === undefined ? {} : t0;
        $[1] = t0;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const filters = t1;
    const hasCatalogFilters = Boolean(filters.categoryId || filters.brandId || filters.minPrice !== undefined || filters.maxPrice !== undefined);
    let t2;
    if ($[3] !== filters) {
        t2 = [
            ...productKeys.active(),
            filters
        ];
        $[3] = filters;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== filters || $[6] !== hasCatalogFilters) {
        t3 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicApiClient"].get(filters.search ? "/products/search" : hasCatalogFilters ? "/products/filter" : "/products/active", {
                params: {
                    ...filters,
                    query: filters.search
                }
            });
            return data.data;
        };
        $[5] = filters;
        $[6] = hasCatalogFilters;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    let t4;
    if ($[8] !== t2 || $[9] !== t3) {
        t4 = {
            queryKey: t2,
            queryFn: t3,
            staleTime: 300000
        };
        $[8] = t2;
        $[9] = t3;
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t4);
}
_s2(useActiveProducts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useProductsByCategory(categoryId, t0) {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1";
    }
    let t1;
    if ($[1] !== t0) {
        t1 = t0 === undefined ? {} : t0;
        $[1] = t0;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const filters = t1;
    let t2;
    let t3;
    if ($[3] !== categoryId || $[4] !== filters) {
        t2 = [
            ...productKeys.byCategory(categoryId),
            filters
        ];
        t3 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicApiClient"].get(`/products/category/${categoryId}`, {
                params: filters
            });
            return data.data;
        };
        $[3] = categoryId;
        $[4] = filters;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    const t4 = !!categoryId;
    let t5;
    if ($[7] !== t2 || $[8] !== t3 || $[9] !== t4) {
        t5 = {
            queryKey: t2,
            queryFn: t3,
            enabled: t4
        };
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t5);
}
_s3(useProductsByCategory, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useProductsByBrand(brandId, t0) {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1";
    }
    let t1;
    if ($[1] !== t0) {
        t1 = t0 === undefined ? {} : t0;
        $[1] = t0;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const filters = t1;
    let t2;
    let t3;
    if ($[3] !== brandId || $[4] !== filters) {
        t2 = [
            ...productKeys.byBrand(brandId),
            filters
        ];
        t3 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicApiClient"].get(`/products/brand/${brandId}`, {
                params: filters
            });
            return data.data;
        };
        $[3] = brandId;
        $[4] = filters;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    const t4 = !!brandId;
    let t5;
    if ($[7] !== t2 || $[8] !== t3 || $[9] !== t4) {
        t5 = {
            queryKey: t2,
            queryFn: t3,
            enabled: t4
        };
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t5);
}
_s4(useProductsByBrand, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
function useSearchProducts(query, t0) {
    _s5();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "89af89333cc7054a909ad2df10931fc53ffa55f78ef98b8418d4ee3495edc5f1";
    }
    let t1;
    if ($[1] !== t0) {
        t1 = t0 === undefined ? {} : t0;
        $[1] = t0;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const filters = t1;
    let t2;
    let t3;
    if ($[3] !== filters || $[4] !== query) {
        t2 = [
            ...productKeys.search(query),
            filters
        ];
        t3 = async ()=>{
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["publicApiClient"].get("/products/search", {
                params: {
                    query,
                    ...filters
                }
            });
            return data.data;
        };
        $[3] = filters;
        $[4] = query;
        $[5] = t2;
        $[6] = t3;
    } else {
        t2 = $[5];
        t3 = $[6];
    }
    const t4 = query.length > 0;
    let t5;
    if ($[7] !== t2 || $[8] !== t3 || $[9] !== t4) {
        t5 = {
            queryKey: t2,
            queryFn: t3,
            enabled: t4
        };
        $[7] = t2;
        $[8] = t3;
        $[9] = t4;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"])(t5);
}
_s5(useSearchProducts, "4ZpngI1uv+Uo3WQHEZmTQ5FNM+k=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useQuery$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQuery"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/search-modal.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchModal",
    ()=>SearchModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-client] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2f$products$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/product/products.queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/media.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
const SUGGESTED_SEARCHES = [
    'Monitor',
    'Desk',
    'Chair',
    'Mouse',
    'Webcam'
];
function SearchModal(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(37);
    if ($[0] !== "ac9cf36d12173468cb8dc3fcefaf5b117d6d5854566962ed4c3da4902671260e") {
        for(let $i = 0; $i < 37; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ac9cf36d12173468cb8dc3fcefaf5b117d6d5854566962ed4c3da4902671260e";
    }
    const { isOpen, onClose } = t0;
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    let t1;
    if ($[1] !== query) {
        t1 = query.trim();
        $[1] = query;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const deferredQuery = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"])(t1);
    const panelRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = {
            size: 5
        };
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const { data, isError, isFetching } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2f$products$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchProducts"])(deferredQuery, t2);
    let t3;
    if ($[4] !== data?.content) {
        t3 = data?.content ?? [];
        $[4] = data?.content;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const results = t3;
    let t4;
    let t5;
    if ($[6] !== isOpen || $[7] !== onClose) {
        t4 = ({
            "SearchModal[useEffect()]": ()=>{
                if (!isOpen) {
                    return;
                }
                const focusTimer = window.setTimeout({
                    "SearchModal[useEffect() > window.setTimeout()]": ()=>inputRef.current?.focus()
                }["SearchModal[useEffect() > window.setTimeout()]"], 50);
                const closeFromKeyboard = {
                    "SearchModal[useEffect() > closeFromKeyboard]": (event)=>{
                        if (event.key === "Escape") {
                            onClose();
                        }
                    }
                }["SearchModal[useEffect() > closeFromKeyboard]"];
                const closeFromOutside = {
                    "SearchModal[useEffect() > closeFromOutside]": (event_0)=>{
                        if (panelRef.current && !panelRef.current.contains(event_0.target)) {
                            onClose();
                        }
                    }
                }["SearchModal[useEffect() > closeFromOutside]"];
                window.addEventListener("keydown", closeFromKeyboard);
                window.addEventListener("mousedown", closeFromOutside);
                return ()=>{
                    window.clearTimeout(focusTimer);
                    window.removeEventListener("keydown", closeFromKeyboard);
                    window.removeEventListener("mousedown", closeFromOutside);
                };
            }
        })["SearchModal[useEffect()]"];
        t5 = [
            isOpen,
            onClose
        ];
        $[6] = isOpen;
        $[7] = onClose;
        $[8] = t4;
        $[9] = t5;
    } else {
        t4 = $[8];
        t5 = $[9];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t4, t5);
    if (!isOpen) {
        return null;
    }
    let t6;
    if ($[10] !== deferredQuery || $[11] !== onClose || $[12] !== router) {
        t6 = ({
            "SearchModal[submit]": (event_1)=>{
                event_1.preventDefault();
                if (!deferredQuery) {
                    return;
                }
                onClose();
                router.push(`/products?search=${encodeURIComponent(deferredQuery)}`);
            }
        })["SearchModal[submit]"];
        $[10] = deferredQuery;
        $[11] = onClose;
        $[12] = router;
        $[13] = t6;
    } else {
        t6 = $[13];
    }
    const submit = t6;
    let t7;
    if ($[14] !== isFetching) {
        t7 = isFetching ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
            "aria-hidden": "true",
            className: "mr-3 animate-spin text-black/40",
            size: 18
        }, void 0, false, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 134,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
            "aria-hidden": "true",
            className: "mr-3 text-black/60",
            size: 18,
            strokeWidth: 1.5
        }, void 0, false, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 134,
            columnNumber: 110
        }, this);
        $[14] = isFetching;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    let t8;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = ({
            "SearchModal[<input>.onChange]": (event_2)=>setQuery(event_2.target.value)
        })["SearchModal[<input>.onChange]"];
        $[16] = t8;
    } else {
        t8 = $[16];
    }
    let t9;
    if ($[17] !== query) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            ref: inputRef,
            "aria-label": "Search products",
            autoComplete: "off",
            className: "min-w-0 flex-1 bg-transparent py-3 text-sm text-black outline-none placeholder:text-black/35",
            placeholder: "Search products",
            type: "search",
            value: query,
            onChange: t8
        }, void 0, false, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 151,
            columnNumber: 10
        }, this);
        $[17] = query;
        $[18] = t9;
    } else {
        t9 = $[18];
    }
    let t10;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
            "aria-hidden": "true",
            size: 17
        }, void 0, false, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 159,
            columnNumber: 11
        }, this);
        $[19] = t10;
    } else {
        t10 = $[19];
    }
    let t11;
    if ($[20] !== onClose) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            "aria-label": "Close search",
            className: "ml-2 flex size-10 items-center justify-center text-black/45 hover:text-black",
            type: "button",
            onClick: onClose,
            children: t10
        }, void 0, false, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 166,
            columnNumber: 11
        }, this);
        $[20] = onClose;
        $[21] = t11;
    } else {
        t11 = $[21];
    }
    let t12;
    if ($[22] !== submit || $[23] !== t11 || $[24] !== t7 || $[25] !== t9) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
            className: "flex min-h-14 items-center border-b border-black/20 px-4",
            onSubmit: submit,
            children: [
                t7,
                t9,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 174,
            columnNumber: 11
        }, this);
        $[22] = submit;
        $[23] = t11;
        $[24] = t7;
        $[25] = t9;
        $[26] = t12;
    } else {
        t12 = $[26];
    }
    let t13;
    if ($[27] !== deferredQuery || $[28] !== isError || $[29] !== isFetching || $[30] !== onClose || $[31] !== results || $[32] !== router) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-h-[min(550px,calc(100vh-180px))] overflow-y-auto",
            children: !deferredQuery ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[9px] font-semibold uppercase tracking-[0.15em] text-black/40",
                        children: "Popular searches"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/search-modal.tsx",
                        lineNumber: 185,
                        columnNumber: 120
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-3 flex flex-wrap gap-2",
                        children: SUGGESTED_SEARCHES.map({
                            "SearchModal[SUGGESTED_SEARCHES.map()]": (suggestion)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "min-h-9 border border-black/15 px-3 text-xs text-black/65 hover:border-black hover:text-black",
                                    type: "button",
                                    onClick: {
                                        "SearchModal[SUGGESTED_SEARCHES.map() > <button>.onClick]": ()=>setQuery(suggestion)
                                    }["SearchModal[SUGGESTED_SEARCHES.map() > <button>.onClick]"],
                                    children: suggestion
                                }, suggestion, false, {
                                    fileName: "[project]/src/components/layout/search-modal.tsx",
                                    lineNumber: 186,
                                    columnNumber: 68
                                }, this)
                        }["SearchModal[SUGGESTED_SEARCHES.map()]"])
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/search-modal.tsx",
                        lineNumber: 185,
                        columnNumber: 222
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/search-modal.tsx",
                lineNumber: 185,
                columnNumber: 99
            }, this) : isError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-6 text-center text-sm text-black/60",
                children: [
                    "Search is temporarily unavailable.",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        className: "font-semibold underline",
                        href: "/products",
                        onClick: onClose,
                        children: "Browse products"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/search-modal.tsx",
                        lineNumber: 189,
                        columnNumber: 174
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/search-modal.tsx",
                lineNumber: 189,
                columnNumber: 80
            }, this) : !isFetching && results.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 p-5 text-sm text-black/55",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                        "aria-hidden": "true",
                        size: 20
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/search-modal.tsx",
                        lineNumber: 189,
                        columnNumber: 387
                    }, this),
                    "No products found for “",
                    deferredQuery,
                    "”."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/search-modal.tsx",
                lineNumber: 189,
                columnNumber: 320
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    results.map({
                        "SearchModal[results.map()]": (product)=>{
                            const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMediaUrl"])(product.primaryImageUrl);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                className: "group flex min-h-20 items-center gap-3 border-b border-black/10 px-4 py-2.5 last:border-b-0 hover:bg-[#f1f1f1]",
                                href: `/products/${product.slug}`,
                                onClick: onClose,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative size-14 shrink-0 overflow-hidden bg-[#f1f1f1]",
                                        children: imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            fill: true,
                                            alt: "",
                                            className: "object-contain p-1",
                                            sizes: "56px",
                                            src: imageUrl
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/search-modal.tsx",
                                            lineNumber: 192,
                                            columnNumber: 303
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                            className: "absolute inset-0 m-auto text-black/25",
                                            size: 20
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/search-modal.tsx",
                                            lineNumber: 192,
                                            columnNumber: 393
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/search-modal.tsx",
                                        lineNumber: 192,
                                        columnNumber: 219
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "truncate text-sm font-semibold",
                                                children: product.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/search-modal.tsx",
                                                lineNumber: 192,
                                                columnNumber: 503
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 text-xs text-black/50",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(product.effectivePrice)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/search-modal.tsx",
                                                lineNumber: 192,
                                                columnNumber: 567
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/search-modal.tsx",
                                        lineNumber: 192,
                                        columnNumber: 471
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        "aria-hidden": "true",
                                        className: "text-black/25 group-hover:text-black",
                                        size: 16
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/search-modal.tsx",
                                        lineNumber: 192,
                                        columnNumber: 659
                                    }, this)
                                ]
                            }, product.id, true, {
                                fileName: "[project]/src/components/layout/search-modal.tsx",
                                lineNumber: 192,
                                columnNumber: 20
                            }, this);
                        }
                    }["SearchModal[results.map()]"]),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "flex min-h-12 w-full items-center justify-between border-t border-black/15 px-4 text-xs font-semibold",
                        type: "button",
                        onClick: {
                            "SearchModal[<button>.onClick]": ()=>{
                                onClose();
                                router.push(`/products?search=${encodeURIComponent(deferredQuery)}`);
                            }
                        }["SearchModal[<button>.onClick]"],
                        children: [
                            "View all results ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                size: 15
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/search-modal.tsx",
                                lineNumber: 199,
                                columnNumber: 62
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/search-modal.tsx",
                        lineNumber: 194,
                        columnNumber: 42
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/search-modal.tsx",
                lineNumber: 189,
                columnNumber: 476
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 185,
            columnNumber: 11
        }, this);
        $[27] = deferredQuery;
        $[28] = isError;
        $[29] = isFetching;
        $[30] = onClose;
        $[31] = results;
        $[32] = router;
        $[33] = t13;
    } else {
        t13 = $[33];
    }
    let t14;
    if ($[34] !== t12 || $[35] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: panelRef,
            "aria-label": "Product search",
            className: "fixed inset-x-3 top-[108px] z-[70] mx-auto max-h-[min(620px,calc(100vh-124px))] max-w-xl overflow-hidden border border-black/20 bg-white shadow-[0_18px_55px_rgba(0,0,0,0.16)] lg:left-1/2 lg:right-auto lg:top-[150px] lg:w-[560px] lg:-translate-x-1/2",
            role: "dialog",
            children: [
                t12,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/search-modal.tsx",
            lineNumber: 212,
            columnNumber: 11
        }, this);
        $[34] = t12;
        $[35] = t13;
        $[36] = t14;
    } else {
        t14 = $[36];
    }
    return t14;
}
_s(SearchModal, "/WY2xNwPVrYoyo1zKeIr7fh3YKg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDeferredValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2f$products$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchProducts"]
    ];
});
_c = SearchModal;
var _c;
__turbopack_context__.k.register(_c, "SearchModal");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-client] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$auth$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/auth/auth-modal.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$cart$2d$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/cart/cart-drawer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/brand-logo.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth/hooks.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart.mutations.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/cart.queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$merge$2d$guest$2d$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cart/merge-guest-cart.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2f$categories$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/category/categories.queries.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$order$2f$claim$2d$guest$2d$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/order/claim-guest-orders.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/currency.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils/media.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/types/auth.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$mobile$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/mobile-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$search$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/search-modal.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const MPESA_TILL_NUMBER = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_MPESA_TILL_NUMBER?.trim();
const ANNOUNCEMENT_ITEMS = [
    {
        label: '0717502292',
        href: 'tel:+254717502292'
    },
    {
        label: MPESA_TILL_NUMBER ? `Till number: ${MPESA_TILL_NUMBER}` : 'Till number'
    },
    {
        label: 'Order tracking',
        href: '/track-order'
    }
];
const FALLBACK_LINKS = [
    {
        href: '/products',
        label: 'Shop all'
    },
    {
        href: '/shop/categories',
        label: 'Categories'
    },
    {
        href: '/shop/brands',
        label: 'Brands'
    },
    {
        href: '/track-order',
        label: 'Track order'
    }
];
const CATEGORY_FALLBACK_LINKS = [
    {
        href: '/shop/categories/displays',
        label: 'Displays'
    },
    {
        href: '/shop/categories/workspace',
        label: 'Workspace'
    },
    {
        href: '/shop/categories/accessories',
        label: 'Accessories'
    },
    {
        href: '/shop/categories/complete-setups',
        label: 'Complete setups'
    }
];
const DESKTOP_ACTION = 'inline-flex min-h-11 items-center justify-center px-2 text-[11px] font-medium uppercase tracking-[0.14em] text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black';
const MOBILE_ACTION = 'relative inline-flex size-11 items-center justify-center text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';
function CartQuantity(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(3);
    if ($[0] !== "773c15ebdfa96bbbf8c5524c30031621e57047c19541c3a6a6a7bd871efa2b7d") {
        for(let $i = 0; $i < 3; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "773c15ebdfa96bbbf8c5524c30031621e57047c19541c3a6a6a7bd871efa2b7d";
    }
    const { count } = t0;
    if (!count || count < 1) {
        return null;
    }
    const t1 = count > 99 ? "99+" : count;
    let t2;
    if ($[1] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute right-0 top-0 text-[9px] font-semibold leading-none text-black",
            children: t1
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    return t2;
}
_c = CartQuantity;
function Navbar() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(131);
    if ($[0] !== "773c15ebdfa96bbbf8c5524c30031621e57047c19541c3a6a6a7bd871efa2b7d") {
        for(let $i = 0; $i < 131; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "773c15ebdfa96bbbf8c5524c30031621e57047c19541c3a6a6a7bd871efa2b7d";
    }
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { user, isAuthenticated, isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const { data: cart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const updateCartItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateCartItem"])();
    const removeCartItem = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRemoveFromCart"])();
    const { data: categoryTree } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2f$categories$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryTree"])(true);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [isAuthModalOpen, setIsAuthModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSearchOpen, setIsSearchOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isCartPreviewOpen, setIsCartPreviewOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cartPreviewTimer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    let t0;
    let t1;
    if ($[1] !== isAuthenticated || $[2] !== queryClient) {
        t0 = ({
            "Navbar[useEffect()]": ()=>{
                if (!isAuthenticated) {
                    return;
                }
                Promise.allSettled([
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$order$2f$claim$2d$guest$2d$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["claimGuestOrders"])(),
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$merge$2d$guest$2d$cart$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mergeGuestCart"])()
                ]).then({
                    "Navbar[useEffect() > (anonymous)()]": (results)=>{
                        const claimed = results[0].status === "fulfilled" ? results[0].value : 0;
                        const merged = results[1].status === "fulfilled" ? results[1].value : false;
                        if (claimed > 0) {
                            queryClient.invalidateQueries({
                                queryKey: [
                                    "orders"
                                ]
                            });
                        }
                        if (merged) {
                            queryClient.invalidateQueries({
                                queryKey: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cartKeys"].all
                            });
                        }
                    }
                }["Navbar[useEffect() > (anonymous)()]"]);
            }
        })["Navbar[useEffect()]"];
        t1 = [
            isAuthenticated,
            queryClient
        ];
        $[1] = isAuthenticated;
        $[2] = queryClient;
        $[3] = t0;
        $[4] = t1;
    } else {
        t0 = $[3];
        t1 = $[4];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t0, t1);
    let t2;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = ({
            "Navbar[showCartPreview]": ()=>{
                if (cartPreviewTimer.current) {
                    clearTimeout(cartPreviewTimer.current);
                }
                setIsCartPreviewOpen(true);
            }
        })["Navbar[showCartPreview]"];
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const showCartPreview = t2;
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = ({
            "Navbar[hideCartPreview]": ()=>{
                cartPreviewTimer.current = setTimeout({
                    "Navbar[hideCartPreview > setTimeout()]": ()=>setIsCartPreviewOpen(false)
                }["Navbar[hideCartPreview > setTimeout()]"], 160);
            }
        })["Navbar[hideCartPreview]"];
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const hideCartPreview = t3;
    let t4;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = ({
            "Navbar[openCart]": ()=>{
                setIsCartPreviewOpen(false);
                setIsCartOpen(true);
            }
        })["Navbar[openCart]"];
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const openCart = t4;
    let t5;
    if ($[8] !== isAuthenticated || $[9] !== user?.roles) {
        t5 = isAuthenticated && user?.roles.some(_NavbarAnonymous);
        $[8] = isAuthenticated;
        $[9] = user?.roles;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    const isAdminUser = t5;
    let t10;
    let t11;
    let t12;
    let t13;
    let t14;
    let t6;
    let t7;
    let t8;
    let t9;
    if ($[11] !== cart || $[12] !== categoryTree || $[13] !== isAuthenticated || $[14] !== isCartOpen || $[15] !== isCartPreviewOpen || $[16] !== isLoading || $[17] !== isMobileMenuOpen || $[18] !== isSearchOpen || $[19] !== pathname || $[20] !== removeCartItem || $[21] !== updateCartItem) {
        t14 = Symbol.for("react.early_return_sentinel");
        bb0: {
            const loadedCategoryLinks = (categoryTree ?? []).slice(0, 6).map(_NavbarAnonymous2);
            const categoryLinks = loadedCategoryLinks.length ? loadedCategoryLinks : CATEGORY_FALLBACK_LINKS;
            const primaryLinks = categoryLinks.length > 0 ? [
                ...categoryLinks,
                ...FALLBACK_LINKS
            ] : FALLBACK_LINKS;
            if (pathname.startsWith("/admin") || pathname.startsWith("/auth/") && pathname !== "/auth/profile") {
                t14 = null;
                break bb0;
            }
            t10 = "relative z-40 bg-white text-black";
            if ($[31] === Symbol.for("react.memo_cache_sentinel")) {
                t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-10 bg-[#1b1b1b] text-white lg:h-[52px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto grid h-full max-w-[1920px] grid-cols-3 items-stretch px-2 text-center text-[8px] font-semibold uppercase tracking-[0.08em] sm:px-6 sm:text-[9px] sm:tracking-[0.12em] lg:px-16 lg:text-[11px] lg:tracking-[0.17em]",
                        children: ANNOUNCEMENT_ITEMS.map(_NavbarANNOUNCEMENT_ITEMSMap)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 225,
                        columnNumber: 73
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 225,
                    columnNumber: 15
                }, this);
                $[31] = t11;
            } else {
                t11 = $[31];
            }
            let t15;
            if ($[32] === Symbol.for("react.memo_cache_sentinel")) {
                t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    "aria-label": "PickNQuicks home",
                    className: "inline-flex min-h-11 w-fit flex-col justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
                    href: "/",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandLogo"], {
                        markClassName: "size-11",
                        subtitle: "Tech & Workspace Essentials",
                        wordmarkClassName: "text-[29px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 232,
                        columnNumber: 228
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 232,
                    columnNumber: 15
                }, this);
                $[32] = t15;
            } else {
                t15 = $[32];
            }
            let t16;
            let t17;
            if ($[33] === Symbol.for("react.memo_cache_sentinel")) {
                t16 = ({
                    "Navbar[<button>.onClick]": ()=>setIsSearchOpen(true)
                })["Navbar[<button>.onClick]"];
                t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                    "aria-hidden": "true",
                    className: "mr-3 text-black",
                    size: 17,
                    strokeWidth: 1.5
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 243,
                    columnNumber: 15
                }, this);
                $[33] = t16;
                $[34] = t17;
            } else {
                t16 = $[33];
                t17 = $[34];
            }
            let t18;
            if ($[35] !== isSearchOpen) {
                t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-expanded": isSearchOpen,
                    "aria-haspopup": "dialog",
                    className: "flex min-h-12 w-full max-w-[460px] items-center border border-black/20 px-4 text-left text-[13px] font-normal tracking-[0.01em] text-black/45 transition-colors hover:border-black hover:text-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
                    type: "button",
                    onClick: t16,
                    children: [
                        t17,
                        "Search monitors, desks and workspace tools"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 252,
                    columnNumber: 15
                }, this);
                $[35] = isSearchOpen;
                $[36] = t18;
            } else {
                t18 = $[36];
            }
            let t19;
            if ($[37] !== isAuthenticated || $[38] !== isLoading) {
                t19 = isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: DESKTOP_ACTION,
                    children: "Account"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 260,
                    columnNumber: 27
                }, this) : isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: DESKTOP_ACTION,
                    href: "/auth/profile",
                    children: "Account"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 260,
                    columnNumber: 95
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: DESKTOP_ACTION,
                    type: "button",
                    onClick: {
                        "Navbar[<button>.onClick]": ()=>setIsAuthModalOpen(true)
                    }["Navbar[<button>.onClick]"],
                    children: "Account"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 260,
                    columnNumber: 166
                }, this);
                $[37] = isAuthenticated;
                $[38] = isLoading;
                $[39] = t19;
            } else {
                t19 = $[39];
            }
            let t20;
            if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
                t20 = ({
                    "Navbar[<div>.onBlur]": (event)=>{
                        if (!event.currentTarget.contains(event.relatedTarget)) {
                            hideCartPreview();
                        }
                    }
                })["Navbar[<div>.onBlur]"];
                $[40] = t20;
            } else {
                t20 = $[40];
            }
            const t21 = isCartOpen || isCartPreviewOpen;
            const t22 = `Open cart${cart?.totalItems ? `, ${cart.totalItems} items` : ""}`;
            let t23;
            if ($[41] === Symbol.for("react.memo_cache_sentinel")) {
                t23 = [
                    DESKTOP_ACTION,
                    "relative gap-2"
                ];
                $[41] = t23;
            } else {
                t23 = $[41];
            }
            let t24;
            if ($[42] === Symbol.for("react.memo_cache_sentinel")) {
                t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                    "aria-hidden": "true",
                    size: 18,
                    strokeWidth: 1.5
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 293,
                    columnNumber: 15
                }, this);
                $[42] = t24;
            } else {
                t24 = $[42];
            }
            const t25 = cart?.totalItems ? ` (${cart.totalItems})` : "";
            let t26;
            if ($[43] !== t25) {
                t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "Cart",
                        t25
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 301,
                    columnNumber: 15
                }, this);
                $[43] = t25;
                $[44] = t26;
            } else {
                t26 = $[44];
            }
            let t27;
            if ($[45] !== t21 || $[46] !== t22 || $[47] !== t26) {
                t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-expanded": t21,
                    "aria-haspopup": "dialog",
                    "aria-label": t22,
                    className: t23.join(" "),
                    type: "button",
                    onClick: openCart,
                    children: [
                        t24,
                        t26
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 309,
                    columnNumber: 15
                }, this);
                $[45] = t21;
                $[46] = t22;
                $[47] = t26;
                $[48] = t27;
            } else {
                t27 = $[48];
            }
            let t28;
            if ($[49] !== cart || $[50] !== isCartPreviewOpen || $[51] !== removeCartItem || $[52] !== updateCartItem) {
                t28 = isCartPreviewOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-0 top-full z-50 w-[390px] pt-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border border-black/15 bg-white shadow-[0_18px_50px_rgba(0,0,0,0.14)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between border-b border-black/10 px-5 py-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs font-semibold uppercase tracking-[0.14em]",
                                        children: "Your cart"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 319,
                                        columnNumber: 271
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-black/50",
                                        children: [
                                            cart?.totalItems ?? 0,
                                            " ",
                                            (cart?.totalItems ?? 0) === 1 ? "item" : "items"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 319,
                                        columnNumber: 349
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 319,
                                columnNumber: 185
                            }, this),
                            !cart || cart.items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-6 py-10 text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                                        "aria-hidden": "true",
                                        className: "mx-auto text-black/20",
                                        size: 32,
                                        strokeWidth: 1.25
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 319,
                                        columnNumber: 552
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-sm font-medium",
                                        children: "Your cart is empty"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 319,
                                        columnNumber: 649
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-xs leading-5 text-black/50",
                                        children: "Add workspace essentials to see them here."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 319,
                                        columnNumber: 711
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 319,
                                columnNumber: 512
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-5",
                                        children: cart.items.slice(0, 3).map({
                                            "Navbar[(anonymous)()]": (item_0)=>{
                                                const imageUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveMediaUrl"])(item_0.productImageUrl);
                                                const isUpdating = updateCartItem.isPending && updateCartItem.variables?.cartItemId === item_0.id;
                                                const isRemoving = removeCartItem.isPending && removeCartItem.variables === item_0.id;
                                                const isCartMutating = updateCartItem.isPending || removeCartItem.isPending;
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                    className: "grid grid-cols-[64px_minmax(0,1fr)] gap-3 border-b border-black/10 py-4 last:border-b-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            "aria-label": `View ${item_0.productName}`,
                                                            className: "relative aspect-square overflow-hidden bg-[#f2f1ee]",
                                                            href: `/products/${item_0.productSlug}`,
                                                            onClick: {
                                                                "Navbar[(anonymous)() > <Link>.onClick]": ()=>setIsCartPreviewOpen(false)
                                                            }["Navbar[(anonymous)() > <Link>.onClick]"],
                                                            children: imageUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                fill: true,
                                                                alt: "",
                                                                className: "object-cover",
                                                                sizes: "64px",
                                                                src: imageUrl
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                                lineNumber: 327,
                                                                columnNumber: 80
                                                            }, this) : null
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 153
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "min-w-0",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-start justify-between gap-4",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                            className: "line-clamp-2 text-xs font-medium leading-5 hover:underline",
                                                                            href: `/products/${item_0.productSlug}`,
                                                                            onClick: {
                                                                                "Navbar[(anonymous)() > <Link>.onClick]": ()=>setIsCartPreviewOpen(false)
                                                                            }["Navbar[(anonymous)() > <Link>.onClick]"],
                                                                            children: item_0.productName
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 327,
                                                                            columnNumber: 257
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "shrink-0 text-xs font-semibold",
                                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(item_0.totalWithTax)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 329,
                                                                            columnNumber: 99
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                    lineNumber: 327,
                                                                    columnNumber: 201
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-2.5 flex items-center justify-between gap-3",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex h-8 items-center rounded-full border border-black/20",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    "aria-label": `Decrease ${item_0.productName} quantity`,
                                                                                    className: "flex size-8 items-center justify-center rounded-l-full transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent",
                                                                                    disabled: isCartMutating || item_0.quantity <= 1,
                                                                                    type: "button",
                                                                                    onClick: {
                                                                                        "Navbar[(anonymous)() > <button>.onClick]": ()=>updateCartItem.mutate({
                                                                                                cartItemId: item_0.id,
                                                                                                quantity: item_0.quantity - 1
                                                                                            })
                                                                                    }["Navbar[(anonymous)() > <button>.onClick]"],
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                                                                        "aria-hidden": "true",
                                                                                        size: 12,
                                                                                        strokeWidth: 1.75
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                        lineNumber: 334,
                                                                                        columnNumber: 76
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 329,
                                                                                    columnNumber: 337
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    "aria-live": "polite",
                                                                                    className: "flex min-w-7 items-center justify-center text-[11px] font-semibold",
                                                                                    children: isUpdating ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                        "aria-label": "Updating quantity",
                                                                                        className: "animate-spin",
                                                                                        size: 12
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                        lineNumber: 334,
                                                                                        columnNumber: 260
                                                                                    }, this) : item_0.quantity
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 334,
                                                                                    columnNumber: 142
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                    "aria-label": `Increase ${item_0.productName} quantity`,
                                                                                    className: "flex size-8 items-center justify-center rounded-r-full transition-colors hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-transparent",
                                                                                    disabled: isCartMutating || !item_0.inStock || item_0.quantity >= item_0.availableStock,
                                                                                    type: "button",
                                                                                    onClick: {
                                                                                        "Navbar[(anonymous)() > <button>.onClick]": ()=>updateCartItem.mutate({
                                                                                                cartItemId: item_0.id,
                                                                                                quantity: item_0.quantity + 1
                                                                                            })
                                                                                    }["Navbar[(anonymous)() > <button>.onClick]"],
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                                                        "aria-hidden": "true",
                                                                                        size: 12,
                                                                                        strokeWidth: 1.75
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                        lineNumber: 339,
                                                                                        columnNumber: 76
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 334,
                                                                                    columnNumber: 363
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 329,
                                                                            columnNumber: 262
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            "aria-label": `Remove ${item_0.productName} from cart`,
                                                                            className: "inline-flex min-h-8 items-center gap-1.5 text-[11px] text-black/50 transition-colors hover:text-black disabled:cursor-not-allowed disabled:opacity-30",
                                                                            disabled: isCartMutating,
                                                                            type: "button",
                                                                            onClick: {
                                                                                "Navbar[(anonymous)() > <button>.onClick]": ()=>removeCartItem.mutate(item_0.id)
                                                                            }["Navbar[(anonymous)() > <button>.onClick]"],
                                                                            children: [
                                                                                isRemoving ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                                                    "aria-hidden": "true",
                                                                                    className: "animate-spin",
                                                                                    size: 13
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 341,
                                                                                    columnNumber: 88
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                                                    "aria-hidden": "true",
                                                                                    size: 13,
                                                                                    strokeWidth: 1.5
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                                    lineNumber: 341,
                                                                                    columnNumber: 156
                                                                                }, this),
                                                                                "Remove"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                                            lineNumber: 339,
                                                                            columnNumber: 147
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                                    lineNumber: 329,
                                                                    columnNumber: 198
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/layout/navbar.tsx",
                                                            lineNumber: 327,
                                                            columnNumber: 176
                                                        }, this)
                                                    ]
                                                }, item_0.id, true, {
                                                    fileName: "[project]/src/components/layout/navbar.tsx",
                                                    lineNumber: 325,
                                                    columnNumber: 28
                                                }, this);
                                            }
                                        }["Navbar[(anonymous)()]"])
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 319,
                                        columnNumber: 820
                                    }, this),
                                    cart.items.length > 3 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "border-t border-black/10 px-5 py-3 text-center text-[11px] text-black/50",
                                        children: [
                                            "+",
                                            cart.items.length - 3,
                                            " more",
                                            " ",
                                            cart.items.length - 3 === 1 ? "item" : "items"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 343,
                                        columnNumber: 76
                                    }, this) : null,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "border-t border-black/10 p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mb-4 flex items-center justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-black/55",
                                                        children: "Subtotal"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 368
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2f$currency$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatPriceKsh"])(cart.subtotal)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                                        lineNumber: 343,
                                                        columnNumber: 415
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                lineNumber: 343,
                                                columnNumber: 304
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                className: "flex min-h-12 items-center justify-center bg-black text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#292621]",
                                                href: "/cart",
                                                onClick: {
                                                    "Navbar[<Link>.onClick]": ()=>setIsCartPreviewOpen(false)
                                                }["Navbar[<Link>.onClick]"],
                                                children: "View cart"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/navbar.tsx",
                                                lineNumber: 343,
                                                columnNumber: 491
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/navbar.tsx",
                                        lineNumber: 343,
                                        columnNumber: 258
                                    }, this)
                                ]
                            }, void 0, true)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 319,
                        columnNumber: 98
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 319,
                    columnNumber: 35
                }, this) : null;
                $[49] = cart;
                $[50] = isCartPreviewOpen;
                $[51] = removeCartItem;
                $[52] = updateCartItem;
                $[53] = t28;
            } else {
                t28 = $[53];
            }
            let t29;
            if ($[54] !== t27 || $[55] !== t28) {
                t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    onBlur: t20,
                    onFocus: showCartPreview,
                    onMouseEnter: showCartPreview,
                    onMouseLeave: hideCartPreview,
                    children: [
                        t27,
                        t28
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 356,
                    columnNumber: 15
                }, this);
                $[54] = t27;
                $[55] = t28;
                $[56] = t29;
            } else {
                t29 = $[56];
            }
            let t30;
            if ($[57] !== t19 || $[58] !== t29) {
                t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    "aria-label": "Shopping actions",
                    className: "flex items-center gap-5",
                    children: [
                        t19,
                        t29
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 365,
                    columnNumber: 15
                }, this);
                $[57] = t19;
                $[58] = t29;
                $[59] = t30;
            } else {
                t30 = $[59];
            }
            let t31;
            if ($[60] !== t18 || $[61] !== t30) {
                t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto hidden h-[98px] max-w-[1920px] grid-cols-[minmax(300px,1fr)_minmax(300px,1.15fr)_auto] items-center gap-12 px-16 lg:grid",
                    children: [
                        t15,
                        t18,
                        t30
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 374,
                    columnNumber: 15
                }, this);
                $[60] = t18;
                $[61] = t30;
                $[62] = t31;
            } else {
                t31 = $[62];
            }
            let t32;
            let t33;
            if ($[63] === Symbol.for("react.memo_cache_sentinel")) {
                t32 = ({
                    "Navbar[<button>.onClick]": ()=>setIsMobileMenuOpen(true)
                })["Navbar[<button>.onClick]"];
                t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                    "aria-hidden": "true",
                    size: 21,
                    strokeWidth: 1.5
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 387,
                    columnNumber: 15
                }, this);
                $[63] = t32;
                $[64] = t33;
            } else {
                t32 = $[63];
                t33 = $[64];
            }
            let t34;
            if ($[65] !== isMobileMenuOpen) {
                t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-expanded": isMobileMenuOpen,
                    "aria-label": "Open menu",
                    className: MOBILE_ACTION,
                    type: "button",
                    onClick: t32,
                    children: t33
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 396,
                    columnNumber: 15
                }, this);
                $[65] = isMobileMenuOpen;
                $[66] = t34;
            } else {
                t34 = $[66];
            }
            let t35;
            if ($[67] === Symbol.for("react.memo_cache_sentinel")) {
                t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    "aria-label": "PickNQuicks home",
                    className: "mx-auto inline-flex min-h-11 items-center px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-black",
                    href: "/",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandLogo"], {
                        markClassName: "size-8",
                        wordmarkClassName: "text-[20px]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 404,
                        columnNumber: 193
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 404,
                    columnNumber: 15
                }, this);
                $[67] = t35;
            } else {
                t35 = $[67];
            }
            let t36;
            let t37;
            if ($[68] === Symbol.for("react.memo_cache_sentinel")) {
                t36 = ({
                    "Navbar[<button>.onClick]": ()=>setIsSearchOpen(true)
                })["Navbar[<button>.onClick]"];
                t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                    "aria-hidden": "true",
                    size: 19,
                    strokeWidth: 1.5
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 415,
                    columnNumber: 15
                }, this);
                $[68] = t36;
                $[69] = t37;
            } else {
                t36 = $[68];
                t37 = $[69];
            }
            let t38;
            if ($[70] !== isSearchOpen) {
                t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-expanded": isSearchOpen,
                    "aria-haspopup": "dialog",
                    "aria-label": "Search",
                    className: MOBILE_ACTION,
                    type: "button",
                    onClick: t36,
                    children: t37
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 424,
                    columnNumber: 15
                }, this);
                $[70] = isSearchOpen;
                $[71] = t38;
            } else {
                t38 = $[71];
            }
            let t39;
            let t40;
            if ($[72] === Symbol.for("react.memo_cache_sentinel")) {
                t39 = ({
                    "Navbar[<button>.onClick]": ()=>setIsCartOpen(true)
                })["Navbar[<button>.onClick]"];
                t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                    "aria-hidden": "true",
                    size: 19,
                    strokeWidth: 1.5
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 436,
                    columnNumber: 15
                }, this);
                $[72] = t39;
                $[73] = t40;
            } else {
                t39 = $[72];
                t40 = $[73];
            }
            const t41 = cart?.totalItems;
            let t42;
            if ($[74] !== t41) {
                t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-label": "Open cart",
                    className: MOBILE_ACTION,
                    type: "button",
                    onClick: t39,
                    children: [
                        t40,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartQuantity, {
                            count: t41
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 446,
                            columnNumber: 105
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 446,
                    columnNumber: 15
                }, this);
                $[74] = t41;
                $[75] = t42;
            } else {
                t42 = $[75];
            }
            let t43;
            if ($[76] !== isAuthenticated) {
                t43 = isAuthenticated ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    "aria-label": "Account",
                    className: MOBILE_ACTION,
                    href: "/auth/profile",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                        "aria-hidden": "true",
                        size: 19,
                        strokeWidth: 1.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 454,
                        columnNumber: 107
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 454,
                    columnNumber: 33
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-label": "Account",
                    className: MOBILE_ACTION,
                    type: "button",
                    onClick: {
                        "Navbar[<button>.onClick]": ()=>setIsAuthModalOpen(true)
                    }["Navbar[<button>.onClick]"],
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                        "aria-hidden": "true",
                        size: 19,
                        strokeWidth: 1.5
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/navbar.tsx",
                        lineNumber: 456,
                        columnNumber: 40
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 454,
                    columnNumber: 172
                }, this);
                $[76] = isAuthenticated;
                $[77] = t43;
            } else {
                t43 = $[77];
            }
            let t44;
            if ($[78] !== t38 || $[79] !== t42 || $[80] !== t43) {
                t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center",
                    children: [
                        t38,
                        t42,
                        t43
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 464,
                    columnNumber: 15
                }, this);
                $[78] = t38;
                $[79] = t42;
                $[80] = t43;
                $[81] = t44;
            } else {
                t44 = $[81];
            }
            let t45;
            if ($[82] !== t34 || $[83] !== t44) {
                t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid h-16 grid-cols-[44px_minmax(0,1fr)_auto] items-center px-3 lg:hidden",
                    children: [
                        t34,
                        t35,
                        t44
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 474,
                    columnNumber: 15
                }, this);
                $[82] = t34;
                $[83] = t44;
                $[84] = t45;
            } else {
                t45 = $[84];
            }
            if ($[85] !== t31 || $[86] !== t45) {
                t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-b border-black/15 bg-white",
                    children: [
                        t31,
                        t45
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 482,
                    columnNumber: 15
                }, this);
                $[85] = t31;
                $[86] = t45;
                $[87] = t12;
            } else {
                t12 = $[87];
            }
            const t46 = pathname === "/products" ? "page" : undefined;
            const t47 = `flex min-w-max snap-start items-center border-b-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${pathname === "/products" ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"}`;
            let t48;
            if ($[88] !== t46 || $[89] !== t47) {
                t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    "aria-current": t46,
                    className: t47,
                    href: "/products",
                    children: "Shop all"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/navbar.tsx",
                    lineNumber: 493,
                    columnNumber: 15
                }, this);
                $[88] = t46;
                $[89] = t47;
                $[90] = t48;
            } else {
                t48 = $[90];
            }
            let t49;
            if ($[91] !== pathname) {
                t49 = ({
                    "Navbar[categoryLinks.map()]": (link)=>{
                        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            "aria-current": active ? "page" : undefined,
                            className: `flex min-w-max snap-start items-center border-b-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors ${active ? "border-black text-black" : "border-transparent text-black/50 hover:text-black"}`,
                            href: link.href,
                            children: link.label
                        }, `mobile-${link.href}`, false, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 505,
                            columnNumber: 20
                        }, this);
                    }
                })["Navbar[categoryLinks.map()]"];
                $[91] = pathname;
                $[92] = t49;
            } else {
                t49 = $[92];
            }
            t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                "aria-label": "Product categories",
                className: "no-scrollbar flex h-12 snap-x items-stretch gap-1 overflow-x-auto border-b border-black/15 bg-white px-3 lg:hidden",
                children: [
                    t48,
                    categoryLinks.map(t49)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/navbar.tsx",
                lineNumber: 513,
                columnNumber: 13
            }, this);
            t9 = "hidden h-[68px] border-b border-black/15 bg-white lg:block";
            t6 = "Primary navigation";
            t7 = "mx-auto grid h-full max-w-[1920px] auto-cols-[minmax(112px,1fr)] grid-flow-col items-stretch overflow-x-auto px-16";
            let t50;
            if ($[93] !== pathname) {
                t50 = ({
                    "Navbar[primaryLinks.map()]": (link_0)=>{
                        const active_0 = pathname === link_0.href || pathname.startsWith(`${link_0.href}/`);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            "aria-current": active_0 ? "page" : undefined,
                            className: [
                                "flex min-h-11 items-center justify-center border-b px-3 text-center text-[10px] font-medium uppercase tracking-[0.13em] text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black",
                                active_0 ? "border-black" : "border-transparent"
                            ].join(" "),
                            href: link_0.href,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                children: link_0.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/navbar.tsx",
                                lineNumber: 522,
                                columnNumber: 476
                            }, this)
                        }, link_0.label + link_0.href, false, {
                            fileName: "[project]/src/components/layout/navbar.tsx",
                            lineNumber: 522,
                            columnNumber: 20
                        }, this);
                    }
                })["Navbar[primaryLinks.map()]"];
                $[93] = pathname;
                $[94] = t50;
            } else {
                t50 = $[94];
            }
            t8 = primaryLinks.map(t50);
        }
        $[11] = cart;
        $[12] = categoryTree;
        $[13] = isAuthenticated;
        $[14] = isCartOpen;
        $[15] = isCartPreviewOpen;
        $[16] = isLoading;
        $[17] = isMobileMenuOpen;
        $[18] = isSearchOpen;
        $[19] = pathname;
        $[20] = removeCartItem;
        $[21] = updateCartItem;
        $[22] = t10;
        $[23] = t11;
        $[24] = t12;
        $[25] = t13;
        $[26] = t14;
        $[27] = t6;
        $[28] = t7;
        $[29] = t8;
        $[30] = t9;
    } else {
        t10 = $[22];
        t11 = $[23];
        t12 = $[24];
        t13 = $[25];
        t14 = $[26];
        t6 = $[27];
        t7 = $[28];
        t8 = $[29];
        t9 = $[30];
    }
    if (t14 !== Symbol.for("react.early_return_sentinel")) {
        return t14;
    }
    let t15;
    if ($[95] !== isAdminUser) {
        t15 = isAdminUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "flex min-h-11 items-center justify-center border-b border-transparent px-3 text-[10px] font-medium uppercase tracking-[0.13em] text-black transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black",
            href: "/admin",
            children: "Admin"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 568,
            columnNumber: 25
        }, this) : null;
        $[95] = isAdminUser;
        $[96] = t15;
    } else {
        t15 = $[96];
    }
    let t16;
    if ($[97] !== t15 || $[98] !== t6 || $[99] !== t7 || $[100] !== t8) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            "aria-label": t6,
            className: t7,
            children: [
                t8,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 576,
            columnNumber: 11
        }, this);
        $[97] = t15;
        $[98] = t6;
        $[99] = t7;
        $[100] = t8;
        $[101] = t16;
    } else {
        t16 = $[101];
    }
    let t17;
    if ($[102] !== t16 || $[103] !== t9) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: t9,
            children: t16
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 587,
            columnNumber: 11
        }, this);
        $[102] = t16;
        $[103] = t9;
        $[104] = t17;
    } else {
        t17 = $[104];
    }
    let t18;
    if ($[105] !== t10 || $[106] !== t11 || $[107] !== t12 || $[108] !== t13 || $[109] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: t10,
            children: [
                t11,
                t12,
                t13,
                t17
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 596,
            columnNumber: 11
        }, this);
        $[105] = t10;
        $[106] = t11;
        $[107] = t12;
        $[108] = t13;
        $[109] = t17;
        $[110] = t18;
    } else {
        t18 = $[110];
    }
    let t19;
    let t20;
    let t21;
    if ($[111] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = ({
            "Navbar[<MobileMenu>.onClose]": ()=>setIsMobileMenuOpen(false)
        })["Navbar[<MobileMenu>.onClose]"];
        t20 = ({
            "Navbar[<MobileMenu>.onSearch]": ()=>setIsSearchOpen(true)
        })["Navbar[<MobileMenu>.onSearch]"];
        t21 = ({
            "Navbar[<MobileMenu>.onSignIn]": ()=>setIsAuthModalOpen(true)
        })["Navbar[<MobileMenu>.onSignIn]"];
        $[111] = t19;
        $[112] = t20;
        $[113] = t21;
    } else {
        t19 = $[111];
        t20 = $[112];
        t21 = $[113];
    }
    let t22;
    if ($[114] !== isMobileMenuOpen) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$mobile$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MobileMenu"], {
            isOpen: isMobileMenuOpen,
            onClose: t19,
            onSearch: t20,
            onSignIn: t21
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 629,
            columnNumber: 11
        }, this);
        $[114] = isMobileMenuOpen;
        $[115] = t22;
    } else {
        t22 = $[115];
    }
    let t23;
    if ($[116] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = ({
            "Navbar[<SearchModal>.onClose]": ()=>setIsSearchOpen(false)
        })["Navbar[<SearchModal>.onClose]"];
        $[116] = t23;
    } else {
        t23 = $[116];
    }
    let t24;
    if ($[117] !== isSearchOpen) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$search$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SearchModal"], {
            isOpen: isSearchOpen,
            onClose: t23
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 646,
            columnNumber: 11
        }, this);
        $[117] = isSearchOpen;
        $[118] = t24;
    } else {
        t24 = $[118];
    }
    let t25;
    if ($[119] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = ({
            "Navbar[<AuthModal>.onClose]": ()=>setIsAuthModalOpen(false)
        })["Navbar[<AuthModal>.onClose]"];
        $[119] = t25;
    } else {
        t25 = $[119];
    }
    let t26;
    if ($[120] !== isAuthModalOpen) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$auth$2f$auth$2d$modal$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthModal"], {
            isOpen: isAuthModalOpen,
            onClose: t25
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 663,
            columnNumber: 11
        }, this);
        $[120] = isAuthModalOpen;
        $[121] = t26;
    } else {
        t26 = $[121];
    }
    let t27;
    if ($[122] === Symbol.for("react.memo_cache_sentinel")) {
        t27 = ({
            "Navbar[<CartDrawer>.onClose]": ()=>setIsCartOpen(false)
        })["Navbar[<CartDrawer>.onClose]"];
        $[122] = t27;
    } else {
        t27 = $[122];
    }
    let t28;
    if ($[123] !== isCartOpen) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$cart$2f$cart$2d$drawer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CartDrawer"], {
            isOpen: isCartOpen,
            onClose: t27
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 680,
            columnNumber: 11
        }, this);
        $[123] = isCartOpen;
        $[124] = t28;
    } else {
        t28 = $[124];
    }
    let t29;
    if ($[125] !== t18 || $[126] !== t22 || $[127] !== t24 || $[128] !== t26 || $[129] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t18,
                t22,
                t24,
                t26,
                t28
            ]
        }, void 0, true);
        $[125] = t18;
        $[126] = t22;
        $[127] = t24;
        $[128] = t26;
        $[129] = t28;
        $[130] = t29;
    } else {
        t29 = $[130];
    }
    return t29;
}
_s(Navbar, "yB3OQ6iwq8XtfkFouufCo7+2zBc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useQueryClient"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2f$hooks$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUpdateCartItem"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cart$2f$cart$2e$mutations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRemoveFromCart"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$category$2f$categories$2e$queries$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCategoryTree"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c1 = Navbar;
function _NavbarANNOUNCEMENT_ITEMSMap(item, index) {
    const className = `flex min-w-0 items-center justify-center px-1.5 transition-colors hover:text-white/70 sm:px-3 ${index > 0 ? "border-l border-white/15" : ""}`;
    if ("href" in item && item.href.startsWith("/")) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: className,
            href: item.href,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "truncate",
                children: item.label
            }, void 0, false, {
                fileName: "[project]/src/components/layout/navbar.tsx",
                lineNumber: 703,
                columnNumber: 74
            }, this)
        }, item.label, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 703,
            columnNumber: 12
        }, this);
    }
    if ("href" in item) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
            className: className,
            href: item.href,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "truncate",
                children: item.label
            }, void 0, false, {
                fileName: "[project]/src/components/layout/navbar.tsx",
                lineNumber: 706,
                columnNumber: 71
            }, this)
        }, item.label, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 706,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "truncate",
            children: item.label
        }, void 0, false, {
            fileName: "[project]/src/components/layout/navbar.tsx",
            lineNumber: 708,
            columnNumber: 55
        }, this)
    }, item.label, false, {
        fileName: "[project]/src/components/layout/navbar.tsx",
        lineNumber: 708,
        columnNumber: 10
    }, this);
}
function _NavbarAnonymous2(category) {
    return {
        href: `/shop/categories/${encodeURIComponent(category.slug)}`,
        label: category.name
    };
}
function _NavbarAnonymous(role) {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].ADMIN,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].STAFF,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$types$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserRole"].MANAGER
    ].includes(role);
}
var _c, _c1;
__turbopack_context__.k.register(_c, "CartQuantity");
__turbopack_context__.k.register(_c1, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/site-footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SiteFooter",
    ()=>SiteFooter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageSearch$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package-search.js [app-client] (ecmascript) <export default as PackageSearch>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/smartphone.js [app-client] (ecmascript) <export default as Smartphone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/truck.js [app-client] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-round.js [app-client] (ecmascript) <export default as UserRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/common/brand-logo.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
const TRUST_ITEMS = [
    {
        title: 'M-Pesa payments',
        description: 'Pay from your phone at checkout',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$smartphone$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Smartphone$3e$__["Smartphone"]
    },
    {
        title: 'Delivery options',
        description: 'Choose an available option at checkout',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"]
    },
    {
        title: 'Order tracking',
        description: 'Follow the progress of your order',
        href: '/track-order',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2d$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PackageSearch$3e$__["PackageSearch"]
    },
    {
        title: 'Account access',
        description: 'Review your orders after signing in',
        href: '/orders',
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserRound$3e$__["UserRound"]
    }
];
const FOOTER_GROUPS = [
    {
        title: 'Shop',
        links: [
            {
                label: 'All products',
                href: '/products'
            },
            {
                label: 'Categories',
                href: '/shop/categories'
            },
            {
                label: 'Brands',
                href: '/shop/brands'
            }
        ]
    },
    {
        title: 'Orders',
        links: [
            {
                label: 'Track an order',
                href: '/track-order'
            },
            {
                label: 'My orders',
                href: '/orders'
            },
            {
                label: 'View cart',
                href: '/cart'
            }
        ]
    },
    {
        title: 'Account',
        links: [
            {
                label: 'Profile',
                href: '/auth/profile'
            },
            {
                label: 'Sign in',
                href: '/auth/login'
            },
            {
                label: 'Create account',
                href: '/auth/register'
            },
            {
                label: 'Settings',
                href: '/settings'
            }
        ]
    }
];
const FOOTER_LINK = 'inline-flex min-h-8 items-center text-[12px] tracking-[0.02em] text-black/65 transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black';
function SiteFooter() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(11);
    if ($[0] !== "34c3746c348fb8716abb39a2fb68d84e56c943c8dbc4400333cd6d4e212e5f12") {
        for(let $i = 0; $i < 11; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "34c3746c348fb8716abb39a2fb68d84e56c943c8dbc4400333cd6d4e212e5f12";
    }
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (pathname.startsWith("/admin") || pathname.startsWith("/auth/") && pathname !== "/auth/profile") {
        return null;
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "sr-only",
            id: "footer-services-heading",
            children: "Shopping services"
        }, void 0, false, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 82,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "aria-labelledby": "footer-services-heading",
            className: "border-b border-black/15 bg-[#f1f1f1]",
            children: [
                t0,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "mx-auto grid max-w-[1920px] grid-cols-2 gap-x-4 px-6 sm:px-10 lg:grid-cols-4 lg:gap-7 lg:px-16",
                    children: TRUST_ITEMS.map(_SiteFooterTRUST_ITEMSMap)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/site-footer.tsx",
                    lineNumber: 89,
                    columnNumber: 115
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto grid max-w-[1920px] grid-cols-3 gap-x-3 gap-y-10 px-6 py-10 sm:gap-x-6 sm:px-10 md:grid-cols-4 lg:px-16 lg:py-16 xl:grid-cols-[1.65fr_1fr_1fr_1.1fr] xl:gap-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                    className: "col-span-3 md:col-span-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            "aria-label": "PickNQuicks home",
                            className: "inline-flex min-h-8 items-center text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black",
                            href: "/",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$common$2f$brand$2d$logo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BrandLogo"], {
                                markClassName: "size-9",
                                wordmarkClassName: "text-[22px]"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/site-footer.tsx",
                                lineNumber: 96,
                                columnNumber: 446
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/site-footer.tsx",
                            lineNumber: 96,
                            columnNumber: 240
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-4 max-w-[270px] text-[12px] leading-[1.65] text-black/60",
                            children: "Thoughtfully selected technology and workspace essentials for a more comfortable, capable setup."
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/site-footer.tsx",
                            lineNumber: 96,
                            columnNumber: 521
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/site-footer.tsx",
                    lineNumber: 96,
                    columnNumber: 194
                }, this),
                FOOTER_GROUPS.map(_SiteFooterFOOTER_GROUPSMap)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 96,
            columnNumber: 10
        }, this);
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: [
                "© ",
                new Date().getFullYear(),
                " PickNQuicks. All rights reserved."
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 103,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
            "aria-label": "Legal links",
            className: "mt-2 flex flex-wrap gap-x-4 gap-y-1",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "underline-offset-4 hover:text-black hover:underline",
                    href: "/terms",
                    children: "Terms & Conditions"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/site-footer.tsx",
                    lineNumber: 110,
                    columnNumber: 88
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "underline-offset-4 hover:text-black hover:underline",
                    href: "/privacy",
                    children: "Data Privacy"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/site-footer.tsx",
                    lineNumber: 110,
                    columnNumber: 201
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    className: "underline-offset-4 hover:text-black hover:underline",
                    href: "/licenses",
                    children: "Licenses"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/site-footer.tsx",
                    lineNumber: 110,
                    columnNumber: 306
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 110,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    let t5;
    if ($[6] !== t3) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-[10px] leading-[1.6] tracking-[0.03em] text-black/55",
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 117,
            columnNumber: 10
        }, this);
        $[6] = t3;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-label": "Accepted payment methods",
            className: "flex flex-wrap items-center gap-2 md:justify-end",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "inline-flex min-h-6 items-center border border-black/20 px-2 text-[9px] font-semibold uppercase tracking-[0.06em]",
                children: "M-Pesa"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/site-footer.tsx",
                lineNumber: 125,
                columnNumber: 114
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 125,
            columnNumber: 10
        }, this);
        $[8] = t6;
    } else {
        t6 = $[8];
    }
    let t7;
    if ($[9] !== t5) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "border-t border-black/15 bg-white text-black",
            id: "site-footer",
            children: [
                t1,
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-[1920px] border-t border-black/15 px-6 py-5 sm:px-10 lg:px-16",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid items-center gap-4 md:grid-cols-[1fr_auto]",
                        children: [
                            t5,
                            t6
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/site-footer.tsx",
                        lineNumber: 132,
                        columnNumber: 193
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/site-footer.tsx",
                    lineNumber: 132,
                    columnNumber: 100
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 132,
            columnNumber: 10
        }, this);
        $[9] = t5;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    return t7;
}
_s(SiteFooter, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = SiteFooter;
function _SiteFooterFOOTER_GROUPSMap(group) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
        "aria-label": group.title + " links",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-black",
                children: group.title
            }, void 0, false, {
                fileName: "[project]/src/components/layout/site-footer.tsx",
                lineNumber: 141,
                columnNumber: 69
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                children: group.links.map(_SiteFooterFOOTER_GROUPSMapGroupLinksMap)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/site-footer.tsx",
                lineNumber: 141,
                columnNumber: 172
            }, this)
        ]
    }, group.title, true, {
        fileName: "[project]/src/components/layout/site-footer.tsx",
        lineNumber: 141,
        columnNumber: 10
    }, this);
}
function _SiteFooterFOOTER_GROUPSMapGroupLinksMap(link) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: FOOTER_LINK,
            href: link.href,
            children: link.label
        }, void 0, false, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 144,
            columnNumber: 30
        }, this)
    }, link.href, false, {
        fileName: "[project]/src/components/layout/site-footer.tsx",
        lineNumber: 144,
        columnNumber: 10
    }, this);
}
function _SiteFooterTRUST_ITEMSMap(item) {
    const Icon = item.icon;
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "flex min-h-[82px] items-center gap-3 py-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                "aria-hidden": "true",
                className: "h-7 w-7 shrink-0 text-black",
                strokeWidth: 1.5
            }, void 0, false, {
                fileName: "[project]/src/components/layout/site-footer.tsx",
                lineNumber: 148,
                columnNumber: 79
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "min-w-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "block text-[11px] font-semibold uppercase tracking-[0.08em] text-black",
                        children: item.title
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/site-footer.tsx",
                        lineNumber: 148,
                        columnNumber: 190
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mt-1 block text-[11px] leading-[1.4] text-black/55",
                        children: item.description
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/site-footer.tsx",
                        lineNumber: 148,
                        columnNumber: 298
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/site-footer.tsx",
                lineNumber: 148,
                columnNumber: 164
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/site-footer.tsx",
        lineNumber: 148,
        columnNumber: 19
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
        className: "border-b border-black/10 sm:border-b-0",
        children: "href" in item ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            className: "block transition-opacity hover:opacity-55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-black",
            href: item.href,
            children: content
        }, void 0, false, {
            fileName: "[project]/src/components/layout/site-footer.tsx",
            lineNumber: 149,
            columnNumber: 100
        }, this) : content
    }, item.title, false, {
        fileName: "[project]/src/components/layout/site-footer.tsx",
        lineNumber: 149,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "SiteFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/providers/query-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "QueryProvider",
    ()=>QueryProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function QueryProvider(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "836a1ae44adce37cd01a639af420534230c29c03ca72091986ed8874b9812d93") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "836a1ae44adce37cd01a639af420534230c29c03ca72091986ed8874b9812d93";
    }
    const { children } = t0;
    const [queryClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(_QueryProviderUseState);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toaster"], {
            richColors: true,
            position: "top-right"
        }, void 0, false, {
            fileName: "[project]/src/lib/providers/query-provider.tsx",
            lineNumber: 21,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== children || $[3] !== queryClient) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
            client: queryClient,
            children: [
                children,
                t1
            ]
        }, void 0, true, {
            fileName: "[project]/src/lib/providers/query-provider.tsx",
            lineNumber: 28,
            columnNumber: 10
        }, this);
        $[2] = children;
        $[3] = queryClient;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    return t2;
}
_s(QueryProvider, "0C9cZBrJebEGOHgNahhDk1PI7/o=");
_c = QueryProvider;
function _QueryProviderUseState() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["QueryClient"]({
        defaultOptions: {
            queries: {
                gcTime: 300000,
                refetchOnReconnect: true,
                refetchOnWindowFocus: false,
                retry: 1,
                staleTime: 60000
            }
        }
    });
}
var _c;
__turbopack_context__.k.register(_c, "QueryProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_efe0cef4._.js.map