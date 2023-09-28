const puppeteer=require('puppeteer');
const cheerio =require('cheerio');
let i=3;


    async function linkFind(url){
        const response= await fetch(url);
        const html=await response.text();
        const $=cheerio.load(html);
        const links=$("a")
        .map((i,link)=>link.attribs.href)
        .get()
        console.log(links);

       i++;
        const l=links[i]
        linkFind("https://www.1mg.com"+l)

        


    };

linkFind("https://www.1mg.com/all-diseases?wpsrc=Google+Organic+Search");

async function scrapeProduct(url){
    const browser=await puppeteer.launch();
    const page = await browser.newPage(); 
    await page.goto(url);

    const [el2]=await page.$x('//*[@id="container"]/div/div/div[4]/div[1]/div/a');
    const name= await el2.getProperty('textContent');
    const diseasesName= await name.jsonValue();
    console.log({diseasesName});

    browser.close();

}



scrapeProduct('https://www.1mg.com/all-diseases?wpsrc=Google+Organic+Search')