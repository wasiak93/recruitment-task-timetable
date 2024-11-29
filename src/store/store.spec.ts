import { describe, it, expect, beforeEach } from "vitest";
import store, { DataListItem, StopsListItem } from "./index";

describe("Vuex Store", () => {
  beforeEach(() => {
    store.replaceState({
      dataList: [] as DataListItem[],
      selectedLineNumber: null,
      selectedStop: {} as StopsListItem,
    });
  });

  describe("getters", () => {
    it("getLinesList returns unique and sorted line numbers", () => {
      store.replaceState({
        dataList: [
          { line: 3, stop: "A", order: 1, time: "10:00" },
          { line: 2, stop: "B", order: 2, time: "10:15" },
          { line: 3, stop: "C", order: 3, time: "10:30" },
        ],
        selectedLineNumber: null,
        selectedStop: {},
      });

      const lines = store.getters.getLinesList;
      expect(lines).toEqual([2, 3]);
    });

    it("getStopsForSelectedLine returns unique stops for the selected line", () => {
      store.replaceState({
        dataList: [
          { line: 1, stop: "A", order: 1, time: "10:00" },
          { line: 1, stop: "A", order: 1, time: "10:15" },
          { line: 1, stop: "B", order: 2, time: "10:30" },
          { line: 2, stop: "C", order: 3, time: "11:00" },
        ],
        selectedLineNumber: 1,
        selectedStop: {},
      });

      const stops = store.getters.getStopsForSelectedLine;
      expect(stops).toEqual([
        { stop: "A", order: 1 },
        { stop: "B", order: 2 },
      ]);
    });

    it("getTimesForSelectedLineAndStop returns sorted hours for the selected line and stop", () => {
      store.replaceState({
        dataList: [
          { line: 1, stop: "A", order: 1, time: "10:30" },
          { line: 1, stop: "A", order: 1, time: "10:00" },
          { line: 1, stop: "A", order: 1, time: "10:15" },
        ],
        selectedLineNumber: 1,
        selectedStop: { stop: "A", order: 1 },
      });

      const times = store.getters.getTimesForSelectedLineAndStop;
      expect(times).toEqual(["10:00", "10:15", "10:30"]);
    });
  });

  describe("mutations", () => {
    it("SET_DATA sets the dataList in state", () => {
      const data: DataListItem[] = [
        { line: 1, stop: "A", order: 1, time: "10:00" },
      ];
      store.commit("SET_DATA", data);
      expect(store.state.dataList).toEqual(data);
    });

    it("SET_SELECTED_LINE sets the selectedLineNumber", () => {
      store.commit("SET_SELECTED_LINE", 1);
      expect(store.state.selectedLineNumber).toBe(1);
    });

    it("SET_SELECTED_STOP sets selectedStop", () => {
      const stop: StopsListItem = { stop: "A", order: 1 };
      store.commit("SET_SELECTED_STOP", stop);
      expect(store.state.selectedStop).toEqual(stop);
    });

    it("SET_RESET_STOP resets selectedStop", () => {
      store.replaceState({
        dataList: [],
        selectedLineNumber: null,
        selectedStop: { stop: "A", order: 1 },
      });
      store.commit("SET_RESET_STOP");
      expect(store.state.selectedStop).toEqual({});
    });

    it("SET_RESET_LINE resets the selectedLineNumber", () => {
      store.replaceState({
        dataList: [],
        selectedLineNumber: 1,
        selectedStop: {},
      });
      store.commit("SET_RESET_LINE");
      expect(store.state.selectedLineNumber).toBe(null);
    });
  });
});
