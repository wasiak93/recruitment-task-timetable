import { mount, VueWrapper } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import axios from "axios";
import BusLinesList from "../components/BusLinesList.vue";
import type { State } from "../store/index";

vi.mock("axios");

describe("BusLinesList.vue", () => {
  let store: Store<State>;
  let wrapper: VueWrapper<any>;

  beforeEach(() => {
    store = createStore({
      state: {
        dataList: [
          { line: 1, stop: "Stop 1", order: 1, time: "12:00" },
          { line: 2, stop: "Stop 2", order: 2, time: "13:00" },
        ],
        selectedLineNumber: null,
        selectedStop: {},
      },
      getters: {
        getLinesList: (state) => [1, 2],
        getSelectedLine: (state) => state.selectedLineNumber,
        getStopsForSelectedLine: (state) => {
          const stops = state.dataList.filter(
            (item) => item.line === state.selectedLineNumber
          );
          return stops.map((item) => ({
            stop: item.stop,
            order: item.order,
          }));
        },
        getSelectedStop: (state) => state.selectedStop,
      },
      mutations: {
        SET_SELECTED_LINE: (state, line) => {
          state.selectedLineNumber = line;
        },
        SET_SELECTED_STOP: (state, data) => {
          state.selectedStop = data;
        },
      },
      actions: {
        async fetchDataList({ commit }) {
          try {
            const response = await axios.get("http://localhost:3000/stops");
            commit("SET_DATA", response.data);
          } catch (error) {
            console.error(error);
          }
        },
      },
    });

    wrapper = mount(BusLinesList, {
      global: {
        plugins: [store],
      },
    });
  });

  it("renders buttons for each bus line", () => {
    const buttons = wrapper.findAll("[data-test='line-button']");
    expect(buttons.length).toBe(2);
  });

  it("applies correct class to selected line button", async () => {
    const button = wrapper.findAll("[data-test='line-button']")[0];
    await button.trigger("click");

    expect(button.classes()).toContain("btn-dark");
  });

  it("emits selected-line event when button is clicked", async () => {
    const button = wrapper.findAll("[data-test='line-button']")[0];
    await button.trigger("click");

    expect(wrapper.emitted("selected-line")).toBeTruthy();
  });

  it("commits mutations on button click", async () => {
    const button = wrapper.findAll("[data-test='line-button']")[0];

    await button.trigger("click");

    expect(store.state.selectedLineNumber).toBe(1);
  });
});
