import { mount } from "@vue/test-utils";
import { createStore, Store } from "vuex";
import StopsList from "./StopsList.vue";
import { describe, it, expect, beforeEach, vi } from "vitest";
import type { State, StopsListItem } from "../store/index";

const mockGetAllStops = vi.fn();

const createMockStore = (stops = [] as StopsListItem[]) => {
  return createStore({
    getters: {
      getAllStops: mockGetAllStops.mockReturnValue(stops),
    },
  });
};

describe("StopsList.vue", () => {
  let store: Store<State>;

  beforeEach(() => {
    store = createMockStore([
      { stop: "Alpha", order: 1 },
      { stop: "Beta", order: 2 },
      { stop: "Gamma", order: 3 },
    ]);
  });

  it("renders the table headers correctly", () => {
    const wrapper = mount(StopsList, {
      global: {
        plugins: [store],
      },
      props: {
        searchQuery: "",
      },
    });

    expect(wrapper.find("[data-test='header-cell']").text()).toContain(
      "Bus Stops"
    );
  });

  it("renders the stops filtered by searchQuery", () => {
    const wrapper = mount(StopsList, {
      global: {
        plugins: [store],
      },
      props: {
        searchQuery: "Al",
      },
    });

    const rows = wrapper.findAll("[data-test='row-cell-with-stop']");
    expect(rows).toHaveLength(1);
    expect(rows[0].text()).toContain("Alpha");
  });

  it("sorts stops in ascending order by default", () => {
    const wrapper = mount(StopsList, {
      global: {
        plugins: [store],
      },
      props: {
        searchQuery: "",
      },
    });

    const rows = wrapper.findAll("[data-test='row-cell-with-stop']");
    expect(rows[0].text()).toContain("Alpha");
    expect(rows[1].text()).toContain("Beta");
    expect(rows[2].text()).toContain("Gamma");
  });

  it("sorts stops in descending order when the sort button is clicked", async () => {
    const wrapper = mount(StopsList, {
      global: {
        plugins: [store],
      },
      props: {
        searchQuery: "",
      },
    });

    const sortButton = wrapper.find("[data-test='sort-button']");
    await sortButton.trigger("click");

    const rows = wrapper.findAll("[data-test='row-cell-with-stop']");
    expect(rows[0].text()).toContain("Gamma");
    expect(rows[1].text()).toContain("Beta");
    expect(rows[2].text()).toContain("Alpha");
  });

  it("renders a message when no stops match the search query", () => {
    const wrapper = mount(StopsList, {
      global: {
        plugins: [store],
      },
      props: {
        searchQuery: "Zeta",
      },
    });

    const message = wrapper.find("[data-test='row-cell-no-stops']");
    expect(message.exists()).toBe(true);
    expect(message.text()).toBe("No stops found.");
  });
});
