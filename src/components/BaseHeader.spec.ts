import { mount } from "@vue/test-utils";
import BaseHeader from "../components/BaseHeader.vue";
describe("BaseHeader.vue", () => {
  it("renders header with the correct title", () => {
    const wrapper = mount(BaseHeader);

    const header = wrapper.find("h3");
    expect(header.exists()).toBe(true);
    expect(header.text()).toBe("Timetable");
  });
});
