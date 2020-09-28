import path from "path";
export default {
    alias: {
        // JS import 取代為絕對路徑
        "/@/": path.resolve(__dirname, "./src"),
    },
    cssPreprocessOptions: {
        sass: {
            // helpers->載入所有 vue 組件（不放入全局class以免重複載入）
            additionalData: `
                @import ./src/styles/_prepend.sass
            `,
        },
        scss: {
            // helpers->載入所有 vue 組件（不放入全局class以免重複載入）
            additionalData: `
                @import "./src/styles/_prepend.sass";
            `,
        },
    },
};
