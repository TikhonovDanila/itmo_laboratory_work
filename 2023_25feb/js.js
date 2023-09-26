"use strict";
const math = document.querySelector('#math');
const svg = document.querySelector('#svg');
const back = document.querySelector('#back');

back.addEventListener('click', ()=>{
    window.location.href = 'https://TikhonovDanila.github.io/itmo_laboratory_work/';
})
const parser = new DOMParser();
const serializer = new XMLSerializer();
let example = {};
let xslt = {};

async function loadXML(name) {
    const text = await fetch(name).then((res) => res.text());
    return {
        text,
        doc: parser.parseFromString(text, 'text/xml')
    };
}
window.onload = function () {
    loadXML('math.xsl').then((res) => xslt['math-ml'] = res);
    loadXML('svg.xsl').then((res) => xslt['svg'] = res);
    loadXML('math-exam.xml').then((res) => example['math-ml'] = res);
    loadXML('svg-exam.xml').then((res) => example['svg'] = res);
}
function selectXML(name) {
    document.getElementById('xml-input').value = example[name].text;
    document.getElementById('xslt-select').value = name;
}
math.addEventListener('click', ()=>{
    selectXML('math-ml');
})
svg.addEventListener('click',()=>{
    selectXML('svg');
})
function applyTransform() {
    let curXsltName = document.getElementById('xslt-select').value;
    let xmlInputString = document.getElementById('xml-input').value;
    const processor = new XSLTProcessor();
    processor.importStylesheet(xslt[curXsltName].doc);
    const xmlDocument = parser.parseFromString(xmlInputString, 'text/xml');
    document.querySelector('#output').innerHTML = serializer.serializeToString(
        processor.transformToDocument(xmlDocument));
}
