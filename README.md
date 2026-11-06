# Registry - shadcn

<br />

shadcn CLI로 설치할 수 있는 컴포넌트 레지스트리입니다.

[등록된 컴포넌트 미리보기](https://digiforet-gana.github.io/registry-shadcn/)

<br />

---

### 설정

<!-- 레지스트리 설정 -->
<details>

<summary><strong>레지스트리 설정</strong></summary>
<br />

```json
/* registry.json (신규 생성) */

{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "registry-shadcn",
  "homepage": "<레지스트리 배포 주소>",
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

</details>

<br />

<!-- GitHub Pages 배포 설정 -->
<details>

<summary><strong>GitHub Pages 배포 설정</strong></summary>
<br />

저장소의 **Settings → Pages → Build and deployment → Source**를 **GitHub Actions**로 변경해주세요.

GitHub Pages의 경우 `https://<user>.github.io/<repo>/` 경로로 배포되므로, 이에 맞게 빌드 경로와 라우터 기준 경로를 설정해줍니다.

```bash
# .env.production (신규 생성)

BASE_PATH=/<repo>/
```

```diff
--- vite.config.ts

- import { defineConfig } from 'vite';
+ import { defineConfig, loadEnv } from 'vite';

- export default defineConfig({
+ export default defineConfig(({ mode }) => ({
+   /* 배포 경로 */
+   base: loadEnv(mode, process.cwd(), '').BASE_PATH || '/',
+
    plugins: [...],
    ...
- });
+ }));
```

```diff
--- src/App.tsx

-   <BrowserRouter>
+   <BrowserRouter basename={import.meta.env.BASE_URL}>
```

```diff
--- registry.json

-   "homepage": "https://example.com",
+   "homepage": "https://<user>.github.io/<repo>",
```

```yaml
# .github/workflows/deploy.yml (신규 생성)

name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: yarn

      - run: yarn install --frozen-lockfile

      # shadcn build(public/r 생성) → tsc → vite build
      - run: yarn build

      # SPA 라우팅: 새로고침/직접 접속 시 404 대신 index.html로 처리
      - run: cp dist/index.html dist/404.html

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

</details>

<br />

---

### 컴포넌트 관리

<!-- 컴포넌트 추가 -->
<details>

<summary><strong>컴포넌트 추가 (Button 예시)</strong></summary>
<br />

```bash
npx shadcn@latest add button

mkdir -p src/registry/button

mv src/components/ui/button.tsx src/registry/button/button.tsx

npx prettier --write src/registry/button/button.tsx
```

`src/components/ui`에는 사이트에서 사용하는 shadcn 컴포넌트(Input, Label 등)가 있으므로, 같은 이름의 컴포넌트를 추가하는 경우에는 `mv` 대신 `cp`로 복사해주세요.

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
+       "registryDependencies": ["popover", "https://<레지스트리 배포 주소>/r/avatar.json"],
+       "files": [{ "path": "src/registry/button/button.tsx", "type": "registry:ui" }]
+     }
+   ]
  }
```

- `name` : 폴더명과 동일하게 작성

- `type` : 프로젝트에서 컴포넌트가 설치될 위치

- `dependencies` : 컴포넌트가 import하는 npm 패키지

- `registryDependencies` : 컴포넌트가 사용하는 다른 컴포넌트 (shadcn 공식 컴포넌트는 이름만, 이 레지스트리의 컴포넌트는 전체 URL을 기재)

- `files` : 배포할 파일 목록 (데모 파일은 제외)

`yarn registry:build` 실행 후 `public/r/<name>.json` 파일이 생성되는지 확인해주세요.

</details>

<br />

<!-- 플레이그라운드 추가 -->
<details>

<summary><strong>플레이그라운드 추가 (Button 예시)</strong></summary>
<br />

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

- `controls` : Props 패널에 표시할 컨트롤

- `render` : Props 패널에서 설정한 값으로 미리보기를 렌더링하는 함수

- `code` (선택) : Usage 코드를 직접 생성하는 함수

</details>

<br />

<!-- 컴포넌트 업데이트 -->
<details>

<summary><strong>컴포넌트 업데이트 (Button 예시)</strong></summary>
<br />

```bash
npx shadcn@latest add button

mv src/components/ui/button.tsx src/registry/button/button.tsx

npx prettier --write src/registry/button/button.tsx

git diff src/registry/button/button.tsx
```

공식 변경 내용은 유지하고, 사라진 커스텀 수정 내용만 다시 적용해주세요.

업데이트 후에는 다음 내용도 함께 확인해주세요.

- import하는 npm 패키지가 바뀐 경우 `registry.json`의 `dependencies` 수정

- props나 variant가 바뀐 경우 데모 파일의 `controls` 수정

- 상세 페이지 미리보기에서 정상 동작 확인

</details>

<br />

---

### 다른 프로젝트에서 컴포넌트 사용하기

<!-- 사전 준비 -->
<details>

<summary><strong>사전 준비</strong></summary>
<br />

```bash
npx shadcn@latest init
```

</details>

<br />

<!-- URL로 설치 -->
<details>

<summary><strong>URL로 설치</strong></summary>
<br />

컴포넌트의 JSON 주소로 바로 설치합니다.

```bash
npx shadcn@latest add <레지스트리 배포 주소>/r/button.json
```

</details>

<br />

<!-- 네임스페이스로 설치 -->
<details>

<summary><strong>네임스페이스로 설치 (권장)</strong></summary>
<br />

설치할 프로젝트의 `components.json`에 레지스트리를 등록하면 짧은 이름으로 설치할 수 있습니다.

```diff
--- components.json

  {
    ...
-   "registries": {}
+   "registries": {
+     "@example": "<레지스트리 배포 주소>/r/{name}.json"
+   }
  }
```

```bash
npx shadcn@latest add @example/button
```

여러 컴포넌트를 설치할 때는 `add @example/a @example/b`처럼 이어서 적고 공백으로 구분합니다.

</details>
