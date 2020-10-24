export interface User {
    id: string,
    firstName: string,
    lastName: string,
    email: string
}

export function ReadUserDetails(data: any): User {
    return {
        id: data.customer_id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email
    }
}