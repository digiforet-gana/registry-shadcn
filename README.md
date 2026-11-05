# Registry - shadcn

shadcn CLI로 설치할 수 있는 컴포넌트 레지스트리입니다.

<br />

---

### 설정

각 설정은 위에서부터 순서대로 적용한다고 가정하며, 코드 예시는 앞선 설정이 모두 적용된 상태를 기준으로 합니다.

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

`yarn registry:build` 실행 시 `registry.json`에 등록된 아이템별로 `public/r/<name>.json` 파일이 생성되며, `yarn build` 실행 시에도 함께 생성되어 `dist/r` 폴더에 포함됩니다.

`public/r`은 shadcn build의 기본 출력 경로로, 배포 후 설치 URL에 그대로 사용되므로 배포 이후에는 변경하지 않는 것을 권장합니다.

</details>

<br />
