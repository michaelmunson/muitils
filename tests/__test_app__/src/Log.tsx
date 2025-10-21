import { Col } from "../../../src";

export const useLog = () => {
  const Log = () => <Col id="log" gap={3} sx={{backgroundColor: 'black', color: 'white', padding: 3, borderRadius: 3}}></Col>
  const getLogElement = () => document.getElementById('log') as HTMLDivElement;
  const addLog = (log:string) => {
    const logElement = getLogElement();
    if (logElement) {
      logElement.innerHTML = logElement.innerHTML + `<p>${log}</p>`;
      logElement.scrollTo({top: logElement.scrollHeight, behavior: 'smooth'});
    }
  }
  return {Log, getLogElement, addLog} as const;
}
