function snippets(tam) {
  for (let index = 1; index <= tam; index++) { 
  let x = document.getElementById(`snippet${index}`).innerHTML;
  let y = "";

  let tagAbertura = "<span style='color: grey;'>&lt;</span>";
  let tagFechamento = "<span style='color: grey;'>&gt;</span>";
  
  for (const i of x) {
    if (i == '<') { y += tagAbertura; }
    else if (i == '>') { y += tagFechamento; }
    else { y += i; }
  }

  let htmlTags = ['']

  let tagsHtml = ['a', 'abbr', 'adress', 'aside', 'article', 'audio', 'b', 'body', 'br', 'button', 'canvas', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 's', 'script', 'section', 'select', 'small', 'source', 'strong', 'style', 'sub', 'sup', 'svg', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'u', 'ul', 'var', 'video', 'wbr', 'tag', 'tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'elementoPersonalizado', 'tagPersonalizada', 'meuElemento', 'minhaTag'];
  for (const i of tagsHtml) {
    y = y.replace(`${tagAbertura}${i}${tagFechamento}`, `${tagAbertura}<span style="color: royalblue">${i}</span>${tagFechamento}`);
    y = y.replace(`${tagAbertura}/${i}${tagFechamento}`, `${tagAbertura}<span style="color: royalblue">/${i}</span>${tagFechamento}`);
  }

  document.getElementById(`snippet${index}`).style.backgroundColor = "black";
  document.getElementById(`snippet${index}`).style.border = "#ddd 1px solid";
  document.getElementById(`snippet${index}`).style.color = "lightskyblue";
  document.getElementById(`snippet${index}`).style.padding = "10px";
  document.getElementById(`snippet${index}`).style.margin = "10px";
  document.getElementById(`snippet${index}`).innerHTML = y;
}
}
