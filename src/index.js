import i18next from'i18next';import fs from'fs';import ru from'./locales/ru.js';import runTests from'./tests.js';const[,,PROJECT_PATH,LANG='ru']=process.argv,app=async(a,b)=>{await i18next.init({lng:b,resources:{ru}});try{const c=await runTests(a,b);if(c.length){const a=c.map((a,b)=>`${b+1}. ${i18next.t(a.id,a.values)}`).join('\r\n');fs.writeFileSync('./result.txt',a)}}catch(a){console.log(a)}};app(PROJECT_PATH,LANG);