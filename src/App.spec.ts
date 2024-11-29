import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import AppComponent from "./App.vue";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";

const store = createStore({
  state: {
    dataList: [],
  },
  actions: {
    fetchDataList: vi.fn(),
  },
});

const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: { template: "<div></div>" } }],
});

describe("AppComponent", () => {
  it("should render BaseHeader and NavBar components", async () => {
    const wrapper = mount(AppComponent, {
      global: {
        plugins: [store, router],
      },
    });

    expect(wrapper.findComponent({ name: "BaseHeader" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "NavBar" }).exists()).toBe(true);
  });

  it("should dispatch fetchDataList action on mount", async () => {
    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    mount(AppComponent, {
      global: {
        plugins: [store, router],
      },
    });

    expect(dispatchMock).toHaveBeenCalledWith("fetchDataList");
  });
});
