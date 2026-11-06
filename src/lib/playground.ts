import type { ReactNode } from 'react';

/* Props 패널에 표시할 컨트롤 종류 */
export type PlaygroundControl =
  | { type: 'select'; options: readonly string[]; defaultValue: string }
  | { type: 'boolean'; defaultValue: boolean }
  | { type: 'text'; defaultValue: string };

export type PlaygroundControls = Record<string, PlaygroundControl>;

export type PlaygroundValues = Record<string, string | boolean>;

/* 지정한 props 중 기본값과 다른 것만 JSX 속성 문자열로 변환 (예: ' variant="outline" disabled') */
export type FormatProps<K extends string = string> = (keys: K[]) => string;

/* 컨트롤 종류에 따라 render, code 함수에 전달되는 값의 타입 추론 */
type ControlValue<C> = C extends { type: 'boolean' }
  ? boolean
  : C extends { type: 'select'; options: readonly (infer O)[] }
    ? O
    : string;

type ControlValues<T extends PlaygroundControls> = { [K in keyof T]: ControlValue<T[K]> };

export interface Playground {
  /* Usage 코드에 표시할 컴포넌트명과 import 경로 */
  component: string;
  importPath: string;
  controls: PlaygroundControls;
  render: (values: PlaygroundValues) => ReactNode;
  /* 컴포넌트의 prop이 아닌 컨트롤이 있는 경우 등, Usage 코드를 직접 생성할 때 사용 */
  code?: (values: PlaygroundValues, formatProps: FormatProps) => string;
}

export const definePlayground = <const T extends PlaygroundControls>(playground: {
  component: string;
  importPath: string;
  controls: T;
  render: (values: ControlValues<T>) => ReactNode;
  code?: (values: ControlValues<T>, formatProps: FormatProps<Extract<keyof T, string>>) => string;
}) => playground as unknown as Playground;

export const getDefaultValues = (controls: PlaygroundControls): PlaygroundValues => {
  return Object.fromEntries(Object.entries(controls).map(([key, control]) => [key, control.defaultValue]));
};

const createFormatProps = (controls: PlaygroundControls, values: PlaygroundValues): FormatProps => {
  return (keys) =>
    keys
      .filter((key) => values[key] !== controls[key].defaultValue)
      .map((key) => {
        const value = values[key];

        if (value === true) return ` ${key}`;
        if (value === false) return ` ${key}={false}`;
        return ` ${key}="${value}"`;
      })
      .join('');
};

export const getUsageCode = (playground: Playground, values: PlaygroundValues) => {
  const { component, importPath, controls, code } = playground;
  const formatProps = createFormatProps(controls, values);

  if (code) return code(values, formatProps);

  /* 기본 형태: children은 태그 사이의 내용, 나머지는 기본값과 다른 props만 표시 */
  const { children } = values;
  const attributes = formatProps(Object.keys(controls).filter((key) => key !== 'children'));
  const element = children ? `<${component}${attributes}>${children}</${component}>` : `<${component}${attributes} />`;

  return `import { ${component} } from '${importPath}';\n\n${element}`;
};
