'use client';

import {useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingOutlined } from '@ant-design/icons';

/**
 * The check login props
 * @typedef CheckLoginProps
 * @property {React.ReactNode} children - The child components to be rendered
 */
type CheckLoginProps = {
  children: React.ReactNode;
};

/**
 * Check if the user is logged in
 * @param {CheckLoginProps} props - The props object
 * @param {React.ReactNode} props.children - The child components to be rendered
 * @returns {React.ReactNode} The check login component
 */
const CheckLogin = ({ children }: CheckLoginProps) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Uncomment to enable redirect to login page when unauthenticated
      // router.push('/api/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingOutlined />;
  }

  return children
};

export default CheckLogin;
