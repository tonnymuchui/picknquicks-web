(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/home/before-after-slider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BeforeAfterSlider",
    ()=>BeforeAfterSlider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function BeforeAfterSlider(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "2e731be2b60fa350fe0f8428b4f5ecd6b45a4f23ccbe068de258e155e5992b2b") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2e731be2b60fa350fe0f8428b4f5ecd6b45a4f23ccbe068de258e155e5992b2b";
    }
    const { beforeSrc, afterSrc, beforeAlt, afterAlt, className: t1 } = t0;
    const className = t1 === undefined ? "" : t1;
    const [position, setPosition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(50);
    const t2 = `relative isolate aspect-[4/5] overflow-hidden bg-[#eee9e1] sm:aspect-[16/10] ${className}`;
    let t3;
    if ($[1] !== afterAlt || $[2] !== afterSrc) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fill: true,
            alt: afterAlt,
            className: "select-none object-cover",
            draggable: false,
            sizes: "(min-width: 1024px) 58vw, 100vw",
            src: afterSrc
        }, void 0, false, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 34,
            columnNumber: 10
        }, this);
        $[1] = afterAlt;
        $[2] = afterSrc;
        $[3] = t3;
    } else {
        t3 = $[3];
    }
    const t4 = `inset(0 ${100 - position}% 0 0)`;
    let t5;
    if ($[4] !== t4) {
        t5 = {
            clipPath: t4
        };
        $[4] = t4;
        $[5] = t5;
    } else {
        t5 = $[5];
    }
    let t6;
    if ($[6] !== beforeSrc) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fill: true,
            alt: "",
            className: "select-none object-cover",
            draggable: false,
            sizes: "(min-width: 1024px) 58vw, 100vw",
            src: beforeSrc
        }, void 0, false, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 54,
            columnNumber: 10
        }, this);
        $[6] = beforeSrc;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    let t7;
    if ($[8] !== t5 || $[9] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": "true",
            className: "absolute inset-0 overflow-hidden",
            style: t5,
            children: t6
        }, void 0, false, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[8] = t5;
        $[9] = t6;
        $[10] = t7;
    } else {
        t7 = $[10];
    }
    let t8;
    if ($[11] !== beforeAlt) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "sr-only",
            children: beforeAlt
        }, void 0, false, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 71,
            columnNumber: 10
        }, this);
        $[11] = beforeAlt;
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    const t9 = `${position}%`;
    let t10;
    if ($[13] !== t9) {
        t10 = {
            left: t9
        };
        $[13] = t9;
        $[14] = t10;
    } else {
        t10 = $[14];
    }
    let t11;
    if ($[15] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-lg sm:size-16",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                    "aria-hidden": "true",
                    className: "-mr-1 size-5",
                    strokeWidth: 1.8
                }, void 0, false, {
                    fileName: "[project]/src/components/home/before-after-slider.tsx",
                    lineNumber: 90,
                    columnNumber: 207
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                    "aria-hidden": "true",
                    className: "-ml-1 size-5",
                    strokeWidth: 1.8
                }, void 0, false, {
                    fileName: "[project]/src/components/home/before-after-slider.tsx",
                    lineNumber: 90,
                    columnNumber: 284
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 90,
            columnNumber: 11
        }, this);
        $[15] = t11;
    } else {
        t11 = $[15];
    }
    let t12;
    if ($[16] !== t10) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-y-0 z-10 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]",
            style: t10,
            children: t11
        }, void 0, false, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 97,
            columnNumber: 11
        }, this);
        $[16] = t10;
        $[17] = t12;
    } else {
        t12 = $[17];
    }
    const t13 = `${position}% before image visible`;
    let t14;
    if ($[18] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = {
            touchAction: "pan-y"
        };
        $[18] = t14;
    } else {
        t14 = $[18];
    }
    let t15;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t15 = ({
            "BeforeAfterSlider[<input>.onChange]": (event)=>setPosition(Number(event.currentTarget.value))
        })["BeforeAfterSlider[<input>.onChange]"];
        $[19] = t15;
    } else {
        t15 = $[19];
    }
    let t16;
    if ($[20] !== position || $[21] !== t13) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
            "aria-label": "Compare before and after images",
            "aria-valuetext": t13,
            className: "absolute inset-0 z-20 h-full w-full cursor-col-resize opacity-0",
            max: "100",
            min: "0",
            step: "1",
            style: t14,
            type: "range",
            value: position,
            onChange: t15
        }, void 0, false, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 124,
            columnNumber: 11
        }, this);
        $[20] = position;
        $[21] = t13;
        $[22] = t16;
    } else {
        t16 = $[22];
    }
    let t17;
    if ($[23] !== t12 || $[24] !== t16 || $[25] !== t2 || $[26] !== t3 || $[27] !== t7 || $[28] !== t8) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
            className: t2,
            children: [
                t3,
                t7,
                t8,
                t12,
                t16
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/before-after-slider.tsx",
            lineNumber: 133,
            columnNumber: 11
        }, this);
        $[23] = t12;
        $[24] = t16;
        $[25] = t2;
        $[26] = t3;
        $[27] = t7;
        $[28] = t8;
        $[29] = t17;
    } else {
        t17 = $[29];
    }
    return t17;
}
_s(BeforeAfterSlider, "8RP0lCmCE883IDz6dg+bmEmk8Bs=");
_c = BeforeAfterSlider;
var _c;
__turbopack_context__.k.register(_c, "BeforeAfterSlider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/editorial-carousel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditorialCarousel",
    ()=>EditorialCarousel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function EditorialCarousel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(41);
    if ($[0] !== "a3d1a78d88be9845b2279e3cb28dd1f61075ea0e20b5d6d384d91ba56c6bd238") {
        for(let $i = 0; $i < 41; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "a3d1a78d88be9845b2279e3cb28dd1f61075ea0e20b5d6d384d91ba56c6bd238";
    }
    const { items, className: t1, label: t2 } = t0;
    const className = t1 === undefined ? "" : t1;
    const label = t2 === undefined ? "Editorial gallery" : t2;
    const [activeIndex, setActiveIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const itemCount = items.length;
    let t3;
    if ($[1] !== itemCount) {
        t3 = ({
            "EditorialCarousel[showPrevious]": ()=>{
                setActiveIndex({
                    "EditorialCarousel[showPrevious > setActiveIndex()]": (current)=>(current - 1 + itemCount) % itemCount
                }["EditorialCarousel[showPrevious > setActiveIndex()]"]);
            }
        })["EditorialCarousel[showPrevious]"];
        $[1] = itemCount;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const showPrevious = t3;
    let t4;
    if ($[3] !== itemCount) {
        t4 = ({
            "EditorialCarousel[showNext]": ()=>{
                setActiveIndex({
                    "EditorialCarousel[showNext > setActiveIndex()]": (current_0)=>(current_0 + 1) % itemCount
                }["EditorialCarousel[showNext > setActiveIndex()]"]);
            }
        })["EditorialCarousel[showNext]"];
        $[3] = itemCount;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    const showNext = t4;
    if (itemCount === 0) {
        return null;
    }
    const normalizedIndex = activeIndex % itemCount;
    const activeItem = items[normalizedIndex];
    const hasCaption = activeItem.eyebrow || activeItem.title || activeItem.body;
    const t5 = `outline-none ${className}`;
    let t6;
    if ($[5] !== showNext || $[6] !== showPrevious) {
        t6 = ({
            "EditorialCarousel[<section>.onKeyDown]": (event)=>{
                if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    showPrevious();
                }
                if (event.key === "ArrowRight") {
                    event.preventDefault();
                    showNext();
                }
            }
        })["EditorialCarousel[<section>.onKeyDown]"];
        $[5] = showNext;
        $[6] = showPrevious;
        $[7] = t6;
    } else {
        t6 = $[7];
    }
    const t7 = `motion-safe:animate-[fade-in_350ms_ease-out] ${activeItem.fit === "contain" ? "object-contain" : "object-cover"}`;
    const t8 = normalizedIndex === 0;
    let t9;
    if ($[8] !== activeItem.alt || $[9] !== activeItem.src || $[10] !== t7 || $[11] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fill: true,
            alt: activeItem.alt,
            className: t7,
            draggable: false,
            priority: t8,
            sizes: "(min-width: 1920px) 1792px, (min-width: 1024px) calc(100vw - 128px), (min-width: 640px) calc(100vw - 80px), calc(100vw - 48px)",
            src: activeItem.src
        }, activeItem.src, false, {
            fileName: "[project]/src/components/home/editorial-carousel.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[8] = activeItem.alt;
        $[9] = activeItem.src;
        $[10] = t7;
        $[11] = t8;
        $[12] = t9;
    } else {
        t9 = $[12];
    }
    let t10;
    if ($[13] !== itemCount || $[14] !== showNext || $[15] !== showPrevious) {
        t10 = itemCount > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-label": "Show previous image",
                    className: "absolute left-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:left-5 sm:size-14",
                    type: "button",
                    onClick: showPrevious,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                        "aria-hidden": "true",
                        className: "size-7",
                        strokeWidth: 1.8
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/editorial-carousel.tsx",
                        lineNumber: 109,
                        columnNumber: 424
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/editorial-carousel.tsx",
                    lineNumber: 109,
                    columnNumber: 29
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    "aria-label": "Show next image",
                    className: "absolute right-3 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:right-5 sm:size-14",
                    type: "button",
                    onClick: showNext,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                        "aria-hidden": "true",
                        className: "size-7",
                        strokeWidth: 1.8
                    }, void 0, false, {
                        fileName: "[project]/src/components/home/editorial-carousel.tsx",
                        lineNumber: 109,
                        columnNumber: 893
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/home/editorial-carousel.tsx",
                    lineNumber: 109,
                    columnNumber: 504
                }, this)
            ]
        }, void 0, true) : null;
        $[13] = itemCount;
        $[14] = showNext;
        $[15] = showPrevious;
        $[16] = t10;
    } else {
        t10 = $[16];
    }
    const t11 = normalizedIndex + 1;
    let t12;
    if ($[17] !== activeItem.alt || $[18] !== itemCount || $[19] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            "aria-live": "polite",
            className: "sr-only",
            children: [
                "Image ",
                t11,
                " of ",
                itemCount,
                ": ",
                activeItem.alt
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/editorial-carousel.tsx",
            lineNumber: 120,
            columnNumber: 11
        }, this);
        $[17] = activeItem.alt;
        $[18] = itemCount;
        $[19] = t11;
        $[20] = t12;
    } else {
        t12 = $[20];
    }
    let t13;
    if ($[21] !== t10 || $[22] !== t12 || $[23] !== t9) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative h-64 overflow-hidden rounded-[1.75rem] bg-[#eee9e1] sm:h-96 lg:h-[560px] 2xl:h-[620px]",
            children: [
                t9,
                t10,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/editorial-carousel.tsx",
            lineNumber: 130,
            columnNumber: 11
        }, this);
        $[21] = t10;
        $[22] = t12;
        $[23] = t9;
        $[24] = t13;
    } else {
        t13 = $[24];
    }
    let t14;
    if ($[25] !== activeItem.body || $[26] !== activeItem.eyebrow || $[27] !== activeItem.title || $[28] !== hasCaption) {
        t14 = hasCaption ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-2xl px-5 pt-8 text-center sm:pt-10",
            children: [
                activeItem.eyebrow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#9a5d3b]",
                    children: activeItem.eyebrow
                }, void 0, false, {
                    fileName: "[project]/src/components/home/editorial-carousel.tsx",
                    lineNumber: 140,
                    columnNumber: 112
                }, this) : null,
                activeItem.title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                    className: "text-2xl font-normal tracking-[-0.02em] text-[#1f1c17] sm:text-3xl",
                    children: activeItem.title
                }, void 0, false, {
                    fileName: "[project]/src/components/home/editorial-carousel.tsx",
                    lineNumber: 140,
                    columnNumber: 248
                }, this) : null,
                activeItem.body ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-3 text-sm leading-6 text-[#5f5a52] sm:text-base sm:leading-7",
                    children: activeItem.body
                }, void 0, false, {
                    fileName: "[project]/src/components/home/editorial-carousel.tsx",
                    lineNumber: 140,
                    columnNumber: 381
                }, this) : null
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/editorial-carousel.tsx",
            lineNumber: 140,
            columnNumber: 24
        }, this) : null;
        $[25] = activeItem.body;
        $[26] = activeItem.eyebrow;
        $[27] = activeItem.title;
        $[28] = hasCaption;
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] !== itemCount || $[31] !== items || $[32] !== normalizedIndex) {
        t15 = itemCount > 1 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "aria-label": "Choose gallery image",
            className: "mt-5 flex justify-center gap-2",
            role: "group",
            children: items.map({
                "EditorialCarousel[items.map()]": (item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "aria-label": `Show image ${index + 1}`,
                        "aria-pressed": index === normalizedIndex,
                        className: `h-1.5 rounded-full transition-[width,background-color] motion-reduce:transition-none ${index === normalizedIndex ? "w-8 bg-black" : "w-1.5 bg-black/25 hover:bg-black/50"}`,
                        type: "button",
                        onClick: {
                            "EditorialCarousel[items.map() > <button>.onClick]": ()=>setActiveIndex(index)
                        }["EditorialCarousel[items.map() > <button>.onClick]"]
                    }, `${item.src}-${index}`, false, {
                        fileName: "[project]/src/components/home/editorial-carousel.tsx",
                        lineNumber: 152,
                        columnNumber: 60
                    }, this)
            }["EditorialCarousel[items.map()]"])
        }, void 0, false, {
            fileName: "[project]/src/components/home/editorial-carousel.tsx",
            lineNumber: 151,
            columnNumber: 27
        }, this) : null;
        $[30] = itemCount;
        $[31] = items;
        $[32] = normalizedIndex;
        $[33] = t15;
    } else {
        t15 = $[33];
    }
    let t16;
    if ($[34] !== label || $[35] !== t13 || $[36] !== t14 || $[37] !== t15 || $[38] !== t5 || $[39] !== t6) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            "aria-label": label,
            "aria-roledescription": "carousel",
            className: t5,
            role: "region",
            tabIndex: 0,
            onKeyDown: t6,
            children: [
                t13,
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/home/editorial-carousel.tsx",
            lineNumber: 165,
            columnNumber: 11
        }, this);
        $[34] = label;
        $[35] = t13;
        $[36] = t14;
        $[37] = t15;
        $[38] = t5;
        $[39] = t6;
        $[40] = t16;
    } else {
        t16 = $[40];
    }
    return t16;
}
_s(EditorialCarousel, "rd+5N/MkYjuYD0I+B+MlySxQysU=");
_c = EditorialCarousel;
var _c;
__turbopack_context__.k.register(_c, "EditorialCarousel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/home/workspace-motion-video.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WorkspaceMotionVideo",
    ()=>WorkspaceMotionVideo
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function WorkspaceMotionVideo(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "3bafe47135a5294dbd7eb39e22a37145e11a3be9dcf16974cd72b55d387ce9f9") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "3bafe47135a5294dbd7eb39e22a37145e11a3be9dcf16974cd72b55d387ce9f9";
    }
    const { poster, src } = t0;
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [shouldLoad, setShouldLoad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "WorkspaceMotionVideo[useEffect()]": ()=>{
                const video = videoRef.current;
                if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                    return;
                }
                const observer = new IntersectionObserver((t3)=>{
                    const [entry] = t3;
                    if (entry.isIntersecting) {
                        setShouldLoad(true);
                        observer.disconnect();
                    }
                }, {
                    rootMargin: "320px"
                });
                observer.observe(video);
                return ()=>observer.disconnect();
            }
        })["WorkspaceMotionVideo[useEffect()]"];
        t2 = [];
        $[1] = t1;
        $[2] = t2;
    } else {
        t1 = $[1];
        t2 = $[2];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    let t3;
    let t4;
    if ($[3] !== shouldLoad) {
        t3 = ({
            "WorkspaceMotionVideo[useEffect()]": ()=>{
                if (!shouldLoad || !videoRef.current) {
                    return;
                }
                videoRef.current.load();
                videoRef.current.play().catch(_WorkspaceMotionVideoUseEffectAnonymous);
            }
        })["WorkspaceMotionVideo[useEffect()]"];
        t4 = [
            shouldLoad
        ];
        $[3] = shouldLoad;
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t3, t4);
    let t5;
    if ($[6] !== shouldLoad || $[7] !== src) {
        t5 = shouldLoad ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
            src: src,
            type: src.endsWith(".webm") ? "video/webm" : "video/mp4"
        }, void 0, false, {
            fileName: "[project]/src/components/home/workspace-motion-video.tsx",
            lineNumber: 72,
            columnNumber: 23
        }, this) : null;
        $[6] = shouldLoad;
        $[7] = src;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== poster || $[10] !== shouldLoad || $[11] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
            ref: videoRef,
            loop: true,
            muted: true,
            playsInline: true,
            "aria-label": "Hands arranging a modern technology workspace",
            autoPlay: shouldLoad,
            className: "aspect-video w-full object-cover",
            poster: poster,
            preload: "none",
            children: t5
        }, void 0, false, {
            fileName: "[project]/src/components/home/workspace-motion-video.tsx",
            lineNumber: 81,
            columnNumber: 10
        }, this);
        $[9] = poster;
        $[10] = shouldLoad;
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    return t6;
}
_s(WorkspaceMotionVideo, "JZ2bmjwyS5lYNKInppGmhpBZeg0=");
_c = WorkspaceMotionVideo;
function _WorkspaceMotionVideoUseEffectAnonymous() {}
var _c;
__turbopack_context__.k.register(_c, "WorkspaceMotionVideo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronLeft
]);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-left", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronLeft",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>ChevronRight
]);
/**
 * @license lucide-react v0.576.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m9 18 6-6-6-6",
            key: "mthhwq"
        }
    ]
];
const ChevronRight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("chevron-right", __iconNode);
;
 //# sourceMappingURL=chevron-right.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChevronRight",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_7f63b97b._.js.map