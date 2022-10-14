module.exports = {
  title: "Fun",
  description: "有趣的技术架构",
  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "首页", link: "/" },
      { text: "指南", link: "/guide/" },
      {
        text: "Languages",
        ariaLabel: "Language Menu",
        items: [
          { text: "Chinese", link: "/language/chinese/" },
          { text: "Japanese", link: "/language/japanese/" },
        ],
      },
      { text: "External", link: "https://google.com" },
    ],
    sidebar: [
      {
        title: "Group 1", // 必要的
        path: "/foo/", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: false, // 可选的, 默认值是 true,
        sidebarDepth: 1, // 可选的, 默认值是 1
        children: ["/"],
      },
    ],
  },
};
