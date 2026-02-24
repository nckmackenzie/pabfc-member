import { format } from "date-fns";

type DateRangeString = { from: string; to: string };
type DateRangeDate = { from: Date; to: Date };

export const currencyFormatter = (
	value: string | number,
	isCurrency = true,
	compact?: boolean,
	replaceZeroNumbers = false,
) => {
	const numberValue = typeof value === "string" ? parseFloat(value) : value;
	const formatted = new Intl.NumberFormat("en-KE", {
		style: isCurrency ? "currency" : "decimal",
		currency: "KES",
		notation: compact ? "compact" : "standard",
		compactDisplay: "short",
		maximumFractionDigits: 2,
	}).format(numberValue);

	if (!replaceZeroNumbers) {
		return formatted;
	}

	if (replaceZeroNumbers && numberValue === 0) {
		return "-";
	}

	return formatted;
};

export const dateFormat = (
	date: Date | string,
	formattingType: "regular" | "reporting" | "long" = "regular",
) => {
	if (formattingType === "reporting") {
		return format(new Date(date), "dd/MM/yyyy");
	} else if (formattingType === "long") {
		return format(new Date(date), "PPP");
	}
	return format(new Date(date), "yyyy-MM-dd");
};

export function internationalizePhoneNumber(
	phoneNumber: string,
	withPlus = false,
) {
	if (phoneNumber.startsWith("+")) {
		return phoneNumber;
	}

	if (phoneNumber.startsWith("0")) {
		return withPlus
			? `+254${phoneNumber.slice(1)}`
			: `254${phoneNumber.slice(1)}`;
	}

	if (phoneNumber.startsWith("254") && phoneNumber.length === 12) {
		return withPlus ? `+${phoneNumber}` : phoneNumber;
	}

	return phoneNumber;
}

export function generateFullPaymentInvoiceNo(
	paymentNo: number,
	prefix?: string,
	padding?: number,
) {
	const paddedPaymentNo = padding
		? paymentNo.toString().padStart(padding, "0")
		: paymentNo.toString();
	return `${prefix ? `${prefix.toUpperCase()}-` : ""}${paddedPaymentNo}`;
}

/**
 * Normalizes a date range by setting the 'from' date to start of day (00:00:00.000)
 * and the 'to' date to end of day (23:59:59.999)
 *
 * @param from - The start date (can be string, Date, or undefined)
 * @param to - The end date (can be string, Date, or undefined)
 * @returns Object with normalized from and to dates as ISO strings
 */
export function normalizeDateRange(
	from: string | Date,
	to: string | Date,
	returnAsDate: true,
): DateRangeDate;
export function normalizeDateRange(
	from: string | Date,
	to: string | Date,
	returnAsDate?: false,
): DateRangeString;
export function normalizeDateRange(
	from: string | Date,
	to: string | Date,
	returnAsDate = false,
): DateRangeString | DateRangeDate {
	const processDate = (date: string | Date, type: "from" | "to") => {
		const d = new Date(date);
		if (Number.isNaN(d.getTime())) {
			throw new Error(`Invalid "${type}" date provided`);
		}
		if (type === "from") {
			d.setUTCHours(0, 0, 0, 0);
		} else {
			d.setUTCHours(23, 59, 59, 999);
		}
		return d;
	};

	const fromDate = processDate(from, "from");
	const normalizedFrom = fromDate.toISOString();

	const toDate = processDate(to, "to");
	const normalizedTo = toDate.toISOString();

	if (fromDate && toDate && fromDate > toDate) {
		throw new Error('"from" date cannot be greater than "to" date');
	}

	if (returnAsDate) {
		return {
			from: fromDate,
			to: toDate,
		};
	}

	return {
		from: normalizedFrom,
		to: normalizedTo,
	};
}

export function percentageChangeCalculator(current: number, previous: number) {
	if (previous === 0) {
		return { value: current === 0 ? 0 : 100, isPositive: current >= 0 };
	}

	const change = ((current - previous) / previous) * 100;

	return {
		value: Number.isFinite(change) ? Math.abs(Number(change.toFixed(1))) : 0,
		isPositive: change >= 0,
	};
}

export function percentage(partialValue: number, totalValue: number) {
	if (totalValue === 0) return 0;
	return (100 * partialValue) / totalValue;
}

/**
 * Validates whether a given string is a valid AWS S3 object URL.
 *
 * Accepts the standard virtual-hosted-style S3 URL format:
 *   https://<bucket>.s3.<region>.amazonaws.com/<key>
 *
 * Optionally, pass a `publicBaseUrl` (e.g. from env.AWS_S3_PUBLIC_URL) to
 * also accept URLs served from a custom domain/CDN that proxies the bucket.
 *
 * @param url - The URL string to validate.
 * @param publicBaseUrl - Optional custom public base URL for the bucket.
 * @returns `true` if the URL is a valid S3 object URL, `false` otherwise.
 */
export function isValidS3Url(url: string, publicBaseUrl?: string): boolean {
	if (!url) return false;

	try {
		const parsed = new URL(url);

		if (parsed.protocol !== "https:") return false;

		// Standard AWS virtual-hosted-style: <bucket>.s3.<region>.amazonaws.com
		const s3HostPattern =
			/^[a-z0-9][a-z0-9.\-]{1,61}[a-z0-9]\.s3\.[a-z0-9-]+\.amazonaws\.com$/;
		if (s3HostPattern.test(parsed.hostname)) {
			// Must have a non-empty path (the object key)
			return parsed.pathname.length > 1;
		}

		// Custom public base URL (e.g. CDN / custom domain)
		if (publicBaseUrl) {
			const base = publicBaseUrl.endsWith("/")
				? publicBaseUrl
				: `${publicBaseUrl}/`;
			return url.startsWith(base) && url.length > base.length;
		}

		return false;
	} catch {
		return false;
	}
}
