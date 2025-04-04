'use client';

import {useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingOutlined } from '@ant-design/icons';
import { Flex } from 'antd';

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
const CheckLogin = ({ children }: CheckLoginProps): React.ReactNode => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to login page when unauthenticated
      router.push('/api/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <LoadingOutlined/>
    </Flex>
    )
  }

  if (status === 'unauthenticated') {
    return null
  }
  
  // Render the children if authenticated
  return children
};

export default CheckLogin;
