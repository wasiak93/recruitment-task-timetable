import { mount } from "@vue/test-utils";
import StopsSearch from "./StopsSearch.vue";
import { describe, it, expect } from "vitest";

describe("StopsSearch.vue", () => {
  it("renders input with initial modelValue", () => {
    const wrapper = mount(StopsSearch, {
      props: {
        modelValue: "Initial Value",
      },
    });

    const input = wrapper.find("input");
    expect(input.element.value).toBe("Initial Value");
  });

  it("emits 'update:modelValue' on input event", async () => {
    const wrapper = mount(StopsSearch, {
      props: {
        modelValue: "",
      },
    });

    const input = wrapper.find("[data-test='filter-input']");
    await input.setValue("New Value");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["New Value"]);
  });
});
