import { AddPropertyStepperType } from "@/pages/(property)/add-property/schemas/add-property-stepper.schema";
import { UserQueryKeys } from "@/pages/(user)/properties/constants/user-query-keys.constants";
import { CurrencyEnum } from "@/shared/interfaces/currency/currency.interfaces";
import { Dto } from "@/shared/interfaces/dto.interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddPropertyQueryKeys } from "../constants/query-keys.constants";
import { createUpdateProperty } from "../fetchers/property.fetchers";
import { CreateUpdatePropertyDto } from "../interfaces/add-property.interfaces";
import { useUserState } from "@/core/hooks/auth.state";

const useCreateUpdateProperty = () => {
  const client = useQueryClient();
  const user = useUserState();
  const { mutate, ...mutation } = useMutation({
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: UserQueryKeys.userProperties(user?.id)
      });
    },
    mutationFn: createUpdateProperty,
    mutationKey: AddPropertyQueryKeys.createUpdateProperty
  });

  const mapFormValueToPropertyDto = (
    propertyId: string | null,
    formValue: AddPropertyStepperType
  ): Dto<CreateUpdatePropertyDto> => {
    const { basicInfoStep, detailsStep, contactInfoStep, photosStep } =
      formValue;
    return {
      data: {
        propertyId,
        price: {
          amount: +detailsStep.price,
          currency: CurrencyEnum.EUR
        },
        description: detailsStep.description?.trim() || null,
        expensesMonthly: {
          amount: detailsStep.condominiumExpenses
            ? +detailsStep.condominiumExpenses
            : 0,
          currency: CurrencyEnum.EUR
        },
        property: {
          address: {
            city: basicInfoStep.address.city || "",
            country: basicInfoStep.address.country || "",
            county: basicInfoStep.address.county || "",
            latitude: basicInfoStep.address.lat,
            longitude: basicInfoStep.address.lng,
            postalCode: basicInfoStep.address.postalCode || "",
            residenceComplex: basicInfoStep.residentialComplex?.trim() || null,
            street: basicInfoStep.address.street || "",
            streetNumber: basicInfoStep.address.streetNumber || null,
            floor: basicInfoStep.floor
          },
          bathroomNumber: detailsStep.bathroomsNumber,
          commodities: {
            hasAirConditioning: !!detailsStep.air_conditioning,
            hasBalcony: !!detailsStep.balcony,
            hasCellar: !!detailsStep.cellar,
            hasClosetInTheWall: !!detailsStep.wardrobe_on_the_wall,
            hasParking: !!detailsStep.garage,
            hasTerrace: !!detailsStep.terrace
          },
          hasElevator: !!detailsStep.hasElevator,
          houseFurniture: detailsStep.propertyFurniture,
          isLastFloor: !!basicInfoStep.lastFloor,
          propertyCondition: detailsStep.propertyConditions,
          propertyType: basicInfoStep.type,
          roomNumber: detailsStep.roomsNumber,
          surface: +detailsStep.surface,
          agencyFee: {
            amount: detailsStep.agencyFee ? +detailsStep.agencyFee : 0,
            currency: CurrencyEnum.EUR
          },
          minimumLeaseTerm: {
            ...detailsStep.minimumLeaseTerm,
            value: detailsStep.minimumLeaseTerm.value
              ? +detailsStep.minimumLeaseTerm.value
              : 0
          },
          maximumNumberOfTenants: detailsStep.maximumNumberOfTenants.accepts
            ? +detailsStep.maximumNumberOfTenants.value
            : null,
          petFriendly: !!detailsStep.petFriendly,
          rentInAdvance: detailsStep.rentInAdvance
            ? +detailsStep.rentInAdvance
            : 0,
          residentialComplex: basicInfoStep.residentialComplex || null
        },
        photos: photosStep.photos.map(({ signature, publicId, version }) => ({
          signature: signature!,
          publicId: publicId!,
          version: version!
        })),
        contactPreference: contactInfoStep.contactType,
        relationType: basicInfoStep.relationType
      }
    };
  };

  const createUpdate = ({
    data,
    propertyId
  }: {
    data: AddPropertyStepperType;
    propertyId: string | null;
  }) => {
    const propertyDto = mapFormValueToPropertyDto(propertyId, data);
    mutate({ data: propertyDto, propertyId });
  };

  return { createUpdate, ...mutation };
};

export default useCreateUpdateProperty;
