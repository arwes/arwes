/* eslint-env jest */

import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { Checkbox } from './index';

afterEach(cleanup);

test('Should render element with class "arwes-checkbox"', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  expect(element.tagName).toBe('DIV');
  expect(element.classList.contains('arwes-checkbox')).toBeTruthy();
});

test('Should render children inside content element', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox>
        My Awesome Label
      </Checkbox>
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  const content = element.querySelector('.arwes-checkbox__content') as HTMLDivElement;
  expect(content.innerHTML).toBe('My Awesome Label');
});

test('Should pass basic input checkbox props to actual input directly', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox name='myName' />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  const input = element.querySelector('input') as HTMLInputElement;
  expect(input.name).toBe('myName');
});

test('Should allow to pass any input checkbox props to actual input directly via "inputProps"', () => {
  const onKeyPress = jest.fn();
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox inputProps={{
        name: 'customName',
        id: 'customId',
        className: 'customClass',
        onKeyPress: onKeyPress
      }} />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  const input = element.querySelector('input') as HTMLInputElement;
  expect(input.name).toBe('customName');
  expect(input.id).toBe('customId');
  expect(input.classList.contains('customClass')).toBeTruthy();
  fireEvent.keyPress(input, { charCode: 33 }); // Any key.
  expect(onKeyPress).toHaveBeenCalled();
});

test('Should disable keyboard accessibility when "readOnly"', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox readOnly />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  const input = element.querySelector('input') as HTMLInputElement;
  expect(input.tabIndex).toBe(-1);
});

test('Should enable keyboard accessibility when not "readOnly" by default', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  const input = element.querySelector('input') as HTMLInputElement;
  expect(input.tabIndex).toBe(0);
});

test('Should not allow to toggle input checkbox when "readOnly"', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox defaultChecked={true} readOnly />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.checked).toBe(true);
  fireEvent.click(element);
  expect(input.checked).toBe(true);
});

test('Should not allow to toggle input checkbox when "disabled"', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Checkbox defaultChecked={true} disabled />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLDivElement;
  const elementContainer = element.querySelector('label.arwes-checkbox__container') as HTMLLabelElement;
  const input = container.querySelector('input') as HTMLInputElement;
  expect(input.checked).toBe(true);
  fireEvent.click(elementContainer);
  expect(input.checked).toBe(true);
});

describe('defaultChecked value', () => {
  test('Should allow to toggle on input checkbox', () => {
    const { container } = render(
      <ArwesThemeProvider>
        <Checkbox defaultChecked={false} />
      </ArwesThemeProvider>
    );
    const element = container.firstChild as HTMLDivElement;
    const elementContainer = element.querySelector('label.arwes-checkbox__container') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(false);
    fireEvent.click(elementContainer);
    expect(input.checked).toBe(true);
  });

  test('Should allow to toggle off input checkbox', () => {
    const { container } = render(
      <ArwesThemeProvider>
        <Checkbox defaultChecked={true} />
      </ArwesThemeProvider>
    );
    const element = container.firstChild as HTMLDivElement;
    const elementContainer = element.querySelector('label.arwes-checkbox__container') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
    fireEvent.click(elementContainer);
    expect(input.checked).toBe(false);
  });
});

describe('checked value', () => {
  test('Should allow to toggle on input checkbox', () => {
    const Example = (): React.ReactElement => {
      const [checked, setChecked] = React.useState(false);
      return (
        <ArwesThemeProvider>
          <Checkbox
            checked={checked}
            onChange={event => setChecked(event.currentTarget.checked)}
          />
        </ArwesThemeProvider>
      );
    };
    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;
    const elementContainer = element.querySelector('label.arwes-checkbox__container') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(false);
    fireEvent.click(elementContainer);
    expect(input.checked).toBe(true);
  });

  test('Should allow to toggle off input checkbox', () => {
    const Example = (): React.ReactElement => {
      const [checked, setChecked] = React.useState(true);
      return (
        <ArwesThemeProvider>
          <Checkbox
            checked={checked}
            onChange={event => setChecked(event.currentTarget.checked)}
          />
        </ArwesThemeProvider>
      );
    };
    const { container } = render(<Example />);
    const element = container.firstChild as HTMLDivElement;
    const elementContainer = element.querySelector('label.arwes-checkbox__container') as HTMLLabelElement;
    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.checked).toBe(true);
    fireEvent.click(elementContainer);
    expect(input.checked).toBe(false);
  });
});
