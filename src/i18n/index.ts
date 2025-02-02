import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from "./locales/en";
import zh from "./locales/zh";

const initI18n = () => {
  // 仅在客户端环境下初始化 i18n，避免服务端渲染时的问题
  if (typeof window !== "undefined") {
    i18n
      // 使用 LanguageDetector 插件自动检测用户语言环境
      // 可以从 localStorage、navigator 等位置获取语言设置
      .use(LanguageDetector)
      // 使用 initReactI18next 插件将 i18n 实例传递给 React 组件
      .use(initReactI18next)
      .init({
        // 配置多语言资源
        resources: {
          en: { translation: en },
          zh: { translation: zh },
        },
        // 设置默认语言为中文
        fallbackLng: "en",
        // 设置默认命名空间
        defaultNS: "translation",
        // 配置插值选项，escapeValue: false 允许在翻译中使用 HTML
        interpolation: {
          escapeValue: false,
        },
        // 配置语言检测选项
        detection: {
          // 按优先级顺序检测语言：先从 localStorage 读取，再从浏览器语言读取
          order: ["localStorage", "navigator"],
          // 将检测到的语言缓存到 localStorage
          caches: ["localStorage"],
        },
        // React 特定配置
        react: {
          // 禁用 Suspense，避免加载翻译文件时的等待状态
          useSuspense: false,
          // 监听语言变化事件
          bindI18n: "languageChanged",
          // 监听资源存储变化事件
          bindI18nStore: "added removed",

          // 是否支持在翻译中使用基本的 HTML 标签
          // true: 允许在翻译文本中使用 HTML 标签
          transSupportBasicHtmlNodes: true,

          // 指定哪些 HTML 标签可以在翻译中使用
          // 这里允许使用 <br>, <strong>, <i>, <p> 标签
          transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
        },
      });
  }
  // 返回配置好的 i18n 实例
  return i18n;
};

export default initI18n();
