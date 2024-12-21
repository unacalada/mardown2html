export function blockquote(ast: any, document: any, element: any) {
    const blockquoteElement = document?.createElement('blockquote');
    const children = ast?.children;
    console.log(children)

    children.forEach((child: any) => {
        if (child.type === 'Link') {
            linkia(child, document, blockquoteElement);
        } else if (child.type === 'Strong') {
            strongia(child, document, blockquoteElement);
        } else if (child.type === 'Emphasis') {
            emphasia(child, document, blockquoteElement);
        } else if (child.type === 'Str') {
            blockquoteElement.innerHTML = child.value;


        } else if (child.type === 'Paragraph') {
            paragraph(child,document,blockquoteElement)


        }else if (child.type === 'Image') {
            imageia(child, document, blockquoteElement);
        }
    });

    element?.append(blockquoteElement);
}

export function emphasia(ast: any, document: any, element: any) {
    const em = document?.createElement('em');
    const children = ast?.children;

    children.forEach((child: any) => {
        if (child.type === 'Link') {
            linkia(child, document, em);
        } else if (child.type === 'Strong') {
            strongia(child, document, em);
        } else if (child.type === 'Str') {
            em.textContent += child.value;
        }
    });

    element?.append(em);
}

export function strongia(ast: any, document: any, element: any) {
    const strong = document?.createElement('strong');
    const children = ast?.children;

    children.forEach((child: any) => {
        if (child.type === 'Link') {
            linkia(child, document, strong);
        } else if (child.type === 'Emphasis') {
            emphasia(child, document, strong);
        } else if (child.type === 'Str') {
            strong.textContent += child.value;
        }
    });

    element?.append(strong);
}

export function linkia(ast: any, document: any, element: any) {
    const link = document?.createElement('a');
    const value = ast?.children[0]?.value;
    const url = ast?.url;

    link.textContent = value;
    link.href = url;

    element?.append(link);
}

export function imageia(ast: any, document: any, element: any) {
    const img = document?.createElement('img');
    const src = ast?.url;
    const alt = ast?.alt || '';

    img.src = src;
    img.alt = alt;

    element?.append(img);
}

export function paragraph(ast: any, document: any, element: any) {
    const p = document?.createElement('p');
    const children = ast?.children;

    children.forEach((child: any) => {
        if (child.type === 'Link') {
            linkia(child, document, p);
        } else if (child.type === 'Strong') {
            strongia(child, document, p);
        } else if (child.type === 'Emphasis') {
            emphasia(child, document, p);
        } else if (child.type === 'Str') {
            p.textContent += child.value;
        } else if (child.type === 'Image') {
            imageia(child, document, element);
        }
    });

    if (p.textContent.trim() !== '') {
        element?.append(p);
    }
}

export function markdownText(ast: any, document: any, element: any) {
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
