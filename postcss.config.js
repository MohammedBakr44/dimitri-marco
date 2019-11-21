module.exports = {
    plugins: [
        require("postcss-export-vars")({
            file: "src/shared/ts/modules/scss-vars",
            type: "js",
            match: "open"
        }).process("src/shared/scss/abstract/_variables.scss")
    ]
};
