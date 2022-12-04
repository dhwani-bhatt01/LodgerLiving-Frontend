import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../api";

export const PgFeedFooter = ({ post }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bidAmt, setBidAmt] = useState(post?.budget?.[1]);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const toast = useToast();

  const handleBid = async () => {
    setIsApiLoading(true);
    try {
      const res = await API.post(
        "/posts/bid",
        {
          bidAmt,
          postId: post?._id,
        },
        {
          headers: { authToken: token },
        }
      );
      toast({
        title: res?.data?.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: err?.response?.data?.message ?? "Something went wrong",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
      setIsApiLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="solid"
        colorScheme="green"
        w="100%"
        onClick={() => {
          setBidAmt(post?.budget?.[1]);
          onOpen();
        }}
      >
        🪙 Make a Bid
      </Button>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Make a Bids</ModalHeader>
            <ModalCloseButton />
            <ModalBody display="flex" justifyContent="center" gap="2rem">
              <Text fontSize="3.5rem" fontWeight={600}>
                {bidAmt}
              </Text>
              <Box display="flex" gap="0.5rem" flexDirection="column">
                <IconButton
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => setBidAmt((prev) => prev + 500)}
                  disabled={bidAmt >= post?.budget?.[1]}
                  icon={<i className="ri-arrow-up-s-line" />}
                />
                <IconButton
                  size="sm"
                  variant="outline"
                  colorScheme="blue"
                  onClick={() => setBidAmt((prev) => prev - 500)}
                  disabled={bidAmt <= post?.budget?.[0]}
                  icon={<i className="ri-arrow-down-s-line" />}
                />
              </Box>
            </ModalBody>
            <Button
              onClick={handleBid}
              isLoading={isApiLoading}
              m="24px"
              colorScheme="blue"
            >
              Make Bid
            </Button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
