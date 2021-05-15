/* eslint-env jest */

import React from 'react';
import { render, cleanup } from '@testing-library/react';

import { ArwesThemeProvider } from '../ArwesThemeProvider';
import { Table } from './index';

afterEach(cleanup);

test('Should render table elements', () => {
  const { container } = render(
    <ArwesThemeProvider>
      <Table
        headers={[
          { id: 1, data: 'a' },
          { id: 2, data: 'b' }
        ]}
        dataset={[
          {
            id: 1,
            columns: [
              { id: 1, data: 'm' },
              { id: 2, data: 'n' }
            ]
          },
          {
            id: 2,
            columns: [
              { id: 1, data: 'x' },
              { id: 2, data: 'y' }
            ]
          }
        ]}
      />
    </ArwesThemeProvider>
  );
  const element = container.firstChild as HTMLElement;
  expect(element.tagName).toBe('DIV');
  expect(element.classList.contains('arwes-table')).toBeTruthy();

  const row1 = element.querySelectorAll('.arwes-table__row')[0] as HTMLDivElement;
  const row1Cell1 = row1.querySelectorAll('.arwes-table__cell')[0] as HTMLDivElement;
  const row1Cell2 = row1.querySelectorAll('.arwes-table__cell')[1] as HTMLDivElement;
  expect(row1.classList.contains('arwes-table__row--header')).toBeTruthy();
  expect(row1Cell1?.textContent).toBe('a');
  expect(row1Cell2?.textContent).toBe('b');

  const row2 = element.querySelectorAll('.arwes-table__row')[1] as HTMLDivElement;
  const row2Cell1 = row2.querySelectorAll('.arwes-table__cell')[0] as HTMLDivElement;
  const row2Cell2 = row2.querySelectorAll('.arwes-table__cell')[1] as HTMLDivElement;
  expect(row2.classList.contains('arwes-table__row--body')).toBeTruthy();
  expect(row2Cell1?.textContent).toBe('m');
  expect(row2Cell2?.textContent).toBe('n');

  const row3 = element.querySelectorAll('.arwes-table__row')[2] as HTMLDivElement;
  const row3Cell1 = row3.querySelectorAll('.arwes-table__cell')[0] as HTMLDivElement;
  const row3Cell2 = row3.querySelectorAll('.arwes-table__cell')[1] as HTMLDivElement;
  expect(row3.classList.contains('arwes-table__row--body')).toBeTruthy();
  expect(row3Cell1?.textContent).toBe('x');
  expect(row3Cell2?.textContent).toBe('y');
});
