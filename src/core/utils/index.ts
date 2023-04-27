import { Client } from "@notionhq/client";
import { NOTION_DATABASE_ID, NOTION_KEY } from "../../constants";

const notion = new Client({ auth: process.env.NOTION_KEY });

const databaseId = process.env.NOTION_DATABASE_ID || "";

type database_id = string;

export async function listUsers() {
  try {
    const response = await notion.users.list({});
    console.log(response.results);
  } catch (error) {
    console.error(error);
  }
}

export async function addItem(params: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: params,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error: any) {
    console.error(error.body);
  }
}

/*async function posts() {
  const myPosts = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE}`,
  });

  console.log(myPosts);
  console.log("Success! Entry added.");
  return myPosts;
}*/
