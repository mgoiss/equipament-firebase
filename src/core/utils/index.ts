import { Client } from "@notionhq/Client";

const notion = new Client({
  auth: process.env.NOTION_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

type database_id = string;

/*async function addItem(params:string) {
    try {
        const response = await notion.pages.create({
            parent: { database_id: databaseId},
        })
    }
} */

async function posts() {
  const myPosts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
  });

  console.log(myPosts);
  console.log("Success! Entry added.");
  return myPosts;
}
