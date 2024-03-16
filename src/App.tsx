import TitleBar from "./components/TitleBar";
import { 
  Button,
  Menu,
  MenuTrigger,
  MenuList,
  MenuItem,
  MenuPopover,
  FluentProvider } from '@fluentui/react-components';
import Welcome from "./frontapp/Welcome";
import { useState, useEffect } from "react";
import { webLightTheme, webDarkTheme } from "@fluentui/react-components";
import { cfg } from "./stores/config";
import { t } from "./intl";
import FrontApp from "./frontapp/FrontApp";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));
  useEffect(() => {
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    return () => {
      observer.disconnect();
    };
  }, []);

  const fluentTheme = isDarkMode ? webDarkTheme : webLightTheme;
  return (
    <div className="container">
      <FluentProvider theme={fluentTheme} id="fluent" className="rounded-[10px]">
        <TitleBar>
          {cfg.firstsetting === "open" && t.titlebar.welcome}
          {cfg.firstsetting === "NaN" && t.titlebar.welcome}
          {cfg.firstsetting === "end" && 
            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button appearance="subtle">File</Button>
              </MenuTrigger>
              <MenuPopover>
                <MenuList>
                  <MenuItem>New </MenuItem>
                  <MenuItem>New Window</MenuItem>
                  <MenuItem disabled>Open File</MenuItem>
                  <MenuItem>Open Folder</MenuItem>
                </MenuList>
              </MenuPopover>
            </Menu>
          }
        </TitleBar>
        <div className="h-[calc(100vh-64px)] w-screen bg-slate-50 dark:bg-slate-950 rounded-b-[10px]">
          {cfg.firstsetting === "open" && <Welcome />}
          {cfg.firstsetting === "NaN" && <Welcome />}
          {cfg.firstsetting === "end" && <FrontApp />}
        </div>
      </FluentProvider>
    </div>
  );
}

export default App;
