import {Header} from "./Header";
import {list} from "./List";
import {markdownText} from "./utils/formats";
import {codeblock} from "./CodeBlock";
import {table} from "./Table";

export function Traverse(children:any,document:any) {
    for (let child of children) {
      //  console.log(JSON.stringify(child,null,2))
        if (child.type === "Header") {
            Header(child, document)

        }
        if (child.type == 'List'){
            list(child,document)

        }
        markdownText(child,document,document.body)

        if(child.type == 'CodeBlock'){
            codeblock(child,document)
        }
        if(child.type == 'Table'){
            // buggy
            table(child,document,document.body)
        }
        if(child.type == 'Html'){
            document.body.innerHTML += child.value
        }
        if(child.type == "HorizontalRule"){
            document.body.innerHTML += `<hr>`
        }
    }

}