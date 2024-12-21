"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Traverse = Traverse;
const Header_1 = require("./Header");
const List_1 = require("./List");
const formats_1 = require("./utils/formats");
const CodeBlock_1 = require("./CodeBlock");
const Table_1 = require("./Table");
function Traverse(children, document) {
    for (let child of children) {
        //  console.log(JSON.stringify(child,null,2))
        if (child.type === "Header") {
            (0, Header_1.Header)(child, document);
        }
        if (child.type == 'List') {
            (0, List_1.list)(child, document);
        }
        (0, formats_1.markdownText)(child, document, document.body);
        if (child.type == 'CodeBlock') {
            (0, CodeBlock_1.codeblock)(child, document);
        }
        if (child.type == 'Table') {
            // buggy
            (0, Table_1.table)(child, document, document.body);
        }
        if (child.type == 'Html') {
            document.body.innerHTML += child.value;
        }
        if (child.type == "HorizontalRule") {
            document.body.innerHTML += `<hr>`;
        }
    }
}
