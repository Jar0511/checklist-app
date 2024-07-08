import {
  DARK_TEXT,
  LIGHT_TEXT,
  type Theme,
} from "../model";
// js 내장 메소드 기반의 일반적인 함수들

/**
 * 특정 스타일 클래스를 가진 요소 내에(자기 자신 포함) 특정 HTML 요소가 존재하는지 여부를 리턴하는 함수
 * @param ele 타겟 요소
 * @param className 스타일 클래스
 * @returns 스타일 클래스를 가진 요소 아래 존재하는지 여부
 */
export const containsByClassName = (
  ele: Element,
  className: string
) => {
  return (
    !!ele.closest(className) ||
    (ele.getAttribute("className")
      ? ele.getAttribute("className")!.includes(className)
      : false)
  );
};

/**
 * whitespace로 구분된 문자열에서 특정 영역만 분리하는 함수
 * @param search 리턴하려는 문자열 정규식
 * @param original 원본 문자열
 * @returns search의 내용을 포함하는 문자열
 */
const filterString = (
  search: RegExp,
  original?: string
) => {
  if (!original) return "";
  return original
    .split(" ")
    .filter((style) => !!style.match(search))
    .join(" ");
};

/**
 * hex 컬러 문자열을 rgb 객체로 변환하는 함수
 * @param hex hex 컬러
 * @returns r,g,b 키-값을 가진 객체
 */
const hexToRGB = (hex: string) => {
  const _hex = hex.replace("#", "");
  const bigInt = parseInt(_hex, 16);
  return {
    r: (bigInt >> 16) & 255,
    g: (bigInt >> 8) & 255,
    b: bigInt & 255,
  };
};

/**
 * rgb 객체를 명도값으로 변환하는 함수
 * @param param0 rgb 객체
 * @returns 명도(0 - 1)
 */
const calcLuminanceOfRGB = ({
  r,
  g,
  b,
}: {
  r: number;
  g: number;
  b: number;
}) => {
  const arr = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928
      ? v / 12.92
      : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return (
    arr[0] * 0.2126 + arr[1] * 0.7152 + arr[2] * 0.0722
  );
};

/**
 * 테마별 배경 색 및 텍스트 색상 스타일 클래스 리턴하는 함수
 * @param theme 테마 객체
 * @param targetKey 테마 키
 * @param dim 흐릿함 배리에이션 사용 여부
 * @param className 원본 스타일 클래스 스트링
 * @returns 변형된 스타일 클래스 스트링
 */
export const judgeThemeClass = (
  theme: Theme,
  targetKey: string,
  dim?: boolean,
  className?: string
) => {
  if (!className) {
    return theme[targetKey][dim ? "dim" : "DEFAULT"] ?? "";
  } else {
    const backGroundClassName = filterString(
      /bg(-\w+(-\d+(\/\d+)?)?|-\[.+\])/,
      className
    );
    const textClassName = filterString(
      /text-(-\w+(-\d+(\/\d+)?)?|-\[.+[^px]\])/,
      className
    );
    if (backGroundClassName) {
      if (textClassName) {
        return `${backGroundClassName} ${textClassName}`;
      } else {
        const defaultBGColor = backGroundClassName
          .split(" ")
          .find((cl) => cl.startsWith("bg-"))!;
        if (/bg-\[.+\]/.test(defaultBGColor)) {
          const colorValue = defaultBGColor.replace(
            /(bg-\[|\])/,
            ""
          );
          let luminance = 0;
          if (colorValue.startsWith("#")) {
            const rgb = hexToRGB(colorValue);
            luminance = calcLuminanceOfRGB(rgb);
          } else {
            const [r, g, b] = defaultBGColor
              .replace(/(rgb\(|\)|\/\d+)/, "")
              .split(",");
            luminance = calcLuminanceOfRGB({
              r: Number(r.trim()),
              g: Number(g.trim()),
              b: Number(b.trim()),
            });
          }
          return `${defaultBGColor} ${luminance > 0.5 ? DARK_TEXT : LIGHT_TEXT}`;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, color, shade] =
            defaultBGColor.split("-");
          if (!shade) {
            if (color == "black") {
              return `${backGroundClassName} ${LIGHT_TEXT}`;
            } else {
              return `${backGroundClassName} ${DARK_TEXT}`;
            }
          } else {
            const [step, alpha] = shade.split("/");
            return `${backGroundClassName} ${Number(step) > 500 && (!alpha || Number(alpha) > 50) ? LIGHT_TEXT : DARK_TEXT}`;
          }
        }
      }
    } else {
      return (
        theme[targetKey][dim ? "dim" : "DEFAULT"] ?? ""
      );
    }
  }
};
