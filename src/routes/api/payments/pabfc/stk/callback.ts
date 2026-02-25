import { createFileRoute } from "@tanstack/react-router";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { mpesaStkRequests } from "@/drizzle/schema";
import { inngest } from "@/lib/inngest/client";
import { queryMpesaStkStatus } from "@/lib/mpesa";

export const Route = createFileRoute("/api/payments/pabfc/stk/callback")({
	server: {
		handlers: {
			POST: async ({ request }) => {
				try {
					const body = await request.json();

					const stkCallback = body?.Body?.stkCallback;
					const checkoutRequestId: string | undefined =
						stkCallback?.CheckoutRequestID;

					if (checkoutRequestId) {
						// Active verification: Query Safaricom authoritative status
						const queryRes = await queryMpesaStkStatus(checkoutRequestId);

						const resultCode = queryRes.ResultCode;
						const status = resultCode === "0" ? "success" : "failed";

						await db
							.update(mpesaStkRequests)
							.set({
								status,
								// biome-ignore lint/suspicious/noExplicitAny: <>
								callbackPayload: (stkCallback ?? queryRes) as any,
							})
							.where(eq(mpesaStkRequests.checkoutRequestId, checkoutRequestId));

						if (status === "success") {
							await inngest.send({
								name: "app/payments.create",
								data: {
									checkoutRequestId,
									stkCallback: stkCallback ?? queryRes,
								},
							});
						}
					}
				} catch (err) {
					console.error("[stk/callback] processing error:", err);
					return new Response(
						JSON.stringify({ status: "Error processing the request!" }),
						{
							status: 500,
							headers: { "Content-Type": "application/json" },
						},
					);
				}

				return new Response(
					JSON.stringify({ status: "Completed successfully!" }),
					{
						status: 200,
						headers: { "Content-Type": "application/json" },
					},
				);
			},
		},
	},
});
