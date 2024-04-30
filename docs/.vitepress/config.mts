import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "To-Mina",
  description: "这是我的个人学习网站",
  lastUpdated: true,
  lang: "zh-cn",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/markdown-examples' }
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // },
      {
        text: 'ts',
        items: [
          { text: '全局声明', link: '/ts/base-declare' },
          { text: '使用技巧', link: '/ts/usage-techniques' }
        ]
      },
      {
        text: 'vue-perimeter',
        items: [
          { text: 'magicString (代替AST)', link: '/vue-perimeter/magicString' },
          { text: 'unimport (自动导入)', link: '/vue-perimeter/unimport' },
          { text: 'unplugin (多框架中间层)', link: '/vue-perimeter/unplugin' },
        ]
      },
      {
        text: "Node 开发工具",
        items: [
          { text: 'fast-glob (查找)', link: '/node-perimeter/fast-glob' },
          { text: 'fs-extra (I/O工具)', link: '/node-perimeter/fs-extra' },
          { text: 'minimatch (glob->JSReg)', link: '/node-perimeter/minimatch' }
        ]
      },
      {
        text: "Git",
        items: [
          { text: 'GH_Actions', link: '/git/GitHub_Actions' },
          { text: 'GH_Actions(new)', link: '/git/GitHub_Actions(new)' },
          { text: '提议回复语法', link: '/git/GitHub 提议回复 MD 语法' },
        ]
      },
      {
        text: "Test",
        items: [
          { text: 'jest', link: '/test/jest' },
          { text: 'vitest', link: '/test/vitest' },
        ]
      },
      {
        text: "知识点",
        items: [
          { text: '刷题盲点', link: '/knowledge-points/blindness' },
          { text: '知识点', link: '/knowledge-points/knowledges' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tomina1' }
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索",
            buttonAriaLabel: "测试"
          },
          modal: {
            displayDetails: "显示详情",
            resetButtonTitle: "清空",
            backButtonTitle: "回退",
            noResultsText: "暂无数据"
          }
        }
      }
    }
  },
  base: "./"
})
