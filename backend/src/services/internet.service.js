import {tavily as Tavily} from '@tavily/core';
const tavily = Tavily({ apiKey: process.env.TAVILY_API_KEY});

export const  searchInternet = async ({query}) =>{
    console.log("SEARCHING:", query);
    const results = await tavily.search(query,{
        maxResults: 5,
    });

  console.log("SUCCESS");
//  tools can return only numbers, strings. So we need to stringify the results before returning them.
   console.log(JSON.stringify(results));
   return JSON.stringify(results);
      }