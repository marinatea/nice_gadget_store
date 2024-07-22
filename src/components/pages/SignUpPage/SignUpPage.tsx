import { SignUp } from '@clerk/clerk-react';
import styles from './SignUpPage.module.scss';

const SignUpPage: React.FC = () => {
  return (
    <div className={styles['sign-up-page']}>
      <SignUp signInUrl="/nice_gadget_store/sign-in" />
    </div>
  );
};

export default SignUpPage;
