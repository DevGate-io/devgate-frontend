import clsx from 'clsx';
import type { FC } from 'react';
import type { TemplateParameterType } from '@/entities/template';
import {
	PARAMETER_KIND_LABEL,
	TEMPLATE_DETAIL_LABELS,
} from '@/views/template-detail/constants';
import { formatParameterDefault } from '@/views/template-detail/lib/format-parameter-default';
import css from './index.module.css';

type ParametersTableProps = {
	parameters: TemplateParameterType[];
};

export const ParametersTable: FC<ParametersTableProps> = ({ parameters }) => {
	return (
		<section className={css.root}>
			<h2 className={css.title}>{TEMPLATE_DETAIL_LABELS.parametersTitle}</h2>

			{parameters.length === 0 ? (
				<p className={css.empty}>{TEMPLATE_DETAIL_LABELS.parametersEmpty}</p>
			) : (
				<>
					<div className={css.headerRow}>
						<span>{TEMPLATE_DETAIL_LABELS.parameterName}</span>
						<span>{TEMPLATE_DETAIL_LABELS.parameterKind}</span>
						<span>{TEMPLATE_DETAIL_LABELS.parameterRequired}</span>
						<span>{TEMPLATE_DETAIL_LABELS.parameterDefault}</span>
						<span>{TEMPLATE_DETAIL_LABELS.parameterDescription}</span>
					</div>
					<ul className={css.list}>
						{parameters.map((parameter) => (
							<li key={parameter.name} className={css.item}>
								<div>
									<span className={css.cellLabel}>
										{TEMPLATE_DETAIL_LABELS.parameterName}
									</span>
									<span className={css.name}>{parameter.name}</span>
								</div>
								<div>
									<span className={css.cellLabel}>
										{TEMPLATE_DETAIL_LABELS.parameterKind}
									</span>
									<span className={css.kind}>
										{PARAMETER_KIND_LABEL[parameter.kind]}
									</span>
								</div>
								<div>
									<span className={css.cellLabel}>
										{TEMPLATE_DETAIL_LABELS.parameterRequired}
									</span>
									<span
										className={clsx(
											css.required,
											parameter.required && css.requiredYes,
										)}
									>
										{parameter.required
											? TEMPLATE_DETAIL_LABELS.requiredYes
											: TEMPLATE_DETAIL_LABELS.requiredNo}
									</span>
								</div>
								<div>
									<span className={css.cellLabel}>
										{TEMPLATE_DETAIL_LABELS.parameterDefault}
									</span>
									<span className={css.default}>
										{formatParameterDefault(parameter)}
									</span>
								</div>
								<div>
									<span className={css.cellLabel}>
										{TEMPLATE_DETAIL_LABELS.parameterDescription}
									</span>
									<span className={css.description}>
										{parameter.description ?? '—'}
									</span>
								</div>
							</li>
						))}
					</ul>
				</>
			)}
		</section>
	);
};
