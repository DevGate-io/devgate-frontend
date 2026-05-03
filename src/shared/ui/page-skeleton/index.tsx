import { Skeleton } from '@mantine/core';
import type { FC } from 'react';
import css from './index.module.css';

const HEADER_TITLE_HEIGHT = 26;
const HEADER_DESCRIPTION_HEIGHT = 14;
const PANEL_TITLE_HEIGHT = 14;
const PANEL_ROW_HEIGHT = 36;
const KPI_CARD_HEIGHT = 76;
const TOOLBAR_HEIGHT = 56;
const CARD_HEIGHT = 168;
const TABLE_ROW_HEIGHT = 48;
const HERO_HEIGHT = 96;

const PageHeaderSkeleton: FC = () => (
	<div className={css.header}>
		<Skeleton height={HEADER_TITLE_HEIGHT} width='40%' radius='sm' />
		<Skeleton height={HEADER_DESCRIPTION_HEIGHT} width='60%' radius='sm' />
	</div>
);

export const DashboardSkeleton: FC = () => (
	<div className={css.root}>
		<PageHeaderSkeleton />

		<div className={css.kpiGrid}>
			{Array.from({ length: 4 }).map((_, index) => (
				<Skeleton key={`kpi-${index}`} height={KPI_CARD_HEIGHT} radius='xl' />
			))}
		</div>

		<div className={css.contentGrid}>
			<div className={css.panel}>
				<Skeleton
					height={PANEL_TITLE_HEIGHT}
					width='30%'
					radius='sm'
					className={css.panelTitle}
				/>
				{Array.from({ length: 5 }).map((_, index) => (
					<Skeleton
						key={`row-${index}`}
						height={PANEL_ROW_HEIGHT}
						radius='md'
						className={css.panelRow}
					/>
				))}
			</div>
			<div className={css.panel}>
				<Skeleton
					height={PANEL_TITLE_HEIGHT}
					width='40%'
					radius='sm'
					className={css.panelTitle}
				/>
				{Array.from({ length: 3 }).map((_, index) => (
					<Skeleton
						key={`env-${index}`}
						height={PANEL_ROW_HEIGHT}
						radius='md'
						className={css.panelRow}
					/>
				))}
			</div>
		</div>
	</div>
);

type CardsGridSkeletonProps = {
	cards?: number;
	withToolbar?: boolean;
};

export const CardsGridSkeleton: FC<CardsGridSkeletonProps> = ({
	cards = 6,
	withToolbar = true,
}) => (
	<div className={css.root}>
		<PageHeaderSkeleton />
		{withToolbar && <Skeleton height={TOOLBAR_HEIGHT} radius='xl' />}
		<div className={css.cardsGrid}>
			{Array.from({ length: cards }).map((_, index) => (
				<Skeleton key={`card-${index}`} height={CARD_HEIGHT} radius='xl' />
			))}
		</div>
	</div>
);

type TableSkeletonProps = {
	rows?: number;
	withToolbar?: boolean;
};

export const TableSkeleton: FC<TableSkeletonProps> = ({
	rows = 8,
	withToolbar = true,
}) => (
	<div className={css.root}>
		<PageHeaderSkeleton />
		{withToolbar && <Skeleton height={TOOLBAR_HEIGHT} radius='xl' />}
		<div className={css.table}>
			{Array.from({ length: rows }).map((_, index) => (
				<Skeleton
					key={`row-${index}`}
					height={TABLE_ROW_HEIGHT}
					radius='sm'
					className={css.tableRow}
				/>
			))}
		</div>
	</div>
);

type DetailSkeletonProps = {
	withTabs?: boolean;
};

export const DetailSkeleton: FC<DetailSkeletonProps> = ({
	withTabs = false,
}) => (
	<div className={css.root}>
		<Skeleton height={HERO_HEIGHT} radius='xl' />
		{withTabs && <Skeleton height={36} radius='md' className={css.tabsBar} />}
		<div className={css.contentGrid}>
			<Skeleton height={CARD_HEIGHT} radius='xl' />
			<Skeleton height={CARD_HEIGHT} radius='xl' />
		</div>
	</div>
);
