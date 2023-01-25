export interface IBooking{
    _id: string,
    bookedUser: string,
    bookedEventId: string,
    bookedEventName: string,
    bookedTime: string,
    appointmentBookedUsername: string,
    appointmentBookedPhoneNumber: string,
    appointmentBookedEmail: string,
    appointmentGuestEmail: string,
    additionalNotes: string,
    sendConfirmationMail: string,
    bookingStatus:string
    
}