import type { Meta, StoryObj } from '@storybook/nextjs';

import { Tooltip } from './Tooltip';

const meta = {
	title: 'Tooltip',
	component: Tooltip,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
## Какие пропсы принимает

1. \`className\` - кастомные стили для тултипа и диалогового окна
2. \`text\` - текст, который будет отображаться внутри диалогового окна
3. \`children\` - компонент принимает в себя дочерний элемент типа \`React.ReactNode\`, над которым будет всплывать диалоговое окно

## Базовая стилизация

1. Имеет ширину и высоту относительно ширины и высоты самого контента
2. Позиционируется сверху-посередине над дочерним элементом
3. Диалоговое окно отображается по наведению на дочерний элемент

## Пример использования

\`\`\`tsx
export const Home: NextPage = () => {
    return (
        <Tooltip className={css.tooltip} text='lorem'>
            <button>кнопка</button>
        </Tooltip>
    )
};
\`\`\`
`,
			},
		},
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Tooltip',
		text: 'Tooltip content',
		className: '',
	},
};
