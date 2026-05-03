import type { FC } from 'react';
import { pageConfig } from '@/shared/config/page.config';
import { PageHeader } from '@/shared/ui/page-header';
import { ADMIN_LABELS, type AdminSectionType } from '@/views/admin/constants';
import { SectionCard } from '@/views/admin/ui/section-card';
import css from './index.module.css';

const SECTIONS: AdminSectionType[] = [
	{
		id: 'users',
		title: 'Пользователи',
		description:
			'Список аккаунтов платформы и их роли. Меняйте роль участников напрямую из таблицы.',
		href: `${pageConfig.admin}/users`,
		available: true,
	},
	{
		id: 'integrations',
		title: 'Интеграции',
		description:
			'Подключение SCM, CI/CD и систем мониторинга. Конфиг управляется через бэк, UI — read-only.',
		href: `${pageConfig.admin}/integrations`,
		available: true,
	},
	{
		id: 'audit',
		title: 'Audit-лог',
		description:
			'Просмотр критических действий с фильтрами по дате, актору и типу события. Экспорт в CSV.',
		href: `${pageConfig.admin}/audit`,
		available: true,
	},
];

export const AdminView: FC = () => {
	return (
		<div className={css.root}>
			<PageHeader
				title={ADMIN_LABELS.title}
				description={ADMIN_LABELS.description}
			/>

			<ul className={css.grid}>
				{SECTIONS.map((section) => (
					<li key={section.id}>
						<SectionCard section={section} />
					</li>
				))}
			</ul>
		</div>
	);
};
