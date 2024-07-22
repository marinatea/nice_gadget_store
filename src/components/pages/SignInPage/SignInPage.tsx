import { SignIn } from '@clerk/clerk-react';
import styles from './SignInPage.module.scss';

const SignUpPage: React.FC = () => {
  return (
    <div className={styles['sign-in-page']}>
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
};

export default SignUpPage;
