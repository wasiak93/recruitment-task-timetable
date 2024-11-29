import { mount } from "@vue/test-utils";
import CardComponent from "./CardComponent.vue";
import { createStore, Store } from "vuex";
import { vi } from "vitest";
import { State } from "@/store";

describe("CardComponent", () => {
  let store: Store<State>;

  beforeEach(() => {
    store = createStore({
      state: {
        selectedLineNumber: 1,
        dataList: [],
        selectedStop: {},
      },
      getters: {
        getSelectedLine: (state: State) => state.selectedLineNumber,
      },
      mutations: {
        SET_SELECTED_LINE: vi.fn(),
      },
    });
  });

  it("renders slot content correctly", () => {
    const wrapper = mount(CardComponent, {
      global: {
        plugins: [store],
      },
      slots: {
        default: "Test Slot Content",
      },
    });

    expect(wrapper.text()).toContain("Test Slot Content");
  });
});
