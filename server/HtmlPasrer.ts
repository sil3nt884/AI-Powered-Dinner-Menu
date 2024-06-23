import {load} from 'cheerio';
import {client} from "./pg";


export const parseHtml = (html: string): string => {
    const $ = load(html);
     $('script, style', 'img', 'link', 'meta', 'head', 'a').remove();
    const text = $('body').text();
    return text.replace(/\s+/g, ' ').trim();
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



