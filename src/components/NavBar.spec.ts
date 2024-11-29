import { mount } from "@vue/test-utils";
import NavBar from "./NavBar.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { describe, it, expect, beforeEach } from "vitest";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: { template: "<div>Home View</div>" },
  },
  {
    path: "/stops",
    name: "Stops",
    component: { template: "<div>Stops View</div>" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

describe("NavBar", () => {
  beforeEach(async () => {

    router.push("/");
    await router.isReady();
  });

  it("renders navigation links correctly", () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    });

    const busLinesLink = wrapper.find('a[href="/"]');
    const stopsLink = wrapper.find('a[href="/stops"]');

    expect(busLinesLink.exists()).toBe(true);
    expect(busLinesLink.text()).toBe("Bus Lines");

    expect(stopsLink.exists()).toBe(true);
    expect(stopsLink.text()).toBe("Stops");
  });

  it("adds active class to the correct link based on route", async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    });

    await router.push("/stops");
    await wrapper.vm.$nextTick();

    const stopsLink = wrapper.find('a[href="/stops"]');
    const busLinesLink = wrapper.find('a[href="/"]');

    expect(stopsLink.classes()).toContain("active-tab");
    expect(busLinesLink.classes()).not.toContain("active-tab");
  });

  it("navigates to the correct route when a link is clicked", async () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router],
      },
    });

    const stopsLink = wrapper.find('a[href="/stops"]');
    await stopsLink.trigger("click");
    await wrapper.vm.$nextTick();

    expect(router.currentRoute.value.path).toBe("/stops");
  });
});
