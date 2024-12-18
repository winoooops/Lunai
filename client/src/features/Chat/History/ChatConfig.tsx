import { useState } from "react";

export const ChatConfig = () => {
  const [isStream, setIsStream] = useState(false);
  const [maxTokens, setMaxTokens] = useState(256);
  const [temperature, setTemperature] = useState(0.5);
  const [system, setSystem] = useState("");

  return (
    <form className="">
      <div className="flex flex-col items-start gap-2">
        <label htmlFor="system">System Prompt: </label>
        <textarea className="w-full" id="system" value={system} onChange={(e) => setSystem(e.target.value)} />
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="stream">Stream Response: </label>
        <input type="checkbox" id="stream" value={`${isStream}`} onChange={() => setIsStream(!isStream)} />
      </div>

      <div className="flex items-center gap2">
        <label htmlFor="max_tokens">Max Tokens: </label>
        <input type="number" id="max_tokens" value={maxTokens} min="128" max="1024" step="128" onChange={(e) => setMaxTokens(parseInt(e.target.value))} />
      </div>


      <div className="flex items-center gap2">
        <label htmlFor="temperature">Temperature: </label>
        <input type="range" id="temperature" value={temperature} min="0.1" max="1.0" step="0.1" onChange={(e) => setTemperature(parseFloat(e.target.value))} />
      </div>
    </form>          
  );
}