"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockquote = blockquote;
exports.emphasia = emphasia;
exports.strongia = strongia;
exports.linkia = linkia;
exports.imageia = imageia;
exports.paragraph = paragraph;
exports.markdownText = markdownText;
function blockquote(ast, document, element) {
    const blockquoteElement = document === null || document === void 0 ? void 0 : document.createElement('blockquote');
    const children = ast === null || ast === void 0 ? void 0 : ast.children;
    console.log(children);
    children.forEach((child) => {
        if (child.type === 'Link') {
            linkia(child, document, blockquoteElement);
        }
        else if (child.type === 'Strong') {
            strongia(child, document, blockquoteElement);
        }
        else if (child.type === 'Emphasis') {
            emphasia(child, document, blockquoteElement);
        }
        else if (child.type === 'Str') {
            blockquoteElement.innerHTML = child.value;
        }
        else if (child.type === 'Paragraph') {
            paragraph(child, document, blockquoteElement);
        }
        else if (child.type === 'Image') {
            imageia(child, document, blockquoteElement);
        }
    });
    element === null || element === void 0 ? void 0 : element.append(blockquoteElement);
}
function emphasia(ast, document, element) {
    const em = document === null || document === void 0 ? void 0 : document.createElement('em');
    const children = ast === null || ast === void 0 ? void 0 : ast.children;
    children.forEach((child) => {
        if (child.type === 'Link') {
            linkia(child, document, em);
        }
        else if (child.type === 'Strong') {
            strongia(child, document, em);
        }
        else if (child.type === 'Str') {
            em.textContent += child.value;
        }
    });
    element === null || element === void 0 ? void 0 : element.append(em);
}
function strongia(ast, document, element) {
    const strong = document === null || document === void 0 ? void 0 : document.createElement('strong');
    const children = ast === null || ast === void 0 ? void 0 : ast.children;
    children.forEach((child) => {
        if (child.type === 'Link') {
            linkia(child, document, strong);
        }
        else if (child.type === 'Emphasis') {
            emphasia(child, document, strong);
        }
        else if (child.type === 'Str') {
            strong.textContent += child.value;
        }
    });
    element === null || element === void 0 ? void 0 : element.append(strong);
}
function linkia(ast, document, element) {
    var _a;
    const link = document === null || document === void 0 ? void 0 : document.createElement('a');
    const value = (_a = ast === null || ast === void 0 ? void 0 : ast.children[0]) === null || _a === void 0 ? void 0 : _a.value;
    const url = ast === null || ast === void 0 ? void 0 : ast.url;
    link.textContent = value;
    link.href = url;
    element === null || element === void 0 ? void 0 : element.append(link);
}
function imageia(ast, document, element) {
    const img = document === null || document === void 0 ? void 0 : document.createElement('img');
    const src = ast === null || ast === void 0 ? void 0 : ast.url;
    const alt = (ast === null || ast === void 0 ? void 0 : ast.alt) || '';
    img.src = src;
    img.alt = alt;
    element === null || element === void 0 ? void 0 : element.append(img);
}
function paragraph(ast, document, element) {
    const p = document === null || document === void 0 ? void 0 : document.createElement('p');
    const children = ast === null || ast === void 0 ? void 0 : ast.children;
    children.forEach((child) => {
        if (child.type === 'Link') {
            linkia(child, document, p);
        }
        else if (child.type === 'Strong') {
            strongia(child, document, p);
        }
        else if (child.type === 'Emphasis') {
            emphasia(child, document, p);
        }
        else if (child.type === 'Str') {
            p.textContent += child.value;
        }
        else if (child.type === 'Image') {
            imageia(child, document, element);
        }
    });
    if (p.textContent.trim() !== '') {
        element === null || element === void 0 ? void 0 : element.append(p);
    }
}
function markdownText(ast, document, element) {
    switch (ast.type) {
        case 'Emphasis':
            emphasia(ast, document, element);
            break;
        case 'Strong':
            strongia(ast, document, element);
            break;
        case 'Link':
            linkia(ast, document, element);
            break;
        case 'Paragraph':
            paragraph(ast, document, element);
            break;
        case 'Image':
            imageia(ast, document, element);
            break;
        case 'BlockQuote':
            blockquote(ast, document, element);
            break;
        default:
            break;
    }
}
