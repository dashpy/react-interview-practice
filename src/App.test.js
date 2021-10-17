import React from "react";
import { render as renderReactDom, unmountComponentAtNode } from "react-dom";
import { cleanup, render, screen, wait } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";

import { act } from "react-dom/test-utils";
import getResponse from "./response.mock";

import App from "./App";

let container = null;

const response = getResponse();

const getInformation = jest.fn().mockImplementation(() => getResponse());

beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("loads and displays list", async () => {
  const { getByText } = render(<App />);
  let text = getByText("Soyuz returns cosmonauts and film crew to Earth");

  expect(text).toBeDefined();
});

// UI Level
test("Input debe ser visible", () => {
  act(() => {
    renderReactDom(<App />, container);
  });
  expect(
    container.querySelector("[name='input-search']").getAttribute("placeholder")
  ).toEqual("search content");
});

test("Botones deben ser visible", () => {
  act(() => {
    renderReactDom(<App />, container);
  });
  expect(container.querySelector("[name='button-prev']")).toBeDefined();
  expect(container.querySelector("[name='button-next']")).toBeDefined();
});

test("Botones deben ser visible", () => {
  act(() => {
    renderReactDom(<App />, container);
  });
  expect(container.querySelector("[name='button-prev']")).toBeDefined();
  expect(container.querySelector("[name='button-next']")).toBeDefined();
});

// service Level
test("Data is fetch properly", async () => {
  const URL = "https://api.spaceflightnewsapi.net/v3/articles";
  const responseData = await getInformation(URL);

  expect(responseData).toStrictEqual(response);
});
