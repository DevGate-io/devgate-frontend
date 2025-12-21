import { useState } from 'react';

import { Select, type SelectOption, type SelectProps } from './index';

const meta = {
  title: 'Shared UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    options: { control: 'object' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  tags: ['autodocs'],
} as const;

export default meta;

const baseOptions: Array<SelectOption> = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry', disabled: true },
  { value: 'grape', label: 'Grape' },
];

export const Default = {
  args: {
    label: 'Fruit',
    name: 'fruit',
    options: baseOptions,
    placeholder: 'Выберите фрукт',
  },
};

export const Controlled = {
  render: (args: SelectProps) => {
    const [value, setValue] = useState('banana');
    return (
      <Select
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText={`Выбрано: ${value}`}
      />
    );
  },
  args: {
    label: 'Контролируемый',
    name: 'controlled',
    options: baseOptions,
  },
};

export const Error = {
  args: {
    label: 'С ошибкой',
    name: 'error',
    options: baseOptions,
    error: true,
    helperText: 'Обязательное поле',
  },
};

export const SimpleStrings = {
  args: {
    label: 'Простые строки',
    name: 'simple',
    options: ['Apple', 'Banana', 'Cherry'],
    placeholder: 'Выберите фрукт',
  },
};


