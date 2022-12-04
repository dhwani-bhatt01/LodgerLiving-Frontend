import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export const GuestProfileFooter = ({ post }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				variant="solid"
				colorScheme="blue"
				w="100%"
				onClick={() => onOpen()}
			>
				View all Bids
			</Button>

			{isOpen && (
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>All Bids</ModalHeader>
						<ModalCloseButton />
						<ModalBody maxHeight="600px" overflowY="auto">
							{post?.bids?.length === 0 ? (
								<Text textAlign="center">No Bids 😟</Text>
							) : (
								post?.bids?.map((b, i) => (
									<Flex gap="0.5rem" mb="0.25rem">
										<Text>Bid Amount:</Text>
										<Text fontWeight="600">{b?.bidAmt}</Text>
									</Flex>
								))
							)}
							{/* {post?.bids?.lenght > 0 ? (
								post?.bids?.map((b, i) => (
									<Flex gap="0.5rem" mb="0.25rem">
										<Text>Bid Amount:</Text>
										<Text fontWeight="600">{b?.bidAmt}</Text>
									</Flex>
								))
							) : (
								<Text textAlign="center">No Bids 😟</Text>
							)} */}
						</ModalBody>
					</ModalContent>
				</Modal>
			)}
		</>
	);
};
