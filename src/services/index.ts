import { get } from "@/utils/http";

export interface UserInfo {
  id: string;
  name: string;
}

export function queryUserInfo() {
  return get<UserInfo, any>("//www.baidu.com/userInfo");
}

export function queryBookList() {
  return get("/bookList");
}
