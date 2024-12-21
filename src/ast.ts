import fs from "fs"
import { parse } from "@textlint/markdown-to-ast";
export async function AST(file:string){

        const data = await fs.readFileSync(file, 'utf8');
        const ast = parse(data)
        return ast


}
