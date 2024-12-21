"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = Header;
const formats_1 = require("./utils/formats");
//export const HeaderType = "Header"
function Header(ast, document) {
    const depth = ast.depth;
    // console.log(ast)
    const heading = document === null || document === void 0 ? void 0 : document.createElement(`h${depth}`);
    for (let thing of ast.children) {
        if (thing.type == "Str") {
            heading.innerHTML = thing.value;
        }
        (0, formats_1.markdownText)(thing, document, heading);
    }
    document.body.append(heading);
    // const value = child.children[0].value
    //  console.log(ast)
}
