export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    customRadius: number | null;
}

export function ReadUserDetails(data: any): User {
    return {
        id: data.customer_id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phoneNumber: data.mobile_number,
        customRadius: data.custom_radius
    }
}

export function UserToBackend(user: User) {
    return {
        customer_id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        mobile_number: user.phoneNumber,
        custom_radius: user.customRadius
    }
}