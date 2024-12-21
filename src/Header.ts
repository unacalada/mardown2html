import { markdownText} from "./utils/formats";

//export const HeaderType = "Header"

export function Header(ast:any,document:any){
    const depth = ast.depth
   // console.log(ast)
    const heading = document?.createElement(`h${depth}`)
    for (let thing of ast.children){
        if(thing.type == "Str"){
            heading.innerHTML = thing.value
        }

            markdownText(thing,document,heading)

    }
    document.body.append(heading)
    // const value = child.children[0].value
  //  console.log(ast)
}