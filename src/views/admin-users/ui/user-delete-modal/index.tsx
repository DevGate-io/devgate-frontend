'use client';

import { Button, Modal, Text } from '@mantine/core';
import type { FC } from 'react';
import type { TeamMemberUserType } from '@/shared/lib/test-users';
import { ADMIN_USERS_MODAL_LABELS } from '@/views/admin-users/constants';
import css from './index.module.css';

type UserDeleteModalProps = {
	opened: boolean;
	onClose: () => void;
	onConfirm: () => void;
	user: TeamMemberUserType | null;
	loading?: boolean;
};

export const UserDeleteModal: FC<UserDeleteModalProps> = ({
	opened,
	onClose,
	onConfirm,
	user,
	loading,
}) => {
	if (!user) {
		return null;
	}

	return (
		<Modal
			opened={opened}
			onClose={onClose}
			title={ADMIN_USERS_MODAL_LABELS.deleteTitle}
			radius='xl'
			size='sm'
		>
			<div className={css.body}>
				<Text size='sm'>
					{ADMIN_USERS_MODAL_LABELS.deleteConfirm}{' '}
					<strong>{user.fullName}</strong>?
				</Text>
				<Text size='sm' c='dimmed'>
					{ADMIN_USERS_MODAL_LABELS.deleteConfirmDetail}
				</Text>
			</div>

			<div className={css.actions}>
				<Button
					type='button'
					variant='default'
					onClick={onClose}
					radius='md'
					size='sm'
				>
					{ADMIN_USERS_MODAL_LABELS.cancel}
				</Button>
				<Button
					type='button'
					color='red'
					loading={loading}
					onClick={onConfirm}
					radius='md'
					size='sm'
				>
					{ADMIN_USERS_MODAL_LABELS.delete}
				</Button>
			</div>
		</Modal>
	);
};
