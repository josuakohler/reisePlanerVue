import { defineStore } from "pinia";
import type { RoutePlayListItem, Route } from "../types";

export const useRoutePlayListStore = defineStore({
  id: "routePlayListStore",
  state: () => ({
    routePlayListName: "",
    routePlayList: [] as RoutePlayListItem[],
  }),

  actions: {
    goToView() {
      window.location.href = "view.html";
    },

    setName(name: string) {
      this.routePlayListName = name;
    },

    createList() {
      const nameExists = this.routePlayList.some(
        (playlist) => playlist.name === this.routePlayListName
      );

      if (nameExists) {
        alert("Diese routelist existiert bereits");
      } else {
        this.routePlayList.push({
          name: this.routePlayListName,
          id: Date.now().toString(),
          routen: [],
          checked: false,
        });
        this.saveList();
      }

      // console.log(this.routePlayList[this.routePlayList.length - 1]);
    },

    deleteRouteList(index: number) {
      this.routePlayList.splice(index, 1);
      this.saveList();
    },

    saveList() {
      localStorage.setItem("routePlayList", JSON.stringify(this.routePlayList));
    },

    loadList() {
      const savedList = localStorage.getItem("routePlayList");
      if (savedList) {
        this.routePlayList = JSON.parse(savedList);
      }
    },

    init() {
      this.loadList();
    },

    initialize(initialRouteName?: string) {
      this.routePlayListName = initialRouteName || "";
      this.loadList();
    },

    addRouteToList(listName: string, route: Route) {
      const list = this.routePlayList.find((list) => list.name === listName);
      if (list) {
        list.routen.push(route);
        this.saveList();
        console.log(list);
      }
    },
  },
});
