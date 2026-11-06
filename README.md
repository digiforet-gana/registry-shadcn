# Registry - shadcn

<br />

shadcn CLI로 설치할 수 있는 컴포넌트 레지스트리입니다.

<br />

---

### 설정

<!-- 레지스트리 설정 -->
<details>

<summary><strong>레지스트리 설정</strong></summary>
<br />

`homepage`는 배포 주소가 정해지면 실제 주소로 변경해주세요.

```json
/* registry.json (신규 생성) */

{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "registry-shadcn",
  "homepage": "https://example.com",
  "items": []
}
```

```diff
--- package.json

  {
    "scripts": {
      "dev": "vite",
-     "build": "tsc -b && vite build",
+     "build": "shadcn build && tsc -b && vite build",
+     "registry:build": "shadcn build",
      "lint": "eslint .",
      "preview": "vite preview"
    }
  }
```

```diff
--- .gitignore

  ...
  *.sln
  *.sw?
+
+ # shadcn build 결과물
+ public/r
```

```diff
--- eslint.config.js

  /* shadcn 컴포넌트는 variants 등을 함께 export하므로 Fast Refresh 규칙 제외 */
  {
-   files: ['src/components/ui/**/*.{ts,tsx}'],
+   files: ['src/components/ui/**/*.{ts,tsx}', 'src/registry/**/*.{ts,tsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
```

`yarn registry:build` 실행 시 `registry.json`에 등록된 아이템별로 `public/r/<name>.json` 파일이 생성되며, `yarn build` 실행 시에도 함께 생성되어 `dist/r` 폴더에 포함됩니다.

`public/r`은 shadcn build의 기본 출력 경로로, 배포 후 설치 URL에 그대로 사용되므로 배포 이후에는 변경하지 않는 것을 권장합니다.

</details>

<br />

---

### 사용법

<!-- 컴포넌트 추가 -->
<details>

<summary><strong>컴포넌트 추가 (Button 예시)</strong></summary>
<br />

배포할 컴포넌트는 `src/registry/<name>/<name>.tsx`에 작성합니다.

shadcn 공식 컴포넌트를 기반으로 하는 경우, CLI로 추가한 후 레지스트리 폴더로 옮기고 프로젝트 포맷을 적용해주세요.

```bash
npx shadcn@latest add button

mkdir -p src/registry/button

mv src/components/ui/button.tsx src/registry/button/button.tsx

npx prettier --write src/registry/button/button.tsx
```

`src/components/ui`에는 사이트에서 사용하는 shadcn 컴포넌트(Label, Input 등)가 있으므로, 같은 이름의 컴포넌트를 추가하는 경우에는 `mv` 대신 `cp`로 복사해주세요.

```diff
--- registry.json

  {
    ...
-   "items": []
+   "items": [
+     {
+       "name": "button",
+       "type": "registry:ui",
+       "title": "Button",
+       "description": "버튼 또는 버튼처럼 보이는 요소를 표시합니다.",
+       "dependencies": ["class-variance-authority", "cn", "radix-ui"],
+       "files": [{ "path": "src/registry/button/button.tsx", "type": "registry:ui" }]
+     }
+   ]
  }
```

- `name` : 설치 URL(`/r/<name>.json`)과 상세 페이지 경로(`/components/<name>`)에 사용되며, 폴더명과 동일하게 작성

- `type` : 사용하는 프로젝트에 설치될 위치를 결정 (`registry:ui` → `components/ui`, `registry:component` → `components`, `registry:hook` → `hooks`, `registry:lib` → `lib`)

- `dependencies` : 컴포넌트가 import하는 npm 패키지로, 설치 시 함께 설치됨

- `registryDependencies` : 컴포넌트가 사용하는 다른 shadcn 컴포넌트 (예: `["button", "popover"]`)로, 설치 시 함께 설치됨

- `files` : 배포할 파일 목록 (데모 파일은 제외)

`registry.json`에 등록된 컴포넌트는 사이트의 사이드바, 홈 목록, 상세 페이지(`/components/<name>`)에 자동으로 표시됩니다.

`yarn registry:build` 실행 후 `public/r/<name>.json` 파일이 생성되는지 확인해주세요.

</details>

<br />

<!-- 플레이그라운드 추가 -->
<details>

<summary><strong>플레이그라운드 추가 (Button 예시)</strong></summary>
<br />

상세 페이지의 미리보기, Props 패널, Usage 코드는 컴포넌트 폴더의 `<name>.demo.tsx` 파일을 기준으로 표시됩니다.

데모 파일은 `registry.json`에 등록하지 않으므로 배포되지 않으며, 파일이 없는 컴포넌트는 플레이그라운드 없이 설치 명령어만 표시됩니다.

```tsx
/* src/registry/button/button.demo.tsx (신규 생성) */

import { definePlayground } from '@/lib/playground';
import { Button } from './button';

export default definePlayground({
  component: 'Button',
  importPath: '@/components/ui/button',
  controls: {
    variant: {
      type: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
      defaultValue: 'default',
    },
    size: {
      type: 'select',
      options: ['default', 'xs', 'sm', 'lg'],
      defaultValue: 'default',
    },
    disabled: { type: 'boolean', defaultValue: false },
    children: { type: 'text', defaultValue: 'Button' },
  },
  render: (props) => <Button {...props} />,
});
```

- `component`, `importPath` : Usage 코드에 표시할 컴포넌트명과 import 경로

- `controls` : Props 패널에 표시할 컨트롤 (`select`, `boolean`, `text`)

- `render` : Props 패널에서 설정한 값으로 미리보기를 렌더링하는 함수

- `code` (선택) : Usage 코드를 직접 생성하는 함수

Usage 코드에는 `defaultValue`와 다른 props만 표시되며, `children`은 태그 사이의 내용으로 표시됩니다.

</details>

<br />

<!-- 컴포넌트 업데이트 -->
<details>

<summary><strong>컴포넌트 업데이트 (Button 예시)</strong></summary>
<br />

shadcn 공식 컴포넌트가 업데이트된 경우, 최신 버전으로 덮어쓴 후 git diff로 변경 내역을 확인하여 커스텀 수정 내용을 다시 적용합니다.

```bash
npx shadcn@latest add button

mv src/components/ui/button.tsx src/registry/button/button.tsx

npx prettier --write src/registry/button/button.tsx

git diff src/registry/button/button.tsx
```

diff에서 `-` 줄은 기존 내용(커스텀 수정 포함), `+` 줄은 새로 받은 공식 내용입니다. 공식 변경 내용은 유지하고, 사라진 커스텀 수정 내용만 다시 적용해주세요.

업데이트 후에는 다음 내용도 함께 확인해주세요.

- import하는 npm 패키지가 바뀐 경우 `registry.json`의 `dependencies` 수정

- props나 variant가 바뀐 경우 데모 파일의 `controls` 수정

- 상세 페이지 미리보기에서 정상 동작 확인

사용하는 프로젝트에서 레지스트리 컴포넌트를 다시 add하는 경우에도 동일하게 파일이 덮어쓰이므로, 프로젝트별 수정 내용은 git diff로 확인하여 다시 적용해주세요. 모든 프로젝트에 공통으로 필요한 수정은 레지스트리 원본에 반영하는 것을 권장합니다.

</details>
