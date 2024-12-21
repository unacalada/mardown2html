"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
const formats_1 = require("./utils/formats");
function list(child, document) {
    if (child.ordered === true) {
        const ordered = document.createElement('ol');
        for (let item of child.children) {
            const li = document.createElement("li");
            for (let subItem of item.children) {
                (0, formats_1.markdownText)(subItem, document, li);
            }
            ordered.append(li);
        }
        document.body.append(ordered);
    }
    else {
        const unordered = document.createElement('ul');
        for (let item of child.children) {
            const li = document.createElement("li");
            for (let subItem of item.children) {
                (0, formats_1.markdownText)(subItem, document, li);
            }
            unordered.append(li);
        }
        document.body.append(unordered);
    }
}
