import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

// redux
import { store } from "../../store/redux/store";
import { Provider } from "react-redux";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Router>
    <Provider store={store}>
      {children}
    </Provider>
  </Router>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export { customRender as render };
