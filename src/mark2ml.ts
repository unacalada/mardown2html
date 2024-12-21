#!/usr/bin/env node

import {AST} from "./ast";
import {Traverse} from "./traverse";
import {JSDOM} from "jsdom"
import { Command } from 'commander';
import { html as ml } from 'js-beautify';
import fs from "fs"
import {css_dark, css_light} from "./utils/variables";
// Function to format HTML content
 function formatHTML(htmlContent:any) {
    return ml(htmlContent, {
        indent_size: 2,
        indent_char: ' ',
        preserve_newlines: true,
        max_preserve_newlines: 1
    });
}


const html = `  <!DOCTYPE html> <html lang="en"><body></body></html>`

const program = new Command()

const dom = new JSDOM(html)
const document = dom.window.document

async function mark2ml({input,css,output}:{input:string,css:string,output:string}){
    const ast =await AST(input)
    const children = ast.children
    Traverse(children,document)
    const style = (document).createElement("style")
    if(css == 'css:light'){
        style.innerHTML = `  .markdown-body {
    max-width: 650px;
    margin: 40px auto;
    padding: 0 10px;
    width: 100vh;
    box-sizing: border-box;
    text-align: center;
}
    
${css_light}`
    } else if (css == 'css:dark'){
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
    
${css_dark}`
    }
    document.head.append(style)
    return output

}

(async()=>{
    program
        .version('1.0.0')
        .description('A cli tool to turn markdown to html')
        .option('-i, --input <file>', 'Path to the input markdown file file')
        .option('-m, --mode <mode>', 'place css for light mode(l) or dark mode(d)')
         .option('-o, --output <output>', 'output file', false)
        .parse(process.argv);
    const options = program.opts();
  const output =  await  mark2ml({input:options.input,css:options.mode || 'css:light',output:options.output || 'index.html'})
    const inner = document.body.innerHTML
    document.body.innerHTML = `<div class="markdown-body">${inner}</div>`
    const html = formatHTML(dom.serialize())
    fs.writeFile(output,html, (err:any) =>{
        if (err) {
            console.error(err);
        }
        console.log(`file saved to ${options.output}`)

    })


})()