import path from'path';import{mkfile,mkdir}from'@hexlet/immutable-fs-trees';import{checkStructure,checkW3C,checkCSS,checkOrderStylesheetLinks,checkAlternativeFonts,checkBodyElements,checkLang,checkTitleEmmet,checkElementsBySelectors,checkPropertiesByElement,checkVideoAttributes,checkPseudoElements,checkHorizontalScroll,checkLayout}from'./lib.js';import initPuppeteer from'./puppeteer.js';const runTests=async(a,b)=>{const c=mkdir('project',[mkfile('index.html'),mkdir('styles',[mkfile('style.css')]),mkdir('fonts',[mkfile('font.css')]),mkdir('video'),mkdir('images')]),d=checkStructure(a,c);if(d.length)return d;const e=path.join(a,'index.html'),{browser:f,page:g}=await initPuppeteer(e),h=(await Promise.all([checkW3C(path.join(a,'index.html')),checkCSS(a),checkOrderStylesheetLinks(g,['font.css','style.css']),checkAlternativeFonts(path.join(a,'styles','style.css'),['Raleway']),checkBodyElements(g,['video','h1']),checkLang(g,b),checkTitleEmmet(g),checkElementsBySelectors(g,[{name:'description',selector:'meta[name="description"][content]:not([content=""])'},{name:'og:url',selector:'meta[property="og:url"][content]:not([content=""])'},{name:'og:title',selector:'meta[property="og:title"][content]:not([content=""])'},{name:'og:description',selector:'meta[property="og:description"][content]:not([content=""])'},{name:'og:image',selector:'meta[property="og:image"][content]:not([content=""])'},{name:'twitter:card',selector:'meta[property="twitter:card"][content]:not([content=""])'}],'metaTagsMissing'),checkElementsBySelectors(g,[{name:'ico',selector:'link[rel="icon"][href$=".ico"]'},{name:'svg',selector:'link[rel="icon"][href$=".svg"]'}],'faviconsMissing'),checkElementsBySelectors(g,[{name:'apple-touch-icon',selector:'link[rel="apple-touch-icon"]'}],'mobileFaviconMissing'),checkPropertiesByElement(g,'body',{margin:'0px'}),checkVideoAttributes(g,['muted','autoplay','poster','loop'],['controls']),checkPseudoElements(path.join(a,'styles','style.css')),checkHorizontalScroll(g),checkLayout(e)])).flat();return await f.close(),h};export default runTests;