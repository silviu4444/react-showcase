import { PropertyTypeDef } from "@/shared/interfaces/property/property.interfaces";
import { AddPropertyStepperType } from "../schemas/add-property-stepper.schema";

export function mapPropertyToStepperData(
  property: PropertyTypeDef
): AddPropertyStepperType {
  return {
    basicInfoStep: {
      type: property.details.propertyType,
      address: {
        country: property.details.address.country,
        county: property.details.address.county,
        street: property.details.address.street,
        streetNumber: property.details.address.streetNumber || undefined,
        inputValue: property.details.address.street,
        lat: +property.details.address.latitude,
        lng: +property.details.address.longitude,
        city: property.details.address.city
      },
      floor: property.details.address.floor,
      relationType: property.relationType,
      lastFloor: property.details.isLastFloor,
      residentialComplex: property.details.residentialComplex || ""
    },
    detailsStep: {
      bathroomsNumber: property.details.bathroomNumber,
      propertyFurniture: property.details.furniture,
      propertyConditions: property.details.conditions,
      maximumNumberOfTenants: {
        accepts: +property.contractDetails.maximumNumberOfTenants > 0,
        value: property.contractDetails.maximumNumberOfTenants
      },
      price: property.price.amount.toString(),
      minimumLeaseTerm: {
        ...property.contractDetails.minimumLeaseTerm,
        value: property.contractDetails.minimumLeaseTerm.value.toString()
      },
      roomsNumber: property.details.roomNumber,
      surface: property.details.surface.toString(),
      air_conditioning: property.details.commodities.hasAirConditioning,
      balcony: property.details.commodities.hasBalcony,
      cellar: property.details.commodities.hasCellar,
      garage: property.details.commodities.hasParking,
      wardrobe_on_the_wall: property.details.commodities.hasClosetInTheWall,
      hasElevator: property.details.hasElevator,
      petFriendly: property.contractDetails.petFriendly,
      terrace: property.details.commodities.hasTerrace,
      condominiumExpenses:
        property.expensesMonthly.amount === 0
          ? ""
          : property.expensesMonthly.amount.toString(),
      description: property.description || "",
      agencyFee:
        property.contractDetails.agencyFee.amount === 0
          ? ""
          : property.contractDetails.agencyFee.amount?.toString(),
      rentInAdvance: property.contractDetails.rentInAdvance
    },
    contactInfoStep: {
      contactType: property.contactPreference,
      phone: property.user.phoneNumbers[0]?.number || ""
    },
    photosStep: {
      photos: property.photos.map((photo) => ({
        publicId: photo.publicId,
        imageId: photo.publicId
      }))
    }
  };
}
