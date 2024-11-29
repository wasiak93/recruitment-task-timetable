import { createStore } from "vuex";
import axios from "axios";

export interface DataListItem {
  line: number;
  stop: string;
  order: number;
  time: string;
}

export interface StopsListItem {
  stop?: string;
  order?: number;
}

export interface State {
  dataList: DataListItem[];
  selectedLineNumber: number | null;
  selectedStop: StopsListItem;
}

const getUniqueStops = (list: DataListItem[]): StopsListItem[] => {
  const stops = list.map((item: DataListItem) => ({
    stop: item.stop,
    order: item.order,
  }));
  return stops.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.stop === value.stop)
  );
};

export default createStore({
  state: {
    dataList: [] as DataListItem[],
    selectedLineNumber: null as number | null,
    selectedStop: {} as StopsListItem,
  },
  getters: {
    getLinesList: (state: State): number[] =>
      [
        ...new Set(state.dataList.map((item: DataListItem) => item.line)),
      ].sort(),
    getSelectedLine: (state: State): number | null => state.selectedLineNumber,
    getStopsForSelectedLine: (state: State): StopsListItem[] => {
      if (state.selectedLineNumber === null) {
        return [];
      }

      const stops: DataListItem[] = state.dataList.filter(
        (item: DataListItem) => item.line === state.selectedLineNumber
      );

      return getUniqueStops(stops);
    },
    getSelectedStop: (state: State): StopsListItem => state.selectedStop,

    getTimesForSelectedLineAndStop: (state: State): string[] => {
      if (state.selectedLineNumber === null || !state.selectedStop.stop) {
        return [];
      }

      return state.dataList
        .filter(
          (item) =>
            item.line === state.selectedLineNumber &&
            item.stop === state.selectedStop.stop
        )
        .map((item) => item.time)
        .sort((a, b): number => {
          const timeToMinutes = (time: string): number => {
            const [hours, minutes] = time.split(":").map(Number);
            return hours * 60 + minutes;
          };
          return timeToMinutes(a) - timeToMinutes(b);
        });
    },
    getAllStops: (state) => {
      return getUniqueStops(state.dataList);
    },
  },
  mutations: {
    SET_DATA(state: State, data: DataListItem[]): void {
      state.dataList = data;
    },
    SET_SELECTED_LINE(state: State, line: number): void {
      state.selectedLineNumber = line;
    },
    SET_SELECTED_STOP(state: State, data: StopsListItem): void {
      state.selectedStop = data;
    },
    SET_RESET_STOP(state: State): void {
      state.selectedStop = {};
    },
    SET_RESET_LINE(state: State): void {
      state.selectedLineNumber = null;
    },
  },
  actions: {
    async fetchDataList({
      commit,
    }: {
      commit: (type: string, payload?: unknown) => void;
    }): Promise<void> {
      try {
        const data = await axios.get("http://localhost:3000/stops");
        commit("SET_DATA", data.data);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
  },
  modules: {},
});
