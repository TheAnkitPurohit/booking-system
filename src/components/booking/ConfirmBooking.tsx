/* eslint-disable react/jsx-no-bind */

"use client";

import { useProperty } from "@/utils/store";
import { Button } from "@/components/ui/button";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { createBookingAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";

function ConfirmBooking() {
  const { userId } = useAuth();
  const { propertyId, range } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  if (!userId)
    return (
      <SignInButton mode="modal">
        <Button type="button" className="w-full">
          Sign In to Complete Booking
        </Button>
      </SignInButton>
    );

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
  });
  return (
    <section>
      <FormContainer action={createBooking}>
        <SubmitButton text="Reserve" className="w-full" />
      </FormContainer>
    </section>
  );
}
export default ConfirmBooking;
