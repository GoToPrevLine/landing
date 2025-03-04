function Step({ title, command, description }) {
  return (
    <article>
      <div className="text-secondary font-semibold">{title}</div>
      <div className="mockup-code w-full">
        <pre data-prefix="$">
          <code>{command}</code>
        </pre>
        {description &&
          description.map(({ color, log }) => {
            return (
              <pre
                data-prefix=">"
                className={`text-${color}`}
              >
                <code>{log}</code>
              </pre>
            );
          })}
      </div>
    </article>
  );
}

export default function Guide() {
  return (
    <details className="dropdown">
      <summary className="btn m-1">Guide</summary>
      <div className="menu dropdown-content bg-base-100 rounded-box z-1 w-[750px] p-2 shadow-sm h-[670px] flex-nowrap gap-3 drop-shadow-md">
        <Step
          title="STEP 1."
          command="git clone --branch cli https://github.com/GoToPrevLine/server.git && cd server"
        />
        <Step
          title="STEP 2."
          command="npm i && npm run start"
          description={[{ color: "warning", log: "Serving on port 3000" }]}
        />
        <Step
          title="STEP 3."
          command="npm run ws"
          description={[
            { color: "success", log: "https://landing.backdo.site 에서 webSocketID를 입력해주세요." },
            { color: "success", log: "👇" },
            { color: "success", log: "8693A0BB7F4A2A68F1B6EF454C7A6288" },
            { color: "success", log: "모든 디버깅 작업 종료 후, 다음 명령어를 입력해 안전하게 프로세스를 종료해주세요." },
            { color: "success", log: "👇" },
            { color: "success", log: "npm run close 97771" }
          ]}
        />
        <Step
          title="STEP 4. 모든 디버깅 작업 종료 이후"
          command="npm run close 97771"
          description={[{ color: "success", log: "프로세스가 닫혔습니다." }]}
        />
      </div>
    </details>
  );
}
