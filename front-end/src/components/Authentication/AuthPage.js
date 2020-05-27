import React, { useState } from 'react';
import { SignIn, SignUp, ForgotPassword } from '../Authentication';

const components = {
  SignIn,
  SignUp,
  ForgotPassword,
};

export default function () {
  const [component, setComponent] = useState('SignIn');

  const Component = components[component];
  return <Component navigateTo={setComponent} />;
}
