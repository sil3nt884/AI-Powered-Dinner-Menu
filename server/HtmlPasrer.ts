import {load} from 'cheerio';
import {client} from "./pg";


export const parseHtml = (html: string): string => {
    const $ = load(html);

    // Remove unwanted tags
    $('script, style, img, link, meta, head, a').remove();

    $('*').contents().each(function() {
        if (this.nodeType === 8) {
            $(this).remove();
        }
    });
    let text = $('body').text();
    text = text.replace(/"[^"]*":\s*(\{[^}]*\}|\[[^\]]*\]|\d+|null|true|false|"[^"]*")/g, '');
    text = text.replace(/style=["'][^"']*["']/g, '');
    text = text.replace(/\s+/g, ' ').trim();
    text = text.replace(/[^\w\s.,?!]/g, ' ');
    text = text.replace(/\s+/g, ' ').trim();

    console.log(text);
    return text;
};

export const fetchHtml = async (url: string): Promise<string> => {
    const response = await fetch(url);
    return await response.text();
}

export const bestEffortExtractIngredients = async (url: string): Promise<string[]> => {
   const text = await getTextFromHtml(url)
    const ingredientsListQuery = await client.query('SELECT * FROM ingredients');
    const ingredientsList = ingredientsListQuery.rows;
    const ingredientsRegexp = ingredientsList.map((ingredient) => {
        return new RegExp(`\\b${ingredient.name}\\b`, 'gi');
    });

    const words = text.split(' ');
    return words.filter(word =>
        ingredientsRegexp.some(regexp =>
            regexp.test(word)
        )
    )



}


export const getTextFromHtml = async (url: string): Promise<string> => {
    const html = await fetchHtml(url);
    return parseHtml(html);
}



