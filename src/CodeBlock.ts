export  function codeblock(ast:any,document:any){
    const pre = document.createElement("pre")
    const scripts = `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>


<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"></script>

<script>hljs.highlightAll();</script>`
    const language = ast.lang
    const value = ast.value || ""
    const html = `<code ${value !== "" ? `class="language-${language}"` : ""}>${value}</code>`;
    pre.innerHTML = html
    document.head.innerHTML += scripts
    document.body.append(pre)

}