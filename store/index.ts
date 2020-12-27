/**
 * This is mostly copy/pasted from https://github.com/mlynch/nextjs-tailwind-capacitor
 */

import { Store as PullStateStore } from "pullstate";

export const images = [
  "https://images.unsplash.com/photo-1608091526083-86ae8489ae5c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1608050072262-7b26ba63fb46?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1607975218223-94f82613e833?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
  "https://images.unsplash.com/photo-1608108707326-215150457c9f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80",
  "https://images.unsplash.com/photo-1608057681073-9399f209e773?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
];

export const homeItems = [
  {
    title: "Welcome",
    type: "Blog",
    text: "Welcome to the app!",
    author: "Max",
    image: images[0],
  },
  {
    title: "How to get started",
    type: "Article",
    text: "Getting started with the app is easy! Just follow these 100 steps",
    author: "Max",
    image: images[1],
  },
  {
    title: "Need help?",
    type: "Support",
    text:
      "We're here to help. Available between the hours of 3am and 3:01am every day",
    author: "Max",
    image: images[2],
  },
];

// Some fake lists
const lists = [
  {
    name: "Groceries",
    id: "groceries",
    items: [
      { name: "Apples", done: true },
      { name: "Bananas" },
      { name: "Milk" },
      { name: "Ice Cream" },
    ],
  },
  {
    name: "Hardware Store",
    id: "hardware",
    items: [
      { name: "Circular Saw" },
      { name: "Tack Cloth" },
      { name: "Drywall", done: true },
      { name: "Router" },
    ],
  },
  {
    name: "Work",
    id: "work",
    items: [{ name: "TPS Report", done: true }, { name: "Set up email" }],
  },
  { name: "Reminders", id: "reminders" },
];

const _settings = {
  enableNotifications: true,
};

export const Store = new PullStateStore({
  homeItems,
  lists,
  settings: _settings,
});

export const useState = Store.useState;
export const useLists = () => Store.useState((state) => state.lists);
export const useList = (id: string) => {
  const lists = useLists();
  const list = lists.find((list: any) => list.id === id);
  return list;
};

export const setDone = (list: any, item: any, done: boolean) => {
  Store.update((s, o) => {
    const listIndex = o.lists.findIndex((l) => l === list);

    // @ts-ignore
    const itemIndex = o.lists[listIndex].items.findIndex((i) => i === item);
    // @ts-ignore
    s.lists[listIndex].items[itemIndex].done = done;
    return s;
  });
};

export const useSettings = (): [
  typeof _settings,
  (newSettings: typeof _settings) => void
] => {
  const value = Store.useState((state) => state.settings);
  const setValue = (newSettings: typeof _settings) => {
    Store.update((s) => {
      s.settings = newSettings;
    });
  };

  return [value, setValue];
};

export const useHomeItems = () => Store.useState((state) => state.homeItems);
