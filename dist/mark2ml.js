#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ast_1 = require("./ast");
const traverse_1 = require("./traverse");
const jsdom_1 = require("jsdom");
const commander_1 = require("commander");
const js_beautify_1 = require("js-beautify");
const fs_1 = __importDefault(require("fs"));
const variables_1 = require("./utils/variables");
// Function to format HTML content
function formatHTML(htmlContent) {
    return (0, js_beautify_1.html)(htmlContent, {
        indent_size: 2,
        indent_char: ' ',
        preserve_newlines: true,
        max_preserve_newlines: 1
    });
}
const html = `  <!DOCTYPE html> <html lang="en"><body></body></html>`;
const program = new commander_1.Command();
const dom = new jsdom_1.JSDOM(html);
const document = dom.window.document;
function mark2ml(_a) {
    return __awaiter(this, arguments, void 0, function* ({ input, css, output }) {
        const ast = yield (0, ast_1.AST)(input);
        const children = ast.children;
        (0, traverse_1.Traverse)(children, document);
        const style = (document).createElement("style");
        if (css == 'css:light') {
            style.innerHTML = `  .markdown-body {
    max-width: 650px;
    margin: 40px auto;
    padding: 0 10px;
    width: 100vh;
    box-sizing: border-box;
    text-align: center;
}
    
${variables_1.css_light}`;
        }
        else if (css == 'css:dark') {
            style.innerHTML = `body {
  background-color: #0d1117;
} 
        .markdown-body {
    max-width: 650px;
    margin: 40px auto ! important;
    padding: 0 10px;
    width: 100vh;
    box-sizing: border-box;
   
    
}
    
${variables_1.css_dark}`;
        }
        document.head.append(style);
        return output;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    program
        .version('1.0.0')
        .description('A cli tool to turn markdown to html')
        .option('-i, --input <file>', 'Path to the input markdown file file')
        .option('-m, --mode <mode>', 'place css for light mode(l) or dark mode(d)')
        .option('-o, --output <output>', 'output file', false)
        .parse(process.argv);
    const options = program.opts();
    const output = yield mark2ml({ input: options.input, css: options.mode || 'css:light', output: options.output || 'index.html' });
    const inner = document.body.innerHTML;
    document.body.innerHTML = `<div class="markdown-body">${inner}</div>`;
    const html = formatHTML(dom.serialize());
    fs_1.default.writeFile(output, html, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`file saved to ${options.output}`);
    });
}))();
