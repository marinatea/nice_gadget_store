import Breadcrumbs from '../../generic/Breadcrumbs/Breadcrumbs';
import Button from '../../generic/Button/Button';
import styles from './RegistrationPage.module.scss';
import { useNavigate } from 'react-router-dom';

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className={styles.main}>
      <div className={styles['register-container']}>
        <Breadcrumbs />
        <h2 className={styles['register-title']}>Register</h2>
        <form className={styles['register-form']}>
          <div className={styles['form-group']}>
            <label htmlFor="name">Name</label>
            <input type="name" id="name" name="name" required />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="last-name">Last Name</label>
            <input type="last-name" id="last-name" name="last-name" required />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <div className={styles['form-group']}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="confirm-password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
          <Button
            type="primary"
            title="Register"
            className={styles['register-redirect-button']}
            onClick={() => {}}
          />
          <Button
            type="primary"
            title="Login"
            className={styles['login-button']}
            onClick={handleLoginClick}
          />
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
