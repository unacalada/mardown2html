import { markdownText } from "./utils/formats";

export function list(child: any, document: any) {
    if (child.ordered === true) {
        const ordered = document.createElement('ol');

        for (let item of child.children) {
            const li = document.createElement("li");

            for (let subItem of item.children) {
                markdownText(subItem, document, li);
            }

            ordered.append(li);
        }

        document.body.append(ordered);
    } else {
        const unordered = document.createElement('ul');

        for (let item of child.children) {
            const li = document.createElement("li");

            for (let subItem of item.children) {
                markdownText(subItem, document, li);
            }

            unordered.append(li);
        }

        document.body.append(unordered);
    }
}
