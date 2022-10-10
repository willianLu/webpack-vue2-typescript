import HttpRequest from "@/utils/http/index";
import MockAdapter from "axios-mock-adapter";

const mock = new MockAdapter(HttpRequest);

mock.onGet("//www.baidu.com/userInfo").reply(200, {
  code: 200,
  data: {
    id: 1,
    name: "John",
  },
});
