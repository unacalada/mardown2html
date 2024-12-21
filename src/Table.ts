import {emphasia, imageia, linkia, strongia} from "./utils/formats";
// not working ???
export function table(ast: any, document: any, element: any) {

    const tableElement = document?.createElement('table');

    const alignments = ast.align;

    ast.children.forEach((row: any) => {

        const tr = document?.createElement('tr');

        row.children.forEach((cell: any, index: number) => {

            const td = document?.createElement('td');


            if (alignments && alignments[index]) {

                td.style.textAlign = alignments[index];

            }

            cell.children.forEach((child: any) => {
                if (child.type === 'Text') {
                    td.textContent += child.value;
                } else if (child.type === 'Link') {
                    linkia(child, document, td);
                } else if (child.type === 'Emphasis') {
                    emphasia(child, document, td);
                } else if (child.type === 'Strong') {
                    strongia(child, document, td);
                } else if (child.type === 'Image') {
                    imageia(child, document, td);
                }
            });

            tr?.appendChild(td);
        });

        tableElement?.appendChild(tr);
    });

    element?.appendChild(tableElement);
}
