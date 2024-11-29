import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import BusLinesTimeSchedule from "./BusLinesTimeSchedule.vue";

const mockData = [
  { line: 1, stop: "Stop A", order: 1, time: "10:00" },
  { line: 1, stop: "Stop A", order: 1, time: "10:15" },
  { line: 1, stop: "Stop A", order: 1, time: "10:30" },
];

const store = createStore({
  state: {
    dataList: mockData,
    selectedLineNumber: 1,
    selectedStop: { stop: "Stop A", order: 1 },
  },
  getters: {
    getTimesForSelectedLineAndStop: (state) => {
      const times = state.dataList
        .filter(
          (item) =>
            item.line === state.selectedLineNumber &&
            item.stop === state.selectedStop.stop
        )
        .map((item) => item.time)
        .sort();
      return times;
    },
    getSelectedStop: (state) => state.selectedStop,
    getSelectedLine: (state) => state.selectedLineNumber,
  },
  mutations: {
    SET_SELECTED_LINE: (state, line) => {
      state.selectedLineNumber = line;
    },
    SET_SELECTED_STOP: (state, stop) => {
      state.selectedStop = stop;
    },
  },
});

describe("BusLinesTimeSchedule", () => {
  it("renders times when line and stop are selected", async () => {
    const wrapper = mount(BusLinesTimeSchedule, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$nextTick();

    const times = wrapper.findAll("td");
    expect(times.length).toBe(3);
    expect(times[0].text()).toBe("10:00");
    expect(times[1].text()).toBe("10:15");
    expect(times[2].text()).toBe("10:30");
  });

  it("shows message when no line is selected", async () => {
    store.commit("SET_SELECTED_LINE", null);

    const wrapper = mount(BusLinesTimeSchedule, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Please select the bus line first");
  });

  it("shows message when no stop is selected", async () => {
    store.commit("SET_SELECTED_LINE", 1);
    store.commit("SET_SELECTED_STOP", {});

    const wrapper = mount(BusLinesTimeSchedule, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Please select the bus stop first");
  });

  it("renders no times if selected stop has no times", async () => {
    store.commit("SET_SELECTED_STOP", { stop: "Stop B", order: 2 });

    const wrapper = mount(BusLinesTimeSchedule, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$nextTick();

    const times = wrapper.findAll("td");
    expect(times.length).toBe(0);
  });

  it("renders the correct stop name", async () => {
    store.commit("SET_SELECTED_LINE", 1);
    store.commit("SET_SELECTED_STOP", { stop: "Stop A", order: 1 });

    const wrapper = mount(BusLinesTimeSchedule, {
      global: {
        plugins: [store],
      },
    });

    await wrapper.vm.$nextTick();

    const stopText = wrapper.find("p").text();
    expect(stopText).toContain("Stop A");
  });
});
