"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table = table;
const formats_1 = require("./utils/formats");
// not working ???
function table(ast, document, element) {
    const tableElement = document === null || document === void 0 ? void 0 : document.createElement('table');
    const alignments = ast.align;
    ast.children.forEach((row) => {
        const tr = document === null || document === void 0 ? void 0 : document.createElement('tr');
        row.children.forEach((cell, index) => {
            const td = document === null || document === void 0 ? void 0 : document.createElement('td');
            if (alignments && alignments[index]) {
                td.style.textAlign = alignments[index];
            }
            cell.children.forEach((child) => {
                if (child.type === 'Text') {
                    td.textContent += child.value;
                }
                else if (child.type === 'Link') {
                    (0, formats_1.linkia)(child, document, td);
                }
                else if (child.type === 'Emphasis') {
                    (0, formats_1.emphasia)(child, document, td);
                }
                else if (child.type === 'Strong') {
                    (0, formats_1.strongia)(child, document, td);
                }
                else if (child.type === 'Image') {
                    (0, formats_1.imageia)(child, document, td);
                }
            });
            tr === null || tr === void 0 ? void 0 : tr.appendChild(td);
        });
        tableElement === null || tableElement === void 0 ? void 0 : tableElement.appendChild(tr);
    });
    element === null || element === void 0 ? void 0 : element.appendChild(tableElement);
}
