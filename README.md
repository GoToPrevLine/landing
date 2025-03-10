# BackDo

![Untitled.png](https://github.com/user-attachments/assets/3edcb1f1-8033-4671-9979-25cdedaf9741)

# 목차

- [BackDo](#backdo)
- [목차](#목차)
- [아이디어 선정 배경](#아이디어-선정-배경)
  - [디버거에서 앞으로 가기가 있는 데, 왜 뒤로 가기는 없을 까?](#디버거에서-앞으로-가기가-있는-데-왜-뒤로-가기는-없을-까)
  - [자유롭게 뒤로 가고, 이후에는 새로운 경로로 탐색하고 싶어요](#자유롭게-뒤로-가고-이후에는-새로운-경로로-탐색하고-싶어요)
- [기능](#기능)
  - [for 문에서 backdo](#for-문에서-backdo)
  - [if 문에서 backdo](#if-문에서-backdo)
  - [함수에서 backdo](#함수에서-backdo)
- [기술 스택](#기술-스택)
- [개발 과정 중 챌린지 요소](#개발-과정-중-챌린지-요소)
  - [디버거에 새로운 기능을 어떻게 넣는 가?](#디버거에-새로운-기능을-어떻게-넣는-가)
    - [오픈 소스](#오픈-소스)
    - [어느 정도까지 코드 베이스를 이해해야 할 까?](#어느-정도까지-코드-베이스를-이해해야-할-까)
    - [기존 로직을 활용 할 수 있을 까?](#기존-로직을-활용-할-수-있을-까)
  - [어떻게 backdo가 가능한가?](#어떻게-backdo가-가능한가)
    - [기본 접근 방법](#기본-접근-방법)
    - [JavaScript 코드흐름과 breakpoint 흐름 맞추기](#javascript-코드흐름과-breakpoint-흐름-맞추기)
      - [for 문 body](#for-문-body)
      - [for 문 head](#for-문-head)
    - [도달할 수 없는 블럭 판단](#도달할-수-없는-블럭-판단)
      - [함수 내부에서 함수 이름을 찾을 수 없음](#함수-내부에서-함수-이름을-찾을-수-없음)

# 아이디어 선정 배경

## 디버거에서 앞으로 가기가 있는 데, 왜 뒤로 가기는 없을 까?

기존 디버거는 여러가지 버전으로 앞으로 가는 기능을 제공하고 있습니다. step, step into, step out, step over… 그런데 왜 뒤로 가는 기능은 없을 까요? 바쁘게 코드를 디버깅하다가 순간 들러야 하는 줄을 지나치게 될 때는 이따금씩 아쉽기도 했습니다. 이러한 순간들을 모아 BackDo 프로젝트로 승화했습니다. 디버거의 도구모음중 하나로 이질감없는 위치에 BackDo 버튼이 있습니다. 직관적으로 버튼 한 번만 누르면 작동합니다.

## 자유롭게 뒤로 가고, 이후에는 새로운 경로로 탐색하고 싶어요

resume로 지나쳤다거나, step을 누르면서 지나쳤다거나 상관없이, 즉 사전 조건 필요 없이 언제나 코드 흐름 상 한 단계 거꾸로 간 모습을 표현해줍니다. 이전에는 들어가지 않았던 함수 내부로 들어가 볼 수도 있고 또는 스킵할 수도 있는 기회를 제공합니다. 비디오 녹화 처럼 단순히 기억을 되짚고 정해진 시나리오만 볼 수 있는 것이 아닌, 실제로 소스 코드와 상호작용할 수 있도록 구성했어요.

# 기능

## for 문에서 backdo

- for loop body 내부에서 loop counter를 유지한 상태로 한 단계씩 거꾸로 갈 수 있습니다.
- for loop body 첫 번째 줄에서 condition part로 이동할 수 있습니다.
- condition part에서 loop counter가 초기값이 아닐 경우 afterthought part로 이동할 수 있습니다.
  - afterthought part에서 for loop body 마지막 줄로 이동할 수 있습니다.
- condition part에서 loop counter가 초기값일 경우 initialization part로 이동할 수 있습니다.
  - initialization part에서 for 문 이전의 줄로 이동할 수 있습니다.
- for loop 문 밖에서 재진입시 마지막 loop counter를 가진 condition part로 이동할 수 있습니다.

![for문에서backdo](https://github.com/user-attachments/assets/7cbbb28e-a626-4951-b8e6-64b76f41bb44)

## if 문에서 backdo

- 조건에 의해 도달 할 수 없는 줄은 건너뜁니다.

![if문에서backdo](https://github.com/user-attachments/assets/1625cb7e-54c8-42fa-8a66-23c7f6a2f89f)

## 함수에서 backdo

- 함수 스코프를 지킵니다.
  - 함수 첫 번째 줄에서는 paused 상태를 유지합니다.
  - 내부에 함수 선언문이 존재 할 경우 건너뜁니다.
- 함수 호출하기 이전의 줄로 이동할 수 있습니다.
- 중첩 함수 내부에서 한 단계씩 거꾸로 갈 수 있습니다.
- 콜백 함수 내부에서 한 단계씩 거꾸로 갈 수 있습니다.

![중첩에서backdo](https://github.com/user-attachments/assets/e1313daa-f32d-497d-9301-d2f1b8dab41a)
![콜백에서backdo](https://github.com/user-attachments/assets/4e7cbccb-1847-45dc-82e6-df46b815d95a)


# 기술 스택

<img src="https://img.shields.io/badge/chrome devtools protocol-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/puppeteer-40B5A4?style=for-the-badge&logo=puppeteer&logoColor=white">
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/tailwind css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/daisy ui-1AD1A5?style=for-the-badge&logo=daisyui&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white">

# 개발 과정 중 챌린지 요소

## 디버거에 새로운 기능을 어떻게 넣는 가?

### 오픈 소스

구글 크롬 개발자도구는 건강한 개발 생태계를 위해 오픈소스로 제공되고 있어요. LICENSE 파일을 보면 수정 여부와 상관없이 Copyright만 고지하면 재배포가 가능하다고 설명하고 있습니다. 활용할 수 있다는 사실을 알았지만 실제로 수정을 하기 위해서는 넘어야 하는 산이 있어요. 오픈소스로 제공되는 방대하고 복잡한 웹앱을 수정하기 위해 **코드베이스 분석**은 필수입니다.

평소에 **공식 문서를 바탕으로 직접 코드를 치고 수정하는 방식**이 저에게는 기술을 습득하는 데 가장 빠르다고 생각합니다. 오픈 소스에도 제작자들이 만들어놓은 문서들이 존재하여 특히 [Get the Code](https://chromium.googlesource.com/devtools/devtools-frontend/+/main/docs/get_the_code.md), [Contribution Guide](https://chromium.googlesource.com/devtools/devtools-frontend/+/main/docs/contributing/README.md), [Architecture of DevTools](https://chromium.googlesource.com/devtools/devtools-frontend/+/main/docs/architecture_of_devtools.md), [Chrome DevTools Protocol](https://chromedevtools.github.io/devtools-protocol/) 문서가 많은 도움이 됩니다. 이렇게 새롭게 얻게 된 지식을 소화시키기 위해 바로 코드베이스로 넘어가 확인하는 데, 마치 핑퐁 같아요.

코드베이스를 로컬 환경에서 구동되도록 설정하고 냅다 코드를 수정하기 위해서는 오픈 소스 제작자들이 사용하는 새로운 빌드 툴을 써야해요. 구글은 [depot_tools](https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)를 만들어 사용하고 있고 코드를 받고 빌드하는데 필수라 depot_tools 문서를 탐독하며 다시 여러 시행착오를 거치면서 설정을 진행합니다.

Chrome DevTools frontend 부분을 수정하지만 벡엔드와의 연결도 필요해 별도의 크롬을 remote-debugger-mode로 열어 CDP 통신을 가능하게 해주는 웹소켓 주소를 얻습니다. **해당 작업에 있어 3개의 터미널 창이 필요하고 복잡하고 긴 명령어를 매일 입력해야 하는 점이 번거롭게 느껴졌어요. 작업 환경 개선을 위해 puppeteer를 사용해서 크롬을 조작 하고 해당 명령을 express을 사용해 api로 만들기도 했습니다.** 해당 api는 배포할 때도 요긴하게 사용할 수 있어요.

### 어느 정도까지 코드 베이스를 이해해야 할 까?

실제로 작업할 수 있는 코드를 확보하고 오픈 소스 문서들을 비교해서 읽어보면서 그 방대함과 복잡함에 **저만의 기준을 세울 필요성**을 느끼는 순간이 있어요. 영향을 미칠 수 있는 영역을 한정하기 위해 제가 관심 있는 부분 부터 선정합니다. **사용자가 직관적으로 사용할 수 있는 버튼의 위치가 파일의 어느 부분에서 렌더링 되고 있을 까요? CDP 통신을 요청하는 함수는 어디서 가져올 수 있을 까요?** 위의 질문들에 스스로 답하기 위해 필요한 도구를 발견합니다. 바로 디버거의 디버거와 protocol monitor에요.

개발자 도구는 웹 앱이기 때문에 **개발자 도구의 개발자 도구**를 열 수 있어요. 1. 개발자도구의 Element 탭을 엽니다. 2. 오른쪽 상단의 점 세개를 눌러 Dock side를 별도의 창으로 undock 합니다. 3. Element 탭이 제대로 작동하고 있는 지 확인 후 cmd + option + I 를 누릅니다. 새로이 열린 디버거의 디버거를 통해 click 이벤트에 Event Listener Breakpoint를 걸어요. 기존 디버거의 step 버튼을 클릭하고 paused 상태로 나타난 소스코드를 따라가면서 관심있는 함수와 파일을 발견합니다.

개발자도구가 만드는 모든 CDP 요청과 응답을 [**protocol monitor**](https://developer.chrome.com/docs/devtools/protocol-monitor)로 직접 보고 요청도 할 수 있어요. 1. 개발자 도구의 오른쪽 상단의 톱니바퀴 버튼을 클릭합니다. 2. Experiments에서 Protocol Monitor를 선택합니다. 3. 개발자 도구를 껐다 키고, 오른쪽 상단의 점 세개를 눌러 More tools에서 Protocol Monitor를 선택합니다. protocol monitor를 사용하면서 step 버튼 클릭 시 어떤 요청과 응답이 발생하는 지 추적할 수 있습니다. Chrome DevTools frontend가 CDP를 어떻게 활용하는 지 확인합니다. 그리고 직접 간단한 요청을 보내면서 동작 원리를 이해할 수 있어요.

이제 VSCode에서 제어 버튼을 렌더링하는 위치로 이동해 냅다 새로운 코드를 작성하고 타입에러를 발생시킵니다. 그리고 타입에러를 잡으면서 버튼 팩토리 함수를 사용하는 방법을 배우다보면 자연스럽게 이벤트리스너 콜백에 접근하고, CDP 요청을 하는 함수가 특정 모델과 연결되어 있음을 인지할 수 있습니다. 결과적으로 SourcesPanel.ts 파일에서 작업하고 UI.Toolbar.ToolbarButton, SDK.RuntimeModel, SDK.DebuggerModel 등을 주로 활용하는 것에 초점을 맞췄습니다.

### 기존 로직을 활용 할 수 있을 까?

오픈소스로 작업하는 장점은 기존 코드베이스의 풍부한 함수들이라고 생각해요. 핵심 기능 개발에 집중하기 위해 도움이 될 수도 있는 코드를 탐색합니다.

실제로 호출하고 여러 인수를 넣어보면서 적용한 결과 활용성을 점쳐보았을 때 실제로 재활용한 로직은 버튼의 호버와 툴팁 등이 미리 설정되어 있는 툴바 버튼 팩토리 함수 입니다.

그 이외의 네트워크 통신 등의 로직들은 커스텀이 들어가 있는 부분이 많아 재활용은 어려웠습니다. 대신 기존 로직에서 좀 더 로우 레벨의 함수 존재 여부와 특정 데이터를 얻을 수 있는 위치 등을 알아내는데 활용합니다. 그리고 해체해서 얻은 정보를 기반으로 원하는 기능이 첨가된 새로운 함수들을 생성합니다.

## 어떻게 backdo가 가능한가?

### 기본 접근 방법

평소에 이전 줄의 상태를 보고 싶을 때 제가 사용하던 방법을 코드화 시키는 간단한 접근 방법을 채택했어요. 가고 싶은 이전 줄의 숫자를 기억하고, 스크립트를 다시 실행하고, 기억한 줄에 breakpoint를 주고, 재개하던 방법이에요. 모든 상태를 기억하는 방법도 고려해 보았으나 “모든” 상태에 대한 기준이 명확하지 않아 정확도가 떨어지고 이후의 요청이 꼬여 기존 디버거 기능 작동을 침범할 우려가 있었습니다. 속도와 용량 문제도 존재했습니다. 반면에 breakpoint + top callFrame restart + resume 방식은 기존 디버거에서 제공하는 기능을 새로이 조합하여 통제 범위를 backdo의 핵심 기능 부분으로 한정 시킬 수 있습니다. 그리고 별도로 저장하는 데이터가 없어 속도와 용량 문제도 발생하지 않습니다. 다만 순수함수만 대응이 가능합니다. 작은 기능이라도 튼튼하게 구현할 수 있는 방향으로 선택했습니다.

### JavaScript 코드흐름과 breakpoint 흐름 맞추기

![Group 1](https://github.com/user-attachments/assets/de126fdd-71c7-485e-8f29-6c55ce0f9c0d)
![Group 2](https://github.com/user-attachments/assets/b1ff1c47-3af8-4953-8c44-41d235d2a32a)

#### for 문 body

**breakpoint를 현재 줄에서 이전 줄에 단순히 주면 restart를 한 이후에 loop counter가 0인 상태로 리셋이 되는 문제**가 발생합니다. for 문이 제어문이기 때문입니다. 일반적인 JavaScript 코드흐름은 위에서 아래로 흐르지만 코드 흐름을 제어하는 제어문인 for 문은 빙글빙글 돌면서 동일 한 줄을 여러번 실행할 수 있습니다. 해당 줄이 몇 번째 실행인지를 감지할 수 있어야 합니다.

이동 시 loop counter를 유지하기 위해서 **conditional breakpoint**를 사용했습니다. “i === 3”과 같이 문자열로된 표현식을 가진 조건을 생성해 breakpoint를 줄 때 optional 하게 부여 할 수 있습니다. 그렇다면 loop counter를 어떻게 취득할 수 있을 까요?

loop counter를 scopeChain에서 얻을 수 있을 것이라고 추측 할 수 있습니다. scopeChain은 callFrame에서 얻을 수 있을 것이고 callFrame은 디버거가 paused 상태일 때 접근 할 수 있습니다. protocol monitor로 디버거 동작을 감시하다가 힌트를 얻었습니다. 다만 scope의 변수 정보를 바로 제공하지 않고 위치를 ObjectId로 제공하고 있기 때문에 runtimeModel의 getProperties로 위치에 해당하는 정보들을 얻어오는 단계가 필요합니다.

결과적으로 loop counter는 현재 block scope의 부모 scope에서 찾을 수 있습니다. 디버거에서 for 문은 소괄호 부분(head)에 진입하자마자 block scope를 생성하고 중괄호 부분(body)에 진입하면 또 새로운 block scope를 생성합니다.먼저 생성된 block scope에서 찾은 loop counter의 name과 value를 사용하여 조건을 새로 만들고 debuggerModel의 setBreakpoint에 적용합니다.

#### for 문 head

breakpoint는 for loop head의 각 initialization, condition, afterthought에도 멈춥니다. 그리고 breakpoint의 흐름은 initialization > condition > afterthought > body 첫 번째 줄 > … > body 마지막 줄 > for 문 밖입니다. 그런데 JavaScript의 흐름은 이렇지 않습니다. 이 괴리에서 문제가 발생합니다.

**for loop body 첫 번째 줄에서 afterthought part로 이동하는 문제**

먼저 현재 body의 몇 번째 순서의 지점에 위치해 있는 지를 알아야 합니다. scopeChain에서 해당 scope의 타입과 시작 지점 끝 지점 정보를 습득한 이후 debuggerModel의 getPossibleBreakpoints를 활용해 loop body로 부터 몇 번째 순서의 breakpoint 지점에 멈춰있는 상태인 지 알 수 있습니다. 첫 번째 순서의 breakpoint 지점에 있다는 사실을 감지하게 되면 condition part로 이동하도록 로직을 만들었습니다. 부모의 scope가 head part를 품고 있으므로 condition을 가리키는 breakpoint를 얻을 수 있습니다.

**afterthought part에서 condtion part로 이동하는 문제**

현재 위치가 afterthought part라는 것을 알아야 합니다. debuggerModel의 searchInContent를 활용하여 현재 scope의 시작 지점에 for 키워드가 존재하는 지 확인합니다. 이때 정확성을 위해 정규표현식을 사용했는데 자체적으로 정규표현식을 만들어주는 유틸 함수를 발견하여 참고했습니다. 현재 위치를 감지한 이후에는 loop counter를 기준으로 for 문의 마지막 breakpoint로 이동시켰습니다.

**condition part에서 항상 initialization part로 이동하는 문제**

condtion part는 loop counter가 초기값일 경우에는 initialization part로 이동하고, 초기값이 아닐 경우에는 afterthought part로 이동해야 합니다. 방향이 2가지이며 특히 후자의 경우에는 현재의 loop counter가 아닌 이전의 loop counter를 가진 afterthought로 이동해야 합니다.

중요 포인트는 현재 loop counter가 초기값인지 여부, 이전의 loop counter의 값 두 가지를 알아내야 한다는 점입니다. 코드의 흐름을 추적하고 기억해야 합니다.

현재 loop counter를 initialCounter, triggeredCounter, targetCounter라는 3가지 상태로 명명합니다. triggered는 현재의 loop counter 입니다. target은 이전의 loop counter 입니다. 우선 현재의 loop counter를 triggered로 기억합니다. 다음으로 initial을 취득합니다. 아무런 조건 없이 condition part에 멈추도록 하면 얻을 수 있습니다. 마지막으로 debuggerModel의 continueToLocation을 사용하여 triggered에 도달할 때까지 loop를 실행시키면서 evaluateOnCallFrame으로 loop counter들을 수집합니다. loop counter가 triggered에 도달하면 수집해온 loop counter들 중에 마지막 것이 target입니다.

위의 과정을 통해 initialCounter, triggeredCounter, targetCounter를 알게되면 이후는 가볍게 진행할 수 있어요.

### 도달할 수 없는 블럭 판단

#### 함수 내부에서 함수 이름을 찾을 수 없음

특히 중첩 함수와 if 문은 도달할 수 없는 블럭 판단이 필요합니다. 판단하지 않는 다면 기존 breakpoint 흐름에 따라 도달할 수 없는 위치에 breakpoint를 지정할 수도 있기 때문입니다. 이렇게 되면 backdo는 제대로 작동하지 못하게 됩니다. 도달할 수 없는 블럭 판단을 위해서는 함수 내부에서 함수 이름 식별자에 접근해야하는 단계가 로직상 필요해요. 당연히 재귀함수가 가능하니 접근하는 데 문제가 없을 것으로 예상했으나 문제가 있습니다.

다음과 같이 기존 디버거 콘솔에서도 접근 할 수 없습니다.

<img width="1452" alt="스크린샷 2025-02-21 오후 6 33 44" src="https://github.com/user-attachments/assets/cd1ad61d-175f-4b6d-947c-2135456d3a69" />

기존 디버거의 Watch 부분에서 식별자를 보아도 접근할 수 없는 상태임이 확인 됩니다.

<img width="1354" alt="스크린샷 2025-02-21 오후 7 39 29" src="https://github.com/user-attachments/assets/8c7879b3-00b4-43c8-8365-a63bff186aee" />

그렇다면 재귀는 어떻게 가능한 것일까요? 여러 실험을 거친 결과 함수내부에서 함수 이름을 찾을 수 있는 경우는 다음의 두 가지입니다.

- 최상단 레벨인 script에서 해당 함수 선언을 이미 해서 사전에 한 번 디버거가 인지했을 경우

    <img width="605" alt="스크린샷 2025-02-21 오후 10 43 44" src="https://github.com/user-attachments/assets/51d3eecb-d652-4e1d-a180-e28028000227" />

- 함수 내부에서 함수 이름 참조를 사용할 경우

    <img width="626" alt="스크린샷 2025-02-21 오후 10 47 43" src="https://github.com/user-attachments/assets/98e97fac-02aa-4103-8066-ba95fcd13f10" />

groups.google.com에 따르면 함수 내부에서 함수의 이름을 파악하기는 어려우며, 런타임에 이를 알아내는 방법은 예외를 생성하고 검사해서 스택을 파해치는 방법이 있다고 안내합니다. 그러나 함께 이는 비용이 많이 든다는 유의점을 함께 덧붙입니다. 배포 시 어려움이 있을 수 있기 때문에 이는 후순위로 미뤄 둡니다.

결론적으로 개발자도구 자체적으로 함수 내부에서 함수 이름을 참조하거나 , 사전에 미리 알린 경우가 아니라면 함수 이름에 접근하고자 할 때 not available 입니다. 사용자에게 중첩 함수를 선언할 때는 함수 내부에서 함수 이름을 참조하라는 특이한(?) 규칙을 지키라고 하기에는 어렵습니다. 사용자를 대신해서 behind since에서 식별자를 심는 것도 예상하지 못한 다른 부작용을 야기할 것 같기도 합니다. 기존 디버거의 한계로 생각했던 로직을 활용하지 못하니 생각의 전환이 필요합니다.

원래 함수 내부에서 함수 이름에 접근하고자한 이유부터 다시 생각해 보면 함수 내부 소스를 문자열로 받기 위함입니다. 이를 조금 비틀면 상위 callFrame(outter)이 가동 중일 때는 다른 변수들과 같이 함수 이름(inner)을 발견할 수 있음을 생각할 수 있습니다. 즉 이미 존재하는 데이터인 데 접근에 어려움을 겪는 중입니다. 이에 새로 심어서 생성하는 것 보다 이미 있는 것을 올바르게 가져올 수 있는 방법을 우선 시도합니다.

결과적으로 에러 메시지 해결에 시간을 쏟기 보다 접근 방식을 바꾼 점이 효과적이었습니다. 상위의 callFrame에 접근하여 함수 이름과 함수 내부 소스를 문자열로 받아왔습니다. callFrames는 restart, resume, step 등 여러 이유로 paused 되어도 paused 될 때마다 변수에 변화가 없더라도 항상 새로운 ObjectId를 Scope에 부여하는데,  runtimeModel의 getProperties에 유효한 ObjectId를 제공해야하는 점만 신경쓰면 더 이상의 에러 상황은 만나지 않았어요.
