import { parseFeed } from "https://deno.land/x/rss/mod.ts";

import { Member, PostItem } from "./types.ts";
import { getSnippet } from "./getSnippet.ts";

type FeedItem = {
  title: string;
  link: string;
  contentSnippet?: string;
  isoDate?: string;
  dateMiliSeconds: number;
};
async function fetchFeedItems(url: string): Promise<FeedItem[]> {
  const response = await fetch(url);
  const xml = await response.text();
  const { entries } = await parseFeed(xml);

  if (!entries?.length) return [];

  // return item which has title and link
  return entries
    .map((entry) => {
      return {
        title: entry.title,
        contentSnippet: getSnippet(
          entry.description?.value ?? entry.content?.value ?? "",
        ).replace(
          /\n/g,
          "",
        ),
        link: entry.links[0].href,
        isoDate: entry.published,
        dateMiliSeconds: entry.published
          ? new Date(entry.published).getTime()
          : 0,
      };
    })
    .filter(({ title, link }) => title && link) as FeedItem[];
}

async function getFeedItemsFromSources(sources: undefined | string[]) {
  if (!sources?.length) return [];
  let feedItems: FeedItem[] = [];
  for (const url of sources) {
    const items = await fetchFeedItems(url);
    if (items) feedItems = [...feedItems, ...items];
  }
  return feedItems;
}

async function getMemberFeedItems(member: Member): Promise<PostItem[]> {
  const { id, sources, name, includeUrlRegex, excludeUrlRegex } = member;
  const feedItems = await getFeedItemsFromSources(sources);
  if (!feedItems) return [];

  let postItems = feedItems.map((item) => {
    return {
      ...item,
      authorName: name,
      authorId: id,
    };
  });
  // remove items which not matches includeUrlRegex
  if (includeUrlRegex) {
    postItems = postItems.filter((item) => {
      return item.link.match(new RegExp(includeUrlRegex));
    });
  }
  // remove items which matches excludeUrlRegex
  if (excludeUrlRegex) {
    postItems = postItems.filter((item) => {
      return !item.link.match(new RegExp(excludeUrlRegex));
    });
  }

  return postItems;
}

export { getMemberFeedItems };
