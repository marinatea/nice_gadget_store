import { SignUp } from '@clerk/clerk-react';
import styles from './SignUpPage.module.scss';

const SignUpPage: React.FC = () => {
  return (
    <div className={styles['sign-up-page']}>
      <SignUp signInUrl="/signup" />
    </div>
  );
};

export default SignUpPage;
