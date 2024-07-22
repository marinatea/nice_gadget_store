import { SignIn } from '@clerk/clerk-react';
import styles from './SignInPage.module.scss';

const SignUpPage: React.FC = () => {
  return (
    <div className={styles['sign-in-page']}>
      <SignIn signUpUrl="/nice_gadget_store/signup" />
    </div>
  );
};

export default SignUpPage;
