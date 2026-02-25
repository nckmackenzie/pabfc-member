import { useStore } from "@tanstack/react-form";
import { useQueryClient } from "@tanstack/react-query";
import { getRouteApi } from "@tanstack/react-router";
import { CircleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/reui/alert";
import { ErrorComponent } from "@/components/ui/error-component";
import { FieldGroup } from "@/components/ui/field";
import { ToastContent } from "@/components/ui/toast-content";
import { usePaymentStatus } from "@/features/payments/hooks/use-payment-status";
import { useStkPush } from "@/features/payments/hooks/use-stk-push";
import { paymentFormSchema } from "@/features/payments/services/schema";
import { useSheet } from "@/integrations/overlays/sheet-provider";
import { useAppForm } from "@/lib/form";
import { internationalizePhoneNumber } from "@/lib/helpers";
import { toTitleCase } from "@/lib/utils";

export function useAddPaymentAction() {
	const { setOpen } = useSheet();
	const { contact, plans } = getRouteApi(
		"/(protected)/payments/",
	).useLoaderData();

	const handleAddNewPayment = () => {
		setOpen(<AddPaymentForm contact={contact} plans={plans} />, {
			title: "Add New Payment",
			description: "Enter the details below to make a payment.",
		});
	};

	return {
		handleAddNewPayment,
	};
}

function AddPaymentForm({
	contact,
	plans,
}: {
	contact: string;
	plans: Array<{ id: string; name: string; price: number | string }>;
}) {
	const stkMutation = useStkPush();
	const statusQuery = usePaymentStatus(
		stkMutation.data?.checkoutRequestId ?? null,
	);
	const queryClient = useQueryClient();

	const form = useAppForm({
		defaultValues: {
			contact: internationalizePhoneNumber(contact),
			planId: "",
			amount: 0,
		},
		validators: {
			onSubmit: paymentFormSchema,
		},
		onSubmit: ({ value }) => {
			stkMutation.mutate(value);
		},
	});

	const selectedPlan = useStore(form.store, (state) => state.values.planId);

	useEffect(() => {
		if (statusQuery.data?.status === "success") {
			form.reset();
			toast.success((t) => (
				<ToastContent
					title="Payment successful"
					t={t}
					message="Payment has been processed successfully"
				/>
			));
			queryClient.invalidateQueries({
				queryKey: ["payments"],
			});
		}
	}, [statusQuery.data?.status, form, queryClient]);

	useEffect(() => {
		if (selectedPlan) {
			const plan = plans.find((plan) => plan.id === selectedPlan);
			if (plan) {
				form.setFieldValue("amount", parseFloat(plan.price.toString()));
			}
		}
	}, [selectedPlan, form, plans]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-4 p-4"
		>
			<FieldGroup>
				<form.AppField name="contact">
					{(field) => (
						<field.Input
							label="Phone No"
							placeholder="Enter phone no (eg 254722000000)"
						/>
					)}
				</form.AppField>
				<form.AppField name="planId">
					{(field) => (
						<field.Select
							label="Your preferred plan"
							placeholder="Select your preferred plan"
							values={plans.map((plan) => ({
								label: toTitleCase(plan.name),
								value: plan.id,
							}))}
						/>
					)}
				</form.AppField>
				<form.AppField name="amount">
					{(field) => (
						<field.Input label="Plan Amount" readOnly type="number" />
					)}
				</form.AppField>
			</FieldGroup>
			<form.AppForm>
				<form.SubscribeButton
					isPending={
						stkMutation.isPending ||
						statusQuery.isLoading ||
						statusQuery.data?.status === "pending"
					}
					label="Make Payment"
				/>
			</form.AppForm>
			<FieldGroup className="max-w-lg mx-auto">
				{stkMutation.error && (
					<ErrorComponent title="Error" message={stkMutation.error.message} />
				)}
				{stkMutation.data?.checkoutRequestId && (
					<Alert
						variant={
							statusQuery.data && !statusQuery.data.exists
								? "destructive"
								: statusQuery.data?.status === "success"
									? "success"
									: statusQuery.data?.status === "failed"
										? "destructive"
										: "info"
						}
						className="max-w-lg mx-auto"
					>
						<CircleAlertIcon />
						<AlertTitle>
							Payment status: {statusQuery.data?.status || "Processing..."}
						</AlertTitle>
						<AlertDescription>
							{statusQuery.data?.status === "success"
								? "Payment successful"
								: statusQuery.data?.status === "failed"
									? "Payment failed"
									: "Waiting for M-Pesa confirmation. Don't close or refresh this page..."}
						</AlertDescription>
					</Alert>
				)}
			</FieldGroup>
		</form>
	);
}
