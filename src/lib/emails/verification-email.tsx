import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

export const EmailVerification = ({
	url,
	name,
}: {
	url: string;
	name: string;
}) => {
	return (
		<Html lang="en" dir="ltr">
			<Tailwind>
				<Head />
				<Body className="bg-gray-100 font-sans py-[40px]">
					<Container className="bg-white rounded-[8px] px-[48px] py-[40px] max-w-[600px] mx-auto">
						<Section>
							<Text className="text-[32px] font-bold text-gray-900 mb-[24px] mt-0">
								Verify your email address
							</Text>

							<Text className="text-[16px] text-gray-700 mb-[24px] mt-0 leading-[24px]">
								Hi {name}, Thanks for signing up. To complete your registration
								and start using your account, please verify your email address
								by clicking the button below.
							</Text>

							<Section className="text-center my-[32px]">
								<Button
									href={url}
									className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border"
								>
									Verify Email Address
								</Button>
							</Section>

							<Text className="text-[14px] text-gray-600 mb-[24px] mt-0 leading-[20px]">
								If the button above doesn't work, you can also copy and paste
								the following link into your browser:
							</Text>

							<Text className="text-[14px] text-blue-600 mb-[32px] mt-0 break-all">
								{url}
							</Text>

							<Hr className="border-gray-200 my-[32px]" />

							<Text className="text-[14px] text-gray-600 mb-[32px] mt-0 leading-[20px]">
								If you have any questions, feel free to contact our support
								team.
							</Text>
						</Section>

						<Hr className="border-gray-200 my-[32px]" />

						<Section>
							<Text className="text-[12px] text-gray-500 text-center mb-[8px] mt-0 m-0">
								© {new Date().getFullYear()} Prime Age Beauty & Fitness Center.
								All rights reserved.
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};
