import { mount } from "@vue/test-utils";
import BusLinesStopsList from "./BusLinesStopsList.vue";
import { createStore, Store } from "vuex";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { State } from "@/store";

describe("StopsList.vue", () => {
  let store: Store<State>;

  beforeEach(() => {
    store = createStore({
      state: {
        dataList: [],
        selectedLineNumber: null,
        selectedStop: {},
      },
      getters: {
        getStopsForSelectedLine: () => [
          { stop: "A", order: 1 },
          { stop: "B", order: 2 },
        ],
        getSelectedStop: () => ({ stop: "A", order: 1 }),
        getSelectedLine: () => 1,
      },
      mutations: {
        SET_SELECTED_STOP: vi.fn(),
      },
    });
  });

  it("renders correctly with selected line", () => {
    const wrapper = mount(BusLinesStopsList, {
      global: {
        plugins: [store],
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.text()).toContain("Bus Line: 1");
    expect(wrapper.findAll("tr").length).toBe(3);
  });

  it("renders CardComponent when no line is selected", () => {
    const localStore = createStore({
      state: {
        dataList: [],
        selectedLineNumber: null,
        selectedStop: {},
      },
      getters: {
        getStopsForSelectedLine: () => [
          { stop: "A", order: 1 },
          { stop: "B", order: 2 },
        ],
        getSelectedStop: () => ({ stop: "A", order: 1 }),
        getSelectedLine: () => null, // Getter zwraca null
      },
    });

    const wrapper = mount(BusLinesStopsList, {
      global: {
        plugins: [localStore],
      },
      props: {
        modelValue: true,
      },
    });

    expect(wrapper.findComponent({ name: "CardComponent" }).exists()).toBe(
      true
    );
    expect(wrapper.text()).toContain("Please select the bus line first");
  });

  it("emits 'update:modelValue' when sort button is clicked", async () => {
    const wrapper = mount(BusLinesStopsList, {
      global: {
        plugins: [store],
      },
      props: {
        modelValue: true,
      },
    });

    await wrapper.find("[data-test='sort-button']").trigger("click");
    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([false]); // Odwrotny stan
  });

  it("calls SET_SELECTED_STOP mutation when stop is clicked", async () => {
    const mockCommit = vi.spyOn(store, "commit");
    const wrapper = mount(BusLinesStopsList, {
      global: {
        plugins: [store],
      },
      props: {
        modelValue: true,
      },
    });

    const stop = wrapper.findAll("[data-test='stop-button']")[0];
    await stop.trigger("click");
    expect(mockCommit).toHaveBeenCalledWith("SET_SELECTED_STOP", {
      stop: "A",
      order: 1,
    });
  });

  it("renders stops in descending order when modelValue is false", () => {
    const wrapper = mount(BusLinesStopsList, {
      global: {
        plugins: [store],
      },
      props: {
        modelValue: false,
      },
    });

    const stops = wrapper.findAll("[data-test='stop-button']");
    expect(stops[0].text()).toBe("B");
    expect(stops[1].text()).toBe("A");
  });
});
