export interface Participant {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: 'pending' | 'sent' | 'completed';
    invitationDate: string;
    completionDate?: string;
} 