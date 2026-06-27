'use server';

import type { AuditAction, AuditEventType } from '@/entities/audit-event';
import { apiClient } from '@/shared/api/client';
import { API_URLS } from '@/shared/config/api-urls';
import { MOCK_API } from '@/shared/config/mock-api';
import { MOCK_AUDIT_EVENTS } from '@/shared/lib/test-audit';

export type AuditFiltersType = {
	action?: AuditAction;
	actorId?: string;
	from?: string;
	to?: string;
};

const matchesAction = (
	event: AuditEventType,
	action: AuditAction | undefined,
): boolean => !action || event.action === action;

const matchesActor = (
	event: AuditEventType,
	actorId: string | undefined,
): boolean => !actorId || event.actorId === actorId;

const matchesDateRange = (
	event: AuditEventType,
	from: string | undefined,
	to: string | undefined,
): boolean => {
	const eventTime = new Date(event.createdAt).getTime();
	if (from) {
		const fromTime = new Date(from).getTime();
		if (Number.isNaN(fromTime) === false && eventTime < fromTime) {
			return false;
		}
	}
	if (to) {
		const toTime = new Date(to).getTime() + 24 * 60 * 60 * 1000;
		if (Number.isNaN(toTime) === false && eventTime > toTime) {
			return false;
		}
	}
	return true;
};

export const getAuditEvents = async (
	filters: AuditFiltersType = {},
): Promise<AuditEventType[]> => {
	if (MOCK_API.audit) {
		return MOCK_AUDIT_EVENTS.filter(
			(event) =>
				matchesAction(event, filters.action) &&
				matchesActor(event, filters.actorId) &&
				matchesDateRange(event, filters.from, filters.to),
		).sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
		);
	}

	const response = await apiClient.get<AuditEventType[]>(API_URLS.auditEvents, {
		params: filters,
	});
	return response.data;
};
