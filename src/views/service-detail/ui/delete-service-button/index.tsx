'use client';

import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import type { FC } from 'react';
import { DELETE_SERVICE_LABELS } from '@/views/service-detail/ui/delete-service-button/constants';
import { useDeleteService } from '@/views/service-detail/ui/delete-service-button/hooks/use-delete-service';
import css from './index.module.css';

type DeleteServiceButtonProps = {
	serviceId: string;
	serviceName: string;
};

export const DeleteServiceButton: FC<DeleteServiceButtonProps> = ({
	serviceId,
	serviceName,
}) => {
	const [opened, { open, close }] = useDisclosure(false);
	const { isLoading, handleDelete } = useDeleteService(serviceId);

	return (
		<>
			<Button
				variant='light'
				color='red'
				size='sm'
				onClick={open}
				disabled={isLoading}
			>
				{DELETE_SERVICE_LABELS.trigger}
			</Button>

			<Modal
				opened={opened}
				onClose={close}
				title={DELETE_SERVICE_LABELS.modalTitle}
				centered
				radius='lg'
			>
				<p className={css.text}>
					{DELETE_SERVICE_LABELS.confirmation(serviceName)}
				</p>

				<div className={css.actions}>
					<Button
						variant='subtle'
						onClick={close}
						type='button'
						disabled={isLoading}
					>
						{DELETE_SERVICE_LABELS.cancel}
					</Button>
					<Button
						color='red'
						onClick={handleDelete}
						loading={isLoading}
						type='button'
					>
						{DELETE_SERVICE_LABELS.confirm}
					</Button>
				</div>
			</Modal>
		</>
	);
};
