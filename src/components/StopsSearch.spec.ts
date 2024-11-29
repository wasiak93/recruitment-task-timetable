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

    const input = wrapper.find("input");
    await input.setValue("New Value");

    expect(wrapper.emitted()["update:modelValue"]).toBeTruthy();
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["New Value"]);
  });

  it("applies 'search--border' class on focus", async () => {
    const wrapper = mount(StopsSearch, {
      props: {
        modelValue: "",
      },
    });

    const input = wrapper.find("input");
    expect(wrapper.find(".search--border").exists()).toBe(false);

    await input.trigger("focus");
    expect(wrapper.find(".search--border").exists()).toBe(true);

    await input.trigger("blur");
    expect(wrapper.find(".search--border").exists()).toBe(false);
  });

  it("shows absolute 'Search' text on focus", async () => {
    const wrapper = mount(StopsSearch, {
      props: {
        modelValue: "",
      },
    });

    expect(wrapper.find(".search__input-absolute-element").exists()).toBe(
      false
    );

    const input = wrapper.find("input");
    await input.trigger("focus");
    expect(wrapper.find(".search__input-absolute-element").exists()).toBe(true);

    await input.trigger("blur");
    expect(wrapper.find(".search__input-absolute-element").exists()).toBe(
      false
    );
  });

  it("shows search icon when input is not focused", async () => {
    const wrapper = mount(StopsSearch, {
      props: {
        modelValue: "",
      },
    });

    expect(wrapper.find("img[alt='Search Icon']").exists()).toBe(true);

    const input = wrapper.find("input");
    await input.trigger("focus");
    expect(wrapper.find("img[alt='Search Icon']").exists()).toBe(false);

    await input.trigger("blur");
    expect(wrapper.find("img[alt='Search Icon']").exists()).toBe(true);
  });
});
