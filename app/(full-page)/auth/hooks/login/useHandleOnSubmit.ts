import { formatAllowedSidebarModules } from '@/app/(main)/components/common/lib/permissions/utils/format-allowed-sidebar-modules';
import { formatPermissionsForAuth } from '@/app/(main)/components/common/lib/permissions/utils/format-permissions';
import { signInServices } from '../../services/Auth/auth.services';
import { useMutation } from '@tanstack/react-query';
import { getCookie, setCookie } from 'typescript-cookie';
import { useRouter } from 'next/navigation';

import { FormLogin } from '../../lib/schemas';
import { menuModel } from '@/layout/AppMenu';
import { MutableRefObject } from 'react';
import { Toast } from 'primereact/toast';
import { useAuthStore } from '@/app/(main)/components/common/store/auth';

export const useOnSubmit = (toastRef: MutableRefObject<Toast | null>, onTwoFactor?: (data: any) => void) => {
    const router = useRouter();
    const { setUser } = useAuthStore();

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (credentials: FormLogin) => await signInServices(credentials),

        onSuccess(data: any) {
            if (data?.error) {
                toastRef.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: data.error,
                    life: 3000
                });
                return;
            }
            if (data?.result?.twoFactorAuth) {
                if (onTwoFactor) onTwoFactor(data);
                return;
            }

            if (!data?.result.twoFactorAuth) {
                if (data && data?.result?.accessToken) {
                    setCookie('accessToken', data?.result?.accessToken);
                    setCookie('refreshToken', data?.result?.refreshToken);
                    setCookie('email', data?.result?.email);
                    setCookie('userId', data?.result?.userId);
                    
                    const { permissions, ...restOfResult } = data?.result as any;

                    setUser({
                        ...restOfResult,
                        permissions: formatPermissionsForAuth((data?.result as any).role),
                        sidebarAbleModules: formatAllowedSidebarModules({
                            permissions: formatPermissionsForAuth((data?.result as any).role),
                            routes: menuModel
                        })
                    });

                    router.push('/');
                }
            }
        }
    });

    const signIn = async (data: FormLogin) => {
        await mutateAsync(data);
    };

    return {
        isPending,
        signIn,
    };
};
