import { useQuery } from "@tanstack/react-query";
import { getCurrentUserService } from "../services/getCurrentUserService";
import { IUser } from "../services/types";

export const useCurrentUser = () => {
    const { data: currentUser, isLoading, error } = useQuery<IUser>({
        queryKey: ['currentUser'],
        queryFn: getCurrentUserService,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30, // 30 minutes
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        retry: 2
    });

    const currentUserEmail = currentUser?.email || null;

    console.log('useCurrentUser hook:', {
        currentUser,
        currentUserEmail,
        isLoading,
        error
    });

    return {
        currentUser,
        isLoading,
        error,
        currentUserEmail
    };
}; 