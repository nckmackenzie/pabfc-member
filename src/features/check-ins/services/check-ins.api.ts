import { createServerFn } from "@tanstack/react-start";
import { and, desc, eq, gte, lte, type SQL } from "drizzle-orm";
import { db } from "@/db";
import { attendanceLogs, vwAttendanceDetails } from "@/drizzle/schema";
import { checkInsValidateSearch } from "@/features/check-ins/services/schema";
import { normalizeDateRange } from "@/lib/helpers";
import { authMiddleware } from "@/middlewares/auth-middleware";

export const getCheckIns = createServerFn()
	.middleware([authMiddleware])
	.inputValidator(checkInsValidateSearch)
	.handler(async ({ data, context: { memberId } }) => {
		const filters: Array<SQL> = [];

		if (data.dateRange?.from && data.dateRange?.to) {
			const { from, to } = normalizeDateRange(
				data.dateRange.from,
				data.dateRange.to,
			);
			filters.push(gte(vwAttendanceDetails.checkInTime, from));
			filters.push(lte(vwAttendanceDetails.checkInTime, to));
		}

		return db
			.select({
				id: vwAttendanceDetails.id,
				memberName: vwAttendanceDetails.memberName,
				image: vwAttendanceDetails.image,
				checkInTime: vwAttendanceDetails.checkInTime,
				checkOutTime: vwAttendanceDetails.checkOutTime,
				duration: vwAttendanceDetails.duration,
				activePlanName: vwAttendanceDetails.activePlanName,
				nextRenewalDate: vwAttendanceDetails.nextRenewalDate,
			})
			.from(vwAttendanceDetails)
			.innerJoin(
				attendanceLogs,
				eq(attendanceLogs.id, vwAttendanceDetails.id),
			)
			.where(and(eq(attendanceLogs.memberId, memberId), ...filters))
			.orderBy(desc(vwAttendanceDetails.checkInTime));
	});
