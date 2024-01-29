### Step by Step Solution: Task 3
1. Check out `ReactContext` documentation
2. Chose your colors, see video. This are the ones we chose:
```typescript
    export const themeList: Record<string, Theme> = {
        light: {
            foreground: "#2d3436",
            background: "#dfe6e9",
            background_secondary: "#ffffff",
        },
        dark: {
            foreground: "#dfe6e9",
            background: "#2d3436",
            background_secondary: "#636e72",
        },
    };
```
3. Setup our context. We need two things for that:
   - the data that will live in the context - the active theme
   - a way to update that data - only the shallow interface of that function

This is how our implementation looks like:

```typescript
import React from "react";

export enum ThemeName {
  LIGHT = "light",
  DARK = "dark",
}

export type Theme = {
  foreground: string;
  background: string;
  background_secondary: string;
};

export const themeList: Record<string, Theme> = {
  light: {
    foreground: "#2d3436",
    background: "#dfe6e9",
    background_secondary: "#ffffff",
  },
  dark: {
    foreground: "#2d3436",
    background: "#2d3436",
    background_secondary: "#636e72",
  },
};

export const DarkModeContext = React.createContext({
  theme: themeList.light,
  setTheme: (themeName: ThemeName): void => {},
});

```


4. Setup our context initial values and the provider. In `App.js`:
   - we add `state` that will keep the current value of the theme
   - we initiate context, giving it a way to change state

The `Context` api will pass both those values down the component tree, so all components can access and modify the theme.

```typescript
export default function App() {
  const [activeTheme, setActiveTheme] = useState(themeList.light);

  return (
    <DarkModeContext.Provider
      value={{
        theme: activeTheme,
        setTheme: (themeKey: ThemeName) => {
          setActiveTheme(themeList[themeKey] as Theme);
        },
      }}
    >
      <AppContainer>
        <Header></Header>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movie/:id" element={<MoviePage />}></Route>
          </Routes>
        </Router>
        <Footer></Footer>
      </AppContainer>
    </DarkModeContext.Provider>
  );
}

```

5. Add a toggle to change mode:
   - we used `react-toggle` to build a custom toggle
   - connected to context so it can change the theme
   - add it to our `Header` component

```typescript
import React, { useContext } from "react";
import Toggle from "react-toggle";
import styled from "styled-components";
import { DarkModeContext, themeList, ThemeName } from "../store/context";

export default function DarkModeToggle() {
  const context = useContext(DarkModeContext);

  return (
    <ToggleContainer>
      <Toggle
        defaultChecked={context.theme === themeList.dark}
        onChange={() => {
          if (context.theme === themeList.dark) {
            context.setTheme(ThemeName.LIGHT);
          } else {
            context.setTheme(ThemeName.DARK);
          }
        }}
      />
      <ToggleLabel>Dark Mode</ToggleLabel>
    </ToggleContainer>
  );
}

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleLabel = styled.span`
  margin-left: 10px;
`;
```

1. Connect all the relevant components to `Context` and make their styles dynamic.

**Here we leverage the `HOC` pattern and `JSS` to create dynamic components that can change styles depending on their props.**


See an example with the `AppContainer`:

```typescript
import React, { useContext } from "react";
import styled from "styled-components";
import { DarkModeContext } from "../../store/context";

interface AppContainerRawProps {
  backgroundColor: string;
}

const AppContainerRaw = styled.div<AppContainerRawProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
`;

// Composition Pattern - A sort of less generic HOC
export default function AppContainer({
  children,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const context = useContext(DarkModeContext);
  return (
    <AppContainerRaw {...props} backgroundColor={context.theme.background}>
      {children}
    </AppContainerRaw>
  );
}

```




