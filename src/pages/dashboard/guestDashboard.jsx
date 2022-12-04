import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { API } from "../../api/index";
import authImage from "../../assets/dashboard/post.svg";

export const GuestDashboard = () => {
  const [formValues, setFormValues] = useState({});
  const [isApiLoading, setIsApiLoading] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsApiLoading(true);
    try {
      await API.post(
        "/posts",
        {
          values: { ...formValues },
        },
        { headers: { authToken: token } }
      );
      toast({
        title: "Post added successfully",
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
      setIsApiLoading(false);
      setFormValues({});
    }
  };

  const handleInputChange = (key, value) => {
    if (key === "postType") {
      setFormValues({ [key]: value });
    } else {
      setFormValues((prev) => ({ ...prev, [key]: value }));
    }
  };

  return (
    <Box
      paddingTop="2rem"
      display="flex"
      gap="1.5rem"
      justifyContent="space-around"
      alignItems="center"
      maxWidth="1280px"
      margin="0 auto"
    >
      <img src={authImage} alt="Auth banner" style={{ width: "40%" }} />

      <Box width="100%" maxWidth="500px">
        <Text fontSize="1.25rem" fontWeight="700" marginBottom="0.5rem">
          Find the best place for you?
        </Text>

        <FormControl mt="10px">
          <FormLabel>Looking For?</FormLabel>
          <RadioGroup
            value={formValues?.postType}
            onChange={(e) => handleInputChange("postType", e)}
          >
            <HStack spacing="24px">
              <Radio value="hotel">Hotel</Radio>
              <Radio value="pg">PG</Radio>
            </HStack>
          </RadioGroup>
        </FormControl>

        <FormControl mt="10px">
          <FormLabel>Location</FormLabel>
          <Input
            value={formValues?.location ?? ""}
            placeholder="Enter your location"
            onChange={(e) => handleInputChange("location", e.target.value)}
            type="text"
          />
        </FormControl>

        {formValues.postType === "hotel" && (
          <>
            <FormControl mt="10px">
              <FormLabel>Occupancy</FormLabel>
              <RadioGroup
                value={formValues?.occupancy}
                onChange={(e) => handleInputChange("occupancy", e)}
              >
                <HStack spacing="24px">
                  <Radio value="singleBedroom">Single Bedroom</Radio>
                  <Radio value="doubleBedroom">Double Bedroom</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>No of guests</FormLabel>
              <NumberInput
                value={formValues?.guests}
                onChange={(e) => handleInputChange("guests", e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Preference</FormLabel>
              <RadioGroup
                value={formValues?.acPreference}
                onChange={(e) => handleInputChange("acPreference", e)}
              >
                <HStack spacing="24px">
                  <Radio value="ac">AC</Radio>
                  <Radio value="nonAc">Non AC</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Budget</FormLabel>
              <RangeSlider
                onChange={(e) => handleInputChange("budget", e)}
                defaultValue={[0, 2000]}
                min={0}
                max={10000}
                step={500}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={4} index={0} position="relative">
                  <Text
                    position="absolute"
                    top="15px"
                    left="5px"
                    font-size="12px"
                  >
                    {formValues?.budget?.[0] ?? "0"}
                  </Text>
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={4} index={1} position="relative">
                  <Text
                    position="absolute"
                    top="15px"
                    left="5px"
                    font-size="12px"
                  >
                    {formValues?.budget?.[1] ?? "2000"}
                  </Text>
                </RangeSliderThumb>
              </RangeSlider>
            </FormControl>

            <FormControl mt="16px">
              <FormLabel>Amenities</FormLabel>
              <CheckboxGroup
                value={formValues?.amenities}
                onChange={(e) => handleInputChange("amenities", e)}
              >
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox value="food">Food</Checkbox>
                  <Checkbox value="swimmingPool">Swimming Pool</Checkbox>
                  <Checkbox value="wifi">Wi-Fi</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </>
        )}

        {formValues.postType === "pg" && (
          <>
            <FormControl mt="10px">
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                value={formValues?.gender}
                onChange={(e) => handleInputChange("gender", e)}
              >
                <HStack spacing="24px">
                  <Radio value="male">Male</Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="both">Both</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Room Type</FormLabel>
              <RadioGroup
                value={formValues?.roomType}
                onChange={(e) => handleInputChange("roomType", e)}
              >
                <HStack spacing="24px">
                  <Radio value="single">Single Sharing</Radio>
                  <Radio value="double">Double Sharing</Radio>
                  <Radio value="triple">Triple Sharing</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Status</FormLabel>
              <RadioGroup
                value={formValues?.furnishStatus}
                onChange={(e) => handleInputChange("furnishStatus", e)}
              >
                <HStack spacing="24px">
                  <Radio value="unfurnished">Unfurnished</Radio>
                  <Radio value="semiFurnished">Semi-furnished</Radio>
                  <Radio value="fullyFurnished">Fully-furnished</Radio>
                </HStack>
              </RadioGroup>
            </FormControl>

            <FormControl mt="10px">
              <FormLabel>Budget</FormLabel>
              <RangeSlider
                onChange={(e) => handleInputChange("budget", e)}
                defaultValue={[0, 2000]}
                min={0}
                max={10000}
                step={500}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={4} index={0} position="relative">
                  <Text
                    position="absolute"
                    top="15px"
                    left="5px"
                    font-size="12px"
                  >
                    {formValues?.budget?.[0] ?? "0"}
                  </Text>
                </RangeSliderThumb>
                <RangeSliderThumb boxSize={4} index={1} position="relative">
                  <Text
                    position="absolute"
                    top="15px"
                    left="5px"
                    font-size="12px"
                  >
                    {formValues?.budget?.[1] ?? "2000"}
                  </Text>
                </RangeSliderThumb>
              </RangeSlider>
            </FormControl>

            <FormControl mt="16px">
              <FormLabel>Amenities</FormLabel>
              <CheckboxGroup
                value={formValues?.amenities}
                onChange={(e) => handleInputChange("amenities", e)}
              >
                <Stack spacing={[1, 5]} direction={["column", "row"]}>
                  <Checkbox value="food">Food</Checkbox>
                  <Checkbox value="fridge">Fridge</Checkbox>
                  <Checkbox value="wifi">Wi-Fi</Checkbox>
                  <Checkbox value="washingMachine">Washing Machine</Checkbox>
                </Stack>
              </CheckboxGroup>
            </FormControl>
          </>
        )}

        <Button
          w="100%"
          mt="20px"
          colorScheme="blue"
          loadingText="Posting..."
          isLoading={isApiLoading}
          onClick={handleSubmit}
        >
          Post
        </Button>
      </Box>
    </Box>
  );
};
