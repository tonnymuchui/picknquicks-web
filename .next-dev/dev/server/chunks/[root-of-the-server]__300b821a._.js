module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/mappers.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any -- Boundary mapper accepts ungenerated Supabase rows. */ __turbopack_context__.s([
    "apiData",
    ()=>apiData,
    "mapBrand",
    ()=>mapBrand,
    "mapCategory",
    ()=>mapCategory,
    "mapOrder",
    ()=>mapOrder,
    "mapProduct",
    ()=>mapProduct,
    "page",
    ()=>page,
    "productSelect",
    ()=>productSelect
]);
const productSelect = '*,categories(name,slug),brands(name),product_images(*),bundle_components!bundle_components_bundle_product_id_fkey(quantity,component:products!bundle_components_component_product_id_fkey(id,name,slug,price,sale_price,active))';
function mapProduct(row) {
    const images = (row.product_images ?? []).map((image)=>({
            id: image.id,
            imageUrl: image.image_url,
            altText: image.alt_text,
            isPrimary: image.is_primary,
            displayOrder: image.display_order
        }));
    const available = Math.max(0, row.stock_quantity - row.reserved_quantity);
    const category = Array.isArray(row.categories) ? row.categories[0] : row.categories;
    const brand = Array.isArray(row.brands) ? row.brands[0] : row.brands;
    const bundleComponents = (row.bundle_components ?? []).filter((entry)=>entry.component?.active !== false).map((entry)=>{
        const component = entry.component ?? {};
        const quantity = Number(entry.quantity ?? 1);
        const unitPrice = Number(component.sale_price ?? component.price ?? 0);
        return {
            id: component.id,
            name: component.name,
            slug: component.slug,
            quantity,
            unitPrice,
            totalPrice: unitPrice * quantity
        };
    });
    const bundleOriginalPrice = bundleComponents.reduce((total, component)=>total + component.totalPrice, 0);
    const effectivePrice = Number(row.sale_price ?? row.price);
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        sku: row.sku,
        description: row.description,
        shortDescription: row.short_description,
        price: Number(row.price),
        salePrice: row.sale_price == null ? undefined : Number(row.sale_price),
        effectivePrice,
        taxRate: Number(row.tax_rate ?? 0),
        discountPercentage: row.sale_price ? Math.round((1 - Number(row.sale_price) / Number(row.price)) * 100) : undefined,
        categoryId: row.category_id,
        categoryName: category?.name,
        categorySlug: category?.slug,
        brandId: row.brand_id,
        brandName: brand?.name,
        stockQuantity: available,
        inStock: available > 0,
        lowStock: available <= row.low_stock_threshold,
        weightGrams: row.weight_grams,
        dimensions: row.dimensions,
        active: row.active,
        featured: row.featured,
        isBundle: Boolean(row.is_bundle),
        bundleComponents,
        bundleOriginalPrice: bundleOriginalPrice || undefined,
        bundleSavings: bundleOriginalPrice ? Math.max(0, bundleOriginalPrice - effectivePrice) : undefined,
        isDigital: false,
        requiresShipping: row.requires_shipping,
        averageRating: undefined,
        reviewCount: 0,
        saleCount: 0,
        viewCount: 0,
        primaryImageUrl: images.find((i)=>i.isPrimary)?.imageUrl ?? images[0]?.imageUrl,
        images,
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
function mapCategory(row) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        imageUrl: row.image_url,
        iconUrl: row.icon_url,
        active: row.active,
        displayOrder: row.display_order,
        parentId: row.parent_id,
        parentName: row.parent?.name,
        level: row.parent_id ? 1 : 0,
        fullPath: row.slug,
        hasChildren: false,
        childrenCount: 0,
        children: (row.children ?? []).map(mapCategory),
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
function mapBrand(row) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description,
        logoUrl: row.logo_url,
        bannerUrl: row.banner_url,
        websiteUrl: row.website_url,
        countryOfOrigin: row.country_of_origin,
        active: row.active,
        featured: row.featured,
        displayOrder: row.display_order,
        productCount: row.products?.[0]?.count ?? 0,
        metaTitle: row.meta_title,
        metaDescription: row.meta_description,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
function page(content, pageNumber, size, total) {
    return {
        content,
        page: pageNumber,
        size,
        totalElements: total,
        totalPages: Math.ceil(total / size),
        first: pageNumber === 0,
        last: (pageNumber + 1) * size >= total,
        hasNext: (pageNumber + 1) * size < total,
        hasPrevious: pageNumber > 0
    };
}
const apiData = (data, message = 'OK')=>({
        success: true,
        message,
        data,
        timestamp: new Date().toISOString()
    });
const paymentStatus = (status)=>({
        REQUIRES_ACTION: 'PENDING',
        PROCESSING: 'PROCESSING',
        SUCCEEDED: 'COMPLETED',
        FAILED: 'FAILED',
        CANCELLED: 'CANCELLED',
        EXPIRED: 'FAILED',
        REFUND_PENDING: 'PENDING',
        REFUNDED: 'REFUNDED'
    })[status] ?? 'PENDING';
function mapOrder(row, guestAccessToken) {
    const obligations = (row.payments ?? []).map((p)=>({
            id: p.id,
            purpose: p.purpose,
            paymentMethod: p.method,
            status: paymentStatus(p.status),
            amount: Number(p.amount),
            transactionId: p.provider_reference,
            phoneNumber: row.phone_number,
            mpesaReceiptNumber: p.provider_reference,
            paidAt: p.succeeded_at,
            failureReason: p.payment_attempts?.[0]?.provider_result_description
        }));
    const current = (row.payments ?? []).find((p)=>[
            'ORDER_TOTAL',
            'DELIVERY_FEE'
        ].includes(p.purpose));
    const outstandingAmount = (purposes)=>(row.payments ?? []).filter((payment)=>purposes.includes(payment.purpose) && payment.status !== 'SUCCEEDED').reduce((total, payment)=>total + Number(payment.amount), 0);
    return {
        id: row.id,
        orderNumber: row.order_number,
        userId: row.user_id,
        email: row.email,
        phoneNumber: row.phone_number,
        customerName: row.customer_name,
        status: row.status,
        source: row.source ?? 'ONLINE',
        paymentMethod: row.payment_method,
        paymentStatus: current ? paymentStatus(current.status) : row.payment_method === 'CASH_ON_DELIVERY' ? 'COMPLETED' : 'PENDING',
        items: (row.order_items ?? []).map((i)=>({
                id: i.id,
                productId: i.product_id,
                productName: i.product_name,
                productSku: i.product_sku,
                productImageUrl: i.product_image_url,
                quantity: i.quantity,
                unitPrice: Number(i.unit_price),
                taxRate: Number(i.tax_rate),
                subtotal: Number(i.subtotal),
                taxAmount: Number(i.tax_amount),
                total: Number(i.total)
            })),
        shippingAddress: row.shipping_address,
        payment: current ? obligations.find((p)=>p.id === current.id) : undefined,
        payments: obligations,
        subtotal: Number(row.subtotal),
        taxAmount: Number(row.tax_amount),
        shippingCost: Number(row.shipping_cost),
        totalAmount: Number(row.total_amount),
        paidAmount: Number(row.paid_amount),
        balanceDue: Number(row.balance_due),
        amountDueNow: outstandingAmount([
            'ORDER_TOTAL',
            'DELIVERY_FEE'
        ]),
        amountDueOnDelivery: outstandingAmount([
            'ORDER_BALANCE'
        ]),
        notes: row.notes,
        trackingNumber: row.tracking_number,
        estimatedDeliveryDate: row.estimated_delivery_date,
        isGuest: !row.user_id,
        guestAccessToken,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/net [external] (net, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("net", () => require("net"));

module.exports = mod;
}),
"[externals]/tls [external] (tls, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tls", () => require("tls"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[project]/src/lib/supabase/env.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "publicSupabaseEnv",
    ()=>publicSupabaseEnv,
    "serverSupabaseEnv",
    ()=>serverSupabaseEnv
]);
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
        secretKey: required('SUPABASE_SECRET_KEY', process.env.SUPABASE_SECRET_KEY)
    };
}
}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient,
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ws$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ws/wrapper.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/env.ts [app-route] (ecmascript)");
;
;
;
;
;
const serverWebSocket = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ws$2f$wrapper$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"];
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    const { url, publishableKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["publicSupabaseEnv"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(url, publishableKey, {
        realtime: {
            transport: serverWebSocket
        },
        cookies: {
            getAll: ()=>cookieStore.getAll(),
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));
                } catch  {}
            }
        }
    });
}
function createAdminClient() {
    const { url, secretKey } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$env$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["serverSupabaseEnv"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(url, secretKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        },
        realtime: {
            transport: serverWebSocket
        }
    });
}
}),
"[project]/src/app/api/[...path]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PATCH",
    ()=>PATCH,
    "POST",
    ()=>POST,
    "PUT",
    ()=>PUT
]);
/* eslint-disable @typescript-eslint/no-explicit-any -- Compatibility mapper is removed after legacy client hooks are retired. */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/mappers.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
;
;
const response = (data, status = 200)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["apiData"])(data), {
        status
    });
const error = (message, status = 400)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        success: false,
        message
    }, {
        status
    });
const number = (value, fallback)=>value == null ? fallback : Number(value);
async function requireStaff() {
    const scoped = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await scoped.auth.getUser();
    if (!user) {
        return null;
    }
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data } = await admin.from('user_roles').select('role').eq('user_id', user.id).in('role', [
        'ADMIN',
        'MANAGER',
        'STAFF'
    ]);
    return data?.length ? {
        user,
        admin
    } : null;
}
function productPatch(input) {
    return {
        name: input.name,
        slug: input.slug,
        sku: input.sku,
        description: input.description,
        short_description: input.shortDescription,
        price: input.price,
        sale_price: input.salePrice ?? null,
        cost_price: input.costPrice,
        category_id: input.categoryId,
        brand_id: input.brandId ?? null,
        stock_quantity: input.stockQuantity,
        low_stock_threshold: input.lowStockThreshold,
        weight_grams: input.weightGrams,
        dimensions: input.dimensions,
        active: input.active,
        featured: input.featured,
        requires_shipping: input.requiresShipping,
        display_order: input.displayOrder,
        meta_title: input.metaTitle,
        meta_description: input.metaDescription
    };
}
function categoryPatch(i) {
    return {
        name: i.name,
        slug: i.slug,
        description: i.description,
        image_url: i.imageUrl,
        icon_url: i.iconUrl,
        parent_id: i.parentId ?? null,
        display_order: i.displayOrder,
        active: i.active,
        meta_title: i.metaTitle,
        meta_description: i.metaDescription
    };
}
function brandPatch(i) {
    return {
        name: i.name,
        slug: i.slug,
        description: i.description,
        logo_url: i.logoUrl,
        banner_url: i.bannerUrl,
        website_url: i.websiteUrl,
        country_of_origin: i.countryOfOrigin,
        display_order: i.displayOrder,
        active: i.active,
        featured: i.featured,
        meta_title: i.metaTitle,
        meta_description: i.metaDescription
    };
}
function clean(value) {
    return Object.fromEntries(Object.entries(value).filter(([, v])=>v !== undefined));
}
function buildCategoryTree(rows) {
    const nodes = new Map(rows.map((row)=>{
        const category = {
            ...(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapCategory"])(row),
            children: []
        };
        return [
            category.id,
            category
        ];
    }));
    const roots = [];
    for (const node of nodes.values()){
        const parent = node.parentId ? nodes.get(node.parentId) : undefined;
        if (parent) {
            parent.children.push(node);
        } else {
            roots.push(node);
        }
    }
    const setMetadata = (node, level)=>{
        node.level = level;
        node.hasChildren = node.children.length > 0;
        node.childrenCount = node.children.length;
        node.children.forEach((child)=>setMetadata(child, level + 1));
    };
    roots.forEach((root)=>setMetadata(root, 0));
    return roots;
}
async function parseInput(request) {
    if (!request.headers.get('content-type')?.includes('multipart/form-data')) {
        return {
            fields: await request.json(),
            files: {}
        };
    }
    const form = await request.formData();
    const fields = {};
    const files = {};
    for (const [key, value] of form.entries()){
        if (value instanceof File) {
            files[key] = [
                ...files[key] ?? [],
                value
            ];
        } else {
            fields[key] = value;
        }
    }
    return {
        fields,
        files
    };
}
async function uploadMedia(admin, bucket, folder, file) {
    if (![
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
        'image/svg+xml'
    ].includes(file.type) || file.size > 5_242_880) {
        throw new Error('Use a JPG, PNG, WebP, AVIF, or SVG image smaller than 5 MB');
    }
    const extension = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '') || 'bin';
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await admin.storage.from(bucket).upload(path, file, {
        contentType: file.type
    });
    if (uploadError) {
        throw uploadError;
    }
    return admin.storage.from(bucket).getPublicUrl(path).data.publicUrl;
}
async function uploadSiteMedia(admin, folder, file) {
    const allowed = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/avif',
        'image/svg+xml',
        'video/mp4',
        'video/webm'
    ];
    if (!allowed.includes(file.type) || file.size > 26_214_400) {
        throw new Error('Use a supported image or MP4/WebM file smaller than 25 MB');
    }
    const extension = file.name.split('.').pop()?.replace(/[^a-z0-9]/gi, '') || 'bin';
    const path = `${folder}/${crypto.randomUUID()}.${extension}`;
    const { error: uploadError } = await admin.storage.from('site-media').upload(path, file, {
        contentType: file.type
    });
    if (uploadError) {
        throw uploadError;
    }
    return admin.storage.from('site-media').getPublicUrl(path).data.publicUrl;
}
function mapStorefrontSettings(row) {
    return {
        siteName: row.site_name,
        tagline: row.tagline,
        logoUrl: row.logo_url,
        heroImageUrl: row.hero_image_url,
        heroAltText: row.hero_alt_text,
        beforeImageUrl: row.before_image_url,
        afterImageUrl: row.after_image_url,
        motionVideoUrl: row.motion_video_url,
        motionVideoPosterUrl: row.motion_video_poster_url,
        updatedAt: row.updated_at
    };
}
function mapStorefrontMedia(row) {
    return {
        id: row.id,
        placement: row.placement,
        mediaUrl: row.media_url,
        altText: row.alt_text,
        eyebrow: row.eyebrow,
        title: row.title,
        body: row.body,
        displayOrder: row.display_order,
        active: row.active
    };
}
function mapCategoryStory(row) {
    return {
        id: row.id,
        categoryId: row.category_id,
        kind: row.kind,
        eyebrow: row.eyebrow ?? undefined,
        title: row.title,
        body: row.body ?? undefined,
        mediaUrl: row.media_url ?? undefined,
        altText: row.alt_text ?? undefined,
        displayOrder: row.display_order,
        active: row.active,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
async function cartIdentity(request) {
    const scoped = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
    const { data: { user } } = await scoped.auth.getUser();
    const guest = request.headers.get('x-guest-token');
    if (!user && !guest) {
        return null;
    }
    return user ? {
        userId: user.id,
        guestToken: null
    } : {
        userId: null,
        guestToken: guest
    };
}
async function loadCart(request, create = true) {
    const identity = await cartIdentity(request);
    if (!identity) {
        return null;
    }
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
    let q = admin.from('carts').select('*,cart_items(*,products(*,categories(name),brands(name),product_images(*)))').eq('status', 'ACTIVE');
    q = identity.userId ? q.eq('user_id', identity.userId) : q.eq('guest_token', identity.guestToken);
    let { data } = await q.maybeSingle();
    if (!data && create) {
        const inserted = await admin.from('carts').insert({
            user_id: identity.userId,
            guest_token: identity.guestToken,
            status: 'ACTIVE'
        }).select('*,cart_items(*,products(*,categories(name),brands(name),product_images(*)))').single();
        data = inserted.data;
    }
    return data;
}
function mapCart(row) {
    const items = (row?.cart_items ?? []).map((item)=>{
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapProduct"])(item.products);
        const subtotal = p.effectivePrice * item.quantity;
        const tax = subtotal * Number(item.products.tax_rate ?? 0);
        return {
            id: item.id,
            productId: p.id,
            productName: p.name,
            productSku: p.sku,
            productSlug: p.slug,
            productImageUrl: p.primaryImageUrl,
            price: p.effectivePrice,
            quantity: item.quantity,
            taxRate: Number(item.products.tax_rate ?? 0),
            itemTotal: subtotal,
            taxAmount: tax,
            totalWithTax: subtotal + tax,
            inStock: p.inStock,
            availableStock: p.stockQuantity,
            priceChanged: false
        };
    });
    const subtotal = items.reduce((s, i)=>s + i.itemTotal, 0), tax = items.reduce((s, i)=>s + i.taxAmount, 0);
    return {
        id: row.id,
        userId: row.user_id,
        guestToken: row.guest_token,
        status: row.status,
        items,
        totalItems: items.reduce((s, i)=>s + i.quantity, 0),
        subtotal,
        tax,
        total: subtotal + tax,
        isGuest: !row.user_id,
        expiresAt: row.expires_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}
async function GET(request, { params }) {
    const path = (await params).path;
    const url = new URL(request.url);
    const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
    if (path[0] === 'cart') {
        const cart = await loadCart(request);
        return cart ? response(mapCart(cart)) : error('Guest token required', 400);
    }
    if (path[0] === 'storefront-settings') {
        const { data, error: settingsError } = await admin.from('storefront_settings').select('*').eq('id', 1).single();
        return settingsError ? error(settingsError.message) : response(mapStorefrontSettings(data));
    }
    if (path[0] === 'storefront-media') {
        let mediaQuery = admin.from('storefront_media_items').select('*').eq('active', true).order('display_order');
        const placement = url.searchParams.get('placement');
        if (placement) {
            mediaQuery = mediaQuery.eq('placement', placement);
        }
        const { data, error: mediaError } = await mediaQuery;
        return mediaError ? error(mediaError.message) : response((data ?? []).map(mapStorefrontMedia));
    }
    if (path[0] === 'category-stories' && path[1]) {
        const staff = await requireStaff();
        let storyQuery = admin.from('category_story_items').select('*').eq('category_id', path[1]).order('display_order');
        if (!staff || url.searchParams.get('includeInactive') !== 'true') {
            storyQuery = storyQuery.eq('active', true);
        }
        const { data, error: storyError } = await storyQuery;
        return storyError ? error(storyError.message) : response((data ?? []).map(mapCategoryStory));
    }
    if (path[0] === 'orders') {
        let q = admin.from('orders').select('*,order_items(*),payments(*,payment_attempts(*))', {
            count: 'exact'
        }).order('created_at', {
            ascending: false
        });
        const scoped = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await scoped.auth.getUser();
        if (path[1] === 'track') {
            q = q.eq('order_number', url.searchParams.get('orderNumber') ?? '').eq('email', (url.searchParams.get('email') ?? '').toLowerCase());
            const { data } = await q.maybeSingle();
            return data ? response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapOrder"])(data)) : error('Order not found', 404);
        }
        if (path[1] === 'my-orders') {
            if (!user) {
                return error('Sign in required', 401);
            }
            q = q.eq('user_id', user.id);
        } else if (path[1]) {
            if (user) {
                const staff = await requireStaff();
                q = q.eq('id', path[1]);
                if (!staff) {
                    q = q.eq('user_id', user.id);
                }
            } else {
                const guestToken = request.headers.get('x-guest-order-token');
                if (!guestToken) {
                    return error('Order access is required', 403);
                }
                q = q.eq('id', path[1]);
            }
            const { data } = await q.maybeSingle();
            if (!user && data) {
                const guestToken = request.headers.get('x-guest-order-token');
                const guestHash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(guestToken)).then((value)=>Buffer.from(value).toString('hex'));
                if (guestHash !== data.guest_access_token_hash) {
                    return error('Order access is required', 403);
                }
            }
            return data ? response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapOrder"])(data)) : error('Order not found', 404);
        } else {
            const staff = await requireStaff();
            if (!staff) {
                return error('Forbidden', 403);
            }
        }
        const p = number(url.searchParams.get('page'), 0), size = number(url.searchParams.get('size'), 20);
        const { data, count, error: e } = await q.range(p * size, p * size + size - 1);
        return e ? error(e.message) : response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["page"])((data ?? []).map((row)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapOrder"])(row)), p, size, count ?? 0));
    }
    if (path[0] === 'products') {
        const staff = await requireStaff();
        const p = number(url.searchParams.get('page'), 0), size = number(url.searchParams.get('size'), 20);
        let q = admin.from('products').select(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productSelect"], {
            count: 'exact'
        });
        if (!staff) {
            q = q.eq('active', true);
        }
        if ([
            'active',
            'filter'
        ].includes(path[1])) {
            q = q.eq('active', true);
        }
        if (path[1] === 'category') {
            q = q.eq('category_id', path[2]);
        }
        if (path[1] === 'brand') {
            q = q.eq('brand_id', path[2]);
        }
        if (path[1] === 'search') {
            const search = (url.searchParams.get('query') ?? '').trim();
            if (search) {
                q = q.or(`name.ilike.%${search}%,sku.ilike.%${search}%,short_description.ilike.%${search}%`);
            }
        }
        if (url.searchParams.get('categoryId')) {
            q = q.eq('category_id', url.searchParams.get('categoryId'));
        }
        if (url.searchParams.get('brandId')) {
            q = q.eq('brand_id', url.searchParams.get('brandId'));
        }
        if (url.searchParams.get('minPrice')) {
            q = q.gte('price', url.searchParams.get('minPrice'));
        }
        if (url.searchParams.get('maxPrice')) {
            q = q.lte('price', url.searchParams.get('maxPrice'));
        }
        if (path.length === 2 && ![
            'active',
            'filter',
            'search'
        ].includes(path[1])) {
            const { data } = await q.or(`id.eq.${path[1]},slug.eq.${path[1]}`).maybeSingle();
            return data ? response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapProduct"])(data)) : error('Product not found', 404);
        }
        const { data, count, error: e } = await q.order('display_order').range(p * size, p * size + size - 1);
        return e ? error(e.message) : response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["page"])((data ?? []).map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapProduct"]), p, size, count ?? 0));
    }
    if (path[0] === 'categories') {
        const staff = await requireStaff();
        const childCollection = path[2] === 'children';
        let q = admin.from('categories').select('*,parent:categories(name)').order('display_order');
        if (!staff) {
            q = q.eq('active', true);
        }
        if ([
            'active',
            'tree',
            'roots'
        ].includes(path[1])) {
            q = q.eq('active', true);
        }
        if (path[1] === 'roots') {
            q = q.is('parent_id', null);
        }
        if (childCollection) {
            q = q.eq('parent_id', path[1]);
            if (path[3] === 'active') {
                q = q.eq('active', true);
            }
        }
        if (path[1] === 'slug') {
            q = q.eq('slug', path[2]);
        } else if (path.length === 2 && ![
            'active',
            'tree',
            'roots',
            'children'
        ].includes(path[1])) {
            q = q.eq('id', path[1]);
        }
        const { data, error: e } = await q;
        const mapped = (data ?? []).map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapCategory"]);
        return e ? error(e.message) : response(path[1] === 'tree' ? buildCategoryTree(data ?? []) : path[1] === 'slug' || path.length === 2 && ![
            'active',
            'tree',
            'roots'
        ].includes(path[1]) ? mapped[0] : mapped);
    }
    if (path[0] === 'brands') {
        const staff = await requireStaff();
        if (path[1] === 'countries') {
            const { data } = await admin.from('brands').select('country_of_origin').not('country_of_origin', 'is', null);
            return response([
                ...new Set(data?.map((x)=>x.country_of_origin))
            ]);
        }
        let q = admin.from('brands').select('*,products(count)', {
            count: 'exact'
        }).order('display_order');
        if (!staff) {
            q = q.eq('active', true);
        }
        if (path[1] === 'active') {
            q = q.eq('active', true);
        }
        if (path[1] === 'featured') {
            q = q.eq('featured', true);
        }
        if (path[1] === 'slug') {
            q = q.eq('slug', path[2]);
        }
        const p = number(url.searchParams.get('page'), 0), size = number(url.searchParams.get('size'), 20);
        const { data, count, error: e } = await q.range(p * size, p * size + size - 1);
        const mapped = (data ?? []).map(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBrand"]);
        return e ? error(e.message) : response(path[1] === 'slug' ? mapped[0] : path[1] ? mapped : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["page"])(mapped, p, size, count ?? 0));
    }
    if (path[0] === 'shipping') {
        const city = (url.searchParams.get('city') ?? '').trim().toLowerCase();
        const { data, error: shippingError } = await admin.from('shipping_zones').select('*').eq('active', true);
        if (shippingError) {
            return error('Unable to load delivery pricing', 500);
        }
        const zone = data?.find((z)=>z.cities.includes(city)) ?? data?.find((z)=>z.cities.length === 0);
        if (!zone) {
            return error('Delivery is not currently available for this location', 404);
        }
        return response(path[1] === 'delivery-days' ? zone.estimated_days : Number(zone.fee));
    }
    return error('Endpoint not found', 404);
}
async function POST(request, { params }) {
    const path = (await params).path;
    if (path[0] === 'orders' && path[1] === 'claim-guest') {
        const scoped = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await scoped.auth.getUser();
        if (!user) {
            return error('Sign in required', 401);
        }
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data: claimed, error: claimError } = await admin.rpc('claim_guest_orders_for_user', {
            p_user_id: user.id
        });
        return claimError ? error('Unable to link previous guest orders', 500) : response({
            claimed: Number(claimed ?? 0)
        });
    }
    if (path[0] === 'cart' && path[1] === 'merge') {
        const scoped = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await scoped.auth.getUser();
        if (!user) {
            return error('Sign in required', 401);
        }
        const guestToken = request.headers.get('x-guest-token');
        if (!guestToken || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(guestToken)) {
            return error('A valid guest cart is required', 400);
        }
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data: merged, error: mergeError } = await admin.rpc('merge_guest_cart', {
            p_guest_token: guestToken,
            p_user_id: user.id
        });
        return mergeError ? error('Unable to merge the guest cart', 500) : response({
            merged: Boolean(merged)
        });
    }
    if (path[0] === 'cart' && path[1] === 'items') {
        const body = await request.json();
        const cart = await loadCart(request);
        if (!cart) {
            return error('Cart unavailable');
        }
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data: product } = await admin.from('products').select('stock_quantity,reserved_quantity,active').eq('id', body.productId).single();
        if (!product?.active || product.stock_quantity - product.reserved_quantity < body.quantity) {
            return error('Requested quantity is unavailable', 409);
        }
        const current = cart.cart_items?.find((i)=>i.product_id === body.productId);
        const quantity = (current?.quantity ?? 0) + Number(body.quantity);
        await admin.from('cart_items').upsert({
            cart_id: cart.id,
            product_id: body.productId,
            quantity
        }, {
            onConflict: 'cart_id,product_id'
        });
        const updated = await loadCart(request, false);
        return response(mapCart(updated));
    }
    if (path[0] === 'orders') {
        const body = await request.json();
        const cart = await loadCart(request, false);
        if (!cart?.cart_items?.length) {
            return error('Cart is empty', 409);
        }
        const identity = await cartIdentity(request);
        const key = request.headers.get('idempotency-key') ?? crypto.randomUUID();
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data: created, error: e } = await admin.rpc('create_checkout', {
            p_idempotency_key: key,
            p_user_id: identity?.userId ?? null,
            p_email: body.email,
            p_phone: body.phoneNumber,
            p_customer_name: body.customerName,
            p_payment_method: body.paymentMethod,
            p_shipping_address: body.shippingAddress,
            p_items: cart.cart_items.map((i)=>({
                    productId: i.product_id,
                    quantity: i.quantity
                })),
            p_notes: body.notes ?? null
        });
        if (e) {
            return error(e.message, 409);
        }
        await admin.from('carts').update({
            status: 'CONVERTED'
        }).eq('id', cart.id);
        const { data: order } = await admin.from('orders').select('*,order_items(*),payments(*,payment_attempts(*))').eq('id', created.orderId).single();
        return response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapOrder"])(order, created.guestToken), 201);
    }
    const staff = await requireStaff();
    if (!staff) {
        return error('Forbidden', 403);
    }
    if (path[0] === 'storefront-media') {
        try {
            const { fields, files } = await parseInput(request);
            const file = files.file?.[0];
            if (!file || ![
                'JOURNAL',
                'GALLERY'
            ].includes(fields.placement)) {
                return error('An image and valid placement are required');
            }
            const mediaUrl = await uploadSiteMedia(staff.admin, `home/${fields.placement.toLowerCase()}`, file);
            const { data, error: mediaError } = await staff.admin.from('storefront_media_items').insert({
                placement: fields.placement,
                media_url: mediaUrl,
                alt_text: fields.altText || fields.title || file.name,
                eyebrow: fields.eyebrow || null,
                title: fields.title || null,
                body: fields.body || null,
                display_order: Number(fields.displayOrder || 0)
            }).select('*').single();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
            return mediaError ? error(mediaError.message) : response(mapStorefrontMedia(data), 201);
        } catch (mediaError) {
            return error(mediaError instanceof Error ? mediaError.message : 'Unable to upload media');
        }
    }
    if (path[0] === 'category-stories' && path[1]) {
        try {
            const { fields, files } = await parseInput(request);
            if (![
                'HERO',
                'SCENE',
                'GUIDE'
            ].includes(fields.kind) || !fields.title?.trim()) {
                return error('A valid section type and title are required');
            }
            const file = files.file?.[0];
            const mediaUrl = file ? await uploadMedia(staff.admin, 'product-media', `categories/${path[1]}/story`, file) : fields.mediaUrl || null;
            const { data, error: storyError } = await staff.admin.from('category_story_items').insert({
                category_id: path[1],
                kind: fields.kind,
                eyebrow: fields.eyebrow || null,
                title: fields.title.trim(),
                body: fields.body || null,
                media_url: mediaUrl,
                alt_text: fields.altText || fields.title.trim(),
                display_order: Number(fields.displayOrder || 0),
                active: fields.active !== 'false'
            }).select('*').single();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/shop/categories', 'layout');
            return storyError ? error(storyError.message) : response(mapCategoryStory(data), 201);
        } catch (storyError) {
            return error(storyError instanceof Error ? storyError.message : 'Unable to add story');
        }
    }
    if (path[0] === 'products' && path[1] && path[2] === 'images') {
        const { files } = await parseInput(request);
        const file = files.file?.[0];
        if (!file) {
            return error('Image file is required');
        }
        try {
            const imageUrl = await uploadMedia(staff.admin, 'product-media', path[1], file);
            const { data: existing } = await staff.admin.from('product_images').select('id').eq('product_id', path[1]);
            await staff.admin.from('product_images').insert({
                product_id: path[1],
                image_url: imageUrl,
                alt_text: file.name,
                is_primary: !existing?.length,
                display_order: existing?.length ?? 0
            });
            const { data } = await staff.admin.from('products').select(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productSelect"]).eq('id', path[1]).single();
            return response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapProduct"])(data));
        } catch (uploadError) {
            return error(uploadError instanceof Error ? uploadError.message : 'Upload failed');
        }
    }
    if (path[0] === 'brands' && path[1] && [
        'logo',
        'banner'
    ].includes(path[2])) {
        const { files } = await parseInput(request);
        const file = files.file?.[0];
        if (!file) {
            return error('Image file is required');
        }
        try {
            const imageUrl = await uploadMedia(staff.admin, 'brand-media', path[1], file);
            const column = path[2] === 'logo' ? 'logo_url' : 'banner_url';
            const { data } = await staff.admin.from('brands').update({
                [column]: imageUrl
            }).eq('id', path[1]).select('*,products(count)').single();
            return response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBrand"])(data));
        } catch (uploadError) {
            return error(uploadError instanceof Error ? uploadError.message : 'Upload failed');
        }
    }
    const input = await parseInput(request);
    const body = clean(input.fields);
    const table = path[0] === 'products' ? 'products' : path[0] === 'categories' ? 'categories' : path[0] === 'brands' ? 'brands' : null;
    if (!table) {
        return error('Endpoint not found', 404);
    }
    const patch = table === 'products' ? productPatch(body) : table === 'categories' ? categoryPatch(body) : brandPatch(body);
    const { data, error: e } = await staff.admin.from(table).insert(clean(patch)).select('*').single();
    if (!e && data && table === 'products' && input.files.imageFiles?.length) {
        for (const [index, file] of input.files.imageFiles.entries()){
            const imageUrl = await uploadMedia(staff.admin, 'product-media', data.id, file);
            await staff.admin.from('product_images').insert({
                product_id: data.id,
                image_url: imageUrl,
                alt_text: data.name,
                is_primary: index === 0,
                display_order: index
            });
        }
    }
    if (!e && data && table === 'categories') {
        const update = {};
        if (input.files.imageFile?.[0]) {
            update.image_url = await uploadMedia(staff.admin, 'product-media', `categories/${data.id}`, input.files.imageFile[0]);
        }
        if (input.files.iconFile?.[0]) {
            update.icon_url = await uploadMedia(staff.admin, 'product-media', `categories/${data.id}`, input.files.iconFile[0]);
        }
        if (Object.keys(update).length) {
            await staff.admin.from('categories').update(update).eq('id', data.id);
        }
    }
    if (!e && data && table === 'brands') {
        const update = {};
        if (input.files.logoFile?.[0]) {
            update.logo_url = await uploadMedia(staff.admin, 'brand-media', `${data.id}/logo`, input.files.logoFile[0]);
        }
        if (input.files.bannerFile?.[0]) {
            update.banner_url = await uploadMedia(staff.admin, 'brand-media', `${data.id}/banner`, input.files.bannerFile[0]);
        }
        if (Object.keys(update).length) {
            await staff.admin.from('brands').update(update).eq('id', data.id);
        }
    }
    return e ? error(e.message) : response(data, 201);
}
async function PUT(request, { params }) {
    const path = (await params).path;
    if (path[0] === 'cart' && path[1] === 'items' && path[2]) {
        const cart = await loadCart(request, false);
        if (!cart) {
            return error('Cart unavailable', 404);
        }
        const body = await request.json();
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const owns = cart.cart_items?.some((i)=>i.id === path[2]);
        if (!owns) {
            return error('Cart item not found', 404);
        }
        await admin.from('cart_items').update({
            quantity: Number(body.quantity)
        }).eq('id', path[2]);
        return response(mapCart(await loadCart(request, false)));
    }
    const staff = await requireStaff();
    if (!staff) {
        return error('Forbidden', 403);
    }
    if (path[0] === 'orders' && path[1] && path[2] === 'status') {
        const url = new URL(request.url);
        const status = url.searchParams.get('status');
        if (!status) {
            return error('Status is required');
        }
        const { data, error: transitionError } = await staff.admin.rpc('transition_order', {
            p_order_id: path[1],
            p_status: status,
            p_tracking: url.searchParams.get('trackingNumber'),
            p_actor: staff.user.id
        });
        if (transitionError) {
            return error(transitionError.message, 409);
        }
        const { data: order } = await staff.admin.from('orders').select('*,order_items(*),payments(*,payment_attempts(*))').eq('id', data.id).single();
        return response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapOrder"])(order));
    }
    const input = await parseInput(request);
    const body = clean(input.fields);
    const table = path[0] === 'products' ? 'products' : path[0] === 'categories' ? 'categories' : path[0] === 'brands' ? 'brands' : null;
    if (!table || !path[1]) {
        return error('Endpoint not found', 404);
    }
    const patch = table === 'products' ? productPatch(body) : table === 'categories' ? categoryPatch(body) : brandPatch(body);
    const { data, error: e } = await staff.admin.from(table).update(clean(patch)).eq('id', path[1]).select('*').single();
    if (!e && data && table === 'categories') {
        const update = {};
        if (input.files.imageFile?.[0]) {
            update.image_url = await uploadMedia(staff.admin, 'product-media', `categories/${data.id}`, input.files.imageFile[0]);
        }
        if (input.files.iconFile?.[0]) {
            update.icon_url = await uploadMedia(staff.admin, 'product-media', `categories/${data.id}`, input.files.iconFile[0]);
        }
        if (Object.keys(update).length) {
            await staff.admin.from('categories').update(update).eq('id', data.id);
        }
    }
    if (!e && data && table === 'brands') {
        const update = {};
        if (input.files.logoFile?.[0]) {
            update.logo_url = await uploadMedia(staff.admin, 'brand-media', `${data.id}/logo`, input.files.logoFile[0]);
        }
        if (input.files.bannerFile?.[0]) {
            update.banner_url = await uploadMedia(staff.admin, 'brand-media', `${data.id}/banner`, input.files.bannerFile[0]);
        }
        if (Object.keys(update).length) {
            await staff.admin.from('brands').update(update).eq('id', data.id);
        }
    }
    return e ? error(e.message) : response(data);
}
async function DELETE(request, { params }) {
    const path = (await params).path;
    if (path[0] === 'cart') {
        const cart = await loadCart(request, false);
        if (!cart) {
            return error('Cart unavailable', 404);
        }
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        if (path[1] === 'items' && path[2]) {
            await admin.from('cart_items').delete().eq('id', path[2]).eq('cart_id', cart.id);
        } else {
            await admin.from('cart_items').delete().eq('cart_id', cart.id);
        }
        return response(mapCart(await loadCart(request, false)));
    }
    if (path[0] === 'orders' && path[1]) {
        const scoped = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        const { data: { user } } = await scoped.auth.getUser();
        const admin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createAdminClient"])();
        const { data: order } = await admin.from('orders').select('user_id,guest_access_token_hash').eq('id', path[1]).single();
        if (!order) {
            return error('Order not found', 404);
        }
        const staff = await requireStaff();
        const guestToken = request.headers.get('x-guest-order-token');
        const guestHash = guestToken ? await crypto.subtle.digest('SHA-256', new TextEncoder().encode(guestToken)).then((value)=>Buffer.from(value).toString('hex')) : null;
        if (!staff && order.user_id !== user?.id && guestHash !== order.guest_access_token_hash) {
            return error('Forbidden', 403);
        }
        const { data, error: cancelError } = await admin.rpc('cancel_unpaid_order', {
            p_order_id: path[1],
            p_reason: new URL(request.url).searchParams.get('reason') ?? 'Cancelled by customer',
            p_actor: user?.id ?? null
        });
        if (cancelError) {
            return error(cancelError.message, 409);
        }
        const { data: updated } = await admin.from('orders').select('*,order_items(*),payments(*,payment_attempts(*))').eq('id', data.id).single();
        return response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapOrder"])(updated));
    }
    const staff = await requireStaff();
    if (!staff) {
        return error('Forbidden', 403);
    }
    if (path[0] === 'storefront-media' && path[1]) {
        const { error: mediaError } = await staff.admin.from('storefront_media_items').delete().eq('id', path[1]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
        return mediaError ? error(mediaError.message) : response(null);
    }
    if (path[0] === 'category-stories' && path[1] && path[2]) {
        const { error: storyError } = await staff.admin.from('category_story_items').delete().eq('id', path[2]).eq('category_id', path[1]);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/shop/categories', 'layout');
        return storyError ? error(storyError.message) : response(null);
    }
    if (path[0] === 'products' && path[1] && path[2] === 'images' && path[3]) {
        const { error: imageError } = await staff.admin.from('product_images').delete().eq('id', path[3]).eq('product_id', path[1]);
        return imageError ? error(imageError.message) : response(null);
    }
    if (path[0] === 'brands' && path[1] && [
        'logo',
        'banner'
    ].includes(path[2])) {
        const column = path[2] === 'logo' ? 'logo_url' : 'banner_url';
        const { data, error: imageError } = await staff.admin.from('brands').update({
            [column]: null
        }).eq('id', path[1]).select('*,products(count)').single();
        return imageError ? error(imageError.message) : response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapBrand"])(data));
    }
    const table = path[0] === 'products' ? 'products' : path[0] === 'categories' ? 'categories' : path[0] === 'brands' ? 'brands' : null;
    if (!table || !path[1]) {
        return error('Endpoint not found', 404);
    }
    const { error: e } = await staff.admin.from(table).delete().eq('id', path[1]);
    return e ? error(e.message) : response(null);
}
async function PATCH(request, { params }) {
    const path = (await params).path;
    const staff = await requireStaff();
    if (!staff) {
        return error('Forbidden', 403);
    }
    if (path[0] === 'category-stories' && path[1] && path[2]) {
        try {
            const { fields, files } = await parseInput(request);
            const update = {
                updated_at: new Date().toISOString()
            };
            if (fields.kind !== undefined) {
                if (![
                    'HERO',
                    'SCENE',
                    'GUIDE'
                ].includes(fields.kind)) {
                    return error('Invalid section type');
                }
                update.kind = fields.kind;
            }
            if (fields.title !== undefined) {
                update.title = fields.title.trim();
            }
            if (fields.eyebrow !== undefined) {
                update.eyebrow = fields.eyebrow || null;
            }
            if (fields.body !== undefined) {
                update.body = fields.body || null;
            }
            if (fields.altText !== undefined) {
                update.alt_text = fields.altText || null;
            }
            if (fields.mediaUrl !== undefined) {
                update.media_url = fields.mediaUrl || null;
            }
            if (fields.displayOrder !== undefined) {
                update.display_order = Number(fields.displayOrder);
            }
            if (fields.active !== undefined) {
                update.active = fields.active === 'true';
            }
            if (files.file?.[0]) {
                update.media_url = await uploadMedia(staff.admin, 'product-media', `categories/${path[1]}/story`, files.file[0]);
            }
            const { data, error: storyError } = await staff.admin.from('category_story_items').update(update).eq('id', path[2]).eq('category_id', path[1]).select('*').single();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/shop/categories', 'layout');
            return storyError ? error(storyError.message) : response(mapCategoryStory(data));
        } catch (storyError) {
            return error(storyError instanceof Error ? storyError.message : 'Unable to update story');
        }
    }
    if (path[0] === 'storefront-settings') {
        try {
            const { fields, files } = await parseInput(request);
            const update = {
                updated_at: new Date().toISOString(),
                updated_by: staff.user.id
            };
            if (fields.siteName !== undefined) {
                update.site_name = fields.siteName;
            }
            if (fields.tagline !== undefined) {
                update.tagline = fields.tagline;
            }
            if (fields.heroAltText !== undefined) {
                update.hero_alt_text = fields.heroAltText;
            }
            const uploads = [
                [
                    'logoFile',
                    'logo_url',
                    'branding'
                ],
                [
                    'heroFile',
                    'hero_image_url',
                    'home/hero'
                ],
                [
                    'beforeFile',
                    'before_image_url',
                    'home/before-after'
                ],
                [
                    'afterFile',
                    'after_image_url',
                    'home/before-after'
                ],
                [
                    'videoFile',
                    'motion_video_url',
                    'home/motion'
                ],
                [
                    'videoPosterFile',
                    'motion_video_poster_url',
                    'home/motion'
                ]
            ];
            for (const [field, column, folder] of uploads){
                const file = files[field]?.[0];
                if (file) {
                    update[column] = await uploadSiteMedia(staff.admin, folder, file);
                }
            }
            const { data, error: settingsError } = await staff.admin.from('storefront_settings').update(update).eq('id', 1).select('*').single();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["revalidatePath"])('/', 'layout');
            return settingsError ? error(settingsError.message) : response(mapStorefrontSettings(data));
        } catch (settingsError) {
            return error(settingsError instanceof Error ? settingsError.message : 'Unable to update media');
        }
    }
    if (path[0] === 'products' && path[1] && path[2] === 'images' && path[3]) {
        const input = await request.json();
        if (input.isPrimary === true) {
            await staff.admin.from('product_images').update({
                is_primary: false
            }).eq('product_id', path[1]);
        }
        const imagePatch = clean({
            alt_text: input.altText,
            display_order: input.displayOrder,
            is_primary: input.isPrimary
        });
        const { error: imageError } = await staff.admin.from('product_images').update(imagePatch).eq('id', path[3]).eq('product_id', path[1]);
        if (imageError) {
            return error(imageError.message);
        }
        const { data } = await staff.admin.from('products').select(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productSelect"]).eq('id', path[1]).single();
        return response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapProduct"])(data));
    }
    if (path[0] === 'products' && path[1] && path[2] === 'stock') {
        const input = await request.json();
        const { data, error: stockError } = await staff.admin.rpc('adjust_inventory', {
            p_product_id: path[1],
            p_quantity: Number(input.quantity),
            p_reason: input.reason ?? 'Admin adjustment',
            p_actor: staff.user.id,
            p_idempotency_key: request.headers.get('idempotency-key') ?? crypto.randomUUID()
        });
        if (stockError) {
            return error(stockError.message, 409);
        }
        const { data: product } = await staff.admin.from('products').select(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["productSelect"]).eq('id', data.id).single();
        return response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapProduct"])(product));
    }
    if (path[0] === 'categories' && path[1] === 'reorder') {
        const ids = await request.json();
        await Promise.all(ids.map((id, display_order)=>staff.admin.from('categories').update({
                display_order
            }).eq('id', id)));
        return response(null);
    }
    if (path[0] === 'categories' && path[1] && path[2] === 'move') {
        const newParentId = new URL(request.url).searchParams.get('newParentId');
        if (newParentId === path[1]) {
            return error('A category cannot be its own parent');
        }
        const { data, error: moveError } = await staff.admin.from('categories').update({
            parent_id: newParentId
        }).eq('id', path[1]).select('*').single();
        return moveError ? error(moveError.message) : response((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$mappers$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["mapCategory"])(data));
    }
    return error('Endpoint not found', 404);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__300b821a._.js.map