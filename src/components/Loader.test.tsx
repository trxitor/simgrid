import React from 'react';
import { render } from '@testing-library/react';
import Loader from './Loader';

describe('Компонент Loader (Task #4)', () => {
  it('відповідає збереженому snapshot (зліпку)', () => {
    const { asFragment } = render(<Loader />);
    // Ця функція автоматично створить папку __snapshots__ і збереже туди структуру
    expect(asFragment()).toMatchSnapshot();
  });
});