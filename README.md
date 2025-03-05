# 목차

# backdo

- 렌딩 페이지 : https://landing.backdo.site
    - 소개, 가이드 포함
- 디버거 페이지 : https://backdo.site

# **프로젝트 소개**

- backdo는 디버거를 사용할 때, 이전 줄로 뒤로가기가 가능한 디버거 입니다. 디버거의 기본적인 기능들을 사용할 수 있습니다.
- 웹으로 사용가능합니다.
- 함수 스코프를 지키면서 뒤로갑니다. 함수를 재사용한 경우에도 현재의 호출 상태를 유지하며 중첩 함수 내에서도 이동합니다.
- 함수 제어문 중 대표적인 if 문과 for 문의 코드 흐름을 지키면서 뒤로갑니다. 도달할 수 없는 블록은 건너 뜁니다. loop counter를 유지합니다.

# **Motive**

- 매번 줄 숫자를 기억하고, 스트립트 전체를 다시 실행하고, breakpoint를 주고, resume 하고, step을 눌러야 지나친 과거 상태를 볼 수 있는 것이 번거롭게 느껴졌습니다. 더 쉽고 빠르게 뒤로 갈 수는 없을 까라는 생각에서 backdo를 시작했습니다.

# Preview

![sampe.gif](/src/assets/playSample.gif)

# Challenge

## 뒤로가는 디버거가 구현이 가능 여부

뒤로가는 “디버거”이기에 기본적인 디버거의 기능을 할 수 있어야 했습니다. 핵심 기능은 다음과 같았습니다. 

<aside>
💡

- 필수 ***기본 디버거*** 기능: 코드 흐름대로 앞으로 가기가 가능하다.
    1. 변수에 담긴 데이터를 관찰 할 수 있다.
    2. 실행결과를 관찰할 수 있다.
- ***뒤로가기*** 기능
    - 이전 코드라인의 상태로 돌아간다
        - 화면
        - 변수에 담긴 데이터
</aside>

사용성과 정확성을 위해 개발을 하면서 많이 사용하는 크롬의 개발자 도구에 뒤로가는 버튼을 하나 추가하는 것이 목표였습니다. 

### 크롬의 개발자 도구를 커스텀하는 것이 가능한가?

구글은 건강한 개발 생태계를 위해 크롬을 오픈소스로 제공하고 있습니다. 개발자도구도 마찬가지로 오픈소스로 제공되고 있었습니다.

<aside>
💡

- 오픈 소스
    - repo의 LICENSE 파일 참고 결과 수정 여부와 상관없이 재배포가 가능합니다. 다만 Copyright만 고지하면 됩니다.
- ChromeDevTools/devtools-frontend
    - Chrome DevTools의 클라이언트 측입니다.
- Chrome DevTools Protocol(CDP)
    - DevTool이 실질적인 기능을 하도록 도와주는 통신 방식입니다.
    - remote-debugging-port로 시작된 크롬이 있어야 합니다.
</aside>

재료가 주어졌다는 것을 확인 했으나, 실제로 어떻게 devtools-frontend과 CDP가 통신하는 지 알기 위해서는 직접 검증하는 과정이 필요했고 이는 쉽진 않았습니다. 검증을 위해서 다음의 단계들을 거쳤습니다.

- Protocol monitor로, 특정 디버거의 기능을 사용하면 어떻게 통신이 이뤄지는 지 관찰했습니다.
- 디버거의 디버거로 디버거의 네트워크 탭의 ws통신과 source코드를 뜯어 보았습니다.
- 실제로 설치해 VSCode에서 devtools-frontend와 CDP를 직접 다뤘습니다. 이때에는 구글에서 직접 만들어서 사용하는 depot_tools를 사용해서 설치하고 설정하고 빌드하는 과정이 필요 했고, 꽤 난관이었습니다.

위의 단계들에서 어려운 점을 만나면 다음과 같이 다시 더 작은 단위로 쪼개서 진행했습니다. 

- devtools-frontend와 CDP를 연결시키기
    - file mood로 연결 시키기
    - hosted mood로 연결 시키기
- 내가 빌드해서 띄운 화면으로 CDP 요청이 되는 걸 까?
    - 작은 글자만 바꿔보기
    - 버튼 컴포넌트를 추가해보기
    - 오픈소스에서 사용하는 버튼 컴포넌트를 재사용해보기
    - CDP 요청을 보내는 로우레벨 함수를 호출해보기

과정을 진행하면서 오픈소스 코드와의 거리감도 줄일 수 있었습니다.

### 무슨 경로의 파일을 수정해야 디버거에 제어 버튼을 추가할 수 있을 까?

크롬 디버거는 크고 복잡한 웹 앱입니다. 방대한 파일들에 어떤 경로의 파일 부터 접근해야 하는 지 길을 잠시 잃었었습니다. 그러던 중 나만의 엔트리 포인트를 찾으면 되겠다는 아이디어가 떠올랐습니다. 

<aside>
💡

- 아키텍처 이해
    - UI 컴포넌트를 담당하는 부분이 어디인가?
    - 네트워크 연결을 담당하는 부분이 어디인가?
</aside>

디버거의 디버거로 클릭 이벤트에 디버거를 걸어서 버튼 렌더링 위치 부터 시작해서 차근히 코드 흐름을 따라갔습니다. 그 결과 중요 파일들을 발견할 수 있었습니다. 이렇게 타겟을 좁힌 다음, devtools_frontend의 기여 가이드와 비교하며 부분이나마 아키텍처를 이해하고자 했습니다. 그리고 소스코드에 바로 접근해서 수정하면서 타입에러를 따라가보는 것도 많은 도움이 되었습니다.

## 제어문 대응

코드가 제 역할을 하기 위한 최소한의 필요 조건이 함수, if문, for문이라고 생각했습니다. 이를 MVP로 두고 작업을 진행했습니다. 이 과정에서 코드의 정상적인 흐름인 위에서 아래로의 흐름을 제어하는 문을 대응하는 과정이 어려움이 있었습니다.

본 프로젝트 개발을 진행하면서 정확도와 속도를 중요하다고 보았고 이에 모든 상태를 기억하기 보다는 breakpoint를 응용하는 방법을 채택했습니다. 실제로 뒤로가기 기능이 없는 디버거를 사용할 때 사용자의 입장에 쓰던 방식을 거의 그대로 옮겼습니다. 

breakpoint는 하나의 스크립트 맨 위에서 아래로 구성되어 있습니다. 그러나 대표적으로 for문을 예시로 들자면, initialization → condition → for loop body → afterthought → condition part로 코드의 제어가 옮겨갑니다. breakpoint와 제어문의 코드 흐름이 다른 부분을 어떻게 구현할 지가 중요했습니다. 

디버거의 CDP request과 response를 탐색하는 과정에서 callFrame과 scope 모습의 변화에 집중 하여 문제를 해결했습니다.

# 기술스택

## Chrome DevTools Protocol(CDP)

- DevTool이 실질적인 기능을 하도록 도와주는 통신 방식입니다.
- remote-debugging-port로 시작된 크롬이 있어야 합니다.
- https://chromedevtools.github.io/devtools-protocol/
    
    > The **Chrome DevTools Protocol** allows for tools to instrument, inspect, debug and profile Chromium, Chrome and other Blink-based browsers. 
    (…)
    If started with a remote-debugging-port, these HTTP endpoints are available on the same port. ([Chromium implementation](https://cs.chromium.org/search/?q=f:devtools_http_handler.cc+%22command+%3D%3D+%22&sq=package:chromium&type=cs))
    > 

## ChromeDevTools/devtools-frontend

- Chrome DevTools의 클라이언트 측입니다.
- 이전 줄로 갈 수 있는 디버거는 기본적인 디버거 기능을 충족해야 하므로 오픈소스로 제공되고 있는 devtools-frontend를 커스텀합니다.
- https://github.com/ChromeDevTools/devtools-frontend/tree/main
    
    > The client-side of the Chrome DevTools, including all TypeScript & CSS to run the DevTools webapp.
    > 

## Chromium

- Chrome의 기반이 되는 소스코드를 제공하는 오픈소스 프로젝트 입니다.
- Chrome DevTools를 다루기 위해 Chromium의 이해가 필요합니다.
- https://chromium.googlesource.com/chromium/src/+/main/docs/README.md

## depot_tools

- Chromium 개발을 위한 도구 모음입니다. 해당 도구없이는 Chromium을 개발 할 수 없습니다.
- 빌드를 위한 gclient등을 제공합니다.
- https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up
    
    > A collection of tools for dealing with Chromium development.
    (…)
    Some of these tools are *essential* to the development flow, in the sense that you cannot successfully develop Chromium without them.
    > 

## TypeScript

- 오픈소스를 커스텀하여 프로젝트를 진행할 예정이므로 언어는 TypeScript를 사용합니다.
- chrome에서 제공하는 devtools-frontend는 typescript를 사용하여 작성되었습니다.

## Puppeteer

- Chrome Browser Automation 팀이 유지관리하는 라이브러리
- puppeteer로 크롬을 조작합니다

# 트러블슈팅

# 회고