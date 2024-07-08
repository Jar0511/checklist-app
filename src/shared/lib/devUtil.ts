/** 개발 모드에서 경고 표시 */
export const consoleWarn = ({
  title,
  desc,
}: {
  title: string;
  desc?: string;
}) => {
  const titleStyle =
    "font-size: 1.225em;font-weight: bold;padding-bottom: 4px;";
  const miniStyle =
    "font-size: 0.925em; color: darkgray; padding-top: 8px; padding-bottom: 4px";
  if (import.meta.env.MODE == "development") {
    return console.warn(
      `%c${title} 경고\n${desc ? `%c${desc}\n` : ""}%c🛠️이 메세지는 개발 모드에서만 표시됩니다🛠️`,
      titleStyle,
      "",
      miniStyle
    );
  }
};
